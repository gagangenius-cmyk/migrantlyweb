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

// Carved white stone gateway (round arch, voussoirs + keystone, imposts, block pillars, plinths).
// Drawn in image-pixel units: viewBox 140 100 1055 1205, arch centre (670, 590).
const CX = 670;
const CY = 590;
const pt = (r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return `${(CX + r * Math.sin(a)).toFixed(1)} ${(CY - r * Math.cos(a)).toFixed(1)}`;
};
const radial = (r1: number, r2: number, deg: number) => `M${pt(r1, deg)}L${pt(r2, deg)}`;
const joints = (r1: number, r2: number, list: number[]) => list.flatMap((d) => [radial(r1, r2, d), radial(r1, r2, -d)]).join('');

const OPENING = 'M325 1305V590A345 345 0 0 1 1015 590V1305Z';
const RING = 'M178 590A492 492 0 0 1 1162 590H1015A345 345 0 0 0 325 590Z';
const KEYSTONE = `M${pt(372, -7.5)}L${pt(508, -7.5)}A508 508 0 0 1 ${pt(508, 7.5)}L${pt(372, 7.5)}A372 372 0 0 0 ${pt(372, -7.5)}Z`;
const OUTER_JOINTS = joints(395, 492, [24, 46, 67, 84]);
const INNER_JOINTS = joints(345, 395, [14, 36, 57, 78]);
const SOFFIT = `M${pt(395, -90)}A395 395 0 0 1 ${pt(395, 90)}`;

// Left-hand pieces; the right-hand side is the mirror image about x = 670.
const side = (
  <>
    <rect x="186" y="655" width="139" height="515" rx="4" />
    <rect x="201" y="668" width="109" height="490" rx="3" className="stone-inset" />
    <path d="M186 810H325M186 990H325" className="stone-joint" />
    <path d="M145 588H340V614H158Z" />
    <path d="M158 614H340V652H170Z" />
    <path d="M145 1165H340V1300H145Z" />
    <path d="M145 1165H340M158 1182H340" className="stone-joint" />
  </>
);

function Gateway() {
  return (
    <svg className="arch__door" viewBox="140 100 1055 1205" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <g className="stone" fill="url(#arch-stone-fill)">
        <path d={RING} />
        <path d={KEYSTONE} />
        {side}
        <g transform="translate(1340 0) scale(-1 1)">{side}</g>
      </g>
      <g className="stone-joint" fill="none">
        <path d={OUTER_JOINTS + INNER_JOINTS} />
        <path d={SOFFIT} />
      </g>
    </svg>
  );
}

function ArchDefs() {
  return (
    <svg className="arch__defs" width="0" height="0" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="arch-stone-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#e9ecf0" />
        </linearGradient>
        <clipPath id="arch-clip" clipPathUnits="objectBoundingBox">
          <path d={OPENING} transform="translate(-0.1327 -0.083) scale(0.000948 0.00083)" />
        </clipPath>
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
          {places.map((place) => {
            return (
            <article className="arch" key={place.slug}>
              <div className="arch__stone">
                <div className="arch__frame" style={{ clipPath: 'url(#arch-clip)' }}>
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
                <Gateway />
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
