'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Article } from '@/lib/db/schema';
import { formatDate } from '@/lib/utils';
import { AdminHeader } from '@/components/admin/AdminHeader';
import {
  FileText,
  Plus,
  Sparkles,
  Search,
  Trash2,
  Edit,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Filter
} from 'lucide-react';

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const loadArticles = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/articles?status=all');
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
    loadArticles();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/articles/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setArticles(prev => prev.filter(a => a.id !== id));
      } else {
        alert(data.error || 'Failed to delete');
      }
    } catch (err) {
      alert('Network error deleting article');
    }
  };

  const handleToggleStatus = async (article: Article) => {
    const newStatus = article.status === 'published' ? 'draft' : 'published';
    try {
      const res = await fetch(`/api/articles/${article.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setArticles(prev => prev.map(a => a.id === article.id ? { ...a, status: newStatus } : a));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filtered = articles.filter(a => {
    if (statusFilter !== 'all' && a.status !== statusFilter) return false;
    if (categoryFilter !== 'all' && a.categorySlug !== categoryFilter) return false;
    if (searchTerm && !a.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="Article Management & Editorial Queue"
        subtitle="Review, edit, schedule, or publish AI-generated and human-authored articles."
        action={
          <div className="flex items-center space-x-2">
            <Link
              href="/admin/studio"
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-forest-900 hover:bg-forest-800 text-white text-xs font-semibold shadow-sm transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>AI Writing Studio</span>
            </Link>
            <Link
              href="/admin/articles/new"
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Article</span>
            </Link>
          </div>
        }
      />

      <div className="p-6 space-y-6 max-w-7xl">
        {/* Filters and Search Bar */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-stone-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by article title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-sand-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white border border-sand-200 dark:border-slate-700 focus:outline-none focus:border-forest-800"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs w-full md:w-auto">
            {/* Status Tabs */}
            <div className="flex rounded-xl bg-sand-100 dark:bg-slate-800 p-1">
              {['all', 'published', 'draft', 'scheduled'].map(st => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1 rounded-lg capitalize font-medium transition-colors ${
                    statusFilter === st
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm font-semibold'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* Category Select */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-sand-50 dark:bg-slate-800 border border-sand-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-slate-700 dark:text-slate-300 text-xs focus:outline-none"
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

        {/* Articles Table */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-stone-200 dark:border-slate-800 shadow-sm overflow-hidden">
          {loading ? (
            <div className="text-center py-20 text-slate-400 text-xs">
              Loading articles database...
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-slate-500 text-xs">
              No articles match your active filter criteria.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-stone-200 dark:divide-slate-800 text-left text-xs">
                <thead className="bg-sand-50 dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-300">
                  <tr>
                    <th className="px-5 py-3.5">Article Title</th>
                    <th className="px-4 py-3.5">Category</th>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="px-4 py-3.5">SEO Score</th>
                    <th className="px-4 py-3.5">Reads</th>
                    <th className="px-4 py-3.5">Date</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-slate-800/80">
                  {filtered.map((art) => (
                    <tr key={art.id} className="hover:bg-sand-50/50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="px-5 py-4 font-medium text-slate-900 dark:text-white max-w-sm">
                        <div className="flex items-center space-x-2">
                          {art.aiGenerated && (
                            <span className="p-1 rounded bg-forest-50 dark:bg-emerald-950 text-forest-800 dark:text-emerald-400" title="AI Generated Article">
                              <Sparkles className="w-3 h-3" />
                            </span>
                          )}
                          <span className="line-clamp-1 font-semibold">{art.title}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 block mt-0.5 truncate">
                          /article/{art.slug}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-slate-600 dark:text-slate-400 uppercase font-mono text-[10px]">
                        {art.categorySlug}
                      </td>

                      <td className="px-4 py-4">
                        <button
                          onClick={() => handleToggleStatus(art)}
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase transition-colors ${
                            art.status === 'published'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                              : art.status === 'scheduled'
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                              : 'bg-stone-100 text-stone-700 dark:bg-slate-800 dark:text-slate-300'
                          }`}
                          title="Click to toggle publish status"
                        >
                          {art.status}
                        </button>
                      </td>

                      <td className="px-4 py-4">
                        <span className={`font-mono font-bold text-xs ${
                          (art.seo?.score || 85) >= 90
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-amber-600 dark:text-amber-400'
                        }`}>
                          {art.seo?.score || 88}/100
                        </span>
                      </td>

                      <td className="px-4 py-4 font-mono text-slate-600 dark:text-slate-300">
                        {art.views.toLocaleString()}
                      </td>

                      <td className="px-4 py-4 text-slate-400 whitespace-nowrap">
                        {formatDate(art.publishDate)}
                      </td>

                      <td className="px-5 py-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end space-x-2">
                          <Link
                            href={`/article/${art.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-sand-100"
                            title="View Public Page"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                          <Link
                            href={`/admin/articles/${art.id}/edit`}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-forest-800 dark:hover:text-emerald-400 hover:bg-sand-100"
                            title="Edit Article"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => handleDelete(art.id, art.title)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                            title="Delete Article"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
