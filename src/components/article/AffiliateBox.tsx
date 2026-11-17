import React from 'react';
import { AffiliateProduct } from '@/lib/db/schema';
import { Star, ShieldCheck, Check, X, ExternalLink } from 'lucide-react';

interface AffiliateBoxProps {
  products: AffiliateProduct[];
}

export function AffiliateBox({ products }: AffiliateBoxProps) {
  if (!products || products.length === 0) return null;

  return (
    <div className="my-10 space-y-6">
      <div className="text-center sm:text-left">
        <span className="text-[10px] font-bold uppercase tracking-widest text-blush-600 dark:text-blush-400">
          Independent Clinical Selection
        </span>
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
          Dermatologist-Approved Products Mentioned In This Article
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Products are evaluated by our medical board based on clinical efficacy, peer-reviewed ingredient stability, and formulation purity. We may earn a retailer commission if you purchase through verified links.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((prod, idx) => (
          <div
            key={idx}
            className="bg-sand-50/70 dark:bg-slate-800/50 rounded-2xl p-5 border border-sand-200 dark:border-slate-700 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shrink-0 border border-sand-200 dark:border-slate-800">
                  <img src={prod.imageUrl} alt={prod.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {prod.brand}
                    </span>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {prod.price}
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-slate-900 dark:text-white text-base leading-snug mt-0.5">
                    {prod.name}
                  </h4>
                  <div className="flex items-center text-amber-500 text-xs mt-1">
                    <Star className="w-3.5 h-3.5 fill-current mr-1" />
                    <span className="font-semibold">{prod.rating} / 5.0</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 italic mb-3">
                &ldquo;{prod.verdict}&rdquo;
              </p>

              {/* Pros & Cons */}
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                {prod.pros.map((p, i) => (
                  <div key={i} className="flex items-start space-x-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </div>
                ))}
                {prod.cons.map((c, i) => (
                  <div key={i} className="flex items-start space-x-1.5 text-slate-500">
                    <X className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-sand-200/80 dark:border-slate-700 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">Dermatologist Tested</span>
              <a
                href={prod.buyUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="px-4 py-2 bg-forest-900 hover:bg-forest-800 text-white rounded-xl text-xs font-semibold transition-colors flex items-center space-x-1 shadow-sm"
              >
                <span>Check Official Price</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
