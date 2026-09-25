'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ArrowIcon } from './Icons';
import { filterPrograms, type FilterableProgram } from '@/lib/program-filter';
import { localizedPath, type Locale } from '@/lib/site-config';

const copy = {
  en: { filters: 'Filter programs', destination: 'Destination', type: 'Program type', investment: 'Investment range', all: 'All', any: 'Any range', clear: 'Clear filters', results: 'programs found', empty: 'No programs match these filters. Try widening your selection.', details: 'View details', types: [['skilled-worker', 'Skilled Worker'], ['business-investor', 'Business & Investor'], ['study-visa', 'Study Visa'], ['visit-visa', 'Visit Visa'], ['citizenship', 'Citizenship']] },
  ar: { filters: 'تصفية البرامج', destination: 'الوجهة', type: 'نوع البرنامج', investment: 'نطاق الاستثمار', all: 'الكل', any: 'أي نطاق', clear: 'مسح عوامل التصفية', results: 'برنامج متاح', empty: 'لا توجد برامج مطابقة. جرّب توسيع خياراتك.', details: 'عرض التفاصيل', types: [['skilled-worker', 'عامل ماهر'], ['business-investor', 'أعمال واستثمار'], ['study-visa', 'تأشيرة دراسة'], ['visit-visa', 'تأشيرة زيارة'], ['citizenship', 'الجنسية']] },
} as const;

export default function ProgramCatalog({ lang, programs }: { lang: Locale; programs: FilterableProgram[] }) {
  const router = useRouter(); const pathname = usePathname(); const searchParams = useSearchParams(); const t = copy[lang];
  const filters = { mode: searchParams.get('mode') || undefined, destination: searchParams.get('destination') || undefined, type: searchParams.get('type') || undefined, investment: searchParams.get('investment') || undefined };
  const results = filterPrograms(programs, filters);
  const update = (key: string, value: string) => { const params = new URLSearchParams(searchParams.toString()); if (!value || value === 'all' || value === 'any') params.delete(key); else params.set(key, value); router.replace(`${pathname}${params.size ? `?${params}` : ''}`, { scroll: false }); };
  return <>
    <div className="program-filters" aria-label={t.filters}>
      <label><span>{t.destination}</span><select value={filters.destination || 'all'} onChange={(e) => update('destination', e.target.value)}><option value="all">{t.all}</option><option value="canada">Canada</option><option value="australia">Australia</option><option value="united-kingdom">United Kingdom</option><option value="united-states">United States</option><option value="portugal">Portugal</option></select></label>
      <label><span>{t.type}</span><select value={filters.type || 'all'} onChange={(e) => update('type', e.target.value)}><option value="all">{t.all}</option>{t.types.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
      <label><span>{t.investment}</span><select value={filters.investment || 'any'} onChange={(e) => update('investment', e.target.value)}><option value="any">{t.any}</option><option value="under-50000">&lt; 50,000</option><option value="50000-250000">50,000–250,000</option><option value="over-250000">250,000+</option></select></label>
      <button type="button" onClick={() => router.replace(pathname, { scroll: false })}>{t.clear}</button>
    </div>
    <p className="program-results-count" role="status">{results.length} {t.results}</p>
    {results.length ? <div className="program-card-grid">{results.map((program) => <article className="program-card" key={program.slug}><div className="program-card__image"><Image src={program.image} alt="" fill sizes="(max-width: 769px) 100vw, (max-width: 1199px) 50vw, 33vw" /></div><div className="program-card__body"><p className="program-card__meta">{program.country} · {program.type}</p><h2>{program.name}</h2><Link href={localizedPath(lang, `/programs/${program.slug}`)} className="btn btn-dark">{t.details}<ArrowIcon /></Link></div></article>)}</div> : <p className="program-empty">{t.empty}</p>}
  </>;
}
