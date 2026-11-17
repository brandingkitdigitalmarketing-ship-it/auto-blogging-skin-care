import React from 'react';
import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { NewsTicker } from '@/components/layout/NewsTicker';
import { ShieldCheck, CheckCircle2, FileText, AlertCircle, RefreshCw } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Editorial Policy & Fact-Checking Process | Lumière Derma Journal',
  description: 'Our 5-step peer-reviewed verification process, clinical sourcing guidelines, AI content governance, and medical corrections protocols.',
};

export default function EditorialPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-slate-950 font-sans transition-colors">
      <NewsTicker />
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-3 py-1 rounded-full">
          Clinical Standards & Governance
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mt-4">
          Editorial & Fact-Checking Policy
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
          At Lumière Derma Journal, scientific rigor is not an afterthought; it is our foundational premise. Readers depend on our reporting to make crucial decisions regarding their skin, hair, and overall dermatological well-being.
        </p>

        <div className="prose prose-stone dark:prose-invert max-w-none mt-10 space-y-8 text-sm leading-relaxed">
          <section className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-stone-200 dark:border-slate-800">
            <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-white mb-4">
              1. Our 5-Step Clinical Verification Cycle
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-slate-700 dark:text-slate-300">
              <li>
                <strong>Primary Literature Sourcing:</strong> Every article must cite peer-reviewed clinical studies from accredited journals (e.g., JAAD, British Journal of Dermatology, Lancet, JAMA Dermatology) or government regulatory bodies (FDA, EMA). We reject unverified manufacturer press releases as primary scientific proof.
              </li>
              <li>
                <strong>Dermatologist & Trichologist Review:</strong> Prior to public dissemination, articles undergoing clinical claims must be evaluated by a board-certified physician for physiological accuracy, dosage safety, and contraindications.
              </li>
              <li>
                <strong>Conflict of Interest Vetting:</strong> Authors and reviewers must disclose any commercial affiliations with cosmetic pharmaceutical entities. Articles featuring sponsored partner slots carry explicit labeling.
              </li>
              <li>
                <strong>Safety & Dosage Guardrails:</strong> We explicitly prohibit content that encourages hazardous DIY cosmetic chemical peels, unregulated prescription drug compounding, or unsupported disease cures.
              </li>
              <li>
                <strong>Periodic Audit & Re-Verification:</strong> Because cosmetic research and regulatory monographs evolve continuously, our medical board reviews archived articles annually to ensure ongoing clinical validity.
              </li>
            </ol>
          </section>

          <section className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-stone-200 dark:border-slate-800">
            <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-white mb-4">
              2. AI Content Automation Transparency
            </h2>
            <p className="text-slate-700 dark:text-slate-300">
              Lumière Derma Journal leverages advanced artificial intelligence models to assist with trending keyword identification, initial drafting of cosmetic chemistry literature, and indexing clinical PubMed abstracts.
            </p>
            <p className="text-slate-700 dark:text-slate-300 mt-3">
              However, our AI writing systems operate under strict programmatic medical guardrails:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3 text-slate-700 dark:text-slate-300">
              <li>AI is barred from fabricating medical citations or inventing statistical outcomes.</li>
              <li>Medical claims require secondary cross-validation against established dermatological databases.</li>
              <li>Any article generated with AI assistance is clearly tagged in metadata as AI-assisted journalism.</li>
            </ul>
          </section>

          <section id="corrections" className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-stone-200 dark:border-slate-800">
            <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-white mb-4">
              3. Corrections & Scientific Errata Policy
            </h2>
            <p className="text-slate-700 dark:text-slate-300">
              If an error of fact or clinical interpretation is discovered in any published piece, we enact swift corrections. Substantive amendments are documented with a visible &ldquo;Correction Note&rdquo; at the top of the article detailing the date and nature of the revision.
            </p>
            <p className="text-slate-700 dark:text-slate-300 mt-2">
              Readers and researchers are encouraged to submit corrections directly to our editorial team at{' '}
              <a href="mailto:editorial@lumierederma.com" className="text-forest-800 dark:text-emerald-400 font-semibold underline">
                editorial@lumierederma.com
              </a>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
