'use client';

import React from 'react';
import { Sparkles, ExternalLink } from 'lucide-react';

interface AdBannerProps {
  slot: 'header' | 'sidebar' | 'in-article' | 'footer';
  className?: string;
}

export function AdBanner({ slot, className = '' }: AdBannerProps) {
  if (slot === 'header') {
    return (
      <div className={`w-full max-w-5xl mx-auto my-4 ${className}`}>
        <div className="bg-sand-50 dark:bg-slate-800/40 border border-sand-200/80 dark:border-slate-800 rounded-xl p-3 flex flex-col items-center justify-center min-h-[90px] text-center relative overflow-hidden group">
          <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1">
            Advertisement • Dermatology Partner Network
          </span>
          <div className="flex items-center space-x-3 text-xs text-slate-600 dark:text-slate-300">
            <span className="font-serif font-semibold text-sm text-forest-900 dark:text-emerald-300">
              SkinCeuticals Triple Lipid Restore 2:4:2
            </span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span className="hidden sm:inline">The 3:1:1 Physiological Barrier Ratio</span>
            <a
              href="https://example.com/partner-skinceuticals"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center space-x-1 px-3 py-1 bg-forest-900 dark:bg-emerald-600 text-white rounded-full text-[11px] font-medium hover:bg-forest-800 transition-colors ml-2"
            >
              <span>Explore Trial</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (slot === 'sidebar') {
    return (
      <div className={`w-full ${className}`}>
        <div className="bg-sand-50 dark:bg-slate-800/50 border border-sand-200 dark:border-slate-800 rounded-2xl p-5 text-center relative">
          <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 block mb-3">
            Sponsored Medical Feature
          </span>
          <div className="w-16 h-16 rounded-full bg-forest-100 dark:bg-emerald-950 flex items-center justify-center mx-auto text-forest-800 dark:text-emerald-400 mb-3">
            <Sparkles className="w-8 h-8" />
          </div>
          <h4 className="font-serif font-bold text-slate-900 dark:text-white text-base">
            Clinical Scalp Analysis 2026
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
            Personalized trichological assessment for follicular thinning, DHT sensitivity, and microbiome balance.
          </p>
          <a
            href="https://example.com/scalp-assessment"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="mt-4 inline-block w-full py-2.5 rounded-xl bg-forest-900 dark:bg-emerald-600 text-white font-semibold text-xs hover:bg-forest-800 transition-colors shadow-sm"
          >
            Take Free Scalp Quiz →
          </a>
        </div>
      </div>
    );
  }

  if (slot === 'in-article') {
    return (
      <div className={`my-8 p-4 bg-sand-50 dark:bg-slate-800/60 rounded-xl border border-sand-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}>
        <div>
          <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 block">
            Partner Product Spotlight
          </span>
          <h5 className="font-serif font-bold text-slate-900 dark:text-white text-sm mt-0.5">
            CeraVe Healing Ointment with Ceramides & Hyaluronic Acid
          </h5>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Non-greasy petrolatum occlusive recommended by 9 out of 10 dermatologists for barrier repair.
          </p>
        </div>
        <a
          href="https://example.com/cerave-ointment"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="shrink-0 px-4 py-2 bg-blush-600 hover:bg-blush-500 text-white rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1"
        >
          <span>Check Availability</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    );
  }

  return null;
}
