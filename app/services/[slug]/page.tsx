import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import { services } from '@/lib/data';
import { ArrowIcon } from '@/components/Icons';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  return { title: `${service?.title || 'Service'} — Migrantly` };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <>
      <PageHero
        label={service.tagline}
        title={service.title}
        description={service.description}
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: service.title },
        ]}
        image={service.image}
      />

      <section className="page-content">
        <div className="container">
          <div className="page-content-grid">
            <div className="article-content">
              <h2>Overview</h2>
              <p>{service.description}</p>
              <p>Our team can help you understand the available service steps, organise information and route your enquiry to the appropriate contact.</p>

              <h2>What we handle</h2>
              <ul>
                {service.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>

              <h2>Featured programs</h2>
              <p>Explore the most popular programs within {service.title.toLowerCase()}:</p>

              <div className="card-grid" style={{ marginTop: '24px' }}>
                {service.programs.map((program, idx) => (
                  <Link key={idx} href={`/programs/${program.slug}`} className="program-detail-box" style={{ textDecoration: 'none' }}>
                    <h3 style={{ marginBottom: '12px' }}>{program.name}</h3>
                    <p style={{ color: 'var(--muted)', fontSize: '14px' }}>View general program information</p>
                  </Link>
                ))}
              </div>
            </div>

            <aside className="sidebar">
              <p className="sidebar-title">All Services</p>
              <ul className="sidebar-links">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className={`sidebar-link ${s.slug === service.slug ? 'active' : ''}`}
                    >
                      {s.title}
                      <ArrowIcon />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn btn-dark sidebar-cta">Get started<ArrowIcon /></Link>
            </aside>
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container">
          <h2>Ready to begin your journey?</h2>
          <p>Schedule a free consultation with our {service.title.toLowerCase()} specialists today.</p>
          <Link href="/contact" className="btn btn-primary">Book a consultation<ArrowIcon /></Link>
        </div>
      </section>
    </>
  );
}
