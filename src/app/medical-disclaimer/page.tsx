import React from 'react';
import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { NewsTicker } from '@/components/layout/NewsTicker';
import { ShieldAlert, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Medical & Health Information Disclaimer | Lumière Derma Journal',
  description: 'Important legal and medical disclaimers regarding the educational nature of our skincare, haircare, and dermatology content.',
};

export default function MedicalDisclaimerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-slate-950 font-sans transition-colors">
      <NewsTicker />
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="p-4 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-900 flex items-center space-x-3 mb-8">
          <ShieldAlert className="w-8 h-8 text-amber-600 dark:text-amber-400 shrink-0" />
          <p className="text-xs text-amber-800 dark:text-amber-300 font-medium">
            Please read this disclaimer carefully before relying on any clinical information or product protocols published on Lumière Derma Journal.
          </p>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Medical & Health Disclaimer
        </h1>
        <p className="text-xs text-slate-400 mt-2 font-mono">
          Last Updated: November 2026
        </p>

        <div className="mt-8 space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900 p-8 rounded-2xl border border-stone-200 dark:border-slate-800">
          <section>
            <h2 className="font-serif text-xl font-bold text-slate-900 dark:text-white mb-2">
              1. Not Medical Advice
            </h2>
            <p>
              The content published on <strong>Lumière Derma Journal</strong>—including articles, ingredient breakdowns, product evaluations, and comparative tables—is provided strictly for educational and informational purposes. It is not intended to substitute for professional medical advice, clinical diagnosis, or personalized treatment by a licensed physician or board-certified dermatologist.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-slate-900 dark:text-white mb-2">
              2. No Doctor-Patient Relationship
            </h2>
            <p>
              Accessing, reading, or interacting with our content does not establish a physician-patient relationship between you and Lumière Derma Journal, its contributing writers, or its medical advisory board. Always consult with a qualified dermatologist, trichologist, or primary care provider regarding any persistent skin lesion, atypical mole, sudden hair shedding, or acute inflammatory symptom.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-slate-900 dark:text-white mb-2">
              3. Individual Cutaneous Variability
            </h2>
            <p>
              Cutaneous biology varies considerably based on genetics, Fitzpatrick phototype, baseline barrier integrity, hormonal status, and concurrent pharmaceutical therapies. A regimen or active ingredient shown effective in a clinical trial may still incite allergic contact dermatitis or irritation in specific individuals. Always perform a 48-hour patch test prior to facial application.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-slate-900 dark:text-white mb-2">
              4. Emergency Situations
            </h2>
            <p>
              If you suspect you are experiencing a severe allergic reaction (anaphylaxis, generalized hives, angioedema of the lips or throat, or respiratory difficulty) following the application of any cosmetic or topical agent, call emergency medical services immediately.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
