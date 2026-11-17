import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Check, X, Quote, Stethoscope, ArrowRight } from 'lucide-react';

export function DermAdvice() {
  const dosAndDonts = [
    {
      do: 'Apply humectants (Hyaluronic Acid & Glycerin) exclusively to damp skin to prevent transepidermal water suction.',
      dont: 'Never apply pure anhydrous humectants in dry air-conditioned rooms without an occlusive barrier cream.',
    },
    {
      do: 'Buffer potent retinoids (Tretinoin, Retinal) with a physiological ceramide lotion during the initial 4 weeks.',
      dont: 'Do not layer chemical AHA/BHA exfoliating toners simultaneously with prescription retinoids.',
    },
    {
      do: 'Leave medical antifungal shampoos (Ketoconazole) on the scalp for 5 full minutes prior to rinsing.',
      dont: 'Do not massage heavy culinary oils (coconut, olive) into a flaky scalp with active seborrheic dermatitis.',
    },
    {
      do: 'Use broad-spectrum SPF 50+ with proven UVA1 coverage daily, even on overcast or rainy days.',
      dont: 'Do not rely solely on SPF infused into makeup powders or foundations for photoprotection.',
    },
  ];

  return (
    <section className="py-12 bg-forest-950 text-white transition-colors relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-emerald-400">
              <Stethoscope className="w-4 h-4 text-emerald-400" />
              <span>Physician-Verified Guidance</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
              Dermatologist-Approved Clinical Pearls
            </h2>
          </div>
          <Link
            href="/about"
            className="text-xs font-medium text-emerald-300 hover:text-white underline flex items-center space-x-1"
          >
            <span>Meet Our Board-Certified Medical Reviewers →</span>
          </Link>
        </div>

        {/* 2-Column Clinical Section: Quote / Bio on Left, Do's & Don'ts on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Doctor Quote Card */}
          <div className="lg:col-span-5 bg-forest-900/80 border border-forest-800 rounded-3xl p-6 sm:p-8 relative">
            <Quote className="w-10 h-10 text-emerald-500/20 absolute top-6 right-6" />

            <div className="flex items-center space-x-4 mb-4">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200"
                alt="Dr. Claire Dupont MD FAAD"
                className="w-14 h-14 rounded-full object-cover border-2 border-emerald-400"
              />
              <div>
                <h4 className="font-serif font-bold text-white text-base">Dr. Claire Dupont, MD, FAAD</h4>
                <p className="text-xs text-emerald-400 font-medium">Chief Medical Editor • Harvard Medical School</p>
                <p className="text-[10px] text-stone-400">Fellow of the American Academy of Dermatology</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed italic">
              &ldquo;The modern skincare consumer is chronically over-treating their stratum corneum. The most transformative results in my clinical practice arise not from adding ten active serums, but from restoring lipid lamellar integrity and committing to disciplined photoprotection.&rdquo;
            </p>

            <div className="mt-6 pt-4 border-t border-forest-800 flex items-center justify-between text-xs text-stone-300">
              <span className="flex items-center space-x-1 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Independent Reviewer</span>
              </span>
              <Link href="/editorial-policy" className="hover:text-white underline">
                Ethics Policy
              </Link>
            </div>
          </div>

          {/* Do's and Don'ts Table */}
          <div className="lg:col-span-7 bg-forest-900/50 border border-forest-800 rounded-3xl p-6 sm:p-8">
            <h3 className="font-serif text-lg font-bold text-white mb-4 flex items-center space-x-2">
              <span>The Cutaneous Protocol: Clinical Do&apos;s & Don&apos;ts</span>
            </h3>

            <div className="space-y-4">
              {dosAndDonts.map((item, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-forest-950/60 border border-forest-800/80 text-xs"
                >
                  <div className="flex items-start space-x-2 text-emerald-300">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-stone-200 leading-snug"><strong className="text-emerald-400">DO:</strong> {item.do}</span>
                  </div>
                  <div className="flex items-start space-x-2 text-rose-300">
                    <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span className="text-stone-300 leading-snug"><strong className="text-rose-400">DON&apos;T:</strong> {item.dont}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
