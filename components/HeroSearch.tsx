'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowIcon } from './Icons';
import type { Locale } from '@/lib/site-config';

type Mode = 'skilled' | 'business' | 'tourist';
type Option = { value: string; label: string };
type Field =
  | { key: string; kind: 'select'; label: string; options: Option[] }
  | { key: string; kind: 'date'; label: string };

const o = (pairs: [string, string][]): Option[] => pairs.map(([value, label]) => ({ value, label }));

const data = {
  en: {
    tabs: { skilled: 'Skilled Visa', business: 'Business Visa', tourist: 'Tourist Visa' },
    button: 'Search Programs',
    destinations: {
      skilled: o([['canada', 'Canada'], ['australia', 'Australia'], ['united-kingdom', 'United Kingdom'], ['new-zealand', 'New Zealand'], ['germany', 'Germany']]),
      business: o([['canada', 'Canada'], ['australia', 'Australia'], ['united-kingdom', 'United Kingdom'], ['united-states', 'United States'], ['portugal', 'Portugal'], ['greece', 'Greece'], ['caribbean', 'Caribbean Islands']]),
      tourist: o([['united-kingdom', 'United Kingdom'], ['united-states', 'USA'], ['canada', 'Canada'], ['australia', 'Australia'], ['new-zealand', 'New Zealand'], ['europe', 'Europe (Schengen)'], ['china', 'China'], ['japan', 'Japan'], ['montenegro', 'Montenegro'], ['south-africa', 'South Africa'], ['brazil', 'Brazil'], ['argentina', 'Argentina']]),
    },
    destination: 'Destination',
    profession: 'Your Profession',
    professions: o([['it', 'IT & Software'], ['engineering', 'Engineering'], ['healthcare', 'Healthcare & Nursing'], ['education', 'Education & Teaching'], ['finance', 'Finance & Accounting'], ['trades', 'Trades & Construction'], ['hospitality', 'Hospitality & Culinary'], ['management', 'Business & Management'], ['other', 'Other']]),
    experience: 'Years of Experience',
    experiences: o([['0', 'No experience'], ['1-2', '1–2 years'], ['3-5', '3–5 years'], ['6-10', '6–10 years'], ['10+', 'More than 10 years']]),
    investment: 'Investment Range',
    investments: o([['under-50000', 'Under 50,000'], ['50000-250000', '50,000 – 250,000'], ['over-250000', 'Over 250,000']]),
    businessType: 'Business Type',
    businessTypes: o([['startup', 'Start-up / Entrepreneur'], ['investor', 'Investor'], ['owner', 'Existing business owner'], ['franchise', 'Franchise'], ['other', 'Other']]),
    travelDate: 'Travel Date',
  },
  ar: {
    tabs: { skilled: 'تأشيرة العمل الماهر', business: 'تأشيرة الأعمال', tourist: 'التأشيرة السياحية' },
    button: 'بحث البرامج',
    destinations: {
      skilled: o([['canada', 'كندا'], ['australia', 'أستراليا'], ['united-kingdom', 'المملكة المتحدة'], ['new-zealand', 'نيوزيلندا'], ['germany', 'ألمانيا']]),
      business: o([['canada', 'كندا'], ['australia', 'أستراليا'], ['united-kingdom', 'المملكة المتحدة'], ['united-states', 'الولايات المتحدة'], ['portugal', 'البرتغال'], ['greece', 'اليونان'], ['caribbean', 'جزر الكاريبي']]),
      tourist: o([['united-kingdom', 'المملكة المتحدة'], ['united-states', 'الولايات المتحدة'], ['canada', 'كندا'], ['australia', 'أستراليا'], ['new-zealand', 'نيوزيلندا'], ['europe', 'أوروبا (شنغن)'], ['china', 'الصين'], ['japan', 'اليابان'], ['montenegro', 'الجبل الأسود'], ['south-africa', 'جنوب أفريقيا'], ['brazil', 'البرازيل'], ['argentina', 'الأرجنتين']]),
    },
    destination: 'الوجهة',
    profession: 'مهنتك',
    professions: o([['it', 'تقنية المعلومات والبرمجيات'], ['engineering', 'الهندسة'], ['healthcare', 'الرعاية الصحية والتمريض'], ['education', 'التعليم'], ['finance', 'المالية والمحاسبة'], ['trades', 'الحرف والإنشاءات'], ['hospitality', 'الضيافة والطهي'], ['management', 'الأعمال والإدارة'], ['other', 'أخرى']]),
    experience: 'سنوات الخبرة',
    experiences: o([['0', 'بدون خبرة'], ['1-2', '1–2 سنة'], ['3-5', '3–5 سنوات'], ['6-10', '6–10 سنوات'], ['10+', 'أكثر من 10 سنوات']]),
    investment: 'نطاق الاستثمار',
    investments: o([['under-50000', 'أقل من 50,000'], ['50000-250000', '50,000 – 250,000'], ['over-250000', 'أكثر من 250,000']]),
    businessType: 'نوع النشاط',
    businessTypes: o([['startup', 'شركة ناشئة / رائد أعمال'], ['investor', 'مستثمر'], ['owner', 'مالك نشاط قائم'], ['franchise', 'امتياز تجاري'], ['other', 'أخرى']]),
    travelDate: 'تاريخ السفر',
  },
} as const;

// Each visa category asks only for what it needs.
function fieldsFor(mode: Mode, lang: Locale): Field[] {
  const t = data[lang];
  const destination: Field = { key: 'destination', kind: 'select', label: t.destination, options: [...t.destinations[mode]] };
  if (mode === 'skilled') return [destination, { key: 'profession', kind: 'select', label: t.profession, options: [...t.professions] }, { key: 'experience', kind: 'select', label: t.experience, options: [...t.experiences] }];
  if (mode === 'business') return [destination, { key: 'investment', kind: 'select', label: t.investment, options: [...t.investments] }, { key: 'businessType', kind: 'select', label: t.businessType, options: [...t.businessTypes] }];
  return [destination, { key: 'travelDate', kind: 'date', label: t.travelDate }];
}

export default function HeroSearch({ lang = 'en' }: { lang?: Locale }) {
  const t = data[lang];
  const [mode, setMode] = useState<Mode>('skilled');
  const [values, setValues] = useState<Record<string, string>>({});
  const fields = fieldsFor(mode, lang);

  const switchMode = (next: Mode) => {
    setMode(next);
    // keep the destination only if the new category offers it
    setValues((current) => {
      const stillValid = data[lang].destinations[next].some((d) => d.value === current.destination);
      return stillValid ? { destination: current.destination } : ({} as Record<string, string>);
    });
  };

  const params = new URLSearchParams({ mode });
  fields.forEach((f) => { if (values[f.key]) params.set(f.key, values[f.key]); });
  const href = mode === 'tourist' ? `/services/global-tourist-visa?${params}` : `/free-assessment?${params}`;
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="home-hero-search--desktop">
      <div className="home-hero-search__tabs" data-mode={mode}>
        {(['skilled', 'business', 'tourist'] as const).map((key) => (
          <button key={key} type="button" className={mode === key ? 'active' : ''} onClick={() => switchMode(key)}>{t.tabs[key]}</button>
        ))}
      </div>
      <div className="home-hero-filter-form" key={mode}>
        {fields.map((field) => (
          <div className="home-hero-filter" key={field.key}>
            {field.kind === 'select' ? (
              <select aria-label={field.label} className="home-hero-filter__select" value={values[field.key] ?? ''} onChange={(event) => setValues((current) => ({ ...current, [field.key]: event.target.value }))}>
                <option value="" disabled>{field.label}</option>
                {field.options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
            ) : (
              <input type="date" aria-label={field.label} title={field.label} className="home-hero-filter__select home-hero-filter__date" min={today} value={values[field.key] ?? ''} onChange={(event) => setValues((current) => ({ ...current, [field.key]: event.target.value }))} />
            )}
          </div>
        ))}
        <Link href={href} className="home-hero-search-button">
          {t.button}
          <ArrowIcon />
        </Link>
      </div>
    </div>
  );
}
