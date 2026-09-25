import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import { ArrowIcon } from '@/components/Icons';
import { news } from '@/lib/data-ar';

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = news.find((n) => n.slug === slug);
  return { title: `${article?.title || 'مقال'} — ميجرانتلي` };
}

export default async function ArNewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = news.find((n) => n.slug === slug);
  if (!article) notFound();

  const related = news.filter((n) => n.slug !== article.slug).slice(0, 3);

  return (
    <>
      <PageHero
        label="رؤى"
        title={article.title}
        description={article.description}
        breadcrumb={[
          { label: 'الرئيسية', href: '/ar' },
          { label: 'الأخبار', href: '/ar/news' },
          { label: article.title },
        ]}
        image="/assets/images/1454165804606-c3d57bc86b40.webp"
      />

      <section className="page-content">
        <div className="container">
          <div className="page-content-grid">
            <div className="article-content">
              <p className="news-item-date" style={{ marginBottom: '24px' }}>
                {article.date}
              </p>

              <p style={{ fontSize: '18px', fontWeight: 300, lineHeight: 1.6, marginBottom: '24px' }}>
                {article.description}
              </p>

              <p>{article.content}</p>

              <p>قد تتغير سياسات الهجرة ومتطلبات البرامج دون إشعار. راجع دائماً المصدر الحكومي الرسمي المرتبط بوجهتك قبل الاعتماد على أي تحديث.</p>

              <h2>كيف تساعدك ميجرانتلي</h2>
              <p>
                يساعدك الموقع على الوصول إلى فئة الخدمة والوجهة ذات الصلة وإرسال استفسارك.
                لا تُعد المقالات تقييماً للأهلية أو مشورة قانونية ولا تضمن نتيجة أي طلب.
              </p>

              <div style={{ marginTop: '40px', padding: '32px', background: 'rgba(7,27,57,0.04)', border: '1px solid var(--border)' }}>
                <h3 style={{ margin: '0 0 12px', fontSize: '20px', fontWeight: 500, color: 'var(--primary)' }}>
                  تحتاج مشورة حول هذا التحديث؟
                </h3>
                <p style={{ marginBottom: '20px', fontWeight: 300, fontSize: '14px', color: 'var(--muted)' }}>
                  أرسل استفسارك وسيتواصل معك الفريق عبر وسيلة الاتصال التي تختارها.
                </p>
                <Link href="/ar/contact" className="btn btn-dark">
                  احجز استشارة <ArrowIcon />
                </Link>
              </div>
            </div>

            <aside className="sidebar">
              <p className="sidebar-title">مقالات ذات صلة</p>
              <ul className="sidebar-links">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/ar/news/${r.slug}`} className="sidebar-link">
                      {r.title}
                      <ArrowIcon />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/ar/news" className="btn btn-dark sidebar-cta">
                كل الأخبار <ArrowIcon />
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container">
          <h2>ابقَ في طليعة تغييرات السياسة</h2>
          <p>تواصل معنا إذا كنت بحاجة إلى المساعدة في الوصول إلى المصدر الرسمي أو فئة الخدمة المناسبة.</p>
          <Link href="/ar/contact" className="btn btn-primary">تواصل معنا <ArrowIcon /></Link>
        </div>
      </section>
    </>
  );
}
