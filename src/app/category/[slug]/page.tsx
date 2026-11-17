import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/lib/db';
import { formatDate } from '@/lib/utils';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { NewsTicker } from '@/components/layout/NewsTicker';
import { AdBanner } from '@/components/layout/AdBanner';
import { NewsletterBox } from '@/components/home/NewsletterBox';
import { Clock, ShieldCheck, ArrowRight, ChevronRight, Sparkles } from 'lucide-react';

interface CategoryPageProps {
  params: { slug: string };
  searchParams: { sub?: string };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = db.getCategoryBySlug(params.slug);
  const settings = db.getSiteSettings();

  if (!category) {
    return { title: 'Category Not Found | Lumière Derma Journal' };
  }

  return {
    title: `${category.name} Science, News & Clinical Protocols | ${settings.siteName}`,
    description: category.description,
    openGraph: {
      title: `${category.name} | ${settings.siteName}`,
      description: category.description,
      images: category.featuredImage ? [category.featuredImage] : [],
    },
  };
}

export default function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const category = db.getCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  const subFilter = searchParams.sub;
  let articles = db.getArticles({
    category: category.slug,
    status: 'published',
  });

  if (subFilter) {
    articles = articles.filter(a => a.subcategory?.toLowerCase() === subFilter.toLowerCase());
  }

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-slate-950 font-sans transition-colors">
      <NewsTicker />
      <Header />

      <AdBanner slot="header" />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
          <Link href="/" className="hover:text-forest-800 dark:hover:text-emerald-400 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="capitalize text-slate-900 dark:text-slate-100 font-medium">
            {category.name}
          </span>
          {subFilter && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-forest-800 dark:text-emerald-400 font-semibold">{subFilter}</span>
            </>
          )}
        </nav>

        {/* Category Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-forest-950 text-white p-8 sm:p-12 mb-10 shadow-xl border border-forest-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-forest-900 px-3 py-1 rounded-full border border-forest-700">
              Department of {category.name}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mt-3">
              {category.name} Intelligence & Evidence
            </h1>
            <p className="text-sm sm:text-base text-stone-300 mt-3 leading-relaxed">
              {category.description}
            </p>
            <div className="mt-4 flex items-center space-x-4 text-xs text-stone-400">
              <span>{articles.length} Peer-Reviewed Articles</span>
              <span>•</span>
              <span className="flex items-center space-x-1 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Board-Certified Oversight</span>
              </span>
            </div>
          </div>
        </div>

        {/* Subcategories Filter Pills */}
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Target Focus Area:
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/category/${category.slug}`}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                !subFilter
                  ? 'bg-forest-900 text-white shadow-sm'
                  : 'bg-sand-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-sand-100'
              }`}
            >
              All {category.name}
            </Link>
            {category.subcategories.map(sub => (
              <Link
                key={sub}
                href={`/category/${category.slug}?sub=${encodeURIComponent(sub)}`}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  subFilter === sub
                    ? 'bg-forest-900 text-white shadow-sm'
                    : 'bg-sand-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-sand-100'
                }`}
              >
                {sub}
              </Link>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        {articles.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-stone-200 dark:border-slate-800 p-8">
            <Sparkles className="w-10 h-10 text-forest-800 dark:text-emerald-400 mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">
              No articles currently filed under this specific subcategory
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto">
              Our AI automation engine discovers and files new peer-reviewed articles 3 times daily. Check back at the next publishing cycle or view all {category.name} guides.
            </p>
            <Link
              href={`/category/${category.slug}`}
              className="mt-4 inline-block px-5 py-2 rounded-xl bg-forest-900 text-white text-xs font-semibold"
            >
              Reset Filter
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((art) => (
              <article
                key={art.id}
                className="group flex flex-col justify-between bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-stone-200 dark:border-slate-800 hover:border-forest-700/60 transition-all duration-300 shadow-sm hover:shadow-lg"
              >
                <div>
                  <Link href={`/article/${art.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-stone-100 dark:bg-slate-800">
                    <img
                      src={art.featuredImage}
                      alt={art.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {art.subcategory && (
                      <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-stone-200 text-[10px] font-semibold px-2 py-0.5 rounded">
                        {art.subcategory}
                      </span>
                    )}
                  </Link>

                  <div className="p-5">
                    <div className="flex items-center space-x-2 text-[11px] text-slate-400 mb-2">
                      <span>{formatDate(art.publishDate)}</span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{art.readingTimeMinutes} min</span>
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white group-hover:text-forest-800 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                      <Link href={`/article/${art.slug}`}>
                        {art.title}
                      </Link>
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 mt-2 leading-relaxed">
                      {art.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-3 border-t border-stone-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {art.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-[10px] bg-sand-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/article/${art.slug}`}
                    className="text-xs font-semibold text-forest-800 dark:text-emerald-400 group-hover:translate-x-1 transition-transform flex items-center space-x-1"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <NewsletterBox />
      <Footer />
    </div>
  );
}
