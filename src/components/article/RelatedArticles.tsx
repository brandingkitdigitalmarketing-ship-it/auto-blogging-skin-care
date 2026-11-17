import React from 'react';
import Link from 'next/link';
import { Article } from '@/lib/db/schema';
import { ArrowRight, Clock } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface RelatedArticlesProps {
  articles: Article[];
  currentCategory: string;
}

export function RelatedArticles({ articles, currentCategory }: RelatedArticlesProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="my-12 pt-8 border-t border-stone-200 dark:border-slate-800">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-forest-800 dark:text-emerald-400">
            Continue Reading
          </span>
          <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
            Related Dermatology & Science Guides
          </h3>
        </div>
        <Link
          href={`/category/${currentCategory}`}
          className="text-xs font-semibold text-forest-800 dark:text-emerald-400 hover:underline flex items-center space-x-1"
        >
          <span>More in {currentCategory}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.slice(0, 3).map((art) => (
          <Link
            key={art.id}
            href={`/article/${art.slug}`}
            className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-stone-200 dark:border-slate-800 hover:border-forest-700/60 transition-all p-4 flex flex-col justify-between shadow-sm hover:shadow"
          >
            <div>
              <div className="aspect-[16/10] rounded-xl overflow-hidden bg-stone-100 dark:bg-slate-800 mb-3 relative">
                <img
                  src={art.featuredImage}
                  alt={art.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-emerald-300 text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                  {art.categorySlug}
                </span>
              </div>

              <div className="flex items-center space-x-2 text-[10px] text-slate-400 mb-1">
                <span>{formatDate(art.publishDate)}</span>
                <span>•</span>
                <span>{art.readingTimeMinutes} min</span>
              </div>

              <h4 className="font-serif text-sm font-bold text-slate-900 dark:text-white group-hover:text-forest-800 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                {art.title}
              </h4>
            </div>

            <div className="mt-3 pt-3 border-t border-stone-100 dark:border-slate-800 flex items-center justify-between text-xs text-forest-800 dark:text-emerald-400 font-semibold">
              <span>Read Guide</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
