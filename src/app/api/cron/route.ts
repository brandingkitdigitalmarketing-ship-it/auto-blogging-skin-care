import { NextRequest, NextResponse } from 'next/server';
import { PublishingSchedulerService } from '@/lib/services/scheduler';

export async function POST(request: NextRequest) {
  try {
    let count: number | undefined = undefined;
    try {
      const body = await request.json();
      if (body.count) count = parseInt(body.count);
    } catch {
      // Body is optional
    }

    const result = await PublishingSchedulerService.runAutoPilotCycle(count);
    return NextResponse.json({ success: true, result });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
