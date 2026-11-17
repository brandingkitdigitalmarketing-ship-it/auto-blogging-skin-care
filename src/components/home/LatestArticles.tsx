'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Article } from '@/lib/db/schema';
import { formatDate } from '@/lib/utils';
import { Clock, ShieldCheck, ArrowRight, Tag } from 'lucide-react';

interface LatestArticlesProps {
  articles: Article[];
}

export function LatestArticles({ articles }: LatestArticlesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { label: 'All Dispatches', value: 'all' },
    { label: 'Skincare', value: 'skincare' },
    { label: 'Haircare', value: 'haircare' },
    { label: 'Dermatology', value: 'beauty-dermatology' },
    { label: 'Ingredients', value: 'ingredients-research' },
    { label: 'Beauty News', value: 'beauty-news' },
  ];

  const filtered = selectedCategory === 'all'
    ? articles
    : articles.filter(a => a.categorySlug.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section className="py-12 bg-white dark:bg-slate-900 border-b border-stone-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-forest-800 dark:text-emerald-400">
              Fresh From The Press
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
              Latest Published Articles
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.value
                    ? 'bg-forest-900 text-white shadow-sm'
                    : 'bg-sand-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-sand-100 dark:hover:bg-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.slice(0, 6).map((art) => (
            <article
              key={art.id}
              className="group flex flex-col justify-between bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-stone-200/90 dark:border-slate-800 hover:border-forest-700/60 dark:hover:border-emerald-500/60 transition-all duration-300 hover:shadow-lg"
            >
              <div>
                <Link href={`/article/${art.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-stone-100 dark:bg-slate-800">
                  <img
                    src={art.featuredImage}
                    alt={art.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-forest-900/90 backdrop-blur-sm text-emerald-300 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {art.categorySlug}
                  </span>
                  {art.isMedicallyReviewed && (
                    <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] flex items-center space-x-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span>MD Reviewed</span>
                    </span>
                  )}
                </Link>

                <div className="p-5">
                  <div className="flex items-center space-x-2 text-[11px] text-slate-500 dark:text-slate-400 mb-2">
                    <span>{formatDate(art.publishDate)}</span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{art.readingTimeMinutes} min read</span>
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white group-hover:text-forest-800 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                    <Link href={`/article/${art.slug}`}>
                      {art.title}
                    </Link>
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 mt-2 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-3 border-t border-stone-100 dark:border-slate-800/80 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {art.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-[10px] bg-sand-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/article/${art.slug}`}
                  className="text-xs font-semibold text-forest-800 dark:text-emerald-400 group-hover:translate-x-1 transition-transform flex items-center space-x-1"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
