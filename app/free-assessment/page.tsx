import LeadSection from '@/components/LeadSection';
import AssessmentTool from '@/components/tools/AssessmentTool';
import { siteConfig } from '@/lib/site-config';

const title = 'Free Immigration Assessment — Check Your Eligibility';
const description = 'Free, instant immigration eligibility check for Canada, Australia, the UK and Germany. Estimate your points, then talk to a Migrantly specialist.';

export const metadata = {
  title,
  description,
  alternates: { canonical: '/free-assessment' },
  openGraph: { type: 'website' as const, title, description, url: '/free-assessment' },
};

const faqs = [
  { q: 'Is the assessment really free?', a: 'Yes. The online estimate is free, instant and needs no account. You only share your details if you choose to request a consultation.' },
  { q: 'Which countries can I check?', a: 'You can check Canada, Australia, the United Kingdom and Germany with a points estimate. For Germany, you can estimate your Opportunity Card points.' },
  { q: 'How accurate is the result?', a: 'The estimate follows published point tables, but it relies on the answers you give and rules that change often. Treat it as a guide, not an official score.' },
  { q: 'Does a high score guarantee a visa?', a: 'No. A score can make you eligible or competitive, but only the immigration authority decides applications. Invitation cut-offs and processing times also change.' },
  { q: 'Can I check more than one country?', a: 'Yes. You can run as many checks as you like, which helps you compare where your profile is strongest.' },
  { q: 'What if my score is too low?', a: 'Language results, additional qualifications, work experience and nominations can often raise a score. A consultation can show which steps would help most.' },
  { q: 'What happens to my details?', a: 'The calculators run in your browser and do not store your answers. If you request a consultation, we use your details only to respond to that request.' },
  { q: 'Is this legal advice?', a: 'No. This is general information only. A specialist can advise on your individual circumstances.' },
];

const commitments = [
  'Accuracy: we base estimates on published rules and tell you when rules change.',
  'Transparency: we explain how each score is worked out.',
  'No pressure: you can use the tool without sharing any personal details.',
  'Privacy: your answers stay in your browser, and consultation details are used only to reply to you.',
  'Objectivity: we tell you honestly when a route is not a good fit.',
];

export default function FreeAssessmentPage() {
  const structured = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.q, acceptedAnswer: { '@type': 'Answer', text: faq.a } })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title,
      description,
      url: `${siteConfig.url}/free-assessment`,
      isPartOf: { '@type': 'WebSite', name: siteConfig.name, url: siteConfig.url },
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, '\\u003c') }} />
      <section className="assess-page">
        <div className="container">
          <p className="assess-head__eyebrow">Migrantly immigration eligibility</p>
          <h1 className="assess-head__title">Your world is full of opportunities. <em>Find yours.</em></h1>
          <p className="assess-head__text">Pick a country and a pathway, then fill in your details. It takes a few minutes and your answers stay in your browser.</p>
          <AssessmentTool />
        </div>
      </section>

      <section className="assess-info">
        <div className="container">
          <div className="assess-info__grid">
            <div>
              <h2>Frequently asked questions</h2>
              <div className="service-faqs">
                {faqs.map((faq) => (
                  <details key={faq.q}>
                    <summary>{faq.q}</summary>
                    <p>{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
            <aside>
              <h2>Our commitments</h2>
              <ul className="assess-info__list">
                {commitments.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <p className="tool-disclaimer">
                This tool gives general information only and is not legal advice or a formal assessment. Scores are estimates based on the information you enter and on published criteria, which can change. Migrantly is not a government body and cannot guarantee any visa outcome. Please confirm current rules with the official immigration authority.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <LeadSection lang="en" />
    </>
  );
}
