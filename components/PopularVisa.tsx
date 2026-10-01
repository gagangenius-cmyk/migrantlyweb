'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { countries } from '@/lib/data';
import { countries as countriesAr } from '@/lib/data-ar';
import { localizedPath, type Locale } from '@/lib/site-config';

const copy = {
  en: { title: 'Popular Visa', text: 'Explore the destinations our clients choose most, and the visa routes we guide them through.', viewCountry: 'View country', flip: 'Show visa options for' },
  ar: { title: 'التأشيرات الأكثر طلباً', text: 'اكتشف الوجهات الأكثر اختياراً لدى عملائنا ومسارات التأشيرات التي نرشدهم خلالها.', viewCountry: 'عرض الدولة', flip: 'عرض خيارات التأشيرة لـ' },
} as const;

export default function PopularVisa({ lang = 'en' }: { lang?: Locale }) {
  const [flipped, setFlipped] = useState<string | null>(null);
  const t = copy[lang];
  const list = lang === 'ar' ? countriesAr : countries;

  return (
    <section className="popular-visa">
      <div className="container">
        <div className="popular-visa__panel">
          <div className="popular-visa__intro">
            <p className="section-label">{lang === 'ar' ? 'الوجهات' : 'Destinations'}</p>
            <h2 className="section-title">{t.title}</h2>
            <p className="popular-visa__text">{t.text}</p>
          </div>

          <div className="popular-visa__grid">
            {list.map((country) => {
              const isFlipped = flipped === country.slug;
              const countryHref = localizedPath(lang, `/countries/${country.slug}`);
              const programsHref = country.slug === 'european-union' ? countryHref : localizedPath(lang, `/programs?destination=${country.slug}`);
              return (
                <div key={country.slug} className={`flip-card${isFlipped ? ' is-flipped' : ''}`} onMouseLeave={() => setFlipped(null)}>
                  <div className="flip-card__inner">
                    <button
                      type="button"
                      className="flip-card__front"
                      aria-expanded={isFlipped}
                      aria-label={`${t.flip} ${country.name}`}
                      onClick={() => setFlipped(isFlipped ? null : country.slug)}
                    >
                      <Image src={country.image} alt="" fill sizes="(max-width: 769px) 50vw, 20vw" className="flip-card__image" />
                      <span className="flip-card__bar" aria-hidden="true" />
                      <span className="flip-card__name">{country.name}</span>
                    </button>

                    <div className="flip-card__back" aria-hidden={!isFlipped}>
                      <h3 className="flip-card__title"><Link href={countryHref} tabIndex={isFlipped ? 0 : -1}>{country.name}</Link></h3>
                      <ul className="flip-card__list">
                        {country.programs.map((program) => (
                          <li key={program}>
                            <Link href={programsHref} tabIndex={isFlipped ? 0 : -1}>
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
                              <span>{program}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Link href={countryHref} className="flip-card__more" tabIndex={isFlipped ? 0 : -1}>{t.viewCountry}</Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
