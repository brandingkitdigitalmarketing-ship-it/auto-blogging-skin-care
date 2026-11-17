import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const article = db.getArticleById(params.id) || db.getArticleBySlug(params.id);
  if (!article) {
    return NextResponse.json({ success: false, error: 'Article not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, article });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const updated = db.updateArticle(params.id, body);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Article not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, article: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const success = db.deleteArticle(params.id);
  if (!success) {
    return NextResponse.json({ success: false, error: 'Article not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, message: 'Article deleted successfully' });
}
