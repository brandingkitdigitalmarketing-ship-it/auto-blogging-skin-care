'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { NewsTicker } from '@/components/layout/NewsTicker';
import { Article } from '@/lib/db/schema';
import { formatDate } from '@/lib/utils';
import { Search, Clock, ArrowRight, Sparkles, Filter } from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('all');

  const executeSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setArticles([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/articles?search=${encodeURIComponent(searchTerm)}`);
      const data = await res.json();
      if (data.success) {
        setArticles(data.articles || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      executeSearch(initialQuery);
    }
  }, [initialQuery]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(query);
  };

  const filtered = categoryFilter === 'all'
    ? articles
    : articles.filter(a => a.categorySlug === categoryFilter);

  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      {/* Search Input Hero */}
      <div className="max-w-3xl mx-auto text-center mb-10">
        <span className="text-[10px] font-bold uppercase tracking-widest text-forest-800 dark:text-emerald-400 bg-sand-100 dark:bg-slate-800 px-3 py-1 rounded-full">
          Archive Search Engine
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3">
          Search Clinical Skincare & Haircare Intelligence
        </h1>

        <form onSubmit={handleFormSubmit} className="mt-6 flex gap-2">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search topics (e.g., Tretinoin, Dandruff, Exosomes, Barrier Repair)..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-sand-300 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:border-forest-800 shadow-sm"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3.5 bg-forest-900 hover:bg-forest-800 text-white rounded-2xl font-semibold text-xs tracking-wider uppercase transition-colors shrink-0 shadow-md"
          >
            Search
          </button>
        </form>

        {/* Quick Filters */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {['Tretinoin Peeling', 'Rosemary Oil vs Minoxidil', 'Exosomes', 'SPF 50 Filters', 'Ketoconazole', 'Copper Peptides'].map(tag => (
            <button
              key={tag}
              type="button"
              onClick={() => {
                setQuery(tag);
                executeSearch(tag);
              }}
              className="text-xs px-2.5 py-1 rounded-full bg-sand-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-sand-200"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Results Info Bar */}
      {query && (
        <div className="flex flex-col sm:flex-row items-center justify-between pb-4 mb-6 border-b border-stone-200 dark:border-slate-800 gap-4">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Found <strong>{filtered.length}</strong> clinical article(s) matching &ldquo;{query}&rdquo;
          </p>

          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-400">Category Filter:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-white dark:bg-slate-900 border border-sand-200 dark:border-slate-800 rounded-lg px-2.5 py-1 text-slate-700 dark:text-slate-300 text-xs focus:outline-none"
            >
              <option value="all">All Categories</option>
              <option value="skincare">Skincare</option>
              <option value="haircare">Haircare</option>
              <option value="beauty-dermatology">Beauty & Dermatology</option>
              <option value="ingredients-research">Ingredients & Research</option>
              <option value="beauty-news">Beauty News</option>
            </select>
          </div>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="text-center py-20 text-slate-400 text-sm">
          Searching dermatology archives...
        </div>
      )}

      {/* No results */}
      {!loading && query && filtered.length === 0 && (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-stone-200 dark:border-slate-800 p-8">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            No clinical articles found for &ldquo;{query}&rdquo;.
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Try searching for an active ingredient (like Retinol or Niacinamide) or condition (like Acne or Dandruff).
          </p>
        </div>
      )}

      {/* Results Grid */}
      {!loading && filtered.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((art) => (
            <Link
              key={art.id}
              href={`/article/${art.slug}`}
              className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-stone-200 dark:border-slate-800 hover:border-forest-700/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden bg-stone-100 dark:bg-slate-800 relative">
                  <img
                    src={art.featuredImage}
                    alt={art.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                    {art.categorySlug}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center space-x-2 text-[10px] text-slate-400 mb-1.5">
                    <span>{formatDate(art.publishDate)}</span>
                    <span>•</span>
                    <span>{art.readingTimeMinutes} min read</span>
                  </div>

                  <h3 className="font-serif text-base font-bold text-slate-900 dark:text-white group-hover:text-forest-800 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-3 border-t border-stone-100 dark:border-slate-800 flex items-center justify-between text-xs text-forest-800 dark:text-emerald-400 font-semibold">
                <span>Read Article</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-slate-950 font-sans transition-colors">
      <NewsTicker />
      <Header />
      <Suspense fallback={<div className="p-12 text-center text-xs text-slate-400">Loading Search Engine...</div>}>
        <SearchContent />
      </Suspense>
      <Footer />
    </div>
  );
}
