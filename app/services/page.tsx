import Link from 'next/link';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import { services } from '@/lib/data';
import { ArrowIcon } from '@/components/Icons';

export const metadata = { title: 'Immigration Services — Migrantly' };

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Our Services"
        title="Immigration Services"
        description="Comprehensive visa, residency and citizenship solutions tailored to your goals. Explore our full range of immigration services below."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Services' }]}
      />

      <section className="page-content">
        <div className="container">
          <div className="card-grid">
            {services.map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`} className="service-card">
                <Image width={900} height={600} className="service-card-image" src={service.image} alt={service.title} />
                <div className="service-card-content">
                  <div>
                    <h3 className="service-card-title">{service.title}</h3>
                    <p className="service-card-tagline">{service.tagline}</p>
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
          <h2>Not sure which service is right for you?</h2>
          <p>Book a free consultation and our immigration experts will guide you to the best pathway for your situation.</p>
          <Link href="/contact" className="btn btn-primary">Book a consultation<ArrowIcon /></Link>
        </div>
      </section>
    </>
  );
}
