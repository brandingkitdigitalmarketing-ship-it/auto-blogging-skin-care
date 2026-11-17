'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, X, ArrowRight, Sparkles, FileText, Tag } from 'lucide-react';
import { Article } from '@/lib/db/schema';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else openSearch();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const openSearch = () => {
    // handled by parent
  };

  useEffect(() => {
    if (!query.trim()) {
      setArticles([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/articles?search=${encodeURIComponent(query)}&limit=6`);
        const json = await res.json();
        if (json.success) {
          setArticles(json.articles || []);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-stone-200 dark:border-slate-800 overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-stone-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-forest-800 dark:text-emerald-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search treatments, actives (Retinol, Niacinamide), scalp care, clinical reviews..."
            className="w-full bg-transparent px-3 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none text-base"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-2 px-2.5 py-1 text-xs font-medium text-slate-500 bg-stone-100 dark:bg-slate-800 rounded-md hover:bg-stone-200 dark:hover:bg-slate-700"
          >
            ESC
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        {!query && (
          <div className="p-5">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Trending Searches</p>
            <div className="flex flex-wrap gap-2">
              {['Tretinoin Peeling', 'Rosemary Oil vs Minoxidil', 'Exosomes', 'Niacinamide + Salicylic', 'SPF 50 Filters', 'Dandruff Malassezia', 'Barrier Repair'].map(tag => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3 py-1.5 rounded-full text-xs bg-sand-50 dark:bg-slate-800 text-forest-800 dark:text-emerald-300 border border-sand-200 dark:border-slate-700 hover:border-forest-700 hover:bg-sand-100 transition-colors flex items-center space-x-1"
                >
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>{tag}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {loading && (
          <div className="p-8 text-center text-slate-400 text-sm">
            Searching clinical dermatology archive...
          </div>
        )}

        {!loading && query && articles.length === 0 && (
          <div className="p-8 text-center text-slate-500 text-sm">
            No clinical articles found matching &ldquo;{query}&rdquo;. Try searching for an active ingredient or symptom.
          </div>
        )}

        {!loading && articles.length > 0 && (
          <div className="max-h-96 overflow-y-auto divide-y divide-stone-100 dark:divide-slate-800 p-2">
            {articles.map((art) => (
              <Link
                key={art.id}
                href={`/article/${art.slug}`}
                onClick={onClose}
                className="flex items-start space-x-3 p-3 rounded-xl hover:bg-sand-50/80 dark:hover:bg-slate-800/60 transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-forest-50 dark:bg-emerald-950 flex items-center justify-center text-forest-800 dark:text-emerald-400 shrink-0 mt-0.5">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-forest-700 dark:text-emerald-400 bg-forest-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded">
                      {art.categorySlug}
                    </span>
                    <span className="text-xs text-slate-400">• {art.readingTimeMinutes} min read</span>
                  </div>
                  <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100 group-hover:text-forest-800 dark:group-hover:text-emerald-300 transition-colors truncate mt-1">
                    {art.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                    {art.excerpt}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-forest-800 dark:group-hover:text-emerald-400 self-center shrink-0" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
