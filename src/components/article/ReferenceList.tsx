import React from 'react';
import { ReferenceItem } from '@/lib/db/schema';
import { BookOpen, ExternalLink } from 'lucide-react';

interface ReferenceListProps {
  references: ReferenceItem[];
}

export function ReferenceList({ references }: ReferenceListProps) {
  if (!references || references.length === 0) return null;

  return (
    <div className="my-8 p-5 bg-sand-50/50 dark:bg-slate-800/40 rounded-2xl border border-sand-200/80 dark:border-slate-800">
      <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-forest-800 dark:text-emerald-400 mb-3">
        <BookOpen className="w-4 h-4" />
        <span>Scientific References & Peer-Reviewed Sources</span>
      </div>

      <ol className="list-decimal list-inside space-y-2 text-xs text-slate-600 dark:text-slate-300">
        {references.map((ref, idx) => (
          <li key={idx} className="leading-relaxed">
            <span className="font-semibold text-slate-800 dark:text-slate-200">{ref.title}.</span>{' '}
            <em className="text-slate-600 dark:text-slate-400">{ref.journal}</em> ({ref.year}).{' '}
            <a
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-forest-800 dark:text-emerald-400 hover:underline inline-flex items-center ml-1"
            >
              <span>PubMed / CrossRef</span>
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}
