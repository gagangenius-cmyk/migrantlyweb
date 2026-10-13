import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { ArrowIcon } from '@/components/Icons';
import { toolLinks } from '@/lib/tools/registry';

export const metadata = {
  title: 'Immigration Tools & Points Calculators',
  description: 'Free immigration points calculators for Canada, Australia and the UK, Express Entry draw results and an IELTS to CLB converter.',
};

export default function ToolsPage() {
  return (
    <>
      <PageHero
        label="Immigration Tools"
        title="Points Calculators"
        description="Estimate your immigration score for each country. Results are indicative and based on published rules."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Tools' }]}
      />
      <section className="page-content">
        <div className="container">
          <div className="tool-grid">
            {toolLinks.map((tool) => (
              <Link key={tool.slug} href={`/tools/${tool.slug}`} className="tool-card">
                <span className="tool-card__country">{tool.country}</span>
                <h2>{tool.name}</h2>
                <p>{tool.summary}</p>
                <span className="tool-card__go">Open tool <ArrowIcon /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
