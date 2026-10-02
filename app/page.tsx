'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { ArrowIcon } from '@/components/Icons';
import HeroSlides from '@/components/HeroSlides';
import PopularVisa from '@/components/PopularVisa';
import VisionMission from '@/components/VisionMission';
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
  const [heroMode, setHeroMode] = useState<'skilled' | 'investor'>('skilled');
  const [activePathway, setActivePathway] = useState(pathways[0].id);
  const [programFilters, setProgramFilters] = useState({ destination: '', type: '', investment: '' });

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
              <h1 className="home-hero__title">Your world, <span className="home-hero__accent">Unlocked</span></h1>
              <p className="home-hero__description">Specialized in Permanent Residency, Citizenship &amp; Global Visas</p>
            </div>

            <div className="home-hero-search--desktop">
              <div className="home-hero-search__tabs" data-mode={heroMode}>
                <button
                  className={heroMode === 'skilled' ? 'active' : ''}
                  onClick={() => setHeroMode('skilled')}
                  type="button"
                >
                  Skilled Worker
                </button>
                <button
                  className={heroMode === 'investor' ? 'active' : ''}
                  onClick={() => setHeroMode('investor')}
                  type="button"
                >
                  Business Investor
                </button>
              </div>
              <div className="home-hero-filter-form">
                <div className="home-hero-filter">
                  <select aria-label="Destination" className="home-hero-filter__select" value={programFilters.destination} onChange={(event) => setProgramFilters((current) => ({ ...current, destination: event.target.value }))}>
                    <option value="" disabled>Destination</option>
                    <option value="all">All Destinations</option><option value="canada">Canada</option><option value="australia">Australia</option><option value="united-kingdom">United Kingdom</option><option value="united-states">United States</option><option value="european-union">European Union</option><option value="portugal">Portugal</option>
                  </select>
                </div>
                <div className="home-hero-filter">
                  <select aria-label="Program type" className="home-hero-filter__select" value={programFilters.type} onChange={(event) => setProgramFilters((current) => ({ ...current, type: event.target.value }))}>
                    <option value="" disabled>Program Type</option>
                    <option value="all">All Programs</option><option value="skilled-worker">Skilled Worker</option><option value="business-investor">Business & Investor</option><option value="study-visa">Study Visa</option><option value="citizenship">Citizenship</option>
                  </select>
                </div>
                <div className="home-hero-filter">
                  <select aria-label="Investment range" className="home-hero-filter__select" value={programFilters.investment} onChange={(event) => setProgramFilters((current) => ({ ...current, investment: event.target.value }))}>
                    <option value="" disabled>Investment Range</option>
                    <option value="any">Any Range</option><option value="under-50000">Under 50,000</option><option value="50000-250000">50,000 – 250,000</option><option value="over-250000">Over 250,000</option>
                  </select>
                </div>
                <Link href={`/programs?${new URLSearchParams({ mode: heroMode, ...Object.fromEntries(Object.entries(programFilters).filter(([, value]) => value)) }).toString()}`} className="home-hero-search-button">
                  Search Programs
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="home-hero__mobile">
          <div className="home-hero-search--desktop">
            <div className="home-hero-search__tabs" data-mode={heroMode}>
              <button className={heroMode === 'skilled' ? 'active' : ''} onClick={() => setHeroMode('skilled')} type="button">Skilled</button>
              <button className={heroMode === 'investor' ? 'active' : ''} onClick={() => setHeroMode('investor')} type="button">Investor</button>
            </div>
            <div className="home-hero-filter-form">
              <div className="home-hero-filter">
                <select aria-label="Destination" className="home-hero-filter__select" value={programFilters.destination} onChange={(event) => setProgramFilters((current) => ({ ...current, destination: event.target.value }))}>
                  <option value="" disabled>Destination</option>
                  <option value="all">All Destinations</option><option value="canada">Canada</option><option value="australia">Australia</option><option value="united-kingdom">United Kingdom</option><option value="united-states">United States</option><option value="european-union">European Union</option>
                </select>
              </div>
              <div className="home-hero-filter">
                <select aria-label="Program type" className="home-hero-filter__select" value={programFilters.type} onChange={(event) => setProgramFilters((current) => ({ ...current, type: event.target.value }))}>
                  <option value="" disabled>Program</option>
                  <option value="all">All Programs</option><option value="skilled-worker">Skilled Worker</option><option value="business-investor">Business & Investor</option><option value="study-visa">Study Visa</option>
                </select>
              </div>
              <div className="home-hero-filter">
                <select aria-label="Investment range" className="home-hero-filter__select" value={programFilters.investment} onChange={(event) => setProgramFilters((current) => ({ ...current, investment: event.target.value }))}>
                  <option value="" disabled>Investment</option>
                  <option value="any">Any Range</option><option value="under-50000">Under 50,000</option><option value="50000-250000">50,000 – 250,000</option><option value="over-250000">Over 250,000</option>
                </select>
              </div>
              <Link href={`/programs?${new URLSearchParams({ mode: heroMode, ...Object.fromEntries(Object.entries(programFilters).filter(([, value]) => value)) }).toString()}`} className="home-hero-search-button">Search<ArrowIcon /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <div className="featured-header">
            <p className="section-label">Popular programs</p>
            <h2 className="section-title">
              We offer immigration programs ready for immediate application. For those who don’t want to wait.
            </h2>
          </div>

          <div className="featured-grid">
            <Link href="/programs/canada-skilled-immigration" className="featured-item card">
              <Image width={900} height={600} className="featured-item-image" src="/assets/images/1503614472-8c93d56e92ce.webp" alt="Canada landscape" />
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

            <Link href="/programs/australia-skilled-immigration" className="featured-item card">
              <Image width={900} height={600} className="featured-item-image" src="/assets/images/1506744038136-46273834b3fb.webp" alt="Australia landscape" />
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

      <PopularVisa />

      <VisionMission />

      <section className="about-section">
        <div className="about-wrapper">
          <div className="about-content container">
            <p className="section-label" style={{ color: 'rgba(255,255,255,0.7)' }}>About us</p>
            <h2 className="section-title" style={{ maxWidth: '720px' }}>
              We understand how important your immigration decision is. That’s why we aim to make every process as smooth as possible.
            </h2>
            <p className="about-text">
              Our approach is built on a clear understanding of each client, their priorities and how their new life will take shape. From eligibility assessment to submission and beyond, every stage is managed with precision and attention to detail, ensuring a seamless and uncompromised journey.
            </p>
            <Link href="/about" className="btn btn-outline">Learn more about us</Link>
          </div>
        </div>
      </section>

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
