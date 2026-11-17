import React from 'react';
import Link from 'next/link';
import { Article } from '@/lib/db/schema';
import { formatTimeAgo } from '@/lib/utils';
import { Zap, ArrowUpRight, Flame } from 'lucide-react';

interface BreakingNewsProps {
  articles: Article[];
}

export function BreakingNews({ articles }: BreakingNewsProps) {
  // Filter for breaking or trending articles
  const breakingList = articles.filter(a => a.isBreaking || a.isTrending).slice(0, 4);

  if (breakingList.length === 0) return null;

  return (
    <section className="py-8 bg-sand-50/50 dark:bg-slate-950/40 border-b border-stone-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="p-1 rounded bg-blush-500 text-white animate-pulse">
              <Zap className="w-4 h-4 fill-current" />
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Breaking Dermatology & Beauty News
            </h2>
          </div>
          <Link
            href="/category/beauty-news"
            className="text-xs font-semibold text-forest-800 dark:text-emerald-400 hover:underline flex items-center space-x-1"
          >
            <span>All News Wire</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {breakingList.map((art, idx) => (
            <Link
              key={art.id}
              href={`/article/${art.slug}`}
              className="group bg-white dark:bg-slate-900 rounded-xl p-4 border border-stone-200 dark:border-slate-800 hover:border-blush-400 dark:hover:border-blush-600 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-rose-600 bg-rose-50 dark:bg-rose-950/60 dark:text-rose-300 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    <Flame className="w-3 h-3 fill-current" />
                    <span>Breaking Wire</span>
                  </span>
                  <span className="text-[11px] text-slate-400">{formatTimeAgo(art.publishDate)}</span>
                </div>
                <h3 className="font-serif text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-forest-800 dark:group-hover:text-emerald-300 transition-colors line-clamp-2 leading-snug">
                  {art.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
                  {art.excerpt}
                </p>
              </div>

              <div className="mt-3 pt-3 border-t border-stone-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
                <span className="font-medium text-slate-500 dark:text-slate-400">{art.readingTimeMinutes} min read</span>
                <span className="text-forest-800 dark:text-emerald-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center">
                  Read News <ArrowUpRight className="w-3 h-3 ml-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
