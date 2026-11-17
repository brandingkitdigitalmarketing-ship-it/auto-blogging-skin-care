import React from 'react';
import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { NewsTicker } from '@/components/layout/NewsTicker';

export const metadata: Metadata = {
  title: 'Privacy Policy | Lumière Derma Journal',
  description: 'Our privacy standards, cookie handling, Google Analytics 4 tracking, and data protection practices.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-slate-950 font-sans transition-colors">
      <NewsTicker />
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-400 mt-2 font-mono">
          Last Updated: November 2026
        </p>

        <div className="mt-8 space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900 p-8 rounded-2xl border border-stone-200 dark:border-slate-800">
          <p>
            Lumière Derma Journal (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting your online privacy. This Privacy Policy outlines our practices regarding data collection, usage, and protection when you visit our publication.
          </p>

          <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white mt-4">1. Information We Collect</h3>
          <p>
            We may collect information you voluntarily provide, such as your email address when subscribing to the Lumière Clinical Dispatch newsletter, and technical usage data (including browser type, IP address, and pages visited) collected via Google Analytics 4 and server logs.
          </p>

          <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white mt-4">2. Cookies and Web Beacons</h3>
          <p>
            We utilize standard browser cookies and local storage tokens to remember your theme preference (Dark Mode / Light Mode) and analyze aggregate reader traffic patterns. Third-party partners, including Google AdSense, may also serve cookies for ad delivery.
          </p>

          <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white mt-4">3. Data Security</h3>
          <p>
            We implement industry-standard encryption, SSL transmission protocols, and secure cloud storage to protect your personal data from unauthorized access or disclosure.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
