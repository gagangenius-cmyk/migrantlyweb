import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import ProgramCatalog from '@/components/ProgramCatalog';
import { programs } from '@/lib/data';

export const metadata: Metadata = { title: 'Immigration Programs', description: 'Browse immigration service categories by destination and pathway.', alternates: { languages: { en: '/programs', ar: '/ar/programs' } } };

export default function ProgramsPage() {
  return <><PageHero label="Explore programs" title="Immigration Programs" description="Browse pathways by destination and service type. Requirements change, so confirm current criteria before applying." breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Programs' }]} /><section className="page-content"><div className="container"><ProgramCatalog lang="en" programs={programs} /></div></section></>;
}
