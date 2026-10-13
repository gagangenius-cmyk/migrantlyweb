import Link from 'next/link';
import PageHero from '@/components/PageHero';
import DrawTable from '@/components/tools/DrawTable';
import { ArrowIcon } from '@/components/Icons';
import { draws, drawsSource } from '@/lib/express-entry-draws';

export const metadata = {
  title: 'Express Entry Draws — Latest CRS Cut-offs',
  description: 'Recent Canada Express Entry draws with date, program, invitations issued and lowest CRS score. Compare your own CRS score against each round.',
  alternates: { canonical: '/tools/express-entry-draws' },
};

export default function ExpressEntryDrawsPage() {
  const latest = draws[0];
  const retrieved = new Date(`${drawsSource.retrieved}T00:00:00Z`).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
  const structured = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'Express Entry rounds of invitations',
    description: metadata.description,
    creator: { '@type': 'Organization', name: drawsSource.name },
    url: drawsSource.url,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, '\\u003c') }} />
      <PageHero
        label="Canada"
        title="Express Entry Draws"
        description={`The most recent round was draw #${latest.number}. Compare your CRS score with recent cut-offs.`}
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Tools', href: '/tools' }, { label: 'Express Entry Draws' }]}
      />
      <section className="page-content">
        <div className="container">
          <DrawTable draws={draws} />
          <p className="tool-disclaimer">
            Data from <a href={drawsSource.url} target="_blank" rel="noopener noreferrer">{drawsSource.name}</a>, retrieved {retrieved}. New rounds are published often, so check the official page for the latest results before you decide anything.
          </p>
        </div>
      </section>
      <section className="cta-banner">
        <div className="container">
          <h2>Not sure how to raise your score?</h2>
          <p>Our team can review your profile and suggest realistic ways to improve it.</p>
          <Link href="/contact" className="btn btn-primary">Book a consultation<ArrowIcon /></Link>
        </div>
      </section>
    </>
  );
}
