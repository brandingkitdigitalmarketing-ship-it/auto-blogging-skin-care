import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/lib/db';
import { formatDate } from '@/lib/utils';
import { NewsTicker } from '@/components/layout/NewsTicker';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AdBanner } from '@/components/layout/AdBanner';
import { MedicalReviewBadge } from '@/components/article/MedicalReviewBadge';
import { TableOfContents } from '@/components/article/TableOfContents';
import { SocialShare } from '@/components/article/SocialShare';
import { MarkdownRenderer } from '@/components/article/MarkdownRenderer';
import { AffiliateBox } from '@/components/article/AffiliateBox';
import { FaqAccordion } from '@/components/article/FaqAccordion';
import { ReferenceList } from '@/components/article/ReferenceList';
import { AuthorCard } from '@/components/article/AuthorCard';
import { RelatedArticles } from '@/components/article/RelatedArticles';
import { NewsletterBox } from '@/components/home/NewsletterBox';
import { SeoEngineService } from '@/lib/services/seo-engine';
import { Clock, Eye, Calendar, ChevronRight, ShieldCheck, Sparkles } from 'lucide-react';

interface ArticlePageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = db.getArticleBySlug(params.slug);
  const settings = db.getSiteSettings();

  if (!article) {
    return {
      title: 'Article Not Found | Lumière Derma Journal',
    };
  }

  const siteUrl = settings.siteUrl.replace(/\/$/, '');
  const canonicalUrl = `${siteUrl}/article/${article.slug}`;

  return {
    title: `${article.seo.metaTitle || article.title} | ${settings.siteName}`,
    description: article.seo.metaDescription || article.excerpt,
    keywords: article.tags,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: canonicalUrl,
      siteName: settings.siteName,
      images: [
        {
          url: article.featuredImage,
          width: 1200,
          height: 630,
          alt: article.imageAlt,
        },
      ],
      type: 'article',
      publishedTime: article.publishDate,
      modifiedTime: article.updatedDate,
      authors: [article.authorId],
      section: article.categorySlug,
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.featuredImage],
    },
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = db.getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  // Increment view counter
  db.incrementArticleViews(params.slug);

  const author = db.getAuthorById(article.authorId);
  const reviewer = article.medicalReviewerId ? db.getAuthorById(article.medicalReviewerId) : null;
  const settings = db.getSiteSettings();
  const siteUrl = settings.siteUrl.replace(/\/$/, '');
  const articleUrl = `${siteUrl}/article/${article.slug}`;

  // Related articles in same category
  const related = db.getArticles({
    category: article.categorySlug,
    status: 'published',
    limit: 4,
  }).filter(a => a.id !== article.id);

  // Generate Schemas
  const articleSchema = SeoEngineService.generateArticleSchema(article, author);
  const faqSchema = SeoEngineService.generateFaqSchema(article);
  const breadcrumbSchema = SeoEngineService.generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: article.categorySlug, url: `/category/${article.categorySlug}` },
    { name: article.title, url: `/article/${article.slug}` },
  ]);

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-slate-950 font-sans transition-colors">
        <NewsTicker />
        <Header />

        {/* Top Header Ad */}
        <AdBanner slot="header" />

        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 mb-6 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-forest-800 dark:hover:text-emerald-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <Link
              href={`/category/${article.categorySlug}`}
              className="capitalize hover:text-forest-800 dark:hover:text-emerald-400 transition-colors"
            >
              {article.categorySlug.replace('-', ' ')}
            </Link>
            {article.subcategory && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="text-slate-400">{article.subcategory}</span>
              </>
            )}
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-800 dark:text-slate-200 font-medium truncate max-w-xs">
              {article.title}
            </span>
          </nav>

          {/* Article Header */}
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Link
                href={`/category/${article.categorySlug}`}
                className="bg-forest-900 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border border-forest-800"
              >
                {article.categorySlug.replace('-', ' ')}
              </Link>
              {article.isTrending && (
                <span className="bg-blush-100 dark:bg-blush-950/70 text-blush-600 dark:text-blush-300 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center space-x-1">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>Trending Topic</span>
                </span>
              )}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight max-w-4xl">
              {article.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mt-4 leading-relaxed max-w-3xl">
              {article.excerpt}
            </p>

            {/* Meta Bar */}
            <div className="mt-6 pt-4 border-t border-stone-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex flex-wrap items-center gap-4">
                <span className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4 text-forest-700 dark:text-emerald-400" />
                  <span>Published {formatDate(article.publishDate)}</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-4 h-4 text-forest-700 dark:text-emerald-400" />
                  <span>{article.readingTimeMinutes} min read</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Eye className="w-4 h-4 text-forest-700 dark:text-emerald-400" />
                  <span>{article.views.toLocaleString()} reads</span>
                </span>
              </div>

              {/* Social Share */}
              <SocialShare title={article.title} url={articleUrl} />
            </div>
          </header>

          {/* Medically Reviewed Callout */}
          {article.isMedicallyReviewed && (
            <div className="mb-8">
              <MedicalReviewBadge
                author={author}
                reviewer={reviewer}
                publishDate={article.publishDate}
              />
            </div>
          )}

          {/* Featured Image */}
          <figure className="mb-10 rounded-3xl overflow-hidden shadow-xl bg-stone-100 dark:bg-slate-800 border border-stone-200 dark:border-slate-800">
            <div className="relative aspect-[16/9] w-full">
              <img
                src={article.featuredImage}
                alt={article.imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
            {article.imageCaption && (
              <figcaption className="p-3.5 bg-sand-50 dark:bg-slate-900 text-xs text-slate-500 dark:text-slate-400 italic text-center border-t border-sand-200 dark:border-slate-800">
                {article.imageCaption}
              </figcaption>
            )}
          </figure>

          {/* 2-Column Content Layout: Main Text (8 Cols) + Sticky Sidebar (4 Cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Main Content Column */}
            <div className="lg:col-span-8">
              {/* Rich Markdown Article Body */}
              <MarkdownRenderer content={article.content} />

              {/* In-Article Advertisement Slot */}
              <AdBanner slot="in-article" />

              {/* Affiliate Product Recommendation Box */}
              {article.affiliateProducts && article.affiliateProducts.length > 0 && (
                <AffiliateBox products={article.affiliateProducts} />
              )}

              {/* Frequently Asked Questions */}
              {article.faqs && article.faqs.length > 0 && (
                <FaqAccordion faqs={article.faqs} />
              )}

              {/* Scientific References */}
              {article.references && article.references.length > 0 && (
                <ReferenceList references={article.references} />
              )}

              {/* Author Bio Card */}
              {author && <AuthorCard author={author} />}

              {/* Tags List */}
              <div className="my-6 pt-4 border-t border-stone-200 dark:border-slate-800 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-2">
                  Tags:
                </span>
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-sand-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-sand-200 dark:border-slate-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Bottom Share Bar */}
              <div className="p-4 bg-sand-50 dark:bg-slate-800/40 rounded-2xl border border-sand-200 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-serif font-bold text-slate-900 dark:text-white">
                  Found this clinical guide insightful?
                </span>
                <SocialShare title={article.title} url={articleUrl} />
              </div>
            </div>

            {/* Sticky Sidebar */}
            <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-28">
              {/* Table of Contents */}
              <TableOfContents content={article.content} />

              {/* Sidebar Ad Unit */}
              <AdBanner slot="sidebar" />

              {/* Editorial Quality Assurance Box */}
              <div className="bg-sand-50 dark:bg-slate-800/50 rounded-2xl p-5 border border-sand-200 dark:border-slate-800">
                <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-forest-800 dark:text-emerald-400 mb-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Clinical Oversight</span>
                </div>
                <h4 className="font-serif font-bold text-slate-900 dark:text-white text-sm">
                  Why You Can Trust Our Advice
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  Lumière Derma Journal never accepts compensation for positive medical claims. All ingredients cited are cross-referenced with randomized controlled trials in PubMed and Cochrane Library reviews.
                </p>
                <Link
                  href="/editorial-policy"
                  className="mt-3 inline-block text-xs font-semibold text-forest-800 dark:text-emerald-400 hover:underline"
                >
                  Our Medical Review Process →
                </Link>
              </div>
            </aside>
          </div>

          {/* Related Articles Section */}
          <RelatedArticles articles={related} currentCategory={article.categorySlug} />
        </main>

        <NewsletterBox />
        <Footer />
      </div>
    </>
  );
}
