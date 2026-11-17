'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Sparkles,
  TrendingUp,
  Settings,
  DollarSign,
  Search,
  Globe,
  ExternalLink,
  Cpu,
  Layers,
  Award
} from 'lucide-react';

export function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Articles', href: '/admin/articles', icon: FileText },
    { label: 'AI Writing Studio', href: '/admin/studio', icon: Sparkles },
    { label: 'Trend Radar & RSS', href: '/admin/trends', icon: TrendingUp },
    { label: 'AI Automation Settings', href: '/admin/settings', icon: Settings },
    { label: 'Monetization & Ads', href: '/admin/monetization', icon: DollarSign },
    { label: 'SEO & Schema.org', href: '/admin/seo', icon: Search },
  ];

  return (
    <aside className="w-64 bg-forest-950 text-stone-200 flex flex-col justify-between border-r border-forest-900 shrink-0 min-h-screen">
      <div>
        {/* Logo */}
        <div className="p-6 border-b border-forest-900">
          <Link href="/admin" className="block">
            <span className="font-serif text-lg font-bold text-white tracking-tight">
              LUMIÈRE DERMA
            </span>
            <div className="flex items-center space-x-1.5 mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-semibold">
                AI Auto-Pilot CMS
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1 text-xs">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition-all font-medium ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md font-semibold'
                    : 'text-stone-300 hover:bg-forest-900/80 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Shortcuts */}
      <div className="p-4 border-t border-forest-900 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-xl bg-forest-900/60 hover:bg-forest-900 text-stone-300 hover:text-white transition-colors text-xs"
        >
          <span className="flex items-center space-x-2">
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>View Public Magazine</span>
          </span>
          <ExternalLink className="w-3 h-3 text-stone-400" />
        </Link>

        <div className="p-3 rounded-xl bg-forest-900/40 text-[11px] text-stone-400">
          <div className="flex items-center justify-between mb-1">
            <span className="text-stone-300 font-semibold">Engine Status</span>
            <span className="text-emerald-400 font-bold">Active</span>
          </div>
          <p className="leading-snug">
            3 Scheduled Posts Daily (09:00, 13:00, 18:00)
          </p>
        </div>
      </div>
    </aside>
  );
}
