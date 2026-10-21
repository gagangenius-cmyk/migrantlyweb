import { NextResponse } from 'next/server';
import { search } from '@/lib/chat/knowledge';

export const runtime = 'nodejs';

const recent = new Map<string, number[]>();
const WINDOW_MS = 5 * 60 * 1000;
const MAX_REQUESTS = 25;

function limited(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  return hits.length > MAX_REQUESTS;
}

const SYSTEM = `You are the Migrantly website assistant. Answer immigration questions using ONLY the "Site content" excerpts provided. Be clear, friendly and concise (under 140 words). If the excerpts do not contain the answer, say you do not have that information and suggest booking a free consultation. Never invent fees, processing times, point values or legal rules. You give general information, not legal advice, and you cannot guarantee any visa outcome. Reply in the same language as the question.`;

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
  if (limited(ip)) return NextResponse.json({ answer: 'You are sending messages very quickly. Please wait a moment and try again.', sources: [] }, { status: 429 });

  let message = '';
  try {
    const body = await request.json();
    message = typeof body.message === 'string' ? body.message.trim().slice(0, 500) : '';
  } catch { /* handled below */ }
  if (!message) return NextResponse.json({ answer: 'Please type a question.', sources: [] }, { status: 400 });

  const hits = search(message, 4);
  const sources = hits.map((h) => ({ title: h.chunk.title, url: h.chunk.url }));
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!hits.length) {
    return NextResponse.json({ answer: 'I could not find that on our website. For a personal answer, please book a free consultation and a specialist will help you.', sources: [{ title: 'Book a consultation', url: '/contact' }] });
  }

  if (apiKey) {
    try {
      const context = hits.map((h, i) => `[${i + 1}] ${h.chunk.title} (${h.chunk.url})\n${h.chunk.text.slice(0, 1400)}`).join('\n\n');
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
        body: JSON.stringify({ model: process.env.CHAT_MODEL || 'claude-haiku-4-5-20251001', max_tokens: 400, system: SYSTEM, messages: [{ role: 'user', content: `Site content:\n${context}\n\nQuestion: ${message}` }] }),
      });
      if (response.ok) {
        const data = await response.json();
        const answer = data?.content?.[0]?.text;
        if (answer) return NextResponse.json({ answer, sources });
      }
    } catch { /* fall back to the extractive answer */ }
  }

  // No API key (or the model call failed): answer directly from the best matching passage.
  const top = hits[0].chunk;
  const answer = `${top.text.replace(/\s+/g, ' ').slice(0, 420).trim()}${top.text.length > 420 ? '…' : ''}\n\nThis is general information, not legal advice. A free consultation can confirm what applies to you.`;
  return NextResponse.json({ answer, sources });
}
