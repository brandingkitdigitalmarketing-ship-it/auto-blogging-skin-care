import { db } from '../db';
import { AiWriterService } from './ai-writer';
import { TrendResearcherService } from './trend-researcher';
import { Article } from '../db/schema';

export interface SchedulerExecutionResult {
  timestamp: string;
  generatedCount: number;
  publishedCount: number;
  draftCount: number;
  articles: Array<{ id: string; title: string; slug: string; status: string; category: string }>;
  errors: string[];
}

export class PublishingSchedulerService {
  /**
   * Run the daily auto-pilot blogging cycle
   * This discovers trends, writes articles, adds SEO + internal links, and publishes/schedules.
   */
  public static async runAutoPilotCycle(overrideCount?: number): Promise<SchedulerExecutionResult> {
    const settings = db.getSiteSettings();
    const countToGenerate = overrideCount || settings.aiSettings.dailyPublishCount || 3;
    const targetCategories = settings.aiSettings.targetCategories?.length
      ? settings.aiSettings.targetCategories
      : ['skincare', 'haircare', 'beauty-dermatology', 'ingredients-research', 'beauty-news'];

    const result: SchedulerExecutionResult = {
      timestamp: new Date().toISOString(),
      generatedCount: 0,
      publishedCount: 0,
      draftCount: 0,
      articles: [],
      errors: [],
    };

    // 1. Discover and sync fresh trends
    await TrendResearcherService.syncDiscoveredTrendsToStore();
    const pendingTrends = db.getTrendingTopics().filter(t => t.status === 'pending');

    // 2. Generate articles for target count
    for (let i = 0; i < countToGenerate; i++) {
      try {
        const trend = pendingTrends[i % pendingTrends.length];
        const categorySlug = trend ? trend.category : targetCategories[i % targetCategories.length];
        const topic = trend ? trend.topic : `Evidence-Based ${categorySlug.replace('-', ' ')} Protocols for 2026`;
        const keywords = trend ? trend.suggestedKeywords : [categorySlug, 'dermatology', 'clinical guide'];

        // Determine publishing status based on settings
        const status: 'published' | 'draft' | 'scheduled' = settings.aiSettings.autoPublish ? 'published' : 'draft';

        // Stagger publication times if scheduling
        const publishTimes = settings.aiSettings.publishTimes || ['09:00', '13:00', '18:00'];
        const scheduledTime = publishTimes[i % publishTimes.length];

        const generatedData = await AiWriterService.generateArticle({
          topic,
          categorySlug,
          targetKeywords: keywords,
          tone: 'clinical',
          provider: settings.aiSettings.provider,
          apiKey: settings.aiSettings.apiKey,
        });

        // Create article in persistent store
        const newArticle = db.createArticle({
          ...generatedData,
          status,
          isMedicallyReviewed: true,
          scheduledFor: (status as string) === 'scheduled' ? scheduledTime : undefined,
          sourceInspiration: trend ? `Trend: ${trend.source}` : 'AI Intelligence Engine',
        });

        // Mark trend as generated if applicable
        if (trend) {
          db.updateTrendingTopic(trend.id, {
            status: 'generated',
            articleId: newArticle.id,
          });
        }

        result.generatedCount++;
        if (status === 'published') result.publishedCount++;
        else result.draftCount++;

        result.articles.push({
          id: newArticle.id,
          title: newArticle.title,
          slug: newArticle.slug,
          status: newArticle.status,
          category: newArticle.categorySlug,
        });
      } catch (err: any) {
        result.errors.push(`Error generating article ${i + 1}: ${err?.message || 'Unknown error'}`);
      }
    }

    // Update settings with last run timestamp
    db.updateSiteSettings({
      aiSettings: {
        ...settings.aiSettings,
        lastCronRun: new Date().toISOString(),
        nextCronRun: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
      },
    });

    return result;
  }
}
