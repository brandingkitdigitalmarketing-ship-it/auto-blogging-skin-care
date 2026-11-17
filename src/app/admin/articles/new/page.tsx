'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Save, ArrowLeft, Globe, Eye, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function NewArticlePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    categorySlug: 'skincare',
    subcategory: '',
    tags: 'Skincare, Routine, Clinical',
    excerpt: '',
    content: '',
    featuredImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=1200',
    imageAlt: '',
    imageCaption: '',
    authorId: 'author-1',
    isMedicallyReviewed: true,
    status: 'published' as 'published' | 'draft' | 'scheduled',
    readingTimeMinutes: 6,
    metaTitle: '',
    metaDescription: '',
    focusKeywords: 'skincare routine, dermatology, barrier repair',
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (statusOverride?: 'published' | 'draft') => {
    setSaving(true);
    const targetStatus = statusOverride || formData.status;

    const payload = {
      title: formData.title,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-'),
      categorySlug: formData.categorySlug,
      subcategory: formData.subcategory,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      excerpt: formData.excerpt,
      content: formData.content,
      featuredImage: formData.featuredImage,
      imageAlt: formData.imageAlt || formData.title,
      imageCaption: formData.imageCaption,
      authorId: formData.authorId,
      medicalReviewerId: formData.isMedicallyReviewed ? 'author-1' : undefined,
      isMedicallyReviewed: formData.isMedicallyReviewed,
      status: targetStatus,
      readingTimeMinutes: formData.readingTimeMinutes || Math.max(3, Math.round(formData.content.split(/\s+/).length / 200)),
      seo: {
        metaTitle: formData.metaTitle || formData.title,
        metaDescription: formData.metaDescription || formData.excerpt,
        focusKeywords: formData.focusKeywords.split(',').map(k => k.trim()).filter(Boolean),
        score: 95,
      },
      aiGenerated: false,
    };

    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        router.push('/admin/articles');
      } else {
        alert(data.error || 'Failed to save');
      }
    } catch (e: any) {
      alert(`Error saving: ${e.message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="Author New Editorial Article"
        subtitle="Compose an in-depth dermatological guide with rich headings, comparison tables, and SEO metadata."
        action={
          <div className="flex items-center space-x-2">
            <Link
              href="/admin/articles"
              className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-sand-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium hover:bg-sand-200"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Cancel</span>
            </Link>
            <button
              type="button"
              onClick={() => handleSubmit('draft')}
              disabled={saving}
              className="px-3.5 py-1.5 rounded-xl bg-sand-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold hover:bg-sand-200"
            >
              Save as Draft
            </button>
            <button
              type="button"
              onClick={() => handleSubmit('published')}
              disabled={saving}
              className="px-4 py-1.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white text-xs font-semibold shadow-sm flex items-center space-x-1"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>Publish Live</span>
            </button>
          </div>
        }
      />

      <div className="p-6 max-w-5xl space-y-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-slate-800 shadow-sm space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Article Headline (H1)
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. The Science of Ectoin: Why This Extremolyte Is Outperforming Centella in Barrier Repair"
              className="w-full px-4 py-3 rounded-xl border border-sand-300 dark:border-slate-700 bg-sand-50/50 dark:bg-slate-800 text-slate-900 dark:text-white font-serif text-lg font-bold focus:outline-none focus:border-forest-800"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Category
              </label>
              <select
                value={formData.categorySlug}
                onChange={(e) => setFormData({ ...formData, categorySlug: e.target.value })}
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
                value={formData.subcategory}
                onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                placeholder="e.g. Anti-aging skincare"
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 dark:border-slate-700 bg-sand-50/50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Tags (Comma Separated)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="Ectoin, Barrier, Sensitive Skin"
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 dark:border-slate-700 bg-sand-50/50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Editorial Excerpt (Standfirst)
            </label>
            <textarea
              rows={2}
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="A concise 2-sentence clinical summary of the findings..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 dark:border-slate-700 bg-sand-50/50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Article Body (Markdown Supported)
            </label>
            <textarea
              rows={16}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Write your article in Markdown. Use ## for H2 headings, ### for H3 headings, and Markdown tables (| Col 1 | Col 2 |)..."
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
                value={formData.featuredImage}
                onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 dark:border-slate-700 bg-sand-50/50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                SEO Image Alt Text
              </label>
              <input
                type="text"
                value={formData.imageAlt}
                onChange={(e) => setFormData({ ...formData, imageAlt: e.target.value })}
                placeholder="Descriptive alt text for Google Image search..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 dark:border-slate-700 bg-sand-50/50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
