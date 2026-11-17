import React from 'react';
import Link from 'next/link';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  if (!content) return null;

  // Split into paragraphs / blocks
  const blocks = content.split('\n\n');

  return (
    <div className="prose prose-stone dark:prose-invert max-w-none space-y-5 text-slate-800 dark:text-slate-200 text-base leading-relaxed">
      {blocks.map((block, idx) => {
        const trimmed = block.trim();

        // Horizontal rule
        if (trimmed === '---') {
          return <hr key={idx} className="my-8 border-t border-stone-200 dark:border-slate-800" />;
        }

        // H1 Heading
        if (trimmed.startsWith('# ')) {
          const title = trimmed.replace('# ', '');
          const id = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
          return (
            <h1 key={idx} id={id} className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-8 mb-4 tracking-tight">
              {title}
            </h1>
          );
        }

        // H2 Heading
        if (trimmed.startsWith('## ')) {
          const title = trimmed.replace('## ', '');
          const id = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
          return (
            <h2 key={idx} id={id} className="font-serif text-2xl sm:text-3xl font-bold text-forest-950 dark:text-emerald-300 mt-10 mb-4 pb-2 border-b border-sand-200 dark:border-slate-800 tracking-tight">
              {title}
            </h2>
          );
        }

        // H3 Heading
        if (trimmed.startsWith('### ')) {
          const title = trimmed.replace('### ', '');
          const id = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
          return (
            <h3 key={idx} id={id} className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-3">
              {title}
            </h3>
          );
        }

        // Blockquote
        if (trimmed.startsWith('> ')) {
          const quoteText = trimmed.replace(/^>\s*/gm, '');
          return (
            <blockquote key={idx} className="p-4 sm:p-5 my-6 rounded-2xl bg-sand-50 dark:bg-slate-800/60 border-l-4 border-forest-800 dark:border-emerald-400 text-slate-700 dark:text-slate-300 italic text-sm leading-relaxed shadow-sm">
              <span dangerouslySetInnerHTML={{ __html: renderInline(quoteText) }} />
            </blockquote>
          );
        }

        // Markdown Table
        if (trimmed.includes('|') && trimmed.includes('---')) {
          const lines = trimmed.split('\n').filter(l => l.trim().startsWith('|'));
          if (lines.length >= 3) {
            const headerCells = lines[0].split('|').slice(1, -1).map(c => c.trim());
            const bodyRows = lines.slice(2).map(line => line.split('|').slice(1, -1).map(c => c.trim()));

            return (
              <div key={idx} className="my-6 overflow-x-auto rounded-2xl border border-sand-200 dark:border-slate-800 shadow-sm">
                <table className="min-w-full divide-y divide-sand-200 dark:divide-slate-800 text-left text-xs sm:text-sm">
                  <thead className="bg-sand-100 dark:bg-slate-800 font-serif font-bold text-slate-900 dark:text-white">
                    <tr>
                      {headerCells.map((h, i) => (
                        <th key={i} className="px-4 py-3 text-left tracking-wider uppercase text-[11px]">
                          {h.replace(/\*\*/g, '')}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-slate-900 divide-y divide-sand-100 dark:divide-slate-800/80">
                    {bodyRows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-sand-50/50 dark:hover:bg-slate-800/40 transition-colors">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="px-4 py-3 text-slate-700 dark:text-slate-300">
                            <span dangerouslySetInnerHTML={{ __html: renderInline(cell) }} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }
        }

        // Code block / ASCII diagram
        if (trimmed.startsWith('```')) {
          const codeText = trimmed.replace(/```[a-z]*\n?/g, '');
          return (
            <div key={idx} className="my-6 p-4 rounded-xl bg-forest-950 text-emerald-300 font-mono text-xs overflow-x-auto border border-forest-800 shadow-inner">
              <pre>{codeText}</pre>
            </div>
          );
        }

        // Bullet list
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const listItems = trimmed.split('\n').filter(l => l.trim().startsWith('- ') || l.trim().startsWith('* '));
          return (
            <ul key={idx} className="space-y-2 my-4 list-disc list-inside text-slate-700 dark:text-slate-300 text-sm">
              {listItems.map((item, i) => {
                const text = item.replace(/^[-*]\s+/, '');
                return (
                  <li key={i} className="leading-relaxed">
                    <span dangerouslySetInnerHTML={{ __html: renderInline(text) }} />
                  </li>
                );
              })}
            </ul>
          );
        }

        // Numbered list
        if (/^\d+\.\s/.test(trimmed)) {
          const listItems = trimmed.split('\n').filter(l => /^\d+\.\s/.test(l.trim()));
          return (
            <ol key={idx} className="space-y-2 my-4 list-decimal list-inside text-slate-700 dark:text-slate-300 text-sm">
              {listItems.map((item, i) => {
                const text = item.replace(/^\d+\.\s+/, '');
                return (
                  <li key={i} className="leading-relaxed">
                    <span dangerouslySetInnerHTML={{ __html: renderInline(text) }} />
                  </li>
                );
              })}
            </ol>
          );
        }

        // Standard Paragraph
        return (
          <p key={idx} className="text-slate-700 dark:text-slate-300 leading-relaxed text-base" dangerouslySetInnerHTML={{ __html: renderInline(trimmed) }} />
        );
      })}
    </div>
  );
}

function renderInline(text: string): string {
  let output = text;

  // Bold
  output = output.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Italic
  output = output.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Markdown Links [text](url)
  output = output.replace(
    /\[(.*?)\]\((.*?)\)/g,
    '<a href="$2" class="text-forest-800 dark:text-emerald-400 font-medium underline underline-offset-2 hover:text-blush-600 dark:hover:text-emerald-300 transition-colors">$1</a>'
  );

  return output;
}
