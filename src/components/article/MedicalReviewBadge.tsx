import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Info } from 'lucide-react';
import { Author } from '@/lib/db/schema';

interface MedicalReviewBadgeProps {
  author?: Author | null;
  reviewer?: Author | null;
  publishDate: string;
}

export function MedicalReviewBadge({ author, reviewer, publishDate }: MedicalReviewBadgeProps) {
  return (
    <div className="bg-sand-50 dark:bg-slate-800/60 rounded-2xl p-4 sm:p-5 border border-sand-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center space-x-3.5">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-emerald-100 dark:bg-emerald-950 shrink-0 border-2 border-emerald-500">
          <img
            src={reviewer?.avatar || author?.avatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200'}
            alt={reviewer?.name || 'Medical Reviewer'}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <div className="flex items-center space-x-1.5 text-xs font-bold text-forest-900 dark:text-emerald-400">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Medically Reviewed by {reviewer?.name || 'Dr. Claire Dupont, MD, FAAD'}</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            {reviewer?.credentials || 'Board-Certified Dermatologist • Harvard Medical School'}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2 text-[11px] text-slate-500 dark:text-slate-400 self-end sm:self-center">
        <Link
          href="/editorial-policy"
          className="hover:text-forest-800 dark:hover:text-emerald-400 underline flex items-center space-x-1"
        >
          <Info className="w-3.5 h-3.5" />
          <span>Our Clinical Review Standards</span>
        </Link>
      </div>
    </div>
  );
}
