'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sun, Sparkles, TrendingUp, AlertCircle, Clock } from 'lucide-react';

interface NewsTickerProps {
  items?: Array<{ title: string; slug: string; tag: string }>;
}

export function NewsTicker({ items }: NewsTickerProps) {
  const defaultItems = [
    { title: 'FDA Greenlights New Photostable UV Filter Molecule for US Market', slug: 'fda-approves-breakthrough-uv-filters-sunscreen-2026', tag: 'REGULATORY' },
    { title: 'Tretinoin Retinization Protocol: How Dermatologists Prevent Peeling', slug: 'tretinoin-retinization-protocol-prevent-peeling', tag: 'CLINICAL' },
    { title: 'Rosemary Oil vs 2% Minoxidil: What 2026 Trichology Data Actually Proves', slug: 'rosemary-oil-vs-minoxidil-hair-growth-study', tag: 'TRICHOLOGY' },
    { title: 'Exosome Facials vs Microneedling: What Board-Certified Dermatologists Say', slug: 'exosome-therapy-vs-microneedling-dermatology-guide', tag: 'AESTHETICS' },
  ];

  const tickerItems = items && items.length > 0 ? items : defaultItems;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % tickerItems.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [tickerItems.length]);

  const current = tickerItems[currentIndex];

  return (
    <div className="bg-forest-900 text-stone-200 text-xs py-2 px-4 border-b border-forest-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left: Ticker label + animated item */}
        <div className="flex items-center space-x-3 w-full md:w-auto overflow-hidden">
          <div className="flex items-center space-x-1.5 bg-forest-800/80 text-emerald-300 font-semibold px-2 py-0.5 rounded text-[10px] tracking-wider uppercase shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Trending Wire</span>
          </div>

          <div className="flex items-center space-x-2 truncate">
            <span className="bg-blush-500/20 text-blush-300 font-medium px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider shrink-0">
              {current.tag}
            </span>
            <Link
              href={`/article/${current.slug}`}
              className="text-stone-200 hover:text-white transition-colors truncate text-xs hover:underline"
            >
              {current.title}
            </Link>
          </div>
        </div>

        {/* Right: Daily Skin Intelligence & UV Index */}
        <div className="hidden lg:flex items-center space-x-5 text-[11px] text-stone-300 shrink-0">
          <div className="flex items-center space-x-1.5">
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            <span>Today's UV Index: <strong className="text-white">4 (Moderate)</strong> • Broad-Spectrum SPF 30+ Advised</span>
          </div>
          <span className="text-forest-700">|</span>
          <div className="flex items-center space-x-1 text-emerald-300">
            <Sparkles className="w-3 h-3" />
            <span>Medically Reviewed Edition</span>
          </div>
        </div>
      </div>
    </div>
  );
}
