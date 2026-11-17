import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const settings = db.getSiteSettings();
  // Mask API key for security
  const safeSettings = {
    ...settings,
    aiSettings: {
      ...settings.aiSettings,
      apiKey: settings.aiSettings.apiKey ? '••••••••••••' + settings.aiSettings.apiKey.slice(-4) : '',
    },
  };
  return NextResponse.json({ success: true, settings: safeSettings });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // If apiKey is masked, preserve existing key
    if (body.aiSettings?.apiKey && body.aiSettings.apiKey.includes('••••')) {
      delete body.aiSettings.apiKey;
    }

    const updated = db.updateSiteSettings(body);
    return NextResponse.json({ success: true, settings: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
