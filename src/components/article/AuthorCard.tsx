import React from 'react';
import Link from 'next/link';
import { Author } from '@/lib/db/schema';
import { ShieldCheck, Award } from 'lucide-react';

interface AuthorCardProps {
  author: Author;
}

export function AuthorCard({ author }: AuthorCardProps) {
  if (!author) return null;

  return (
    <div className="bg-sand-50/80 dark:bg-slate-800/60 rounded-3xl p-6 sm:p-8 border border-sand-200 dark:border-slate-700 my-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-stone-100 shrink-0 border-2 border-forest-800 dark:border-emerald-400">
          <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-forest-800 dark:text-emerald-400 bg-forest-100 dark:bg-emerald-950 px-2 py-0.5 rounded">
              Written By
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {author.role}
            </span>
          </div>

          <h4 className="font-serif text-xl font-bold text-slate-900 dark:text-white mt-1">
            {author.name}
          </h4>

          <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-0.5">
            {author.credentials}
          </p>

          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            {author.bio}
          </p>
        </div>
      </div>
    </div>
  );
}
