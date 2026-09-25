import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { ArrowIcon } from '@/components/Icons';

export const metadata = { title: 'About Us — Migrantly' };

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About Us"
        title="Your trusted immigration partner"
        description="Learn about Migrantly's approach to clear, accessible immigration information and enquiry support."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'About Us' }]}
      />

      <section className="page-content">
        <div className="container">
          <div className="page-content-grid">
            <div className="article-content">
              <h2>Who we are</h2>
              <p>
                Migrantly was created to make immigration information easier to navigate. Whether you are a skilled
                professional, an investor, a student or a family seeking reunification, the site helps you explore
                service categories and submit an enquiry.
              </p>

              <h2>Our approach</h2>
              <p>
                Every client is unique. We start with a thorough consultation to understand your goals, timeline and
                circumstances. From there, we build a tailored strategy that considers every available pathway — not
                just the obvious one. Our transparent, step-by-step process keeps you informed at every stage, so you
                always know where your application stands and what comes next.
              </p>

              <h2>Our values</h2>
              <ul>
                <li><strong>Integrity</strong> — We only take on cases we believe in. No false promises, no inflated success rates.</li>
                <li><strong>Clarity</strong> — We separate general information from advice that requires a qualified professional.</li>
                <li><strong>Transparency</strong> — Clear fees, clear timelines, clear communication. No surprises.</li>
                <li><strong>Care</strong> — We treat your application as if it were our own family’s. Because behind every file is a person’s future.</li>
              </ul>

              <h2>Our team</h2>
              <p>Team credentials and the scope of any professional service should be confirmed directly before engagement. Information on this website is general and is not legal advice.</p>

              <h2>Why choose us</h2>
              <ul>
                <li>Multi-jurisdictional expertise under one roof</li>
                <li>Dedicated case manager for every client</li>
                <li>Online portal for real-time application tracking</li>
                <li>Fixed-fee pricing with no hidden costs</li>
                <li>Post-arrival support and settlement services</li>
              </ul>
            </div>

            <aside className="sidebar">
              <p className="sidebar-title">Quick Links</p>
              <ul className="sidebar-links">
                <li><Link href="/about" className="sidebar-link active">About Us</Link></li>
                <li><Link href="/services" className="sidebar-link">Services</Link></li>
                <li><Link href="/countries" className="sidebar-link">Countries</Link></li>
                <li><Link href="/programs" className="sidebar-link">Programs</Link></li>
                <li><Link href="/news" className="sidebar-link">News</Link></li>
                <li><Link href="/contact" className="sidebar-link">Contact</Link></li>
              </ul>
              <Link href="/contact" className="btn btn-dark sidebar-cta">Book a consultation<ArrowIcon /></Link>
            </aside>
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container">
          <h2>Let&apos;s build your future together</h2>
          <p>Book a free consultation and discover how we can turn your immigration goals into reality.</p>
          <Link href="/contact" className="btn btn-primary">Get started<ArrowIcon /></Link>
        </div>
      </section>
    </>
  );
}
