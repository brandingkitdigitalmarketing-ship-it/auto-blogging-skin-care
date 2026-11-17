import React from 'react';
import { db } from '@/lib/db';
import { NewsTicker } from '@/components/layout/NewsTicker';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AdBanner } from '@/components/layout/AdBanner';
import { HeroSection } from '@/components/home/HeroSection';
import { BreakingNews } from '@/components/home/BreakingNews';
import { LatestArticles } from '@/components/home/LatestArticles';
import { TrendingSkincare } from '@/components/home/TrendingSkincare';
import { HaircareGuides } from '@/components/home/HaircareGuides';
import { DermAdvice } from '@/components/home/DermAdvice';
import { ProductReviews } from '@/components/home/ProductReviews';
import { IngredientsSection } from '@/components/home/IngredientsSection';
import { PopularArticles } from '@/components/home/PopularArticles';
import { NewsletterBox } from '@/components/home/NewsletterBox';
import { SeoEngineService } from '@/lib/services/seo-engine';

export const revalidate = 60; // ISR revalidate every 60s for fresh auto-published articles

export default function HomePage() {
  const articles = db.getArticles({ status: 'published' });
  const ingredients = db.getIngredients();
  const orgSchema = SeoEngineService.generateOrganizationSchema();

  const tickerItems = articles.slice(0, 5).map(a => ({
    title: a.title,
    slug: a.slug,
    tag: a.categorySlug.toUpperCase(),
  }));

  return (
    <>
      {/* Schema.org Organization Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-slate-950 font-sans transition-colors">
        {/* 1. Top announcement/news ticker */}
        <NewsTicker items={tickerItems} />

        {/* 2. Website logo and navigation menu */}
        <Header />

        {/* Top Header Ad Placement */}
        <AdBanner slot="header" />

        <main className="flex-1">
          {/* 3. Main hero section featuring the latest trending skincare and haircare news */}
          <HeroSection articles={articles} />

          {/* 4. Breaking beauty news section */}
          <BreakingNews articles={articles} />

          {/* 5. Latest articles section */}
          <LatestArticles articles={articles} />

          {/* In-Feed Mid-Page Ad Placement */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AdBanner slot="in-article" />
          </div>

          {/* 6. Trending skincare topics */}
          <TrendingSkincare articles={articles} />

          {/* 7. Haircare tips and guides */}
          <HaircareGuides articles={articles} />

          {/* 8. Dermatologist-approved advice */}
          <DermAdvice />

          {/* 9. Product reviews and comparisons */}
          <ProductReviews />

          {/* 10. Beauty ingredients explained */}
          <IngredientsSection ingredients={ingredients} />

          {/* 11. Popular articles */}
          <PopularArticles articles={articles} />

          {/* 12. Newsletter subscription */}
          <NewsletterBox />
        </main>

        {/* 13. Footer with important website links and social media */}
        <Footer />
      </div>
    </>
  );
}
