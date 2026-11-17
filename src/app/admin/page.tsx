import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { StatCard } from '@/components/admin/StatCard';
import { formatDate } from '@/lib/utils';
import {
  FileText,
  Clock,
  CheckCircle2,
  Users,
  Search,
  Sparkles,
  TrendingUp,
  ArrowRight,
  Eye,
  Plus
} from 'lucide-react';

export const revalidate = 0; // Always fresh in admin

export default function AdminOverviewPage() {
  const allArticles = db.getArticles({ status: 'all' });
  const publishedCount = allArticles.filter(a => a.status === 'published').length;
  const draftCount = allArticles.filter(a => a.status === 'draft').length;
  const scheduledCount = allArticles.filter(a => a.status === 'scheduled').length;
  const subscriberCount = db.getSubscriberCount();
  const settings = db.getSiteSettings();
  const trends = db.getTrendingTopics();

  // Top articles by views
  const topArticles = [...allArticles].sort((a, b) => b.views - a.views).slice(0, 5);

  // Top keywords
  const topKeywords = [
    { keyword: 'tretinoin retinization protocol', volume: '64.2K / mo', position: '#1 Google' },
    { keyword: 'rosemary oil vs minoxidil', volume: '82.1K / mo', position: '#2 Google' },
    { keyword: 'exosome facial cost', volume: '48.5K / mo', position: '#1 Google Discover' },
    { keyword: 'best sunscreen for acne prone skin', volume: '52.0K / mo', position: '#3 Google' },
    { keyword: 'seborrheic dermatitis scalp routine', volume: '38.4K / mo', position: '#1 Google' },
  ];

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="Editorial & AI Automation Dashboard"
        subtitle="Monitor publication velocity, auto-pilot schedule, organic traffic, and keyword dominance."
        action={
          <Link
            href="/admin/studio"
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>Launch AI Studio</span>
          </Link>
        }
      />

      <div className="p-6 space-y-8 max-w-7xl">
        {/* KPI Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            title="Published Articles"
            value={publishedCount}
            subtext="Indexed on Google News & Discover"
            icon={CheckCircle2}
            trend="+3 today"
            color="emerald"
          />
          <StatCard
            title="Scheduled / Pending"
            value={scheduledCount + draftCount}
            subtext={`${scheduledCount} scheduled • ${draftCount} in review`}
            icon={Clock}
            color="amber"
          />
          <StatCard
            title="Monthly Visitors"
            value="142.8K"
            subtext="88.4% organic search traffic"
            icon={Users}
            trend="+24.6% MoM"
            color="emerald"
          />
          <StatCard
            title="Active Subscribers"
            value={subscriberCount.toLocaleString()}
            subtext="Clinical newsletter audience"
            icon={Sparkles}
            trend="+180 this week"
            color="slate"
          />
        </div>

        {/* Automation Status Strip */}
        <div className="bg-forest-950 text-white rounded-2xl p-6 border border-forest-900 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <h3 className="font-serif font-bold text-base text-white">
                  AI Auto-Publishing Engine: Active
                </h3>
              </div>
              <p className="text-xs text-stone-300 mt-0.5">
                Frequency: <strong>{settings.aiSettings.dailyPublishCount} articles/day</strong> (09:00, 13:00, 18:00) • Target Word Count: 1,400+ • Clinical Review Mode: On
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/admin/settings"
              className="px-3.5 py-1.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-stone-200 text-xs font-semibold transition-colors border border-forest-700"
            >
              Configure Schedule
            </Link>
            <Link
              href="/admin/trends"
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors shadow-sm"
            >
              Explore Discovered Trends ({trends.filter(t => t.status === 'pending').length})
            </Link>
          </div>
        </div>

        {/* 2-Column Split: Top Articles (Left 7 Cols) + Keyword Performance (Right 5 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Top Articles Table */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-stone-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">
                Most Read Articles This Month
              </h3>
              <Link
                href="/admin/articles"
                className="text-xs font-semibold text-forest-800 dark:text-emerald-400 hover:underline flex items-center space-x-1"
              >
                <span>All Articles ({allArticles.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-stone-100 dark:divide-slate-800">
              {topArticles.map((art) => (
                <div key={art.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-forest-800 dark:text-emerald-400 bg-forest-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                      {art.categorySlug}
                    </span>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white truncate mt-1">
                      <Link href={`/article/${art.slug}`} target="_blank" className="hover:underline">
                        {art.title}
                      </Link>
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Published {formatDate(art.publishDate)} • {art.readingTimeMinutes} min read
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-end space-x-1">
                      <Eye className="w-3.5 h-3.5 text-slate-400" />
                      <span>{art.views.toLocaleString()}</span>
                    </span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold block mt-0.5">
                      SEO Score: {art.seo?.score || 95}/100
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performing Organic Keywords */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl border border-stone-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-forest-800 dark:text-emerald-400 mb-2">
              <TrendingUp className="w-4 h-4" />
              <span>Search Engine Dominance</span>
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white mb-4">
              Top Organic Search Keywords
            </h3>

            <div className="space-y-3">
              {topKeywords.map((kw, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-sand-50/70 dark:bg-slate-800/60 border border-sand-200/80 dark:border-slate-800 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white block font-mono text-[11px]">
                      &ldquo;{kw.keyword}&rdquo;
                    </span>
                    <span className="text-[10px] text-slate-400">Search Vol: {kw.volume}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-[10px]">
                    {kw.position}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
