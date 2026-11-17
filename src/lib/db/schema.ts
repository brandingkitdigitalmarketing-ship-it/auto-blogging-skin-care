export interface Author {
  id: string;
  name: string;
  slug: string;
  role: string;
  credentials: string;
  avatar: string;
  bio: string;
  reviewedBy?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  featuredImage?: string;
  subcategories: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ReferenceItem {
  title: string;
  journal: string;
  year: number;
  url: string;
  doi?: string;
}

export interface AffiliateProduct {
  name: string;
  brand: string;
  rating: number;
  price: string;
  pros: string[];
  cons: string[];
  verdict: string;
  buyUrl: string;
  imageUrl: string;
  badge?: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Markdown or HTML
  categorySlug: string;
  subcategory?: string;
  tags: string[];
  featuredImage: string;
  imageAlt: string;
  imageCaption?: string;
  authorId: string;
  medicalReviewerId?: string;
  isMedicallyReviewed: boolean;
  status: 'published' | 'draft' | 'scheduled';
  publishDate: string;
  updatedDate: string;
  scheduledFor?: string;
  readingTimeMinutes: number;
  seo: {
    metaTitle: string;
    metaDescription: string;
    focusKeywords: string[];
    canonicalUrl?: string;
    score: number; // 0-100
  };
  faqs?: FaqItem[];
  references?: ReferenceItem[];
  affiliateProducts?: AffiliateProduct[];
  isBreaking?: boolean;
  isTrending?: boolean;
  isEditorPick?: boolean;
  views: number;
  shares: number;
  aiGenerated: boolean;
  sourceInspiration?: string;
}

export interface TrendingTopic {
  id: string;
  topic: string;
  category: string;
  searchVolume: string;
  growthPercentage: number;
  urgency: 'high' | 'medium' | 'low';
  source: string;
  discoveredAt: string;
  suggestedKeywords: string[];
  status: 'pending' | 'generated' | 'ignored';
  articleId?: string;
}

export interface Ingredient {
  id: string;
  name: string;
  slug: string;
  incI_name: string;
  category: string;
  benefit: string;
  bestForSkinTypes: string[];
  irritationRisk: 'Very Low' | 'Low' | 'Moderate' | 'High';
  idealPh: string;
  pairsWellWith: string[];
  avoidMixingWith: string[];
  scientificSummary: string;
  clinicalEvidence: 'Strong' | 'Emerging' | 'Moderate';
  keyStudies: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  siteUrl: string;
  contactEmail: string;
  metaDescription: string;
  defaultOgImage: string;
  socialLinks: {
    twitter: string;
    instagram: string;
    pinterest: string;
    facebook: string;
    youtube: string;
  };
  aiSettings: {
    provider: 'builtin' | 'openai' | 'gemini';
    apiKey: string;
    model: string;
    dailyPublishCount: number; // default 3
    publishTimes: string[]; // ["09:00", "13:00", "18:00"]
    autoPublish: boolean; // if false, saves as draft for editorial approval
    targetWordCount: number; // 1400
    requireMedicalReview: boolean;
    targetCategories: string[];
    lastCronRun?: string;
    nextCronRun?: string;
  };
  monetization: {
    adsenseEnabled: boolean;
    adsenseClientId: string;
    headerAdSlot: string;
    sidebarAdSlot: string;
    inArticleAdSlot: string;
    footerAdSlot: string;
    affiliateDisclosuresEnabled: boolean;
    sponsoredContentLabel: string;
  };
  seoSettings: {
    googleAnalyticsId: string;
    googleSearchConsoleVerification: string;
    enableSchemaOrg: boolean;
    enableFaqSchema: boolean;
    enableBreadcrumbs: boolean;
  };
}
