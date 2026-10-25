import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { ArrowIcon, CheckIcon } from '@/components/Icons';
import { services } from '@/lib/data';
import { servicePages, type ServicePage } from '@/lib/service-pages';
import { displayName, flagFor, menuServices } from '@/lib/destinations';
import { siteConfig } from '@/lib/site-config';
import LeadSection from '@/components/LeadSection';

const jsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c');

export default function ServicePageView({ page }: { page: ServicePage }) {
  const url = `${siteConfig.url}${page.path ?? `/services/${page.slug}`}`;
  const structured = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: page.title,
      serviceType: page.title,
      description: page.metaDescription,
      url,
      provider: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
      areaServed: 'Worldwide',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${siteConfig.url}/services` },
        { '@type': 'ListItem', position: 3, name: page.title, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faqs.map((faq) => ({ '@type': 'Question', name: faq.q, acceptedAnswer: { '@type': 'Answer', text: faq.a } })),
    },
  ];

  const cards = menuServices.find((m) => m.slug === page.slug);
  const all = [...services.map((s) => ({ slug: s.slug, title: s.title })), ...servicePages.map((s) => ({ slug: s.slug, title: s.title }))];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structured) }} />
      <PageHero
        label={page.tagline}
        title={page.title}
        description={page.description}
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: page.title }]}
        image={page.image}
      />

      <section className="page-content">
        <div className="container">
          <div className="page-content-grid">
            <article className="article-content">
              <h2>Overview</h2>
              {page.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}

              {cards && (
                <>
                  <h2>{cards.kind === 'test' ? 'Tests we coach' : 'Where we can help'}</h2>
                  <div className="dest-cards">
                    {cards.items.map((item) => {
                      const flag = flagFor(item);
                      return (
                        <div className="dest-cards__card" key={item}>
                          <div className="dest-cards__img">
                            {flag ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={`/assets/flags/${flag}.svg`} alt="" loading="lazy" />
                            ) : (
                              <span>{item.slice(0, 5)}</span>
                            )}
                          </div>
                          <p>{displayName(item)}</p>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              <h2>Who this is for</h2>
              <ul>{page.whoFor.map((item) => <li key={item}>{item}</li>)}</ul>

              <h2>What we handle</h2>
              <ul className="service-checks">
                {page.features.map((item) => <li key={item}><CheckIcon /><span>{item}</span></li>)}
              </ul>

              <h2>How it works</h2>
              <ol className="service-steps">
                {page.steps.map((step) => (
                  <li key={step.title}><strong>{step.title}</strong><span>{step.text}</span></li>
                ))}
              </ol>

              <h2>Documents you will typically need</h2>
              <ul>{page.documents.map((item) => <li key={item}>{item}</li>)}</ul>
              <p className="service-note">Exact requirements depend on the country, the program and your circumstances. We confirm the current list with you during your consultation.</p>

              <h2>Frequently asked questions</h2>
              <div className="service-faqs">
                {page.faqs.map((faq) => (
                  <details key={faq.q}>
                    <summary>{faq.q}</summary>
                    <p>{faq.a}</p>
                  </details>
                ))}
              </div>
            </article>

            <aside className="sidebar">
              <p className="sidebar-title">All Services</p>
              <ul className="sidebar-links">
                {all.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className={`sidebar-link ${s.slug === page.slug ? 'active' : ''}`}>
                      {s.title}
                      <ArrowIcon />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn btn-dark sidebar-cta">Get started<ArrowIcon /></Link>
            </aside>
          </div>
        </div>
      </section>

      <LeadSection lang="en" />
    </>
  );
}
