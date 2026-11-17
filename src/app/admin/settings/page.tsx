'use client';

import React, { useState, useEffect } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { SiteSettings } from '@/lib/db/schema';
import { Settings, Save, CheckCircle2, ShieldCheck, Key, Clock, Cpu } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.success) setSettings(data.settings);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
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
        setSavedMessage('Settings successfully persisted to server.');
        setTimeout(() => setSavedMessage(null), 3500);
      } else {
        alert(`Save failed: ${data.error}`);
      }
    } catch (err: any) {
      alert(`Save error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) {
    return (
      <div className="flex-1 flex items-center justify-center p-12 text-slate-400 text-xs">
        Loading AI Automation Configuration...
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="AI Automation & Publishing Settings"
        subtitle="Configure daily publishing schedules, API credentials, target word counts, and editorial review requirements."
      />

      <div className="p-6 max-w-5xl space-y-8">
        {savedMessage && (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-400 text-xs font-semibold flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{savedMessage}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-8">
          {/* AI Provider & API Keys */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-slate-800 shadow-sm space-y-5">
            <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Key className="w-5 h-5 text-forest-800 dark:text-emerald-400" />
              <span>AI Provider & Neural Model Settings</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Active Intelligence Engine
                </label>
                <select
                  value={settings.aiSettings.provider}
                  onChange={(e: any) => setSettings({
                    ...settings,
                    aiSettings: { ...settings.aiSettings, provider: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 dark:border-slate-700 bg-sand-50/50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-forest-800"
                >
                  <option value="builtin">Built-In Clinical Dermatology AI (Zero Config Required)</option>
                  <option value="openai">OpenAI API (GPT-4o / GPT-4o-mini)</option>
                  <option value="gemini">Google Gemini API (Gemini 1.5 Flash / Pro)</option>
                </select>
                <p className="text-[11px] text-slate-400 mt-1">
                  Built-In Clinical AI produces 1,400+ word referenced articles out-of-the-box without requiring third-party API keys.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  API Key (Stored Securely on Server)
                </label>
                <input
                  type="password"
                  value={settings.aiSettings.apiKey}
                  onChange={(e) => setSettings({
                    ...settings,
                    aiSettings: { ...settings.aiSettings, apiKey: e.target.value }
                  })}
                  placeholder="sk-... or AIza..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 dark:border-slate-700 bg-sand-50/50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:border-forest-800"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Leave blank to utilize the Built-In Dermatology Knowledge Engine.
                </p>
              </div>
            </div>
          </div>

          {/* Publishing Frequency & Time Automation */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-slate-800 shadow-sm space-y-5">
            <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Clock className="w-5 h-5 text-forest-800 dark:text-emerald-400" />
              <span>Automated Daily Publishing Schedule</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Articles Published Per Day
                </label>
                <select
                  value={settings.aiSettings.dailyPublishCount}
                  onChange={(e) => setSettings({
                    ...settings,
                    aiSettings: { ...settings.aiSettings, dailyPublishCount: parseInt(e.target.value) }
                  })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 dark:border-slate-700 bg-sand-50/50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none"
                >
                  <option value={1}>1 Article / Day</option>
                  <option value={2}>2 Articles / Day</option>
                  <option value={3}>3 Articles / Day (Recommended Default)</option>
                  <option value={5}>5 Articles / Day</option>
                  <option value={8}>8 Articles / Day</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Target Word Count Length
                </label>
                <select
                  value={settings.aiSettings.targetWordCount}
                  onChange={(e) => setSettings({
                    ...settings,
                    aiSettings: { ...settings.aiSettings, targetWordCount: parseInt(e.target.value) }
                  })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 dark:border-slate-700 bg-sand-50/50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none"
                >
                  <option value={1000}>1,000 - 1,200 Words (Digest)</option>
                  <option value={1400}>1,400 - 1,600 Words (Standard Editorial)</option>
                  <option value={1800}>1,800+ Words (Exhaustive Deep Dive)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Publishing Times
                </label>
                <div className="flex gap-1.5 text-xs">
                  {settings.aiSettings.publishTimes.map((time, idx) => (
                    <span key={idx} className="px-2.5 py-2 rounded-xl bg-sand-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono font-semibold">
                      {time}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Auto-Publish Toggle vs Editorial Approval Mode */}
            <div className="pt-4 border-t border-stone-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Direct Auto-Publishing Mode
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  When enabled, generated articles go live immediately on schedule. When disabled, articles are saved as drafts for editorial review.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSettings({
                  ...settings,
                  aiSettings: { ...settings.aiSettings, autoPublish: !settings.aiSettings.autoPublish }
                })}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  settings.aiSettings.autoPublish ? 'bg-forest-900 dark:bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    settings.aiSettings.autoPublish ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-semibold text-xs tracking-wider uppercase transition-colors shadow-md flex items-center space-x-2"
          >
            <Save className="w-4 h-4 text-emerald-400" />
            <span>{saving ? 'Persisting Configuration...' : 'Save AI Automation Settings'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
