'use client';

import React, { useEffect, useState } from 'react';
import { List, ChevronRight } from 'lucide-react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Extract H2 and H3 headings from markdown content
    const lines = content.split('\n');
    const items: TocItem[] = [];

    lines.forEach(line => {
      if (line.startsWith('## ')) {
        const text = line.replace('## ', '').trim();
        const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        items.push({ id, text, level: 2 });
      } else if (line.startsWith('### ')) {
        const text = line.replace('### ', '').trim();
        const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        items.push({ id, text, level: 3 });
      }
    });

    setHeadings(items);
  }, [content]);

  if (headings.length === 0) return null;

  return (
    <div className="bg-sand-50/70 dark:bg-slate-800/40 rounded-2xl p-5 border border-sand-200/80 dark:border-slate-800">
      <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-forest-800 dark:text-emerald-400 mb-3 pb-2 border-b border-sand-200 dark:border-slate-800">
        <List className="w-4 h-4" />
        <span>Table of Contents</span>
      </div>

      <nav className="space-y-1 text-xs">
        {headings.map((h) => (
          <a
            key={h.id}
            href={`#${h.id}`}
            className={`block py-1.5 transition-colors line-clamp-1 ${
              h.level === 3 ? 'pl-4 text-slate-500 dark:text-slate-400' : 'text-slate-700 dark:text-slate-200 font-medium'
            } hover:text-forest-800 dark:hover:text-emerald-400`}
          >
            {h.text}
          </a>
        ))}
      </nav>
    </div>
  );
}
