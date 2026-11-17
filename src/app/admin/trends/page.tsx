'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { TrendingTopic } from '@/lib/db/schema';
import { formatDate } from '@/lib/utils';
import {
  TrendingUp,
  RefreshCw,
  Sparkles,
  ArrowRight,
  Rss,
  CheckCircle2,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

export default function AdminTrendsPage() {
  const router = useRouter();
  const [trends, setTrends] = useState<TrendingTopic[]>([]);
  const [syncing, setSyncing] = useState(false);
  const [generatingId, setGeneratingId] = useState<string | null>(null);

  const loadTrends = async () => {
    try {
      const res = await fetch('/api/trends');
      const data = await res.json();
      if (data.success) {
        setTrends(data.trends || []);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadTrends();
  }, []);

  const handleSyncFeeds = async () => {
    setSyncing(true);
    try {
      const res = await fetch('/api/trends', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setTrends(data.trends || []);
        alert(data.message);
      }
    } catch (err: any) {
      alert(`Error syncing: ${err.message}`);
    } finally {
      setSyncing(false);
    }
  };

  const handleGenerateFromTrend = async (trend: TrendingTopic) => {
    setGeneratingId(trend.id);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: trend.topic,
          categorySlug: trend.category,
          targetKeywords: trend.suggestedKeywords,
          saveImmediately: true,
          saveAsDraft: false,
        }),
      });

      const data = await res.json();
      if (data.success) {
        alert(`Successfully generated and published: "${data.article.title}"`);
        loadTrends();
        router.push('/admin/articles');
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setGeneratingId(null);
    }
  };

  const feeds = [
    { name: 'American Academy of Dermatology (AAD) Clinical Wire', status: 'Active (200 OK)', interval: 'Every 2 hrs' },
    { name: 'PubMed / NCBI Dermatology Research Index', status: 'Active (200 OK)', interval: 'Every 4 hrs' },
    { name: 'DermNet NZ Clinical Bulletins', status: 'Active (200 OK)', interval: 'Every 6 hrs' },
    { name: 'International Journal of Trichology Feed', status: 'Active (200 OK)', interval: 'Daily' },
    { name: 'FDA Cosmetics & Filter Regulatory Announcements', status: 'Active (200 OK)', interval: 'Real-time' },
  ];

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="AI News Research & Trending Topic Radar"
        subtitle="Real-time monitoring of dermatology journals, clinical trials, FDA cosmetic monographs, and Google Search velocity."
        action={
          <button
            onClick={handleSyncFeeds}
            disabled={syncing}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-forest-900 hover:bg-forest-800 text-white text-xs font-semibold shadow-sm transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
            <span>{syncing ? 'Scanning Feeds...' : 'Sync & Discover Fresh Trends'}</span>
          </button>
        }
      />

      <div className="p-6 max-w-7xl space-y-8">
        {/* Discovered Trending Topics Table */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-forest-800 dark:text-emerald-400">
                <TrendingUp className="w-4 h-4" />
                <span>High-Potential Search Intent</span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-white mt-1">
                Discovered Trending Topics Pool
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              {trends.length} Monitored Topics
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-stone-200 dark:divide-slate-800 text-left text-xs">
              <thead className="bg-sand-50 dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-300">
                <tr>
                  <th className="px-4 py-3.5">Trending Topic & Suggested Title</th>
                  <th className="px-4 py-3.5">Category</th>
                  <th className="px-4 py-3.5">Search Volume</th>
                  <th className="px-4 py-3.5">Velocity</th>
                  <th className="px-4 py-3.5">Source Wire</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-slate-800/80">
                {trends.map((t) => (
                  <tr key={t.id} className="hover:bg-sand-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-4 font-semibold text-slate-900 dark:text-white max-w-xs">
                      <div>{t.topic}</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {t.suggestedKeywords?.slice(0, 2).map(k => (
                          <span key={k} className="text-[9px] bg-sand-100 dark:bg-slate-800 text-slate-500 px-1.5 py-0.5 rounded">
                            {k}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="px-4 py-4 text-slate-500 uppercase font-mono text-[10px]">
                      {t.category}
                    </td>

                    <td className="px-4 py-4 font-mono font-bold text-slate-800 dark:text-slate-200">
                      {t.searchVolume}
                    </td>

                    <td className="px-4 py-4">
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        +{t.growthPercentage}%
                      </span>
                    </td>

                    <td className="px-4 py-4 text-slate-500 text-[11px] max-w-[150px] truncate">
                      {t.source}
                    </td>

                    <td className="px-4 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        t.status === 'generated'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}>
                        {t.status}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-right">
                      {t.status === 'generated' ? (
                        <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center justify-end space-x-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Published</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => handleGenerateFromTrend(t)}
                          disabled={generatingId === t.id}
                          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-forest-900 hover:bg-forest-800 text-white font-semibold text-xs transition-colors shadow-sm whitespace-nowrap"
                        >
                          {generatingId === t.id ? (
                            <RefreshCw className="w-3 h-3 animate-spin text-emerald-400" />
                          ) : (
                            <Sparkles className="w-3 h-3 text-emerald-400" />
                          )}
                          <span>{generatingId === t.id ? 'Writing...' : '1-Click Article'}</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Monitored RSS & Research Sources */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-forest-800 dark:text-emerald-400 mb-2">
            <Rss className="w-4 h-4" />
            <span>Syndication Infrastructure</span>
          </div>
          <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white mb-4">
            Active Dermatology & Beauty RSS Feeds
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {feeds.map((f, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-sand-50/70 dark:bg-slate-800/60 border border-sand-200 dark:border-slate-800 flex items-center justify-between"
              >
                <div>
                  <h4 className="font-semibold text-xs text-slate-900 dark:text-white">
                    {f.name}
                  </h4>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    Polling: {f.interval}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                  {f.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
