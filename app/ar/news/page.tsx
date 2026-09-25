import Link from 'next/link';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import { ArrowIcon } from '@/components/Icons';
import { news } from '@/lib/data-ar';

export const metadata = { title: 'أخبار ورؤى الهجرة — ميجرانتلي' };

export default function ArNewsPage() {
  return (
    <>
      <PageHero
        label="رؤى"
        title="أخبار الهجرة"
        description="ابقَ على اطلاع بأحدث تغييرات السياسة وتحديثات البرامج ورؤى الصناعة من خبراء الهجرة لدينا."
        breadcrumb={[{ label: 'الرئيسية', href: '/ar' }, { label: 'الأخبار' }]}
      />

      <section className="page-content">
        <div className="container">
          {news.length > 0 && (
            <div style={{ marginBottom: '60px' }}>
              <Link href={`/ar/news/${news[0].slug}`} className="news-item" style={{ display: 'block' }}>
                <div className="news-featured-grid">
                  <div style={{ aspectRatio: '4 / 3', overflow: 'hidden', background: 'rgba(7,27,57,0.06)' }}>
                    <Image width={900} height={675} src="/assets/images/1521791136064-7986c2920216.webp" alt={news[0].title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <p className="news-item-date">{news[0].date}</p>
                    <h2 className="news-featured-title">
                      {news[0].title}
                    </h2>
                    <p style={{ fontWeight: 300, fontSize: '16px', lineHeight: 1.6, color: 'var(--muted)', marginBottom: '24px' }}>
                      {news[0].description}
                    </p>
                    <span className="btn btn-dark btn-sm">اقرأ المقال <ArrowIcon /></span>
                  </div>
                </div>
              </Link>
            </div>
          )}

          <div style={{ width: '100%', height: '1px', background: 'var(--border)', marginBottom: '48px' }} />

          <div className="news-grid">
            {news.slice(1).map((article) => (
              <Link key={article.slug} href={`/ar/news/${article.slug}`} className="news-item">
                <div className="news-item-image">
                  <Image width={900} height={600} src="/assets/images/1454165804606-c3d57bc86b40.webp" alt={article.title} />
                </div>
                <p className="news-item-date">{article.date}</p>
                <h3 className="news-item-title">{article.title}</h3>
                <p className="news-item-description">{article.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container">
          <h2>هل تحتاج إلى مساعدة في اختيار الخدمة؟</h2>
          <p>تواصل مع فريقنا للحصول على نظرة واضحة حول الخدمات المتاحة عبر هذا الموقع.</p>
          <Link href="/ar/contact" className="btn btn-primary">تواصل معنا <ArrowIcon /></Link>
        </div>
      </section>
    </>
  );
}
