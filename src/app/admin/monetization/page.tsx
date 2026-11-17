'use client';

import React, { useState, useEffect } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { SiteSettings } from '@/lib/db/schema';
import { DollarSign, Save, CheckCircle2, ShieldCheck, ToggleLeft, ToggleRight, Layers } from 'lucide-react';

export default function AdminMonetizationPage() {
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
        setSavedMessage('Monetization & Ad units updated successfully.');
        setTimeout(() => setSavedMessage(null), 3500);
      }
    } finally {
      setSaving(false);
    }
  };

  if (!settings) {
    return <div className="p-8 text-xs text-slate-400">Loading monetization dashboard...</div>;
  }

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="Monetization & Advertisement Dashboard"
        subtitle="Manage Google AdSense units, header/in-article placements, affiliate partnerships, and sponsored medical content disclaimers."
      />

      <div className="p-6 max-w-5xl space-y-8">
        {savedMessage && (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-400 text-xs font-semibold flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{savedMessage}</span>
          </div>
        )}

        {/* Revenue Performance Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-stone-200 dark:border-slate-800 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">AdSense RPM (Est.)</span>
            <div className="font-serif text-2xl font-bold text-slate-900 dark:text-white mt-2">$28.40</div>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1">High-value dermatology CPC</p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-stone-200 dark:border-slate-800 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Affiliate Conversion Rate</span>
            <div className="font-serif text-2xl font-bold text-slate-900 dark:text-white mt-2">4.6%</div>
            <p className="text-[11px] text-slate-400 mt-1">Clinical skincare & barrier creams</p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-stone-200 dark:border-slate-800 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Newsletter Sponsorships</span>
            <div className="font-serif text-2xl font-bold text-slate-900 dark:text-white mt-2">Booked Out</div>
            <p className="text-[11px] text-slate-400 mt-1">Lumière Clinical Dispatch</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-8">
          {/* Google AdSense Configuration */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-slate-800 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-forest-800 dark:text-emerald-400" />
                  <span>Google AdSense Settings</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Connect your verified AdSense publisher account to display targeted healthcare and cosmetic ads.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSettings({
                  ...settings,
                  monetization: {
                    ...settings.monetization,
                    adsenseEnabled: !settings.monetization.adsenseEnabled
                  }
                })}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                  settings.monetization.adsenseEnabled ? 'bg-forest-900 dark:bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    settings.monetization.adsenseEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  AdSense Client / Publisher ID
                </label>
                <input
                  type="text"
                  value={settings.monetization.adsenseClientId}
                  onChange={(e) => setSettings({
                    ...settings,
                    monetization: { ...settings.monetization, adsenseClientId: e.target.value }
                  })}
                  placeholder="ca-pub-XXXXXXXXXXXXXXXX"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 dark:border-slate-700 bg-sand-50/50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:border-forest-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Header Leaderboard Ad Unit (728x90)
                </label>
                <input
                  type="text"
                  value={settings.monetization.headerAdSlot}
                  onChange={(e) => setSettings({
                    ...settings,
                    monetization: { ...settings.monetization, headerAdSlot: e.target.value }
                  })}
                  placeholder="9876543210"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 dark:border-slate-700 bg-sand-50/50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:border-forest-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  In-Article Mid-Roll Ad Unit
                </label>
                <input
                  type="text"
                  value={settings.monetization.inArticleAdSlot}
                  onChange={(e) => setSettings({
                    ...settings,
                    monetization: { ...settings.monetization, inArticleAdSlot: e.target.value }
                  })}
                  placeholder="9876543212"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 dark:border-slate-700 bg-sand-50/50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:border-forest-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Sidebar Skyscraper Ad Unit (300x250 / 300x600)
                </label>
                <input
                  type="text"
                  value={settings.monetization.sidebarAdSlot}
                  onChange={(e) => setSettings({
                    ...settings,
                    monetization: { ...settings.monetization, sidebarAdSlot: e.target.value }
                  })}
                  placeholder="9876543211"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 dark:border-slate-700 bg-sand-50/50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:border-forest-800"
                />
              </div>
            </div>
          </div>

          {/* Affiliate & Sponsored Settings */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">
              Affiliate Disclosures & Sponsored Tagging
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Sponsored Medical Content Label
              </label>
              <input
                type="text"
                value={settings.monetization.sponsoredContentLabel}
                onChange={(e) => setSettings({
                  ...settings,
                  monetization: { ...settings.monetization, sponsoredContentLabel: e.target.value }
                })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 dark:border-slate-700 bg-sand-50/50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-forest-800"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-semibold text-xs tracking-wider uppercase transition-colors shadow-md flex items-center space-x-2"
          >
            <Save className="w-4 h-4 text-emerald-400" />
            <span>{saving ? 'Updating...' : 'Save Monetization Settings'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
