'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { ArrowIcon } from '@/components/Icons';
import HeroSearch from '@/components/HeroSearch';
import HeroSlides from '@/components/HeroSlides';
import HeroHeadline from '@/components/HeroHeadline';
import PopularVisa from '@/components/PopularVisa';
import BestForImmigration from '@/components/BestForImmigration';
import VisionMission from '@/components/VisionMission';
import WhyMigrantly from '@/components/WhyMigrantly';
import AppointmentSection from '@/components/AppointmentSection';
import { pathways } from '@/lib/data';

const news = [
  {
    slug: 'eu-blue-card-reforms',
    date: 'September 25, 2026',
    title: 'EU Blue Card reforms expand talent pool',
    description:
      'New salary thresholds and streamlined processing make it easier for skilled workers to build a career in Europe.',
  },
  {
    slug: 'canada-immigration-targets',
    date: 'September 23, 2026',
    title: 'Canada raises immigration targets',
    description:
      'Express Entry and Provincial Nominee Program updates create new opportunities for skilled migrants.',
  },
  {
    slug: 'uk-scaleup-visa-expansion',
    date: 'September 10, 2026',
    title: 'UK launches Scale-up visa expansion',
    description:
      'Easier switching for skilled workers and faster routes to settlement for high-growth company employees.',
  },
  {
    slug: 'australia-healthcare-priority',
    date: 'September 01, 2026',
    title: 'Australia prioritises healthcare workers',
    description:
      'New occupation lists and priority processing target nurses, doctors and aged-care professionals.',
  },
];

export default function Home() {
  const [activePathway, setActivePathway] = useState(pathways[0].id);

  const activePathwayData = pathways.find((p) => p.id === activePathway) || pathways[0];

  return (
    <>
      <section className="home-hero">
        <div className="home-hero__media">
          <HeroSlides />
        </div>

        <div className="home-hero__desktop">
          <div className="home-hero__content">
            <div className="home-hero__headline">
              <HeroHeadline />
            </div>

            <HeroSearch />
          </div>
        </div>

        <div className="home-hero__mobile">
          <HeroSearch />
        </div>
      </section>

      <VisionMission />

      {/* Popular programs (hidden for now; remove these comment markers to show it again)
      <section className="featured-section">
        <div className="container">
          <div className="featured-header">
            <p className="section-label">Popular programs</p>
            <h2 className="section-title">
              We turn complex global migration frameworks into smooth, predictable pathways for you and your family.
            </h2>
          </div>

          <div className="featured-grid">
            <Link href="/tools/canada-express-entry-crs" className="featured-item card">
              <Image width={900} height={600} className="featured-item-image" src="/assets/countries/canada.webp" alt="Canada landscape" />
              <div className="featured-item-header">
                <h3 className="featured-item-title">Canada Skilled Immigration</h3>
                <span className="featured-item-tag">Open</span>
              </div>
              <div className="featured-item-content">
                <div className="featured-item-details">
                  <div className="featured-item-detail"><span className="featured-item-detail-title">Location</span><span className="featured-item-detail-value">Canada</span></div>
                  <div className="featured-item-detail"><span className="featured-item-detail-title">Category</span><span className="featured-item-detail-value">Skilled migration</span></div>
                </div>
                <span className="btn-arrow" aria-label="View program"><ArrowIcon /></span>
              </div>
            </Link>

            <Link href="/tools/australia-points-test" className="featured-item card">
              <Image width={900} height={600} className="featured-item-image" src="/assets/countries/australia.webp" alt="Australia landscape" />
              <div className="featured-item-header">
                <h3 className="featured-item-title">Australia Skilled Immigration</h3>
                <span className="featured-item-tag">Open</span>
              </div>
              <div className="featured-item-content">
                <div className="featured-item-details">
                  <div className="featured-item-detail"><span className="featured-item-detail-title">Location</span><span className="featured-item-detail-value">Australia</span></div>
                  <div className="featured-item-detail"><span className="featured-item-detail-title">Category</span><span className="featured-item-detail-value">Skilled migration</span></div>
                </div>
                <span className="btn-arrow" aria-label="View program"><ArrowIcon /></span>
              </div>
            </Link>
          </div>
        </div>
      </section>
      */}

      {/* Popular Visa Destinations (hidden for now; remove the comment markers to show it again) */}
      {/* <PopularVisa /> */}

      <BestForImmigration />

      <WhyMigrantly />

      <AppointmentSection />

      {/* About us (hidden for now; remove these comment markers to show it again)
      <section className="about-section">
        <div className="about-wrapper">
          <div className="about-content container">
            <p className="section-label" style={{ color: 'rgba(255,255,255,0.7)' }}>About us</p>
            <h2 className="section-title" style={{ maxWidth: '720px' }}>
              Your future knows no boundaries. We simplify complex immigration frameworks to make your move smooth and certain.
            </h2>
            <p className="about-text">
              We build tailored relocation strategies around your goals. From your initial profile assessment through final submission and post-landing support, every detail is handled with absolute precision to guarantee a flawless, stress-free crossing of borders.
            </p>
            <Link href="/about" className="btn btn-outline">Learn more about us</Link>
          </div>
        </div>
      </section>
      */}

      <section className="pathways-section">
        <div className="container">
          <p className="section-label" style={{ textAlign: 'center' }}>Immigration pathways</p>
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '40px' }}>Discover your route to residency</h2>
          <div className="tabs">
            {pathways.map((p) => (
              <button key={p.id} className={`tabs-item ${activePathway === p.id ? 'active' : ''}`} onClick={() => setActivePathway(p.id)} type="button">
                {p.title}
              </button>
            ))}
          </div>
          <article className="class-item">
            <div className="class-item-image" style={{ background: 'linear-gradient(135deg, rgba(7,27,57,0.9) 0%, rgba(11,43,91,0.8) 50%, rgba(20,60,120,0.7) 100%)' }} />
            <h3 className="class-item-title">{activePathwayData.title}</h3>
            <div className="class-item-content">
              <p className="class-item-description">{activePathwayData.description}</p>
              <Link href={activePathwayData.href} className="btn btn-outline">Discover<ArrowIcon /></Link>
            </div>
          </article>
        </div>
      </section>

      <section className="news-section">
        <div className="container">
          <p className="section-label">News & Events</p>
          <h2 className="section-title">Discover the latest immigration news and events.</h2>
          <div className="news-grid">
            {news.map((item, idx) => (
              <article className="news-item" key={idx}>
                <Link href={`/news/${item.slug}`} className="news-item-image">
                  <Image width={900} height={600} src={`/assets/images/${['1506744038136-46273834b3fb', '1454165804606-c3d57bc86b40', '1521791136064-7986c2920216', '1573497019940-1c28c88b4f3e'][idx]}.webp`} alt={item.title} />
                </Link>
                <span className="news-item-date">{item.date}</span>
                <Link href={`/news/${item.slug}`}><h3 className="news-item-title">{item.title}</h3></Link>
                <p className="news-item-description">{item.description}</p>
                <Link href={`/news/${item.slug}`} className="btn btn-dark btn-sm">Read more</Link>
              </article>
            ))}
          </div>
          <div className="news-btn">
            <Link href="/news" className="btn btn-outline" style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>More news<ArrowIcon /></Link>
          </div>
        </div>
      </section>

    </>
  );
}
