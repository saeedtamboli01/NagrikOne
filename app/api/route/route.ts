import { NextResponse } from 'next/server';
import { analyzeIssue } from '@/lib/nova/analyze';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const text = String(body.text || body.problem || body.message || '');
    const result = analyzeIssue({ text, location: body.location, history: body.history });
    return NextResponse.json(result);
  } catch (err: any) {
    const msg = err?.message || 'An error occurred while analyzing the issue. Please try again.';
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
