import type { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { localizedPath, type Locale } from '@/lib/site-config';

type Opt = { key: string; en: string; ar: string; href: string };

const options: Record<string, Opt> = {
  skilled: { key: 'skilled', en: 'Skilled Migration', ar: 'الهجرة الماهرة', href: '/services/permanent-residence' },
  family: { key: 'family', en: 'Family Sponsorship', ar: 'كفالة الأسرة', href: '/services/family-sponsorship' },
  study: { key: 'study', en: 'Study', ar: 'الدراسة', href: '/services/student-visa' },
  visit: { key: 'visit', en: 'Visit / Tourist', ar: 'الزيارة والسياحة', href: '/services/global-tourist-visa' },
  business: { key: 'business', en: 'Business', ar: 'الأعمال', href: '/services/job-offers-work-permit' },
  invest: { key: 'invest', en: 'Residence by Investment', ar: 'الإقامة بالاستثمار', href: '/services/residence-by-investment' },
  cbi: { key: 'cbi', en: 'Citizenship by Investment', ar: 'الجنسية بالاستثمار', href: '/services/citizenship-by-investment' },
  work: { key: 'work', en: 'Work Permit', ar: 'تصريح العمل', href: '/services/job-offers-work-permit' },
  pr: { key: 'pr', en: 'Permanent Residence', ar: 'الإقامة الدائمة', href: '/services/permanent-residence' },
  oc: { key: 'oc', en: 'Opportunity Card', ar: 'بطاقة الفرص', href: '/services/germany-opportunity-card' },
};

const places = [
  { slug: 'canada', en: 'Canada', ar: 'كندا', code: 'CA', note: { en: 'Express Entry • PNP', ar: 'الدخول السريع • الترشيح الإقليمي' }, image: '/assets/countries/canada.webp', href: '/countries/canada', opts: ['skilled', 'family', 'study', 'visit', 'business', 'pr'] },
  { slug: 'australia', en: 'Australia', ar: 'أستراليا', code: 'AU', note: { en: 'Points test • 189 / 190 / 491', ar: 'اختبار النقاط • 189 / 190 / 491' }, image: '/assets/countries/australia.webp', href: '/countries/australia', opts: ['skilled', 'family', 'study', 'visit', 'business', 'work'] },
  { slug: 'united-kingdom', en: 'United Kingdom', ar: 'المملكة المتحدة', code: 'UK', note: { en: 'Skilled Worker • Global Talent', ar: 'العامل المهني • المواهب العالمية' }, image: '/assets/countries/united-kingdom.webp', href: '/countries/united-kingdom', opts: ['skilled', 'family', 'study', 'visit', 'business', 'work'] },
  { slug: 'germany', en: 'Germany', ar: 'ألمانيا', code: 'DE', note: { en: 'Opportunity Card • Work', ar: 'بطاقة الفرص • العمل' }, image: '/assets/countries/germany.webp', href: '/services/germany-opportunity-card', opts: ['oc', 'skilled', 'study', 'visit', 'business', 'family'] },
  { slug: 'new-zealand', en: 'New Zealand', ar: 'نيوزيلندا', code: 'NZ', note: { en: 'Skilled Migrant • Work visas', ar: 'المهاجر الماهر • تأشيرات العمل' }, image: '/assets/countries/new-zealand.webp', href: '/services/permanent-residence', opts: ['skilled', 'family', 'study', 'visit', 'business', 'work'] },
  { slug: 'caribbean', en: 'Caribbean Islands', ar: 'جزر الكاريبي', code: 'CB', note: { en: 'Citizenship by Investment', ar: 'الجنسية بالاستثمار' }, image: '/assets/countries/caribbean.webp', href: '/services/citizenship-by-investment', opts: ['cbi', 'invest', 'business', 'visit', 'family'] },
] as const;

// Six white doorway designs. Both paths are drawn in a 300 x 360 box: `outer` is the stone,
// `inner` is the opening the photo shows through.
const doors = [
  { id: 'round', name: 'Classic round', pt: 96, px: 40, outer: 'M0 360V150A150 150 0 0 1 300 150V360Z', inner: 'M40 360V150A110 110 0 0 1 260 150V360Z' },
  { id: 'gothic', name: 'Gothic pointed', pt: 112, px: 40, outer: 'M0 360V190Q0 80 150 4Q300 80 300 190V360Z', inner: 'M40 360V190Q40 120 150 62Q260 120 260 190V360Z' },
  { id: 'soft', name: 'Soft rounded', pt: 70, px: 40, outer: 'M0 360V70Q0 10 60 10H240Q300 10 300 70V360Z', inner: 'M40 360V90Q40 50 80 50H220Q260 50 260 90V360Z' },
  { id: 'horseshoe', name: 'Horseshoe', pt: 104, px: 62, outer: 'M12 360V232A144 144 0 1 1 288 232V360Z', inner: 'M62 360V232A98 98 0 1 1 238 232V360Z' },
  { id: 'segment', name: 'Segmental', pt: 190, px: 40, outer: 'M0 360V160A280 280 0 0 1 300 160V360Z', inner: 'M40 360V200A240 240 0 0 1 260 200V360Z' },
  { id: 'ogee', name: 'Ogee', pt: 118, px: 52, outer: 'M0 360V200C0 110 90 90 150 6C210 90 300 110 300 200V360Z', inner: 'M40 360V200C40 140 110 120 150 50C190 120 260 140 260 200V360Z' },
] as const;

function ArchDefs() {
  return (
    <svg className="arch__defs" width="0" height="0" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="arch-stone-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#eef1f5" />
        </linearGradient>
        {doors.map((door) => (
          <clipPath key={door.id} id={`arch-clip-${door.id}`} clipPathUnits="objectBoundingBox">
            <path d={door.inner} transform="scale(0.003333 0.002778)" />
          </clipPath>
        ))}
      </defs>
    </svg>
  );
}

const copy = {
  en: { label: 'Destinations', title: 'Best for immigration', explore: 'Explore' },
  ar: { label: 'الوجهات', title: 'الأفضل للهجرة', explore: 'استكشف' },
} as const;

export default function BestForImmigration({ lang = 'en' }: { lang?: Locale }) {
  const t = copy[lang];
  return (
    <section className="arches">
      <div className="container">
        <p className="section-label">{t.label}</p>
        <h2 className="section-title">{t.title}</h2>
        <ArchDefs />
        <div className="arches__grid">
          {places.map((place, index) => {
            const door = doors[index % doors.length];
            return (
            <article className="arch" key={place.slug}>
              <div className={`arch__stone arch__stone--${door.id}`} style={{ '--pt': `${door.pt / 3}%`, '--px': `${door.px / 3}%` } as CSSProperties}>
                <div className="arch__frame" style={{ clipPath: `url(#arch-clip-${door.id})` }}>
                  <Image src={place.image} alt="" fill sizes="(max-width: 700px) 90vw, (max-width: 1100px) 45vw, 22vw" className="arch__img" />
                  <div className="arch__panel">
                    <p className="arch__panel-title">{place[lang]}</p>
                    <ul>
                      {place.opts.map((key) => (
                        <li key={key}><Link href={options[key].href}>{options[key][lang]}</Link></li>
                      ))}
                    </ul>
                  </div>
                </div>
                <svg className="arch__door" viewBox="0 0 300 360" preserveAspectRatio="none" aria-hidden="true" focusable="false">
                  <path d={`${door.outer}${door.inner}`} fillRule="evenodd" fill="url(#arch-stone-fill)" stroke="#c9d0da" strokeWidth="1.5" />
                  <path d={door.inner} fill="none" stroke="#d3d9e2" strokeWidth="3" />
                </svg>
              </div>
              <Link href={place.href.startsWith('/countries') ? localizedPath(lang, place.href) : place.href} className="arch__caption">
                <strong>{place[lang]}</strong>
                <small>{place.note[lang]}</small>
              </Link>
            </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
