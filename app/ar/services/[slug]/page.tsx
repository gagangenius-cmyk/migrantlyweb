import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import { services } from '@/lib/data-ar';
import { ArrowIcon } from '@/components/Icons';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  return { title: `${service?.title || 'خدمة'} — ميجرانتلي` };
}

export default async function ArServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
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
          { label: 'الرئيسية', href: '/ar' },
          { label: 'الخدمات', href: '/ar/services' },
          { label: service.title },
        ]}
        image={service.image}
      />

      <section className="page-content">
        <div className="container">
          <div className="page-content-grid">
            <div className="article-content">
              <h2>نظرة عامة</h2>
              <p>{service.description}</p>
              <p>يساعدك فريقنا على فهم خطوات الخدمة المتاحة وتنظيم المعلومات وتوجيه استفسارك إلى جهة التواصل المناسبة.</p>

              <h2>ما نتولاه</h2>
              <ul>
                {service.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>

              <h2>برامج مميزة</h2>
              <p>استكشف البرامج الأكثر شعبية في {service.title}:</p>

              <div className="card-grid" style={{ marginTop: '24px' }}>
                {service.programs.map((program, idx) => (
                  <Link key={idx} href={`/ar/programs/${program.slug}`} className="program-detail-box" style={{ textDecoration: 'none' }}>
                    <h3 style={{ marginBottom: '12px' }}>{program.name}</h3>
                    <p className="program-card-link-copy">عرض معلومات البرنامج العامة</p>
                  </Link>
                ))}
              </div>
            </div>

            <aside className="sidebar">
              <p className="sidebar-title">كل الخدمات</p>
              <ul className="sidebar-links">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/ar/services/${s.slug}`} className={`sidebar-link ${s.slug === service.slug ? 'active' : ''}`}>
                      {s.title}
                      <ArrowIcon />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/ar/contact" className="btn btn-dark sidebar-cta">ابدأ الآن<ArrowIcon /></Link>
            </aside>
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container">
          <h2>جاهز لبدء رحلتك؟</h2>
          <p>تواصل معنا للاستفسار عن خدمة {service.title}.</p>
          <Link href="/ar/contact" className="btn btn-primary">احجز استشارة<ArrowIcon /></Link>
        </div>
      </section>
    </>
  );
}
