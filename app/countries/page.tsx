import Link from 'next/link';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import { countries } from '@/lib/data';
import { ArrowIcon } from '@/components/Icons';

export const metadata = { title: 'Countries — Migrantly' };

export default function CountriesPage() {
  return (
    <>
      <PageHero
        label="Destinations"
        title="Countries We Cover"
        description="Explore destination categories and find links to general program information."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Countries' }]}
      />

      <section className="page-content">
        <div className="container">
          <div className="card-grid">
            {countries.map((country) => (
              <Link key={country.slug} href={`/countries/${country.slug}`} className="service-card">
                <Image width={900} height={600} className="service-card-image" src={country.image} alt={country.name} />
                <div className="service-card-content">
                  <div>
                    <h3 className="service-card-title">{country.name}</h3>
                    <p className="service-card-tagline">{country.tagline}</p>
                  </div>
                  <span className="btn-arrow"><ArrowIcon /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container">
          <h2>Don&apos;t see your destination?</h2>
          <p>Contact us to discuss your target destination and the services currently available.</p>
          <Link href="/contact" className="btn btn-primary">Ask about your country<ArrowIcon /></Link>
        </div>
      </section>
    </>
  );
}
