'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/lib/site-config';

const copy = {
  en: { title: 'Free Immigration Assessment', text: 'Check your eligibility in minutes, or talk to a specialist. No obligation.', assess: 'Start Free Assessment', consult: 'Book Free Consultation', minimize: 'Minimize', close: 'Close', open: 'Free Assessment', expand: 'Open free assessment offer' },
  ar: { title: 'تقييم هجرة مجاني', text: 'تحقق من أهليتك خلال دقائق أو تحدث مع مختص. بدون أي التزام.', assess: 'ابدأ التقييم المجاني', consult: 'احجز استشارة مجانية', minimize: 'تصغير', close: 'إغلاق', open: 'تقييم مجاني', expand: 'افتح عرض التقييم المجاني' },
} as const;

type State = 'hidden' | 'open' | 'min' | 'closed';
const KEY = 'assessment-popup';

export default function AssessmentPopup({ lang = 'en' }: { lang?: Locale }) {
  const t = copy[lang];
  const pathname = usePathname();
  const [state, setState] = useState<State>('hidden');

  // Opens shortly after the page loads. Minimize / close choices are remembered for the session.
  useEffect(() => {
    let saved: string | null = null;
    try { saved = sessionStorage.getItem(KEY); } catch { /* storage unavailable */ }
    const timer = window.setTimeout(() => setState(saved === 'closed' ? 'closed' : saved === 'min' ? 'min' : 'open'), saved ? 0 : 1200);
    return () => window.clearTimeout(timer);
  }, []);

  const set = (next: State) => {
    setState(next);
    try { sessionStorage.setItem(KEY, next); } catch { /* ignore */ }
  };

  if (state === 'hidden' || state === 'closed' || pathname.includes('/free-assessment')) return null;

  if (state === 'min') {
    return (
      <button type="button" className="assess-pop-min" onClick={() => set('open')} aria-label={t.expand}>
        <span>{t.open}</span>
      </button>
    );
  }

  return (
    <div className="assess-pop" role="dialog" aria-label={t.title}>
      <div className="assess-pop__bar">
        <button type="button" onClick={() => set('min')} aria-label={t.minimize} title={t.minimize}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14" /></svg>
        </button>
        <button type="button" onClick={() => set('closed')} aria-label={t.close} title={t.close}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      </div>
      <h2>{t.title}</h2>
      <p>{t.text}</p>
      <Link href="/free-assessment" className="assess-pop__primary" onClick={() => set('min')}>{t.assess}</Link>
      <a href="#consultation" className="assess-pop__secondary" onClick={() => set('min')}>{t.consult}</a>
    </div>
  );
}
