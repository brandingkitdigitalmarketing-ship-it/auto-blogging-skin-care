import { Article, Author } from '../db/schema';
import { db } from '../db';

export class SeoEngineService {
  /**
   * Generates Schema.org JSON-LD for an Article / MedicalWebPage
   */
  public static generateArticleSchema(article: Article, author?: Author | null) {
    const settings = db.getSiteSettings();
    const siteUrl = settings.siteUrl.replace(/\/$/, '');
    const articleUrl = `${siteUrl}/article/${article.slug}`;

    return {
      '@context': 'https://schema.org',
      '@type': article.isMedicallyReviewed ? 'MedicalWebPage' : 'NewsArticle',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': articleUrl,
      },
      headline: article.seo.metaTitle || article.title,
      description: article.seo.metaDescription || article.excerpt,
      image: [article.featuredImage],
      datePublished: article.publishDate,
      dateModified: article.updatedDate || article.publishDate,
      author: {
        '@type': 'Person',
        name: author ? author.name : 'Dr. Claire Dupont, MD, FAAD',
        jobTitle: author ? author.role : 'Board-Certified Dermatologist',
        url: author ? `${siteUrl}/about#${author.slug}` : `${siteUrl}/about`,
      },
      publisher: {
        '@type': 'Organization',
        name: settings.siteName,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/logo.png`,
        },
      },
      keywords: article.tags.join(', '),
      articleSection: article.categorySlug,
      wordCount: article.content.split(/\s+/).length,
      medicalAudience: {
        '@type': 'MedicalAudience',
        audienceType: 'Patients and General Public seeking evidence-based dermatology advice',
      },
    };
  }

  /**
   * Generates FAQ Schema (FAQPage)
   */
  public static generateFaqSchema(article: Article) {
    if (!article.faqs || article.faqs.length === 0) return null;

    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: article.faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };
  }

  /**
   * Generates BreadcrumbList Schema
   */
  public static generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
    const settings = db.getSiteSettings();
    const siteUrl = settings.siteUrl.replace(/\/$/, '');

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`,
      })),
    };
  }

  /**
   * Generates Organization Schema
   */
  public static generateOrganizationSchema() {
    const settings = db.getSiteSettings();
    const siteUrl = settings.siteUrl.replace(/\/$/, '');

    return {
      '@context': 'https://schema.org',
      '@type': 'NewsMediaOrganization',
      name: settings.siteName,
      alternateName: 'Lumière Derma',
      url: siteUrl,
      logo: `${siteUrl}/logo.png`,
      sameAs: Object.values(settings.socialLinks).filter(Boolean),
      publishingPrinciples: `${siteUrl}/editorial-policy`,
      correctionsPolicy: `${siteUrl}/editorial-policy#corrections`,
      diversityPolicy: `${siteUrl}/about#diversity`,
      ethicsPolicy: `${siteUrl}/editorial-policy#ethics`,
    };
  }

  /**
   * Generates dynamic XML Sitemap string
   */
  public static generateXmlSitemap(): string {
    const settings = db.getSiteSettings();
    const siteUrl = settings.siteUrl.replace(/\/$/, '');
    const articles = db.getArticles({ status: 'published' });
    const categories = db.getCategories();
    const ingredients = db.getIngredients();

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  <!-- Core Static Pages -->
  <url>
    <loc>${siteUrl}/</loc>
    <changefreq>hourly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${siteUrl}/reviews</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${siteUrl}/ingredients</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${siteUrl}/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${siteUrl}/editorial-policy</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${siteUrl}/medical-disclaimer</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`;

    // Category pages
    categories.forEach(cat => {
      xml += `  <url>
    <loc>${siteUrl}/category/${cat.slug}</loc>
    <changefreq>hourly</changefreq>
    <priority>0.85</priority>
  </url>\n`;
    });

    // Ingredient pages
    ingredients.forEach(ing => {
      xml += `  <url>
    <loc>${siteUrl}/ingredients/${ing.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>\n`;
    });

    // Article pages with Google News tags
    articles.forEach(art => {
      xml += `  <url>
    <loc>${siteUrl}/article/${art.slug}</loc>
    <lastmod>${new Date(art.updatedDate || art.publishDate).toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
    <news:news>
      <news:publication>
        <news:name>${settings.siteName}</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${new Date(art.publishDate).toISOString()}</news:publication_date>
      <news:title><![CDATA[${art.title}]]></news:title>
    </news:news>
  </url>\n`;
    });

    xml += `</urlset>`;
    return xml;
  }
}
