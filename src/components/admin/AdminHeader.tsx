'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Play, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function AdminHeader({ title, subtitle, action }: AdminHeaderProps) {
  const [runningBatch, setRunningBatch] = useState(false);
  const [batchStatus, setBatchStatus] = useState<string | null>(null);

  const handleTriggerBatch = async () => {
    setRunningBatch(true);
    setBatchStatus('Running AI Trend Discovery & Article Generation...');

    try {
      const res = await fetch('/api/cron', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count: 1 }),
      });
      const data = await res.json();
      if (data.success) {
        setBatchStatus(`Success: Generated & published "${data.result.articles[0]?.title || 'new article'}"`);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        setBatchStatus(`Failed: ${data.error}`);
      }
    } catch (e: any) {
      setBatchStatus(`Error: ${e.message}`);
    } finally {
      setRunningBatch(false);
    }
  };

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-stone-200 dark:border-slate-800 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {batchStatus && (
          <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800 animate-in fade-in">
            {batchStatus}
          </span>
        )}

        {/* Instant Run Auto-Pilot Cycle */}
        <button
          onClick={handleTriggerBatch}
          disabled={runningBatch}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-forest-900 hover:bg-forest-800 text-white text-xs font-semibold shadow-sm transition-all"
          title="Manually trigger the scheduled AI auto-pilot publishing job right now"
        >
          {runningBatch ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Play className="w-3.5 h-3.5 text-emerald-400 fill-current" />
          )}
          <span>{runningBatch ? 'Generating Article...' : 'Trigger Auto-Pilot Now'}</span>
        </button>

        {action}
      </div>
    </header>
  );
}
