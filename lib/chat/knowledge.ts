import { countries, news, services } from '@/lib/data';
import { faqs, faqCategories } from '@/lib/faqs';
import { servicePages } from '@/lib/service-pages';
import { tools } from '@/lib/tools/registry';

export interface Chunk { title: string; url: string; text: string }

const STOP = new Set(['the', 'a', 'an', 'and', 'or', 'of', 'to', 'in', 'for', 'is', 'are', 'on', 'my', 'i', 'me', 'do', 'can', 'what', 'how', 'with', 'be', 'it', 'at', 'as', 'by', 'you', 'we', 'your', 'about', 'need', 'get']);
export const tokenize = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/).filter((t) => t.length > 1 && !STOP.has(t));

let cache: { chunks: Chunk[]; df: Map<string, number>; lens: number[]; avg: number } | null = null;

function build(): Chunk[] {
  const chunks: Chunk[] = [];
  for (const s of services) chunks.push({ title: s.title, url: `/services/${s.slug}`, text: `${s.title}. ${s.tagline}. ${s.description} We handle: ${s.features.join('; ')}. Popular programs: ${s.programs.map((p) => `${p.name} (${p.processing}, ${p.cost})`).join('; ')}.` });
  for (const s of servicePages) chunks.push({ title: s.title, url: `/services/${s.slug}`, text: `${s.title}. ${s.description} ${s.intro.join(' ')} Who it is for: ${s.whoFor.join('; ')}. We handle: ${s.features.join('; ')}. Documents usually needed: ${s.documents.join('; ')}. ${s.faqs.map((f) => `${f.q} ${f.a}`).join(' ')}` });
  for (const c of countries) chunks.push({ title: c.name, url: `/countries/${c.slug}`, text: `${c.name}. ${c.tagline}. ${c.description} Programs: ${c.programs.join('; ')}. Key facts: ${c.stats.map((st) => `${st.label} ${st.value}`).join('; ')}.` });
  for (const n of news) chunks.push({ title: n.title, url: `/news/${n.slug}`, text: `${n.title}. ${n.description} ${n.content}` });
  for (const f of faqs) chunks.push({ title: f.q, url: '/faq', text: `${faqCategories.find((c) => c.key === f.category)?.label}: ${f.q} ${f.a}` });
  for (const t of tools) chunks.push({ title: t.name, url: `/tools/${t.slug}`, text: `${t.name}. ${t.summary} System: ${t.system}. Use the calculator on this page to estimate your score.` });
  chunks.push({ title: 'Free assessment', url: '/free-assessment', text: 'Free immigration assessment. Pick a country (Canada, Australia, United Kingdom or Germany) and a pathway, answer a few questions and see an estimate of your points. It is free, instant and needs no account.' });
  chunks.push({ title: 'Contact Migrantly', url: '/contact', text: 'Contact Migrantly to book a free consultation with an immigration specialist. Use the contact form, email, or the Book Consultation button.' });
  return chunks;
}

function index() {
  if (cache) return cache;
  const chunks = build();
  const df = new Map<string, number>();
  const lens: number[] = [];
  chunks.forEach((c) => {
    const toks = tokenize(`${c.title} ${c.text}`);
    lens.push(toks.length);
    new Set(toks).forEach((t) => df.set(t, (df.get(t) ?? 0) + 1));
  });
  cache = { chunks, df, lens, avg: lens.reduce((a, b) => a + b, 0) / lens.length };
  return cache;
}

/** BM25 retrieval over the site's own content. */
export function search(query: string, limit = 4): { chunk: Chunk; score: number }[] {
  const { chunks, df, lens, avg } = index();
  const q = tokenize(query);
  if (!q.length) return [];
  const N = chunks.length;
  const k1 = 1.4;
  const b = 0.75;
  return chunks
    .map((chunk, i) => {
      const toks = tokenize(`${chunk.title} ${chunk.title} ${chunk.text}`);
      const tf = new Map<string, number>();
      toks.forEach((t) => tf.set(t, (tf.get(t) ?? 0) + 1));
      let score = 0;
      for (const term of q) {
        const f = tf.get(term) ?? 0;
        if (!f) continue;
        const idf = Math.log(1 + (N - (df.get(term) ?? 0) + 0.5) / ((df.get(term) ?? 0) + 0.5));
        score += idf * ((f * (k1 + 1)) / (f + k1 * (1 - b + (b * lens[i]) / avg)));
      }
      return { chunk, score };
    })
    .filter((r) => r.score > 0)
    .sort((x, y) => y.score - x.score)
    .slice(0, limit);
}
