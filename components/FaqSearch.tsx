'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { faqCategories, faqs } from '@/lib/faqs';

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]+/g, ' ');
const labelOf = (key: string) => faqCategories.find((c) => c.key === key)?.label ?? '';

export default function FaqSearch() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('all');
  const tokens = useMemo(() => norm(query).split(/\s+/).filter(Boolean), [query]);

  // Every search word must appear in the category name, question or answer,
  // so "Canada Skilled" returns all the Canada Skilled questions.
  const matches = (f: (typeof faqs)[number]) => {
    const hay = norm(`${labelOf(f.category)} ${f.q} ${f.a}`);
    return tokens.every((t) => hay.includes(t));
  };
  const results = useMemo(() => faqs.filter((f) => (category === 'all' || f.category === category) && matches(f)), [category, tokens]); // eslint-disable-line react-hooks/exhaustive-deps
  const counts = useMemo(() => {
    const map: Record<string, number> = { all: 0 };
    faqs.filter(matches).forEach((f) => { map[f.category] = (map[f.category] ?? 0) + 1; map.all += 1; });
    return map;
  }, [tokens]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="faqx">
      <div className="faqx__search">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4.35-4.35" /></svg>
        <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search a question or topic, e.g. Canada Skilled" aria-label="Search FAQs" />
      </div>

      <div className="faqx__layout">
        <nav className="faqx__cats" aria-label="FAQ categories">
          {[{ key: 'all', label: 'All questions' }, ...faqCategories].map((c) => (
            <button key={c.key} type="button" className={category === c.key ? 'is-active' : undefined} onClick={() => setCategory(c.key)}>
              <span>{c.label}</span>
              <b>{counts[c.key] ?? 0}</b>
            </button>
          ))}
        </nav>

        <div className="faqx__list" aria-live="polite">
          {results.length ? results.map((f, i) => (
            <details key={f.q} className="faqx__item">
              <summary>
                <span className="faqx__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="faqx__q"><em>{labelOf(f.category)}</em>{f.q}</span>
                <span className="faqx__icon" aria-hidden="true" />
              </summary>
              <p>{f.a}</p>
            </details>
          )) : (
            <p className="faqx__empty">No questions match your search. Try another word or <Link href="/contact">contact us</Link>.</p>
          )}
        </div>
      </div>
    </div>
  );
}
