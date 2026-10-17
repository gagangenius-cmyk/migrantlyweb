import LeadSection from '@/components/LeadSection';
import Link from 'next/link';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import { countries } from '@/lib/data-ar';
import { ArrowIcon } from '@/components/Icons';

export const metadata = { title: 'دول الهجرة — ميجرانتلي' };

export default function ArCountriesPage() {
  return (
    <>
      <PageHero
        label="الوجهات"
        title="دول الهجرة"
        description="استكشف وجهات الهجرة الرائدة التي نخدمها. كل دولة لها مساراتها ومتطلباتها وفرصها الفريدة."
        breadcrumb={[{ label: 'الرئيسية', href: '/ar' }, { label: 'الدول' }]}
      />

      <section className="page-content">
        <div className="container">
          <div className="card-grid">
            {countries.map((country) => (
              <Link key={country.slug} href={`/ar/countries/${country.slug}`} className="service-card">
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

      <LeadSection lang="ar" />
    </>
  );
}
