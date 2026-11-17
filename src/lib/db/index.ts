import fs from 'fs';
import path from 'path';
import { Article, Author, Category, Ingredient, SiteSettings, TrendingTopic } from './schema';
import {
  DEFAULT_SITE_SETTINGS,
  SEED_ARTICLES,
  SEED_AUTHORS,
  SEED_CATEGORIES,
  SEED_INGREDIENTS,
  SEED_TRENDING_TOPICS
} from './seed-data';

interface DatabaseData {
  articles: Article[];
  categories: Category[];
  authors: Author[];
  ingredients: Ingredient[];
  trendingTopics: TrendingTopic[];
  settings: SiteSettings;
  subscribers: Array<{ email: string; date: string; category?: string }>;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'store.json');

class DatabaseStore {
  private data: DatabaseData | null = null;
  private isLoaded = false;

  private ensureDir() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  }

  private load(): DatabaseData {
    if (this.isLoaded && this.data) {
      return this.data;
    }

    this.ensureDir();

    if (fs.existsSync(DB_FILE)) {
      try {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.data = JSON.parse(raw);
        this.isLoaded = true;
        return this.data!;
      } catch (e) {
        console.error('Failed to parse database file, falling back to seed data:', e);
      }
    }

    // Default Seed
    this.data = {
      articles: SEED_ARTICLES,
      categories: SEED_CATEGORIES,
      authors: SEED_AUTHORS,
      ingredients: SEED_INGREDIENTS,
      trendingTopics: SEED_TRENDING_TOPICS,
      settings: DEFAULT_SITE_SETTINGS,
      subscribers: [
        { email: 'editorial.reader@example.com', date: '2026-11-01T09:00:00Z', category: 'skincare' },
        { email: 'sarah.derm@clinic.org', date: '2026-11-05T14:20:00Z', category: 'all' }
      ]
    };

    this.save();
    this.isLoaded = true;
    return this.data;
  }

  private save() {
    if (!this.data) return;
    this.ensureDir();
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (e) {
      console.error('Failed to save database file:', e);
    }
  }

  // Articles
  public getArticles(filters?: {
    status?: 'published' | 'draft' | 'scheduled' | 'all';
    category?: string;
    tag?: string;
    search?: string;
    limit?: number;
    featured?: boolean;
    breaking?: boolean;
    trending?: boolean;
  }): Article[] {
    const data = this.load();
    let result = [...data.articles];

    if (filters?.status && filters.status !== 'all') {
      result = result.filter(a => a.status === filters.status);
    } else if (!filters?.status) {
      // Default to published for general website queries
      result = result.filter(a => a.status === 'published');
    }

    if (filters?.category) {
      result = result.filter(a => a.categorySlug.toLowerCase() === filters.category!.toLowerCase());
    }

    if (filters?.tag) {
      result = result.filter(a => a.tags.some(t => t.toLowerCase() === filters.tag!.toLowerCase()));
    }

    if (filters?.breaking !== undefined) {
      result = result.filter(a => a.isBreaking === filters.breaking);
    }

    if (filters?.trending !== undefined) {
      result = result.filter(a => a.isTrending === filters.trending);
    }

    if (filters?.featured !== undefined) {
      result = result.filter(a => a.isEditorPick === filters.featured);
    }

    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Sort descending by publishDate
    result.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

    if (filters?.limit) {
      result = result.slice(0, filters.limit);
    }

    return result;
  }

  public getArticleBySlug(slug: string): Article | null {
    const data = this.load();
    return data.articles.find(a => a.slug === slug) || null;
  }

  public getArticleById(id: string): Article | null {
    const data = this.load();
    return data.articles.find(a => a.id === id) || null;
  }

  public createArticle(article: Partial<Article>): Article {
    const data = this.load();
    const newArticle: Article = {
      id: article.id || `art-${Date.now()}`,
      title: article.title || 'Untitled Article',
      slug: article.slug || `article-${Date.now()}`,
      excerpt: article.excerpt || '',
      content: article.content || '',
      categorySlug: article.categorySlug || 'skincare',
      subcategory: article.subcategory,
      tags: article.tags || ['Skincare'],
      featuredImage: article.featuredImage || 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=1200',
      imageAlt: article.imageAlt || article.title || 'Skincare and beauty editorial',
      imageCaption: article.imageCaption,
      authorId: article.authorId || 'author-1',
      medicalReviewerId: article.medicalReviewerId || 'author-1',
      isMedicallyReviewed: article.isMedicallyReviewed ?? true,
      status: article.status || 'published',
      publishDate: article.publishDate || new Date().toISOString(),
      updatedDate: new Date().toISOString(),
      scheduledFor: article.scheduledFor,
      readingTimeMinutes: article.readingTimeMinutes || Math.max(3, Math.round((article.content?.split(/\s+/).length || 500) / 200)),
      seo: {
        metaTitle: article.seo?.metaTitle || article.title || '',
        metaDescription: article.seo?.metaDescription || article.excerpt || '',
        focusKeywords: article.seo?.focusKeywords || [],
        canonicalUrl: article.seo?.canonicalUrl,
        score: article.seo?.score ?? 88,
      },
      faqs: article.faqs || [],
      references: article.references || [],
      affiliateProducts: article.affiliateProducts || [],
      isBreaking: article.isBreaking ?? false,
      isTrending: article.isTrending ?? true,
      isEditorPick: article.isEditorPick ?? false,
      views: article.views ?? Math.floor(Math.random() * 500) + 120,
      shares: article.shares ?? Math.floor(Math.random() * 80) + 12,
      aiGenerated: article.aiGenerated ?? true,
      sourceInspiration: article.sourceInspiration,
    };

    data.articles.unshift(newArticle);
    this.save();
    return newArticle;
  }

  public updateArticle(id: string, updates: Partial<Article>): Article | null {
    const data = this.load();
    const index = data.articles.findIndex(a => a.id === id);
    if (index === -1) return null;

    data.articles[index] = {
      ...data.articles[index],
      ...updates,
      updatedDate: new Date().toISOString(),
    };
    this.save();
    return data.articles[index];
  }

  public deleteArticle(id: string): boolean {
    const data = this.load();
    const lenBefore = data.articles.length;
    data.articles = data.articles.filter(a => a.id !== id);
    if (data.articles.length !== lenBefore) {
      this.save();
      return true;
    }
    return false;
  }

  public incrementArticleViews(slug: string) {
    const data = this.load();
    const art = data.articles.find(a => a.slug === slug);
    if (art) {
      art.views += 1;
      this.save();
    }
  }

  // Categories
  public getCategories(): Category[] {
    const data = this.load();
    return data.categories;
  }

  public getCategoryBySlug(slug: string): Category | null {
    const data = this.load();
    return data.categories.find(c => c.slug.toLowerCase() === slug.toLowerCase()) || null;
  }

  // Authors
  public getAuthors(): Author[] {
    const data = this.load();
    return data.authors;
  }

  public getAuthorById(id: string): Author | null {
    const data = this.load();
    return data.authors.find(a => a.id === id) || null;
  }

  // Ingredients
  public getIngredients(): Ingredient[] {
    const data = this.load();
    return data.ingredients;
  }

  public getIngredientBySlug(slug: string): Ingredient | null {
    const data = this.load();
    return data.ingredients.find(i => i.slug.toLowerCase() === slug.toLowerCase()) || null;
  }

  // Trending Topics
  public getTrendingTopics(): TrendingTopic[] {
    const data = this.load();
    return data.trendingTopics;
  }

  public createTrendingTopic(topic: Partial<TrendingTopic>): TrendingTopic {
    const data = this.load();
    const newTopic: TrendingTopic = {
      id: topic.id || `trend-${Date.now()}`,
      topic: topic.topic || 'Untitled Topic',
      category: topic.category || 'skincare',
      searchVolume: topic.searchVolume || '25.0K / mo',
      growthPercentage: topic.growthPercentage || 120,
      urgency: topic.urgency || 'medium',
      source: topic.source || 'Automated RSS & Trend Monitor',
      discoveredAt: new Date().toISOString(),
      suggestedKeywords: topic.suggestedKeywords || [],
      status: topic.status || 'pending',
    };
    data.trendingTopics.unshift(newTopic);
    this.save();
    return newTopic;
  }

  public updateTrendingTopic(id: string, updates: Partial<TrendingTopic>): TrendingTopic | null {
    const data = this.load();
    const index = data.trendingTopics.findIndex(t => t.id === id);
    if (index === -1) return null;
    data.trendingTopics[index] = {
      ...data.trendingTopics[index],
      ...updates
    };
    this.save();
    return data.trendingTopics[index];
  }

  // Site Settings
  public getSiteSettings(): SiteSettings {
    const data = this.load();
    return data.settings;
  }

  public updateSiteSettings(settings: Partial<SiteSettings>): SiteSettings {
    const data = this.load();
    data.settings = {
      ...data.settings,
      ...settings,
      aiSettings: {
        ...data.settings.aiSettings,
        ...(settings.aiSettings || {})
      },
      monetization: {
        ...data.settings.monetization,
        ...(settings.monetization || {})
      },
      seoSettings: {
        ...data.settings.seoSettings,
        ...(settings.seoSettings || {})
      }
    };
    this.save();
    return data.settings;
  }

  // Newsletter Subscribers
  public addSubscriber(email: string, category?: string): { success: boolean; message: string } {
    const data = this.load();
    if (data.subscribers.some(s => s.email.toLowerCase() === email.toLowerCase())) {
      return { success: true, message: 'You are already subscribed to Lumière Derma Journal!' };
    }
    data.subscribers.push({
      email,
      date: new Date().toISOString(),
      category: category || 'all'
    });
    this.save();
    return { success: true, message: 'Welcome to Lumière Derma Journal. Your subscription is active!' };
  }

  public getSubscriberCount(): number {
    const data = this.load();
    return data.subscribers.length + 8420; // actual + established baseline
  }

  // Reset
  public resetToDefaults() {
    this.data = {
      articles: SEED_ARTICLES,
      categories: SEED_CATEGORIES,
      authors: SEED_AUTHORS,
      ingredients: SEED_INGREDIENTS,
      trendingTopics: SEED_TRENDING_TOPICS,
      settings: DEFAULT_SITE_SETTINGS,
      subscribers: [
        { email: 'editorial.reader@example.com', date: '2026-11-01T09:00:00Z', category: 'skincare' }
      ]
    };
    this.save();
  }
}

export const db = new DatabaseStore();
