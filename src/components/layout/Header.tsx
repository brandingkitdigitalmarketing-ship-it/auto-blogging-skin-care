'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  Sparkles,
  Menu,
  X,
  ChevronDown,
  ShieldCheck,
  Cpu,
  BookOpen,
  FlaskConical,
  Award
} from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';
import { SearchModal } from '../ui/SearchModal';

export function Header() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const primaryGroups = [
    {
      name: 'Skincare',
      slug: 'skincare-news',
      categories: [
        { name: 'Skincare News', slug: 'skincare-news', desc: 'Formulations & barrier science' },
        { name: 'Acne & Pimples', slug: 'acne-pimples', desc: 'Blemish & breakout protocols' },
        { name: 'Anti-Aging', slug: 'anti-aging', desc: 'Retinoids, peptides & collagen' },
        { name: 'Skin Treatments', slug: 'skin-treatments', desc: 'Peels, microneedling & exosomes' }
      ]
    },
    {
      name: 'Haircare',
      slug: 'haircare-news',
      categories: [
        { name: 'Haircare News', slug: 'haircare-news', desc: 'Scalp microbiome & hair health' },
        { name: 'Hair Loss & Transplant', slug: 'hair-loss-transplant', desc: 'Minoxidil, PRP & FUE research' }
      ]
    },
    {
      name: 'Dermatology',
      slug: 'dermatology',
      categories: [
        { name: 'Clinical Dermatology', slug: 'dermatology', desc: 'Cutaneous medicine & pathophysiology' },
        { name: 'Cosmetic Dermatology', slug: 'cosmetic-dermatology', desc: 'Aesthetic procedures, lasers & fillers' },
        { name: 'Expert Advice', slug: 'expert-advice', desc: 'Board-certified clinical pearls' }
      ]
    },
    {
      name: 'Research & News',
      slug: 'research-medical-updates',
      categories: [
        { name: 'Research & Medical Updates', slug: 'research-medical-updates', desc: 'Peer-reviewed studies & FDA alerts' },
        { name: 'Beauty & Wellness', slug: 'beauty-wellness', desc: 'Skin-gut axis & holistic dermatology' }
      ]
    },
    {
      name: 'Reviews',
      slug: 'product-reviews',
      categories: [
        { name: 'Product Reviews', slug: 'product-reviews', desc: 'Evidence-based formulation testing' },
        { name: 'Ingredients Glossary', slug: 'ingredients', isCustom: true, desc: 'Cosmetic chemistry & actives' }
      ]
    }
  ];

  return (
    <>
      <header className="bg-white dark:bg-slate-900 border-b border-stone-200 dark:border-slate-800 sticky top-0 z-40 transition-colors">
        {/* Main Logo & Action Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-stone-100 dark:hover:bg-slate-800"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Center / Left: Brand Logo & Subtitle */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left py-2">
              <Link href="/" className="group flex items-baseline space-x-2">
                <span className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight text-forest-900 dark:text-stone-100 group-hover:text-forest-700 transition-colors">
                  LUMIÈRE DERMA
                </span>
                <span className="hidden sm:inline-block text-[11px] font-sans font-bold tracking-widest text-blush-500 uppercase px-1.5 py-0.5 bg-blush-50 dark:bg-blush-950/40 rounded border border-blush-200 dark:border-blush-900">
                  JOURNAL
                </span>
              </Link>
              <span className="hidden sm:block text-[10px] tracking-widest uppercase text-stone-500 dark:text-stone-400 font-medium">
                The Science of Radiant Skin & Healthy Hair • Evidence-Based Dermatology
              </span>
            </div>

            {/* Right: Search, Dark Mode, AI Admin Trigger */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-full text-slate-600 dark:text-slate-300 bg-sand-50 dark:bg-slate-800/80 border border-sand-200 dark:border-slate-700 hover:border-forest-700 dark:hover:border-emerald-400 transition-all text-xs"
              >
                <Search className="w-3.5 h-3.5 text-forest-800 dark:text-emerald-400" />
                <span className="hidden md:inline text-slate-500 dark:text-slate-400">Search articles & actives...</span>
                <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[9px] font-semibold text-slate-400 bg-white dark:bg-slate-700 rounded border border-slate-200 dark:border-slate-600">⌘K</kbd>
              </button>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* AI Auto-Blogging Control Center Link */}
              <Link
                href="/admin"
                className="hidden sm:flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-forest-900 hover:bg-forest-800 text-white shadow-sm transition-all hover:shadow"
              >
                <Cpu className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>AI Admin</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              </Link>
            </div>
          </div>
        </div>

        {/* Desktop Category Navigation Bar */}
        <nav className="hidden lg:block bg-sand-50/70 dark:bg-slate-950/60 border-t border-stone-200 dark:border-slate-800 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <Link
                  href="/"
                  className={`px-3 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                    pathname === '/'
                      ? 'text-forest-900 dark:text-emerald-400 border-b-2 border-forest-900 dark:border-emerald-400'
                      : 'text-slate-700 dark:text-slate-300 hover:text-forest-800 dark:hover:text-emerald-300'
                  }`}
                >
                  Home
                </Link>

                {primaryGroups.map((grp) => {
                  const isActive = grp.categories.some(c => pathname.startsWith(`/category/${c.slug}`) || (c.isCustom && pathname.startsWith(`/${c.slug}`)));
                  return (
                    <div
                      key={grp.slug}
                      className="relative group"
                      onMouseEnter={() => setActiveDropdown(grp.slug)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <Link
                        href={`/category/${grp.slug}`}
                        className={`flex items-center space-x-1 px-3 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                          isActive
                            ? 'text-forest-900 dark:text-emerald-400 border-b-2 border-forest-900 dark:border-emerald-400'
                            : 'text-slate-700 dark:text-slate-300 hover:text-forest-800 dark:hover:text-emerald-300'
                        }`}
                      >
                        <span>{grp.name}</span>
                        <ChevronDown className="w-3 h-3 text-slate-400 group-hover:rotate-180 transition-transform" />
                      </Link>

                      {/* Dropdown Menu */}
                      {activeDropdown === grp.slug && (
                        <div className="absolute top-full left-0 w-72 bg-white dark:bg-slate-900 shadow-xl rounded-b-xl border border-stone-200 dark:border-slate-800 p-2 py-3 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                          <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            {grp.name} Departments
                          </p>
                          <div className="space-y-1">
                            {grp.categories.map((c) => {
                              const targetHref = c.isCustom ? `/${c.slug}` : `/category/${c.slug}`;
                              return (
                                <Link
                                  key={c.slug}
                                  href={targetHref}
                                  className="block px-3 py-2 text-xs rounded-lg hover:bg-sky-50 dark:hover:bg-slate-800 transition-colors group/item"
                                >
                                  <div className="font-semibold text-slate-800 dark:text-slate-200 group-hover/item:text-sky-700 dark:group-hover/item:text-sky-400">
                                    {c.name}
                                  </div>
                                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                                    {c.desc}
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* All 12 Categories Pill */}
                <Link
                  href="/ingredients"
                  className={`flex items-center space-x-1 px-3 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                    pathname === '/ingredients'
                      ? 'text-forest-900 dark:text-emerald-400 border-b-2 border-forest-900 dark:border-emerald-400'
                      : 'text-slate-700 dark:text-slate-300 hover:text-forest-800 dark:hover:text-emerald-300'
                  }`}
                >
                  <FlaskConical className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                  <span>Actives & Chemistry</span>
                </Link>
              </div>

              {/* Right: Board-Certified badge */}
              <div className="flex items-center space-x-1.5 text-[11px] text-emerald-800 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-900">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Board-Certified Dermatologist Oversight</span>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-stone-200 dark:border-slate-800 p-4 space-y-3 max-h-[80vh] overflow-y-auto">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-800 dark:text-slate-200"
            >
              Home
            </Link>

            {primaryGroups.map((grp) => (
              <div key={grp.slug} className="py-1">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1 py-1">
                  {grp.name}
                </div>
                <div className="pl-2 space-y-1 mt-1 border-l-2 border-sky-200 dark:border-slate-800">
                  {grp.categories.map((c) => {
                    const targetHref = c.isCustom ? `/${c.slug}` : `/category/${c.slug}`;
                    return (
                      <Link
                        key={c.slug}
                        href={targetHref}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-xs text-slate-700 dark:text-slate-300 hover:text-sky-600 py-1"
                      >
                        {c.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="pt-2 border-t border-stone-200 dark:border-slate-800 flex flex-col space-y-2">
              <Link
                href="/reviews"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Product Reviews & Comparisons
              </Link>
              <Link
                href="/ingredients"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Ingredients Glossary
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center space-x-2 py-2.5 rounded-lg bg-forest-900 text-white font-medium text-sm"
              >
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span>AI Auto-Pilot Admin</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
