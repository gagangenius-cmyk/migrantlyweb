'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import BookingModal from './BookingModal';
import { usePathname } from 'next/navigation';
import { localeCopy, localizedPath, type Locale } from '@/lib/site-config';
import { services, countries } from '@/lib/data';
import { toolLinks } from '@/lib/tools/registry';
import { servicePages } from '@/lib/service-pages';
import { services as servicesAr, countries as countriesAr } from '@/lib/data-ar';

// Demo number until the real line is added to siteConfig.publicContact.phone
const DEMO_CALL_NUMBER = '+971 50 000 0000';

const ctaCopy = {
  en: { book: 'Book Consultation', call: 'Connect in 2 mins' },
  ar: { book: 'احجز استشارة', call: 'تواصل خلال دقيقتين' },
} as const;

type Child = { href: string; label: string };
type Item = { key: string; href: string; label: string; children?: Child[]; localized?: boolean };



export default function NavBar({ lang = 'en' }: { lang?: Locale }) {
  const pathname = usePathname();
  const t = localeCopy[lang];
  const [open, setOpen] = useState<string | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const closeBooking = useCallback(() => setBookingOpen(false), []);
  const cta = ctaCopy[lang];
  const rootRef = useRef<HTMLElement>(null);

  const serviceList = lang === 'ar' ? servicesAr : services;
  const countryList = lang === 'ar' ? countriesAr : countries;

  const items: Item[] = [
    { key: 'home', href: '/', label: t.home },
    {
      key: 'services', href: '/services', label: t.services,
      children: [
        { href: '/services/permanent-residence', label: 'Permanent Residence' },
        { href: '/services/global-tourist-visa', label: 'Global Tourist Visa' },
        { href: '/services/student-visa', label: 'Student Visa' },
        { href: '/services/citizenship-by-investment', label: 'Citizenship by Investment' },
        { href: '/services/residence-by-investment', label: 'Residence by Investment' },
        { href: '/services/family-sponsorship', label: 'Family Sponsor & Dependent Visa' },
        { href: '/services/germany-opportunity-card', label: 'Germany Opportunity Card' },
        { href: '/services/language-coaching', label: 'Language Coaching' },
        { href: '/services/job-offers-work-permit', label: 'Job Offers & Work Permit' },
      ],
    },
    {
      key: 'countries', href: '/countries', label: t.countries,
      children: countryList.filter((c) => ['canada', 'australia', 'united-kingdom', 'united-states', 'new-zealand', 'caribbean'].includes(c.slug)).sort((a, b) => ['canada', 'australia', 'united-kingdom', 'united-states', 'new-zealand', 'caribbean'].indexOf(a.slug) - ['canada', 'australia', 'united-kingdom', 'united-states', 'new-zealand', 'caribbean'].indexOf(b.slug)).map((c) => ({ href: `/countries/${c.slug}`, label: c.name })),
    },
    {
      key: 'tools', href: '/tools', label: t.tools, localized: false,
      children: [
        { href: '/tools/canada-pr-calculator', label: 'Canada PR Calculator' },
        { href: '/tools/australia-points-test', label: 'Australia PR Calculator' },
        { href: '/tools/express-entry-draws', label: 'Express Entry Draw' },
        { href: '/tools/canada-express-entry-crs', label: 'CRS Calculator' },
      ],
    },
    {
      key: 'about', href: '/about', label: t.about,
      children: [
        { href: '/about/vision', label: lang === 'ar' ? 'ما فتحناه' : 'What We Unlocked' },
        { href: '/about/mission', label: lang === 'ar' ? 'كيف نواصل الفتح' : 'How We Keep Unlocking' },
        { href: '/about/values', label: lang === 'ar' ? 'أخلاقيات ومبادئ ميجرانتلي' : 'Our Ethics & Principles' },
      ],
    },
  ];

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => { if (!rootRef.current?.contains(e.target as Node)) setOpen(null); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(null); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <nav ref={rootRef} className="nav-bar" aria-label={t.menu}>
      <ul className="nav-bar__list">
        {items.map((item) => {
          const target = item.localized === false ? item.href : localizedPath(lang, item.href);
          const active = item.href === '/' ? pathname === target : pathname === target || pathname.startsWith(`${target}/`);
          const isOpen = open === item.key;
          return (
            <li
              key={item.key}
              className={`nav-bar__item${item.children ? ' has-menu' : ''}${isOpen ? ' is-open' : ''}`}
              onMouseEnter={() => item.children && setOpen(item.key)}
              onMouseLeave={() => item.children && setOpen(null)}
            >
              <div className="nav-bar__row">
                <Link href={target} className="nav-bar__link" aria-current={active ? 'page' : undefined} onClick={() => setOpen(null)}>{item.label}</Link>
                {item.children && (
                  <button
                    type="button"
                    className="nav-bar__toggle"
                    aria-expanded={isOpen}
                    aria-label={item.label}
                    onClick={() => setOpen(isOpen ? null : item.key)}
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
                  </button>
                )}
              </div>
              {item.children && isOpen && (
                <ul className={`nav-bar__dropdown`}>
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link href={item.localized === false || child.href.startsWith('/careers') ? child.href : localizedPath(lang, child.href)} onClick={() => setOpen(null)}>
                        {child.label}
                      </Link>
                    </li>
                  ))}
                  <li className="nav-bar__dropdown-all">
                    <Link href={target} onClick={() => setOpen(null)}>{lang === 'ar' ? 'عرض الكل' : 'View all'}</Link>
                  </li>
                </ul>
              )}
            </li>
          );
        })}
      </ul>
      <a className="nav-bar__call" href={`tel:${DEMO_CALL_NUMBER.replace(/\s/g, '')}`} aria-label={`${cta.call}: ${DEMO_CALL_NUMBER}`}>
        <span className="nav-bar__call-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" /></svg>
        </span>
        <span className="nav-bar__call-text">
          <small>{cta.call}</small>
          <strong dir="ltr">{DEMO_CALL_NUMBER}</strong>
        </span>
      </a>
      <button type="button" className="nav-bar__book" onClick={() => setBookingOpen(true)}>
        {cta.book}
      </button>
      <BookingModal open={bookingOpen} onClose={closeBooking} lang={lang} />
    </nav>
  );
}
