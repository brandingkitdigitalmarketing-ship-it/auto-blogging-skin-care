import { NextResponse } from 'next/server';
import { SeoEngineService } from '@/lib/services/seo-engine';

export async function GET() {
  const xml = SeoEngineService.generateXmlSitemap();
  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=600',
    },
  });
}
