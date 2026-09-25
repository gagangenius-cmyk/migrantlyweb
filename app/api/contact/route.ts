import { NextResponse } from 'next/server';
import { escapeHtml, validateContactRequest } from '@/lib/contact';

export const runtime = 'nodejs';
const recentRequests = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (recentRequests.get(ip) || []).filter((timestamp) => now - timestamp < WINDOW_MS);
  recent.push(now);
  recentRequests.set(ip, recent);
  if (recentRequests.size > 1000) {
    for (const [key, values] of recentRequests) if (!values.some((timestamp) => now - timestamp < WINDOW_MS)) recentRequests.delete(key);
  }
  return recent.length > MAX_REQUESTS;
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > 20_000) return NextResponse.json({ ok: false, message: 'Request is too large.' }, { status: 400 });

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
  if (isRateLimited(ip)) return NextResponse.json({ ok: false, message: 'Please wait before trying again.' }, { status: 429 });

  let input: unknown;
  try { input = await request.json(); } catch { return NextResponse.json({ ok: false, message: 'Invalid request.' }, { status: 400 }); }
  const result = validateContactRequest(input);
  if (!result.data) return NextResponse.json({ ok: false, fieldErrors: result.fieldErrors }, { status: 400 });
  const data = result.data;
  if (data.website) return NextResponse.json({ ok: true });
  const elapsed = Date.now() - data.startedAt;
  if (elapsed < 1500 || elapsed > 24 * 60 * 60 * 1000) return NextResponse.json({ ok: false, message: 'Please reload the form and try again.' }, { status: 400 });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error('Contact delivery is not configured.');
    return NextResponse.json({ ok: false, message: 'Enquiries are temporarily unavailable. Please use email.' }, { status: 500 });
  }

  const rows = [
    ['Source', data.source], ['Language', data.locale], ['Name', `${data.firstName} ${data.lastName || ''}`.trim()],
    ['Preferred contact', data.preferredChannel], ['Email', data.email], ['Phone', data.phone],
    ['Service', data.service], ['Destination', data.destination], ['Message', data.message],
  ].filter((row) => row[1]);
  const html = `<h1>New Migrantly enquiry</h1><table>${rows.map(([label, value]) => `<tr><th align="left" style="padding:6px 16px 6px 0">${escapeHtml(label)}</th><td style="padding:6px 0">${escapeHtml(value)}</td></tr>`).join('')}</table>`;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: [to], reply_to: data.email, subject: `New ${data.source === 'chat_assistant' ? 'chat' : 'website'} enquiry from ${data.firstName}`, html }),
    });
    if (!response.ok) {
      console.error('Resend delivery failed with status', response.status);
      return NextResponse.json({ ok: false, message: 'We could not send your enquiry. Please try again.' }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Contact delivery failed', error instanceof Error ? error.message : 'unknown error');
    return NextResponse.json({ ok: false, message: 'We could not send your enquiry. Please try again.' }, { status: 500 });
  }
}
