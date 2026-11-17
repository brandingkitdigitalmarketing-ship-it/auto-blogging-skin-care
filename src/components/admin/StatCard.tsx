import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  icon: LucideIcon;
  trend?: string;
  color?: 'emerald' | 'amber' | 'rose' | 'slate';
}

export function StatCard({
  title,
  value,
  subtext,
  icon: Icon,
  trend,
  color = 'emerald'
}: StatCardProps) {
  const colorMap = {
    emerald: 'bg-emerald-50 dark:bg-emerald-950/60 text-forest-800 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900',
    amber: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-900',
    rose: 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-900',
    slate: 'bg-sand-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-sand-200 dark:border-slate-700',
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-stone-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {title}
        </span>
        <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${colorMap[color]}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-baseline space-x-2">
          <span className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {value}
          </span>
          {trend && (
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              {trend}
            </span>
          )}
        </div>
        {subtext && (
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            {subtext}
          </p>
        )}
      </div>
    </div>
  );
}
