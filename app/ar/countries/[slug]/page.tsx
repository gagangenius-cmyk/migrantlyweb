import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import { countries } from '@/lib/data-ar';
import { ArrowIcon } from '@/components/Icons';

export function generateStaticParams() {
  return countries.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const country = countries.find((c) => c.slug === slug);
  return { title: `الهجرة إلى ${country?.name || 'الدولة'} — ميجرانتلي` };
}

export default async function ArCountryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const country = countries.find((c) => c.slug === slug);
  if (!country) notFound();

  return (
    <>
      <PageHero
        label={country.tagline}
        title={`الهجرة إلى ${country.name}`}
        description={country.description}
        breadcrumb={[
          { label: 'الرئيسية', href: '/ar' },
          { label: 'الدول', href: '/ar/countries' },
          { label: country.name },
        ]}
        image={country.image}
      />

      <section className="page-content">
        <div className="container">
          <div className="page-content-grid">
            <div className="article-content">
              <h2>لماذا {country.name}؟</h2>
              <p>{country.description}</p>

              <h2>البرامج المتاحة</h2>
              <p>يتولى فريقنا مجموعة الهجرة الكاملة المتاحة في {country.name}:</p>
              <ul>
                {country.programs.map((program, idx) => (
                  <li key={idx}>{program}</li>
                ))}
              </ul>

              <h2>كيف نساعدك</h2>
              <p>
                من استشارتك الأولى حتى وصولك إلى {country.name}، ندير كل خطوة من رحلة الهجرة. تشمل خدماتنا:
              </p>
              <ul>
                <li>تقييم أهلية شامل</li>
                <li>إعداد وتدقيق الوثائق</li>
                <li>تقديم الطلب وتتبعه</li>
                <li>إعداد المقابلة والتدريب</li>
                <li>دعم ما بعد الوصول وخدمات الاستقرار</li>
                <li>تخطيط المسار من التأشيرة إلى الإقامة الدائمة والجنسية</li>
              </ul>

              <h2>المتطلبات والمصادر الرسمية</h2>
              <p>تختلف المتطلبات والمدد بين البرامج وقد تتغير. تحقّق من الجهة الحكومية الرسمية قبل تقديم الطلب أو اتخاذ قرار مالي.</p>
            </div>

            <aside className="sidebar">
              <p className="sidebar-title">كل الدول</p>
              <ul className="sidebar-links">
                {countries.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/ar/countries/${c.slug}`} className={`sidebar-link ${c.slug === country.slug ? 'active' : ''}`}>
                      {c.name}
                      <ArrowIcon />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/ar/contact" className="btn btn-dark sidebar-cta">ابدأ طلبك<ArrowIcon /></Link>
            </aside>
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container">
          <h2>جاهز للانتقال إلى {country.name}؟</h2>
          <p>تواصل معنا للاستفسار عن فئات الخدمات المتعلقة بـ {country.name}.</p>
          <Link href="/ar/contact" className="btn btn-primary">احجز استشارة<ArrowIcon /></Link>
        </div>
      </section>
    </>
  );
}
