'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { NewsTicker } from '@/components/layout/NewsTicker';
import { Mail, Send, CheckCircle2, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'editorial', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-slate-950 font-sans transition-colors">
      <NewsTicker />
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-3 py-1 rounded-full">
            Communications & Editorial Inquiries
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3">
            Contact Lumière Derma Journal
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
            Have a scientific question, clinical correction, research submission, or press inquiry? Our editorial staff responds to verified inquiries within 48 business hours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Contact Details */}
          <div className="md:col-span-5 bg-forest-950 text-white rounded-3xl p-6 sm:p-8 border border-forest-800 space-y-6">
            <h3 className="font-serif text-xl font-bold text-white">Editorial Bureau</h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Lumière Derma Journal operates editorial offices and a clinical advisory network across Cambridge, MA and Geneva, Switzerland.
            </p>

            <div className="space-y-4 text-xs text-stone-300">
              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white">General Editorial:</strong>
                  <span>editorial@lumierederma.com</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white">Medical Board Corrections:</strong>
                  <span>corrections@lumierederma.com</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white">Corporate Bureau:</strong>
                  <span>450 Kendall Square, Cambridge, MA 02142</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-slate-800 shadow-sm">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">
                  Message Dispatched Successfully
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 max-w-sm mx-auto">
                  Thank you for contacting our editorial office. Our clinical communications team has received your transmission.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 dark:border-slate-700 bg-sand-50/50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-forest-800"
                    placeholder="Dr. Jane Smith or your name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 dark:border-slate-700 bg-sand-50/50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-forest-800"
                    placeholder="name@example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Inquiry Category
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 dark:border-slate-700 bg-sand-50/50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-forest-800"
                  >
                    <option value="editorial">Editorial Inquiry / Reader Question</option>
                    <option value="correction">Clinical Correction or Errata Report</option>
                    <option value="pr">Cosmetics Science PR & Product Submission</option>
                    <option value="licensing">Syndication & Google News Licensing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 dark:border-slate-700 bg-sand-50/50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-forest-800"
                    placeholder="Detail your question, research reference, or correction..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-semibold text-xs tracking-wider uppercase transition-colors shadow-sm flex items-center justify-center space-x-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit to Editorial Team</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
