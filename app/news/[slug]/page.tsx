import LeadSection from '@/components/LeadSection';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import { ArrowIcon } from '@/components/Icons';
import { news } from '@/lib/data';

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = news.find((n) => n.slug === slug);
  return { title: `${article?.title || 'Article'} — Migrantly` };
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = news.find((n) => n.slug === slug);
  if (!article) notFound();

  const related = news.filter((n) => n.slug !== article.slug).slice(0, 3);

  return (
    <>
      <PageHero
        label="Insights"
        title={article.title}
        description={article.description}
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'News', href: '/news' },
          { label: article.title },
        ]}
        image="/assets/images/1454165804606-c3d57bc86b40.webp"
      />

      <section className="page-content">
        <div className="container">
          <div className="page-content-grid">
            <div className="article-content">
              <p style={{
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                marginBottom: '24px',
              }}>
                {article.date}
              </p>

              <p style={{ fontSize: '18px', fontWeight: 300, lineHeight: 1.6, marginBottom: '24px' }}>
                {article.description}
              </p>

              <p>{article.content}</p>

              <p>
                Our team continuously monitors immigration policy changes across all major destinations.
                If you believe any of these updates may affect your application or eligibility, we encourage
                you to book a consultation with one of our regulated consultants.
              </p>

              <h2>How Migrantly can help</h2>
              <p>
                Whether you are at the planning stage, mid-application or facing a complex appeal, our
                consultants provide end-to-end support. We assess your profile against the latest criteria,
                prepare your documentation and represent you through every step of the process.
              </p>

              <p>
                With offices in Toronto, London and Sydney, and a network of partners across the EU and US,
                we are positioned to guide you regardless of your destination or current location.
              </p>

              <div style={{
                marginTop: '40px',
                padding: '32px',
                background: 'rgba(7,27,57,0.04)',
                border: '1px solid var(--border)',
              }}>
                <h3 style={{ margin: '0 0 12px', fontSize: '20px', fontWeight: 500, color: 'var(--primary)' }}>
                  Need advice on this update?
                </h3>
                <p style={{ marginBottom: '20px', fontWeight: 300, fontSize: '14px', color: 'var(--muted)' }}>
                  Book a free 30-minute consultation and speak with a specialist who can assess your situation.
                </p>
                <Link href="/contact" className="btn btn-dark">
                  Book a consultation <ArrowIcon />
                </Link>
              </div>
            </div>

            <aside className="sidebar">
              <p className="sidebar-title">Related Articles</p>
              <ul className="sidebar-links">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/news/${r.slug}`} className="sidebar-link">
                      {r.title}
                      <ArrowIcon />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/news" className="btn btn-dark sidebar-cta">
                All news <ArrowIcon />
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <LeadSection lang="en" />
    </>
  );
}
