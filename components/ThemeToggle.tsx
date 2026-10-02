'use client';

import { useSyncExternalStore } from 'react';
import type { Locale } from '@/lib/site-config';

type Theme = 'light' | 'dark';

const label = {
  en: { toDark: 'Switch to dark theme', toLight: 'Switch to light theme' },
  ar: { toDark: 'التبديل إلى الوضع الداكن', toLight: 'التبديل إلى الوضع الفاتح' },
} as const;

// The <html data-theme> attribute is the source of truth (set before paint by the inline script in layout.tsx).
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
}
const getSnapshot = (): Theme => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
const getServerSnapshot = (): Theme => 'light';

export default function ThemeToggle({ lang = 'en' }: { lang?: Locale }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const t = label[lang];
  const isDark = theme === 'dark';

  const toggle = () => {
    const next: Theme = isDark ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch { /* storage unavailable: theme still applies for this visit */ }
  };

  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-pressed={isDark} aria-label={isDark ? t.toLight : t.toDark} title={isDark ? t.toLight : t.toDark}>
      {isDark ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      )}
    </button>
  );
}
