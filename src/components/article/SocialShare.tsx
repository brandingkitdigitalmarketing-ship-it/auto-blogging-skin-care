'use client';

import React, { useState } from 'react';
import { Share2, Twitter, Facebook, Linkedin, Link2, Check, Bookmark } from 'lucide-react';

interface SocialShareProps {
  title: string;
  url: string;
}

export function SocialShare({ title, url }: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleCopy = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(url || window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const encodedUrl = encodeURIComponent(url || '');
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex items-center space-x-2">
      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1 hidden sm:inline">
        Share:
      </span>

      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X / Twitter"
        className="w-8 h-8 rounded-full bg-sand-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-forest-900 hover:text-white transition-colors flex items-center justify-center text-xs"
      >
        <Twitter className="w-3.5 h-3.5 fill-current" />
      </a>

      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        className="w-8 h-8 rounded-full bg-sand-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-forest-900 hover:text-white transition-colors flex items-center justify-center text-xs"
      >
        <Facebook className="w-3.5 h-3.5 fill-current" />
      </a>

      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="w-8 h-8 rounded-full bg-sand-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-forest-900 hover:text-white transition-colors flex items-center justify-center text-xs"
      >
        <Linkedin className="w-3.5 h-3.5 fill-current" />
      </a>

      <button
        onClick={handleCopy}
        aria-label="Copy article link"
        className="w-8 h-8 rounded-full bg-sand-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-forest-900 hover:text-white transition-colors flex items-center justify-center text-xs"
        title="Copy Link"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Link2 className="w-3.5 h-3.5" />}
      </button>

      <button
        onClick={() => setSaved(!saved)}
        aria-label="Save article"
        className={`w-8 h-8 rounded-full transition-colors flex items-center justify-center text-xs ${
          saved
            ? 'bg-blush-500 text-white'
            : 'bg-sand-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-sand-200'
        }`}
        title={saved ? 'Article Saved to Library' : 'Save Article'}
      >
        <Bookmark className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
