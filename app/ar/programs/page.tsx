import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import ProgramCatalog from '@/components/ProgramCatalog';
import { programs } from '@/lib/data-ar';
import { programs as englishPrograms } from '@/lib/data';

export const metadata: Metadata = { title: 'برامج الهجرة', description: 'تصفح فئات خدمات الهجرة حسب الوجهة والمسار.', alternates: { languages: { en: '/programs', ar: '/ar/programs' } } };

export default function ArabicProgramsPage() {
  const localizedPrograms = programs.map((program, index) => ({ ...program, filterType: englishPrograms[index]?.type, countrySlug: ({ Canada: 'canada', Australia: 'australia', 'United Kingdom': 'united-kingdom', 'United States': 'united-states', Portugal: 'portugal', 'European Union': 'european-union' } as Record<string, string>)[englishPrograms[index]?.country] }));
  return <><PageHero label="استكشف البرامج" title="برامج الهجرة" description="تصفح المسارات حسب الوجهة ونوع الخدمة. تتغير المتطلبات، لذا تحقق من المعايير الحالية قبل التقديم." breadcrumb={[{ label: 'الرئيسية', href: '/ar' }, { label: 'البرامج' }]} /><section className="page-content"><div className="container"><ProgramCatalog lang="ar" programs={localizedPrograms} /></div></section></>;
}
