import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = (searchParams.get('status') as any) || undefined;
  const category = searchParams.get('category') || undefined;
  const tag = searchParams.get('tag') || undefined;
  const search = searchParams.get('search') || undefined;
  const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
  const breaking = searchParams.get('breaking') === 'true' ? true : undefined;
  const trending = searchParams.get('trending') === 'true' ? true : undefined;
  const featured = searchParams.get('featured') === 'true' ? true : undefined;

  const articles = db.getArticles({
    status,
    category,
    tag,
    search,
    limit,
    breaking,
    trending,
    featured,
  });

  return NextResponse.json({ success: true, count: articles.length, articles });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.title) {
      return NextResponse.json({ success: false, error: 'Title is required' }, { status: 400 });
    }

    const article = db.createArticle(body);
    return NextResponse.json({ success: true, article });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
