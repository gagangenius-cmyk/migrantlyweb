import Link from 'next/link';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import { ArrowIcon } from '@/components/Icons';
import { news } from '@/lib/data';

export const metadata = { title: 'Immigration News & Insights — Migrantly' };

export default function NewsPage() {
  return (
    <>
      <PageHero
        label="Insights"
        title="Immigration News"
        description="Stay informed with the latest policy changes, program updates and industry insights from our immigration experts."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'News' }]}
      />

      <section className="page-content">
        <div className="container">
          {/* Featured article (first one) */}
          {news.length > 0 && (
            <div style={{ marginBottom: '60px' }}>
              <Link href={`/news/${news[0].slug}`} className="news-item" style={{ display: 'block' }}>
                <div className="news-featured-grid">
                  <div style={{
                    aspectRatio: '4 / 3',
                    overflow: 'hidden',
                    background: 'rgba(7,27,57,0.06)',
                  }}>
                    <Image width={900} height={675}
                      src="/assets/images/1521791136064-7986c2920216.webp"
                      alt={news[0].title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div>
                    <p className="news-item-date">{news[0].date}</p>
                    <h2 style={{
                      fontSize: '32px',
                      fontWeight: 400,
                      lineHeight: 1.2,
                      letterSpacing: '-0.03em',
                      textTransform: 'uppercase',
                      margin: '0 0 16px',
                    }}>
                      {news[0].title}
                    </h2>
                    <p style={{
                      fontWeight: 300,
                      fontSize: '16px',
                      lineHeight: 1.6,
                      color: 'var(--muted)',
                      marginBottom: '24px',
                    }}>
                      {news[0].description}
                    </p>
                    <span className="btn btn-dark btn-sm">
                      Read article <ArrowIcon />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          )}

          <div style={{
            width: '100%',
            height: '1px',
            background: 'var(--border)',
            marginBottom: '48px',
          }} />

          {/* News grid */}
          <div className="news-grid">
            {news.slice(1).map((article) => (
              <Link key={article.slug} href={`/news/${article.slug}`} className="news-item">
                <div className="news-item-image">
                  <Image width={900} height={600}
                    src="/assets/images/1454165804606-c3d57bc86b40.webp"
                    alt={article.title}
                  />
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
          <h2>Need help finding the right service?</h2>
          <p>Contact our team for a clear overview of the services available through this website.</p>
          <Link href="/contact" className="btn btn-primary">Contact us <ArrowIcon /></Link>
        </div>
      </section>
    </>
  );
}
