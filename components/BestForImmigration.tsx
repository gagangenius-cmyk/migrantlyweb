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
        <div className="arches__grid">
          {places.map((place, index) => (
            <article className="arch" key={place.slug}>
              <div className="arch__stone">
              <div className="arch__frame">
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
              </div>
              <Link href={place.href.startsWith('/countries') ? localizedPath(lang, place.href) : place.href} className="arch__caption">
                <strong>{place[lang]}</strong>
                <small>{place.note[lang]}</small>
              </Link>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
