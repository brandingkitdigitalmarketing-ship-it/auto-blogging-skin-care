import type { Metadata } from 'next';
import './globals.css';
import { db } from '@/lib/db';

export async function generateMetadata(): Promise<Metadata> {
  const settings = db.getSiteSettings();
  const siteUrl = settings.siteUrl.replace(/\/$/, '');

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${settings.siteName} | ${settings.tagline}`,
      template: `%s | ${settings.siteName}`,
    },
    description: settings.metaDescription,
    keywords: [
      'skincare science',
      'dermatologist advice',
      'hair loss treatments',
      'tretinoin retinization',
      'rosemary oil vs minoxidil',
      'cosmetic chemistry',
      'exosome facial',
      'acne protocols',
      'broad spectrum SPF 50',
    ],
    authors: [{ name: 'Lumière Derma Medical Board' }],
    creator: 'Lumière Derma Journal',
    publisher: 'Lumière Derma Medical Media',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: siteUrl,
    },
    openGraph: {
      title: `${settings.siteName} | ${settings.tagline}`,
      description: settings.metaDescription,
      url: siteUrl,
      siteName: settings.siteName,
      images: [
        {
          url: settings.defaultOgImage,
          width: 1200,
          height: 630,
          alt: 'Lumière Derma Journal - Evidence-Based Dermatology Intelligence',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${settings.siteName} | ${settings.tagline}`,
      description: settings.metaDescription,
      images: [settings.defaultOgImage],
      creator: '@lumierederma',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: settings.seoSettings.googleSearchConsoleVerification,
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen bg-stone-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 antialiased selection:bg-blush-200 selection:text-forest-900">
        {children}
      </body>
    </html>
  );
}
