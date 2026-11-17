import { NextRequest, NextResponse } from 'next/server';
import { AiWriterService } from '@/lib/services/ai-writer';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { topic, categorySlug, targetKeywords, tone, saveAsDraft, provider, apiKey } = body;

    if (!topic) {
      return NextResponse.json({ success: false, error: 'Topic is required' }, { status: 400 });
    }

    const generated = await AiWriterService.generateArticle({
      topic,
      categorySlug: categorySlug || 'skincare',
      targetKeywords: targetKeywords || [],
      tone: tone || 'clinical',
      provider,
      apiKey,
    });

    if (body.saveImmediately) {
      const status = saveAsDraft ? 'draft' : 'published';
      const created = db.createArticle({
        ...generated,
        status,
      });
      return NextResponse.json({ success: true, article: created });
    }

    return NextResponse.json({ success: true, article: generated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
