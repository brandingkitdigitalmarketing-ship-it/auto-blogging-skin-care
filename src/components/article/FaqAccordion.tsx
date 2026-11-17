'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FaqItem } from '@/lib/db/schema';

interface FaqAccordionProps {
  faqs: FaqItem[];
}

export function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="my-10 bg-sand-50/70 dark:bg-slate-800/40 rounded-3xl p-6 sm:p-8 border border-sand-200 dark:border-slate-800">
      <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-forest-800 dark:text-emerald-400 mb-2">
        <HelpCircle className="w-4 h-4 text-forest-800 dark:text-emerald-400" />
        <span>Clinical Answers</span>
      </div>
      <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white mb-6">
        Frequently Asked Dermatological Questions
      </h3>

      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-stone-200 dark:border-slate-800 overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-serif text-base font-bold text-slate-900 dark:text-white hover:text-forest-800 dark:hover:text-emerald-300 transition-colors"
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-forest-800 dark:text-emerald-400' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-stone-100 dark:border-slate-800 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
