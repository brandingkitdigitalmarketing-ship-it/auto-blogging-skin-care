'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  Mail,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Heart,
  FileText
} from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: ''
  });

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    setStatus({ type: 'loading', message: 'Subscribing...' });
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus({ type: 'success', message: data.message });
        setEmail('');
      } else {
        setStatus({ type: 'error', message: data.message || 'Subscription failed.' });
      }
    } catch {
      setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter Strip */}
        <div className="bg-forest-950 border border-forest-800/80 rounded-2xl p-6 sm:p-8 mb-16 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7">
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400 bg-forest-900 px-2.5 py-1 rounded-full border border-forest-700">
                Lumière Clinical Dispatch
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-3">
                Join 18,000+ Readers Receiving Daily Dermatology Intelligence
              </h3>
              <p className="text-stone-300 text-sm mt-2 max-w-xl">
                Breakthrough peptide patents, FDA cosmetic updates, and dermatologist-reviewed routine breakdowns delivered every Tuesday and Friday morning. Zero spam, zero sponsored fluff.
              </p>
            </div>

            <div className="lg:col-span-5">
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your clinical email..."
                    className="flex-1 bg-forest-900/90 text-white placeholder-stone-400 px-4 py-3 rounded-xl border border-forest-700 focus:outline-none focus:border-emerald-400 text-sm"
                  />
                  <button
                    type="submit"
                    disabled={status.type === 'loading'}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors flex items-center justify-center space-x-2 shrink-0 shadow-md"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                {status.message && (
                  <p className={`text-xs ${status.type === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {status.message}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Multi-Column Links Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 pb-12 border-b border-stone-800">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="col-span-2">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl font-bold text-white tracking-tight">
                LUMIÈRE DERMA
              </span>
              <span className="block text-[10px] tracking-widest uppercase text-blush-400 font-semibold mt-0.5">
                JOURNAL OF DERMATOLOGY & BEAUTY SCIENCE
              </span>
            </Link>
            <p className="text-xs text-stone-400 mt-4 leading-relaxed max-w-sm">
              An evidence-based editorial publication dedicated to advancing scientific literacy in skincare, hair biology, dermatology innovations, and cosmetic chemistry.
            </p>
            <div className="mt-4 flex items-center space-x-2 text-[11px] text-emerald-400 bg-forest-950 px-3 py-1.5 rounded-lg border border-forest-800 w-fit">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Independent & Medically Verified</span>
            </div>
          </div>

          {/* Col 3: Skincare */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Skincare Science</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><Link href="/category/skincare" className="hover:text-emerald-400 transition-colors">Daily Routines</Link></li>
              <li><Link href="/category/skincare?sub=Acne%20and%20pimple%20treatments" className="hover:text-emerald-400 transition-colors">Acne Protocols</Link></li>
              <li><Link href="/category/skincare?sub=Anti-aging%20skincare" className="hover:text-emerald-400 transition-colors">Anti-Aging & Retinoids</Link></li>
              <li><Link href="/category/skincare?sub=Sunscreen%20and%20SPF%20guides" className="hover:text-emerald-400 transition-colors">SPF & UV Filters</Link></li>
              <li><Link href="/category/skincare?sub=Sensitive%20skin" className="hover:text-emerald-400 transition-colors">Barrier Recovery</Link></li>
              <li><Link href="/category/skincare?sub=Pigmentation%20and%20dark%20spots" className="hover:text-emerald-400 transition-colors">Dark Spots & Melasma</Link></li>
            </ul>
          </div>

          {/* Col 4: Haircare & Trichology */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Haircare & Scalp</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><Link href="/category/haircare" className="hover:text-emerald-400 transition-colors">Follicular Health</Link></li>
              <li><Link href="/category/haircare?sub=Hair%20growth%20tips" className="hover:text-emerald-400 transition-colors">Hair Growth Science</Link></li>
              <li><Link href="/category/haircare?sub=Hair%20fall%20and%20hair%20loss" className="hover:text-emerald-400 transition-colors">Androgenetic Alopecia</Link></li>
              <li><Link href="/category/haircare?sub=Dandruff%20treatments" className="hover:text-emerald-400 transition-colors">Malassezia & Dandruff</Link></li>
              <li><Link href="/category/haircare?sub=Scalp%20health" className="hover:text-emerald-400 transition-colors">Scalp Microbiome</Link></li>
            </ul>
          </div>

          {/* Col 5: Actives & Ingredients */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Actives Dictionary</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><Link href="/ingredients/retinol" className="hover:text-emerald-400 transition-colors">Retinol & Retinoids</Link></li>
              <li><Link href="/ingredients/niacinamide" className="hover:text-emerald-400 transition-colors">Niacinamide (B3)</Link></li>
              <li><Link href="/ingredients/hyaluronic-acid" className="hover:text-emerald-400 transition-colors">Hyaluronic Acid</Link></li>
              <li><Link href="/ingredients/vitamin-c" className="hover:text-emerald-400 transition-colors">L-Ascorbic Acid</Link></li>
              <li><Link href="/ingredients/salicylic-acid" className="hover:text-emerald-400 transition-colors">Salicylic Acid (BHA)</Link></li>
              <li><Link href="/ingredients/peptides" className="hover:text-emerald-400 transition-colors">Signal & Copper Peptides</Link></li>
              <li><Link href="/ingredients" className="hover:text-emerald-400 transition-colors font-semibold text-emerald-400">View All 25+ Actives →</Link></li>
            </ul>
          </div>

          {/* Col 6: Company & Trust */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Trust & Ethics</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><Link href="/about" className="hover:text-emerald-400 transition-colors">About Our Medical Board</Link></li>
              <li><Link href="/editorial-policy" className="hover:text-emerald-400 transition-colors">Editorial & Fact-Checking</Link></li>
              <li><Link href="/medical-disclaimer" className="hover:text-emerald-400 transition-colors">Medical Disclaimer</Link></li>
              <li><Link href="/affiliate-disclosure" className="hover:text-emerald-400 transition-colors">Affiliate Disclosure</Link></li>
              <li><Link href="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-emerald-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-400 transition-colors">Editorial Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Mandatory Medical Disclaimer Notice */}
        <div className="my-8 p-4 bg-stone-950/60 rounded-xl border border-stone-800 text-[11px] text-stone-400 leading-relaxed flex items-start space-x-3">
          <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <strong className="text-stone-300 font-semibold block mb-0.5">Medical & Health Information Disclaimer:</strong>
            The articles, protocols, and clinical reviews published by Lumière Derma Journal are strictly intended for general educational and informational purposes. This content does not constitute formal medical diagnosis, individualized treatment plans, or physician-patient relationships. Always seek the advice of a board-certified dermatologist, trichologist, or qualified healthcare professional regarding any specific cutaneous condition or therapeutic decision.
          </div>
        </div>

        {/* Bottom Bar: Copyright & Admin Portal */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Lumière Derma Journal. All rights reserved. Syndicated for Google News & Discover.</p>

          <div className="flex items-center space-x-4">
            <Link href="/sitemap.xml" className="hover:text-stone-300 transition-colors">
              XML Sitemap
            </Link>
            <span>•</span>
            <Link href="/robots.txt" className="hover:text-stone-300 transition-colors">
              Robots.txt
            </Link>
            <span>•</span>
            <Link href="/admin" className="text-emerald-400 hover:text-emerald-300 font-medium">
              Editorial CMS & AI Studio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
