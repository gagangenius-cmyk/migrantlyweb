import LeadSection from '@/components/LeadSection';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import { ArrowIcon, CheckIcon } from '@/components/Icons';
import { programs, services } from '@/lib/data-ar';

export function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = programs.find((p) => p.slug === slug);
  return { title: `${program?.name || 'برنامج'} — ميجرانتلي` };
}

export default async function ArProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = programs.find((p) => p.slug === slug);
  if (!program) notFound();

  const relatedService = services.find((s) => s.programs.some((p) => p.slug === program.slug));

  const t = {
    country: 'الدولة',
    language: 'اللغة',
    type: 'النوع',
    status: 'الحالة',
    requirements: 'المتطلبات',
    applicationSteps: 'خطوات التقديم',
    overview: 'نظرة عامة على البرنامج',
    whyChoose: 'لماذا تختار ميجرانتلي؟',
    programInfo: 'معلومات البرنامج',
  };

  return (
    <>
      <PageHero
        label={program.type}
        title={program.name}
        description={program.description}
        breadcrumb={[
          { label: 'الرئيسية', href: '/ar' },
          { label: 'البرامج', href: '/ar/programs' },
          { label: program.name },
        ]}
        image={program.image}
      />

      <section className="page-content">
        <div className="container">
          <div className="page-content-grid">
            <div className="article-content">
              <div className="program-facts">
                <div className="program-fact">
                  <p className="program-fact__label">{t.country}</p>
                  <p className="program-fact__value">{program.country}</p>
                </div>
                <div className="program-fact">
                  <p className="program-fact__label">{t.type}</p>
                  <p className="program-fact__value">{program.type}</p>
                </div>
                {program.language && (
                  <div className="program-fact">
                    <p className="program-fact__label">{t.language}</p>
                    <p className="program-fact__value">{program.language}</p>
                  </div>
                )}
              </div>

              <h2>{t.overview}</h2>
              <p>{program.description}</p>
              <p>
                تعرض هذه الصفحة معلومات عامة عن {program.name}. تحقّق دائماً من أحدث الشروط والرسوم والمدد
                لدى الجهة الحكومية الرسمية قبل اتخاذ أي قرار أو تقديم طلب.
              </p>

              <div className="program-detail-grid">
                <div className="program-detail-box">
                  <h3>{t.requirements}</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {program.requirements.map((req, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '14px', fontSize: '14px', fontWeight: 300, lineHeight: 1.5 }}>
                        <span style={{ flexShrink: 0, marginTop: '2px', color: 'var(--primary)' }}>
                          <CheckIcon />
                        </span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="program-detail-box">
                  <h3>{t.applicationSteps}</h3>
                  <ol>
                    {program.steps.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>

              <h2>{t.whyChoose}</h2>
              <p>
                نوفر معلومات منظمة ومساراً واضحاً لإرسال الاستفسار. لا يقيّم الموقع أهليتك ولا يضمن نتيجة
                الطلب، وتظل القرارات والمتطلبات خاضعة للجهات الرسمية المختصة.
              </p>

              <ul>
                <li>عرض منظم لفئة البرنامج والوجهة</li>
                <li>روابط مباشرة إلى الخدمة والوجهة ذات الصلة</li>
                <li>نموذج موحد لإرسال الاستفسار</li>
                <li>تنبيه واضح للتحقق من المصادر الحكومية الرسمية</li>
              </ul>
            </div>

            <aside className="sidebar">
              <p className="sidebar-title">{t.programInfo}</p>
              <ul className="sidebar-links">
                <li className="sidebar-link" style={{ cursor: 'default' }}>
                  <span>{t.country}</span>
                  <span style={{ fontWeight: 500 }}>{program.country}</span>
                </li>
                <li className="sidebar-link" style={{ cursor: 'default' }}>
                  <span>{t.type}</span>
                  <span style={{ fontWeight: 500 }}>{program.type}</span>
                </li>
                <li className="sidebar-link" style={{ cursor: 'default' }}>
                  <span>{t.status}</span>
                  <span style={{ fontWeight: 500 }}>{program.tag}</span>
                </li>
              </ul>

              {relatedService && (
                <Link href={`/ar/services/${relatedService.slug}`} className="btn btn-dark sidebar-cta">
                  {relatedService.title} <ArrowIcon />
                </Link>
              )}

              <Link href="/ar/contact" className="btn btn-dark sidebar-cta" style={{ marginTop: '12px' }}>
                ابدأ الآن <ArrowIcon />
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <LeadSection lang="ar" />
    </>
  );
}
