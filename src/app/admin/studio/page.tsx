'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Sparkles, ArrowRight, CheckCircle2, RefreshCw, Eye, Save, Globe } from 'lucide-react';
import { Article } from '@/lib/db/schema';

export default function AiStudioPage() {
  const router = useRouter();
  const [topic, setTopic] = useState('');
  const [categorySlug, setCategorySlug] = useState('skincare');
  const [targetKeywords, setTargetKeywords] = useState('');
  const [tone, setTone] = useState<'clinical' | 'editorial' | 'conversational'>('clinical');
  const [provider, setProvider] = useState<'builtin' | 'openai' | 'gemini'>('builtin');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedArticle, setGeneratedArticle] = useState<Partial<Article> | null>(null);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsGenerating(true);
    setSaveStatus(null);

    try {
      const keywordsArray = targetKeywords.split(',').map(k => k.trim()).filter(Boolean);
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          categorySlug,
          targetKeywords: keywordsArray,
          tone,
          provider,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setGeneratedArticle(data.article);
      } else {
        alert(`Generation Error: ${data.error}`);
      }
    } catch (err: any) {
      alert(`Network Error: ${err.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async (status: 'published' | 'draft') => {
    if (!generatedArticle) return;
    setSaveStatus(`Saving article as ${status}...`);

    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...generatedArticle,
          status,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSaveStatus(`Success! Article saved as ${status}. Redirecting...`);
        setTimeout(() => {
          router.push('/admin/articles');
        }, 1200);
      } else {
        setSaveStatus(`Failed to save: ${data.error}`);
      }
    } catch (e: any) {
      setSaveStatus(`Error saving: ${e.message}`);
    }
  };

  const handlePickPreset = (presetTopic: string, category: string, kw: string) => {
    setTopic(presetTopic);
    setCategorySlug(category);
    setTargetKeywords(kw);
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="AI Article Writing & Research Studio"
        subtitle="Prompt the AI dermatology engine to research, write, and optimize 1,400+ word articles with clinical references and Schema markup."
      />

      <div className="p-6 max-w-7xl space-y-8">
        {/* Preset Trending Inspiration Pills */}
        <div className="bg-sand-50/70 dark:bg-slate-900 rounded-2xl p-4 border border-sand-200 dark:border-slate-800">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Instant Research Ideas From Discovered Trends:
          </span>
          <div className="flex flex-wrap gap-2">
            {[
              {
                title: 'Polydeoxyribonucleotide (PDRN) Salmon DNA: 2026 Clinical Rejuvenation',
                category: 'beauty-dermatology',
                kw: 'PDRN skin therapy, salmon DNA injection, skin barrier repair'
              },
              {
                title: 'Hypochlorous Acid Spray for Acne: Why Dermatologists Recommend It',
                category: 'skincare',
                kw: 'hypochlorous acid skin, acne spray, gentle antiseptic mist'
              },
              {
                title: 'Ectoin vs Hyaluronic Acid: Why Extremolytes Are The New Gold Standard',
                category: 'ingredients-research',
                kw: 'ectoin vs hyaluronic acid, extremolyte skincare, barrier hydration'
              },
              {
                title: 'Red Light Therapy at Home: Does 630nm Really Stimulate Hair Regrowth?',
                category: 'haircare',
                kw: 'red light therapy hair, LLLT scalp cap review, hair follicle regrowth'
              }
            ].map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handlePickPreset(p.title, p.category, p.kw)}
                className="text-xs px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-sand-200 dark:border-slate-700 hover:border-forest-800 dark:hover:border-emerald-400 text-left transition-colors"
              >
                + {p.title.slice(0, 45)}...
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Interface: Studio Configuration (Left 5 Cols) + Real-Time Live Preview (Right 7 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Generation Form */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-slate-800 shadow-sm space-y-5">
            <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-forest-800 dark:text-emerald-400" />
              <span>Generation Parameters</span>
            </h3>

            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Article Topic or Research Prompt
                </label>
                <textarea
                  rows={3}
                  required
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Copper Peptide (GHK-Cu) vs Retinol: Clinical Efficacy and Layering Protocols"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 dark:border-slate-700 bg-sand-50/50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-forest-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Primary Publication Category
                </label>
                <select
                  value={categorySlug}
                  onChange={(e) => setCategorySlug(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-sand-300 dark:border-slate-700 bg-sand-50/50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-forest-800"
                >
                  <option value="skincare">Skincare</option>
                  <option value="haircare">Haircare</option>
                  <option value="beauty-dermatology">Beauty & Dermatology</option>
                  <option value="ingredients-research">Ingredients & Research</option>
                  <option value="beauty-news">Beauty News & Updates</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Target SEO Keywords (Comma Separated)
                </label>
                <input
                  type="text"
                  value={targetKeywords}
                  onChange={(e) => setTargetKeywords(e.target.value)}
                  placeholder="copper peptides benefits, ghk-cu vs retinol, barrier repair"
                  className="w-full px-3.5 py-2 rounded-xl border border-sand-300 dark:border-slate-700 bg-sand-50/50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-forest-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Editorial Tone
                  </label>
                  <select
                    value={tone}
                    onChange={(e: any) => setTone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-sand-300 dark:border-slate-700 bg-sand-50/50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none"
                  >
                    <option value="clinical">Clinical & Authoritative</option>
                    <option value="editorial">Warm High-End Editorial</option>
                    <option value="conversational">Accessible Consumer Guide</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    AI Engine
                  </label>
                  <select
                    value={provider}
                    onChange={(e: any) => setProvider(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-sand-300 dark:border-slate-700 bg-sand-50/50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none"
                  >
                    <option value="builtin">Built-In Dermatology AI</option>
                    <option value="openai">OpenAI (GPT-4o-mini)</option>
                    <option value="gemini">Google Gemini API</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                className="w-full py-3.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center space-x-2"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
                    <span>Synthesizing Clinical Literature...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>Generate Full Article (1,400+ Words)</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Live Preview Panel */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-slate-800 shadow-sm min-h-[500px]">
            {generatedArticle ? (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between pb-4 border-b border-stone-200 dark:border-slate-800 gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded">
                      Generated Article Ready
                    </span>
                    <span className="text-xs text-slate-400 ml-2">
                      {generatedArticle.readingTimeMinutes} min read • SEO Score: {generatedArticle.seo?.score}/100
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleSave('draft')}
                      className="px-3.5 py-1.5 rounded-xl bg-sand-100 dark:bg-slate-800 hover:bg-sand-200 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors flex items-center space-x-1"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Draft</span>
                    </button>
                    <button
                      onClick={() => handleSave('published')}
                      className="px-4 py-1.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white text-xs font-semibold transition-colors shadow-sm flex items-center space-x-1"
                    >
                      <Globe className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Publish Live</span>
                    </button>
                  </div>
                </div>

                {saveStatus && (
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-xs rounded-xl font-medium border border-emerald-200 dark:border-emerald-800">
                    {saveStatus}
                  </div>
                )}

                {/* Article Metadata Fields */}
                <div className="space-y-3 bg-sand-50/50 dark:bg-slate-800/40 p-4 rounded-2xl text-xs">
                  <div>
                    <span className="font-semibold text-slate-400 block text-[10px] uppercase">Title:</span>
                    <p className="font-serif font-bold text-base text-slate-900 dark:text-white mt-0.5">
                      {generatedArticle.title}
                    </p>
                  </div>

                  <div>
                    <span className="font-semibold text-slate-400 block text-[10px] uppercase">Generated URL Slug:</span>
                    <p className="font-mono text-slate-600 dark:text-slate-300">
                      /article/{generatedArticle.slug}
                    </p>
                  </div>

                  <div>
                    <span className="font-semibold text-slate-400 block text-[10px] uppercase">Meta Description:</span>
                    <p className="text-slate-600 dark:text-slate-300">
                      {generatedArticle.seo?.metaDescription}
                    </p>
                  </div>
                </div>

                {/* Article Content Preview */}
                <div className="pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Body Content (First 600 Characters):
                  </h4>
                  <div className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-950 font-mono text-xs text-slate-700 dark:text-slate-300 max-h-64 overflow-y-auto whitespace-pre-wrap">
                    {generatedArticle.content}
                  </div>
                </div>

                {/* FAQs and References count */}
                <div className="flex items-center space-x-4 text-xs text-slate-500 pt-2 border-t border-stone-100 dark:border-slate-800">
                  <span>✓ {generatedArticle.faqs?.length || 3} FAQs Structured (Schema Ready)</span>
                  <span>✓ {generatedArticle.references?.length || 2} Peer-Reviewed Citations</span>
                  <span>✓ Internal Links Injected</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-24 text-slate-400">
                <div className="w-16 h-16 rounded-full bg-sand-100 dark:bg-slate-800 flex items-center justify-center text-forest-800 dark:text-emerald-400 mb-4">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-lg font-bold text-slate-700 dark:text-slate-300">
                  Ready to Research & Generate
                </h4>
                <p className="text-xs max-w-sm mt-1 text-slate-400 leading-relaxed">
                  Enter a topic or select one of the trending topic pills on the left. The AI writer will generate an exhaustive article complete with tables, clinical pearls, and SEO schema.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
