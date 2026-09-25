import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import { countries } from '@/lib/data';
import { ArrowIcon } from '@/components/Icons';

export function generateStaticParams() {
  return countries.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const country = countries.find((c) => c.slug === slug);
  return { title: `Immigration to ${country?.name || 'Country'} — Migrantly` };
}

export default async function CountryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const country = countries.find((c) => c.slug === slug);
  if (!country) notFound();

  return (
    <>
      <PageHero
        label={country.tagline}
        title={`Immigrate to ${country.name}`}
        description={country.description}
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Countries', href: '/countries' },
          { label: country.name },
        ]}
        image={country.image}
      />

      <section className="page-content">
        <div className="container">
          <div className="page-content-grid">
            <div className="article-content">
              <h2>Why {country.name}?</h2>
              <p>{country.description}</p>

              <div className="country-stats">
                {country.stats.map((stat, idx) => (
                  <div className="country-stat" key={idx}>
                    <span className="country-stat-value">{stat.value}</span>
                    <span className="country-stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>

              <h2>Available programs</h2>
              <p>Our team handles the full range of immigration programs available in {country.name}:</p>
              <ul>
                {country.programs.map((program, idx) => (
                  <li key={idx}>{program}</li>
                ))}
              </ul>

              <h2>How we help</h2>
              <p>
                From your first consultation to your arrival in {country.name}, we manage every step of your
                immigration journey. Our services include:
              </p>
              <ul>
                <li>Comprehensive eligibility assessment</li>
                <li>Document preparation and verification</li>
                <li>Application submission and tracking</li>
                <li>Interview preparation and coaching</li>
                <li>Post-arrival support and settlement assistance</li>
                <li>Pathway planning from visa to permanent residency and citizenship</li>
              </ul>

              <h2>Processing times & requirements</h2>
              <p>
                Processing times and requirements vary significantly between programs. We provide a detailed timeline
                and checklist specific to your chosen pathway during your initial consultation. Book a session today
                to get started.
              </p>
            </div>

            <aside className="sidebar">
              <p className="sidebar-title">All Countries</p>
              <ul className="sidebar-links">
                {countries.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/countries/${c.slug}`}
                      className={`sidebar-link ${c.slug === country.slug ? 'active' : ''}`}
                    >
                      {c.name}
                      <ArrowIcon />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn btn-dark sidebar-cta">Start your application<ArrowIcon /></Link>
            </aside>
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container">
          <h2>Ready to move to {country.name}?</h2>
          <p>Book a free consultation with our {country.name} immigration specialists.</p>
          <Link href="/contact" className="btn btn-primary">Book a consultation<ArrowIcon /></Link>
        </div>
      </section>
    </>
  );
}
