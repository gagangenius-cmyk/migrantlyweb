import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { countries } from '@/lib/data';
import { countries as countriesAr } from '@/lib/data-ar';
import { localizedPath, type Locale } from '@/lib/site-config';
import { photoCredits } from '@/lib/photo-credits';

const copy = {
  en: { label: 'Destinations', title: 'Popular Visa Destinations', readMore: 'Read more' },
  ar: { label: 'الوجهات', title: 'وجهات التأشيرات الأكثر طلباً', readMore: 'اقرأ المزيد' },
} as const;

const codes: Record<string, string> = { canada: 'CA', australia: 'AU', 'united-kingdom': 'UK', 'united-states': 'US', 'european-union': 'EU', portugal: 'PT' };

export default function PopularVisa({ lang = 'en' }: { lang?: Locale }) {
  const t = copy[lang];
  const list = lang === 'ar' ? countriesAr : countries;

  return (
    <section className="dest">
      <div className="container">
        <p className="section-label">{t.label}</p>
        <h2 className="section-title">{t.title}</h2>
      </div>
      <div className="dest__grid">
        {list.map((country, index) => {
          const row = Math.floor(index / 2) + 1;
          const textFirst = row % 2 === 1;
          const slot = (index % 2) * 2 + 1;
          const style = { '--r': row, '--ct': textFirst ? slot : slot + 1, '--ci': textFirst ? slot + 1 : slot } as CSSProperties;
          const href = localizedPath(lang, `/countries/${country.slug}`);
          return (
            <div className="dest__pair" key={country.slug}>
              <Link href={href} className="dest__tile dest__text" style={style}>
                <span className="dest__number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <span className="dest__badge" aria-hidden="true">{codes[country.slug] ?? country.name.slice(0, 2).toUpperCase()}</span>
                <h3>{country.name}</h3>
                <p>{country.tagline}</p>
                <span className="dest__more">{t.readMore}<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5 3l16 9-16 9z" /></svg></span>
              </Link>
              <Link href={href} className="dest__tile dest__photo" style={style} tabIndex={-1} aria-hidden="true">
                <Image src={`/assets/countries/${country.slug}.webp`} alt="" fill sizes="(max-width: 700px) 100vw, 25vw" />
              </Link>
            </div>
          );
        })}
      </div>
      <div className="container">
        <p className="arches__credits">
          {lang === 'ar' ? 'الصور: ' : 'Photos: '}
          {list.map((country, i) => {
            const c = photoCredits[country.slug];
            if (!c) return null;
            return (
              <span key={country.slug}>
                {i > 0 && ' · '}
                <a href={c.source} target="_blank" rel="noopener noreferrer">{country.name}</a>
                {' '}({c.author ? `${c.author}, ` : ''}{c.license})
              </span>
            );
          })}
          {lang === 'ar' ? ' — ويكيميديا كومنز' : ' — Wikimedia Commons'}
        </p>
      </div>
    </section>
  );
}
