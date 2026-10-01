import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import { ArrowIcon, CheckIcon } from '@/components/Icons';
import { programs, services } from '@/lib/data';

export function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = programs.find((p) => p.slug === slug);
  return { title: `${program?.name || 'Program'} — Migrantly` };
}

export default async function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = programs.find((p) => p.slug === slug);
  if (!program) notFound();

  // Find related service
  const relatedService = services.find((s) =>
    s.programs.some((p) => p.slug === program.slug)
  );

  return (
    <>
      <PageHero
        label={program.type}
        title={program.name}
        description={program.description}
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Programs', href: '/programs' },
          { label: program.name },
        ]}
        image={program.image}
      />

      <section className="page-content">
        <div className="container">
          <div className="page-content-grid">
            <div className="article-content">
              {/* Quick facts */}
              <div className="program-facts">
                <div className="program-fact">
                  <p className="program-fact__label">Country</p>
                  <p className="program-fact__value">{program.country}</p>
                </div>
                {program.language && (
                  <div className="program-fact">
                    <p className="program-fact__label">Language</p>
                    <p className="program-fact__value">{program.language}</p>
                  </div>
                )}
              </div>

              <h2>Program Overview</h2>
              <p>{program.description}</p>
              <p>
                Our team has extensive experience with the {program.name} program. We handle every aspect of
                your application — from initial eligibility assessment through to final approval — ensuring
                that your documentation is complete, accurate and submitted within deadlines.
              </p>

              {/* Requirements & Steps */}
              <div className="program-detail-grid">
                <div className="program-detail-box">
                  <h3>Requirements</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {program.requirements.map((req, idx) => (
                      <li key={idx} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        marginBottom: '14px',
                        fontSize: '14px',
                        fontWeight: 300,
                        lineHeight: 1.5,
                      }}>
                        <span style={{
                          flexShrink: 0,
                          marginTop: '2px',
                          color: 'var(--primary)',
                        }}>
                          <CheckIcon />
                        </span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="program-detail-box">
                  <h3>Application Steps</h3>
                  <ol>
                    {program.steps.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>

              <h2>Why choose Migrantly?</h2>
              <p>We provide structured information and enquiry support. Always confirm current eligibility rules, government fees and processing times with the relevant official authority before making a decision.</p>

              <ul>
                <li>Free initial eligibility assessment</li>
                <li>Dedicated case manager assigned to your application</li>
                <li>Transparent fixed-fee pricing — no hidden costs</li>
                <li>Direct communication with processing agencies</li>
                <li>Application tracking and regular progress updates</li>
                <li>Post-approval support: settlement, banking, housing</li>
              </ul>
            </div>

            <aside className="sidebar">
              <p className="sidebar-title">Program Info</p>
              <ul className="sidebar-links">
                <li className="sidebar-link" style={{ cursor: 'default' }}>
                  <span>Country</span>
                  <span style={{ fontWeight: 500 }}>{program.country}</span>
                </li>
                <li className="sidebar-link" style={{ cursor: 'default' }}>
                  <span>Type</span>
                  <span style={{ fontWeight: 500 }}>{program.type}</span>
                </li>
                <li className="sidebar-link" style={{ cursor: 'default' }}>
                  <span>Status</span>
                  <span style={{ fontWeight: 500 }}>{program.tag}</span>
                </li>
              </ul>

              {relatedService && (
                <Link href={`/services/${relatedService.slug}`} className="btn btn-dark sidebar-cta">
                  {relatedService.title} <ArrowIcon />
                </Link>
              )}

              <Link href="/contact" className="btn btn-dark sidebar-cta" style={{ marginTop: '12px' }}>
                Get started <ArrowIcon />
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container">
          <h2>Ready to apply for {program.name}?</h2>
          <p>Book a free consultation and our specialists will assess your eligibility and guide you through the process.</p>
          <Link href="/contact" className="btn btn-primary">Book a consultation <ArrowIcon /></Link>
        </div>
      </section>
    </>
  );
}
