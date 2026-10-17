import LeadSection from '@/components/LeadSection';
import Link from 'next/link';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import { services } from '@/lib/data-ar';
import { ArrowIcon } from '@/components/Icons';

export const metadata = { title: 'خدمات الهجرة — ميجرانتلي' };

export default function ArServicesPage() {
  return (
    <>
      <PageHero
        label="خدماتنا"
        title="خدمات الهجرة"
        description="حلول شاملة للتأشيرات والإقامة والجنسية مصممة وفقاً لأهدافك. استكشف مجموعتنا الكاملة من خدمات الهجرة أدناه."
        breadcrumb={[{ label: 'الرئيسية', href: '/ar' }, { label: 'الخدمات' }]}
      />

      <section className="page-content">
        <div className="container">
          <div className="card-grid">
            {services.map((service) => (
              <Link key={service.slug} href={`/ar/services/${service.slug}`} className="service-card">
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

      <LeadSection lang="ar" />
    </>
  );
}
