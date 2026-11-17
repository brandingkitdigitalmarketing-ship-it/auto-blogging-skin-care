import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/lib/db/schema';
import { formatDate, formatTimeAgo } from '@/lib/utils';
import { ShieldCheck, Clock, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  articles: Article[];
}

export function HeroSection({ articles }: HeroSectionProps) {
  if (!articles || articles.length === 0) return null;

  const leadArticle = articles[0];
  const sideArticles = articles.slice(1, 3);

  return (
    <section className="py-6 sm:py-8 lg:py-10 bg-white dark:bg-slate-900 border-b border-stone-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blush-500 animate-ping"></span>
            <h2 className="text-xs font-bold uppercase tracking-widest text-forest-900 dark:text-emerald-400">
              Cover Feature & Trending Intelligence
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">
            Updated Hourly • Clinical Review Active
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Hero Card (Left 7 Cols) */}
          <div className="lg:col-span-7 group">
            <Link href={`/article/${leadArticle.slug}`} className="block overflow-hidden rounded-2xl relative shadow-md hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[16/10] w-full bg-stone-100 dark:bg-slate-800 overflow-hidden">
                <img
                  src={leadArticle.featuredImage}
                  alt={leadArticle.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                {/* Badges Overlay */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="bg-forest-900/90 backdrop-blur-md text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border border-forest-700">
                    {leadArticle.categorySlug}
                  </span>
                  {leadArticle.isMedicallyReviewed && (
                    <span className="bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[11px] font-medium flex items-center space-x-1 border border-white/20">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Medically Reviewed</span>
                    </span>
                  )}
                </div>

                {/* Bottom Overlay Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                  <div className="flex items-center space-x-3 text-xs text-stone-300 mb-2">
                    <span>{formatDate(leadArticle.publishDate)}</span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{leadArticle.readingTimeMinutes} min read</span>
                    </span>
                  </div>
                  <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-white group-hover:text-blush-200 transition-colors">
                    {leadArticle.title}
                  </h1>
                  <p className="text-stone-200 text-xs sm:text-sm line-clamp-2 mt-2 leading-relaxed opacity-95">
                    {leadArticle.excerpt}
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Secondary Features (Right 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            {sideArticles.map((art, idx) => (
              <Link
                key={art.id}
                href={`/article/${art.slug}`}
                className="group flex flex-col sm:flex-row lg:flex-row gap-4 p-4 rounded-2xl bg-sand-50/60 dark:bg-slate-800/40 border border-sand-200/80 dark:border-slate-800 hover:border-forest-700/50 hover:bg-sand-50 dark:hover:bg-slate-800 transition-all shadow-sm hover:shadow"
              >
                <div className="sm:w-40 lg:w-36 h-28 shrink-0 rounded-xl overflow-hidden relative bg-stone-100 dark:bg-slate-700">
                  <img
                    src={art.featuredImage}
                    alt={art.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute bottom-1.5 left-1.5 bg-forest-900/80 backdrop-blur text-emerald-300 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                    {art.categorySlug}
                  </span>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-2 text-[11px] text-slate-500 dark:text-slate-400 mb-1">
                      <span>{formatTimeAgo(art.publishDate)}</span>
                      <span>•</span>
                      <span>{art.readingTimeMinutes} min</span>
                    </div>
                    <h3 className="font-serif text-base font-bold text-slate-900 dark:text-white group-hover:text-forest-800 dark:group-hover:text-emerald-300 transition-colors line-clamp-2 leading-snug">
                      {art.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mt-1">
                    {art.excerpt}
                  </p>
                  <div className="flex items-center space-x-1 text-xs font-semibold text-forest-800 dark:text-emerald-400 mt-2">
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}

            {/* Quick Dermatologist Callout Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-forest-900 to-forest-950 text-white shadow-md border border-forest-800">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-300 shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                    Clinical Standard of Care
                  </h4>
                  <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                    Every article undergoes multi-point verification against PubMed, the Journal of Investigative Dermatology, and AAD guidelines before publication.
                  </p>
                  <Link href="/editorial-policy" className="inline-block text-[11px] font-medium text-blush-300 hover:text-white underline mt-1.5">
                    Read our 5-Step Fact-Checking Protocol →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
