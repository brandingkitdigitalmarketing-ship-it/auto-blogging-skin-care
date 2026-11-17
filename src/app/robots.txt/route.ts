import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const settings = db.getSiteSettings();
  const siteUrl = settings.siteUrl.replace(/\/$/, '');

  const txt = `# Robots.txt for ${settings.siteName}
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

# Sitemaps
Sitemap: ${siteUrl}/sitemap.xml
`;

  return new NextResponse(txt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
