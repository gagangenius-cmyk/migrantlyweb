import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import PointsCalculator from '@/components/tools/PointsCalculator';
import { ArrowIcon } from '@/components/Icons';
import { getTool, tools } from '@/lib/tools/registry';

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const tool = getTool((await params).slug);
  return tool ? { title: tool.name, description: tool.summary } : {};
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const tool = getTool((await params).slug);
  if (!tool) notFound();

  return (
    <>
      <PageHero
        label={tool.country}
        title={tool.name}
        description={tool.summary}
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Tools', href: '/tools' }, { label: tool.name }]}
      />
      <section className="page-content">
        <div className="container">
          <PointsCalculator slug={tool.slug} />
          <p className="tool-disclaimer">
            This calculator is an estimate for information only and is not legal advice. Immigration rules, point values and cut-offs change often, so confirm the current rules on the{' '}
            <a href={tool.officialUrl} target="_blank" rel="noopener noreferrer">official {tool.country} source</a> before you apply. System: {tool.system}.
          </p>
        </div>
      </section>
      <section className="cta-banner">
        <div className="container">
          <h2>Want an expert to review your score?</h2>
          <p>Book a free consultation and we will check your eligibility and the best route for your profile.</p>
          <Link href="/contact" className="btn btn-primary">Book a consultation<ArrowIcon /></Link>
        </div>
      </section>
    </>
  );
}
