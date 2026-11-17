'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

export function NewsletterBox() {
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus({ type: 'error', message: 'Please provide a valid clinical email address.' });
      return;
    }

    setStatus({ type: 'loading', message: 'Activating subscription...' });
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, category }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus({ type: 'success', message: data.message });
        setEmail('');
      } else {
        setStatus({ type: 'error', message: data.message || 'Subscription failed.' });
      }
    } catch {
      setStatus({ type: 'error', message: 'An unexpected network error occurred.' });
    }
  };

  return (
    <section className="py-16 bg-white dark:bg-slate-900 border-b border-stone-200 dark:border-slate-800 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-sand-100 via-blush-50 to-sand-50 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 rounded-3xl p-8 sm:p-12 border border-sand-200 dark:border-slate-800 shadow-xl text-center relative overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-forest-900 text-emerald-400 flex items-center justify-center mx-auto mb-4 shadow-md">
            <Mail className="w-6 h-6" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-forest-800 dark:text-emerald-400">
            The Evidence-Based Editorial Dispatch
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mt-2 max-w-2xl mx-auto">
            Stay Ahead of Cutaneous Science & Industry Breakthroughs
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto mt-3 leading-relaxed">
            Delivered straight to your inbox twice weekly: FDA cosmetic filter decisions, independent lab tests, hair follicle clinical trials, and unbiased product breakdowns.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 max-w-lg mx-auto">
            {/* Category Selector */}
            <div className="flex items-center justify-center gap-2 mb-4 text-xs">
              <span className="text-slate-400 text-[11px] font-medium mr-1">Preferred Focus:</span>
              {[
                { label: 'All Topics', id: 'all' },
                { label: 'Skincare', id: 'skincare' },
                { label: 'Hair & Scalp', id: 'haircare' },
                { label: 'Actives', id: 'ingredients' },
              ].map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setCategory(opt.id)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                    category === opt.id
                      ? 'bg-forest-900 text-white'
                      : 'bg-white/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@dermatology.org or your email"
                className="flex-1 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 px-4 py-3.5 rounded-xl border border-sand-300 dark:border-slate-700 focus:outline-none focus:border-forest-800 text-sm shadow-inner"
              />
              <button
                type="submit"
                disabled={status.type === 'loading'}
                className="bg-forest-900 hover:bg-forest-800 text-white font-semibold px-6 py-3.5 rounded-xl text-sm transition-all shadow-md flex items-center justify-center space-x-2 shrink-0"
              >
                <span>Join Journal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {status.message && (
              <p className={`text-xs mt-3 font-medium ${status.type === 'success' ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                {status.message}
              </p>
            )}

            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-400">
              <span className="flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-forest-700 dark:text-emerald-400" />
                <span>Zero spam guarantee</span>
              </span>
              <span>•</span>
              <span>One-click unsubscribe anytime</span>
              <span>•</span>
              <span>Strict GDPR & HIPAA adherence</span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
