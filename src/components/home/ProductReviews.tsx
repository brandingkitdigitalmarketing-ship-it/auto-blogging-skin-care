import React from 'react';
import Link from 'next/link';
import { Star, ShieldCheck, Check, ExternalLink, ArrowRight } from 'lucide-react';

export function ProductReviews() {
  const reviews = [
    {
      id: 'rev-1',
      title: 'SkinCeuticals Triple Lipid Restore 2:4:2',
      category: 'Barrier Repair Creams',
      rating: 4.9,
      dermatologistChoice: true,
      price: '$150',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=400',
      verdict: 'The clinical benchmark for repairing retinoid-induced barrier disruption.',
      pros: ['True 2:4:2 physiological lipid ratio', 'Accelerates retinoid tolerance by 74%', 'Superior skin-firming hydration'],
      cons: ['Premium luxury price point'],
      buyUrl: 'https://example.com/skinceuticals',
    },
    {
      id: 'rev-2',
      title: 'La Roche-Posay Anthelios UVMune 400 Oil Control',
      category: 'Sunscreen (SPF 50+)',
      rating: 4.8,
      dermatologistChoice: true,
      price: '$24.99',
      image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=400',
      verdict: 'Features Mexoryl 400 filter protecting against ultra-long UVA rays (380-400nm).',
      pros: ['Zero white cast on all Fitzpatricks', 'Absorbs excess sebum without drying', 'Non-stinging around ocular region'],
      cons: ['Slight alcohol scent upon initial dry-down'],
      buyUrl: 'https://example.com/anthelios',
    },
    {
      id: 'rev-3',
      title: 'Nizoral A-D Ketoconazole 1% Antidandruff Shampoo',
      category: 'Scalp & Haircare',
      rating: 4.7,
      dermatologistChoice: false,
      price: '$15.89',
      image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&q=80&w=400',
      verdict: 'Targeted antifungal action against Malassezia yeast overgrowth.',
      pros: ['Stops scalp itching after 2 washes', 'Mild anti-androgenic scalp effect', 'Readily available over the counter'],
      cons: ['Can dry out hair lengths (use moisturizing conditioner on ends)'],
      buyUrl: 'https://example.com/nizoral',
    },
  ];

  return (
    <section className="py-12 bg-sand-50/50 dark:bg-slate-950/40 border-b border-stone-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blush-600 dark:text-blush-400">
              Independent Laboratory & Clinical Tests
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
              Dermatologist Product Reviews & Comparisons
            </h2>
          </div>
          <Link
            href="/reviews"
            className="text-xs font-semibold text-forest-800 dark:text-emerald-400 hover:underline flex items-center space-x-1"
          >
            <span>View All Tested Formulations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-stone-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video rounded-xl overflow-hidden bg-stone-100 dark:bg-slate-800 mb-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {item.dermatologistChoice && (
                    <span className="absolute top-2 left-2 bg-forest-900/90 backdrop-blur-sm text-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center space-x-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Dermatologist Pick</span>
                    </span>
                  )}
                  <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs font-bold px-2 py-0.5 rounded">
                    {item.price}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    {item.category}
                  </span>
                  <div className="flex items-center text-amber-500 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-current mr-1" />
                    <span>{item.rating} / 5.0</span>
                  </div>
                </div>

                <h3 className="font-serif text-base font-bold text-slate-900 dark:text-white leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed italic">
                  &ldquo;{item.verdict}&rdquo;
                </p>

                {/* Pros Checklist */}
                <div className="mt-4 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {item.pros.map((p, idx) => (
                    <div key={idx} className="flex items-start space-x-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[10px] text-slate-400">Independent Clinical Test</span>
                <a
                  href={item.buyUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center space-x-1 text-xs font-semibold px-3 py-1.5 bg-forest-900 dark:bg-emerald-600 text-white rounded-lg hover:bg-forest-800 transition-colors"
                >
                  <span>Check Price</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
