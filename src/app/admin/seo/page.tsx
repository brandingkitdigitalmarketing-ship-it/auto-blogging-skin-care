'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { SiteSettings } from '@/lib/db/schema';
import { Search, Globe, Code, ExternalLink, Save, CheckCircle2 } from 'lucide-react';

export default function AdminSeoPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.success) setSettings(data.settings);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    setSavedMessage(null);

    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) {
        setSavedMessage('SEO configurations successfully updated.');
        setTimeout(() => setSavedMessage(null), 3500);
      }
    } finally {
      setSaving(false);
    }
  };

  if (!settings) {
    return <div className="p-8 text-xs text-slate-400">Loading SEO dashboard...</div>;
  }

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="Search Engine Optimization & Schema.org Management"
        subtitle="Configure canonical base URLs, Schema.org JSON-LD structured data, Google News sitemap, and Google Search Console tokens."
      />

      <div className="p-6 max-w-5xl space-y-8">
        {savedMessage && (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-400 text-xs font-semibold flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{savedMessage}</span>
          </div>
        )}

        {/* Live Sitemap & Robots Inspector Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-stone-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Dynamic Google News XML Sitemap</span>
              <h4 className="font-mono text-sm font-semibold text-slate-900 dark:text-white mt-1">/sitemap.xml</h4>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5">Live • Auto-updates on article publishing</p>
            </div>
            <a
              href="/sitemap.xml"
              target="_blank"
              className="p-2.5 rounded-xl bg-sand-100 dark:bg-slate-800 text-forest-800 dark:text-emerald-400 hover:bg-forest-900 hover:text-white transition-colors"
              title="Inspect Live XML Sitemap"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-stone-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Crawler Directives</span>
              <h4 className="font-mono text-sm font-semibold text-slate-900 dark:text-white mt-1">/robots.txt</h4>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5">Protects admin & api endpoints</p>
            </div>
            <a
              href="/robots.txt"
              target="_blank"
              className="p-2.5 rounded-xl bg-sand-100 dark:bg-slate-800 text-forest-800 dark:text-emerald-400 hover:bg-forest-900 hover:text-white transition-colors"
              title="Inspect Live Robots.txt"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-8">
          {/* Canonical & Global Meta */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Globe className="w-5 h-5 text-forest-800 dark:text-emerald-400" />
              <span>Canonical Domain & Global Meta</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Canonical Base URL
                </label>
                <input
                  type="text"
                  value={settings.siteUrl}
                  onChange={(e) => setSettings({ ...settings, siteUrl: e.target.value })}
                  placeholder="https://lumierederma.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 dark:border-slate-700 bg-sand-50/50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:border-forest-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Google Analytics 4 Measurement ID
                </label>
                <input
                  type="text"
                  value={settings.seoSettings.googleAnalyticsId}
                  onChange={(e) => setSettings({
                    ...settings,
                    seoSettings: { ...settings.seoSettings, googleAnalyticsId: e.target.value }
                  })}
                  placeholder="G-XXXXXXXXXX"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 dark:border-slate-700 bg-sand-50/50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:border-forest-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Google Search Console HTML Verification Meta Tag
              </label>
              <input
                type="text"
                value={settings.seoSettings.googleSearchConsoleVerification}
                onChange={(e) => setSettings({
                  ...settings,
                  seoSettings: { ...settings.seoSettings, googleSearchConsoleVerification: e.target.value }
                })}
                placeholder="google-site-verification=XXXXXXXXXXXXXXXXXXXXXX"
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 dark:border-slate-700 bg-sand-50/50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:border-forest-800"
              />
            </div>
          </div>

          {/* Schema.org Types Injected */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Code className="w-5 h-5 text-forest-800 dark:text-emerald-400" />
              <span>Active Structured Data Schemas</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-sand-50 dark:bg-slate-800 border border-sand-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-800 dark:text-white">MedicalWebPage / NewsArticle Schema</span>
                  <p className="text-slate-400 text-[11px]">Includes board-certified reviewer attribution and medical audience targeting.</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                  Enabled
                </span>
              </div>

              <div className="p-3 rounded-xl bg-sand-50 dark:bg-slate-800 border border-sand-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-800 dark:text-white">FAQPage Schema</span>
                  <p className="text-slate-400 text-[11px]">Enables rich snippet FAQ accordions directly in Google Search result snippets.</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                  Enabled
                </span>
              </div>

              <div className="p-3 rounded-xl bg-sand-50 dark:bg-slate-800 border border-sand-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-800 dark:text-white">BreadcrumbList & Organization Schema</span>
                  <p className="text-slate-400 text-[11px]">Maps hierarchical navigation for Googlebot and links publishing principles.</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                  Enabled
                </span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-semibold text-xs tracking-wider uppercase transition-colors shadow-md flex items-center space-x-2"
          >
            <Save className="w-4 h-4 text-emerald-400" />
            <span>{saving ? 'Updating...' : 'Save SEO Configuration'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
