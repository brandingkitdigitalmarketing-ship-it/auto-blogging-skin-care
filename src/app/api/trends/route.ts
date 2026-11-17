import { NextRequest, NextResponse } from 'next/server';
import { TrendResearcherService } from '@/lib/services/trend-researcher';
import { db } from '@/lib/db';

export async function GET() {
  const trends = db.getTrendingTopics();
  return NextResponse.json({ success: true, count: trends.length, trends });
}

export async function POST() {
  try {
    const addedCount = await TrendResearcherService.syncDiscoveredTrendsToStore();
    const updatedList = db.getTrendingTopics();
    return NextResponse.json({
      success: true,
      message: `Discovered and synchronized ${addedCount} new trending topics`,
      trends: updatedList,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
