'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Save, ArrowLeft, Globe, Eye, Trash2 } from 'lucide-react';
import { Article } from '@/lib/db/schema';

export default function EditArticlePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/articles/${params.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setArticle(data.article);
        } else {
          alert('Article not found');
          router.push('/admin/articles');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [params.id, router]);

  const handleSave = async (statusOverride?: 'published' | 'draft') => {
    if (!article) return;
    setSaving(true);
    const newStatus = statusOverride || article.status;

    try {
      const res = await fetch(`/api/articles/${article.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...article,
          status: newStatus,
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert('Article updated successfully.');
        router.push('/admin/articles');
      } else {
        alert(data.error || 'Failed to update');
      }
    } catch (e: any) {
      alert(`Error updating: ${e.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !article) {
    return <div className="p-8 text-xs text-slate-400">Loading article editor...</div>;
  }

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title={`Edit: ${article.title.slice(0, 45)}...`}
        subtitle="Update content, adjust SEO meta parameters, change categories, or reschedule publication."
        action={
          <div className="flex items-center space-x-2">
            <Link
              href="/admin/articles"
              className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-sand-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium hover:bg-sand-200"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </Link>
            <button
              type="button"
              onClick={() => handleSave('draft')}
              disabled={saving}
              className="px-3.5 py-1.5 rounded-xl bg-sand-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold hover:bg-sand-200"
            >
              Save as Draft
            </button>
            <button
              type="button"
              onClick={() => handleSave('published')}
              disabled={saving}
              className="px-4 py-1.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white text-xs font-semibold shadow-sm flex items-center space-x-1"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>Update & Publish</span>
            </button>
          </div>
        }
      />

      <div className="p-6 max-w-5xl space-y-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-slate-800 shadow-sm space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Headline Title
            </label>
            <input
              type="text"
              value={article.title}
              onChange={(e) => setArticle({ ...article, title: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-sand-300 dark:border-slate-700 bg-sand-50/50 dark:bg-slate-800 text-slate-900 dark:text-white font-serif text-lg font-bold focus:outline-none focus:border-forest-800"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Category
              </label>
              <select
                value={article.categorySlug}
                onChange={(e) => setArticle({ ...article, categorySlug: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 dark:border-slate-700 bg-sand-50/50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none"
              >
                <option value="skincare">Skincare</option>
                <option value="haircare">Haircare</option>
                <option value="beauty-dermatology">Beauty & Dermatology</option>
                <option value="ingredients-research">Ingredients & Research</option>
                <option value="beauty-news">Beauty News</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Subcategory Focus
              </label>
              <input
                type="text"
                value={article.subcategory || ''}
                onChange={(e) => setArticle({ ...article, subcategory: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 dark:border-slate-700 bg-sand-50/50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Editorial Excerpt
            </label>
            <textarea
              rows={2}
              value={article.excerpt}
              onChange={(e) => setArticle({ ...article, excerpt: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 dark:border-slate-700 bg-sand-50/50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Markdown Body Content
            </label>
            <textarea
              rows={16}
              value={article.content}
              onChange={(e) => setArticle({ ...article, content: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-sand-300 dark:border-slate-700 bg-sand-50/50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs focus:outline-none focus:border-forest-800 leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Featured Image URL
              </label>
              <input
                type="text"
                value={article.featuredImage}
                onChange={(e) => setArticle({ ...article, featuredImage: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 dark:border-slate-700 bg-sand-50/50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Image Alt Text
              </label>
              <input
                type="text"
                value={article.imageAlt}
                onChange={(e) => setArticle({ ...article, imageAlt: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 dark:border-slate-700 bg-sand-50/50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
