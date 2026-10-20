import PageHero from '@/components/PageHero';
import LeadSection from '@/components/LeadSection';
import FaqSearch from '@/components/FaqSearch';
import { faqs } from '@/lib/faqs';

const title = 'FAQs — Immigration Questions Answered';
const description = 'Answers to common questions on Canada, Australia, UK and New Zealand skilled migration, tourist visas, investor and business visas. Search by topic.';

export const metadata = {
  title,
  description,
  alternates: { canonical: '/faq' },
  openGraph: { type: 'website' as const, title, description, url: '/faq' },
};

export default function FaqPage() {
  const structured = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, '\\u003c') }} />
      <PageHero label="Help" title="Frequently Asked Questions" description="Search by topic, for example “Canada Skilled”, or pick a category." breadcrumb={[{ label: 'Home', href: '/' }, { label: 'FAQ’s' }]} />
      <section className="page-content">
        <div className="container"><FaqSearch /></div>
      </section>
      <LeadSection lang="en" />
    </>
  );
}
