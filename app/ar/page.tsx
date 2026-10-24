'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { ArrowIcon } from '@/components/Icons';
import HeroSlides from '@/components/HeroSlides';
import PopularVisa from '@/components/PopularVisa';
import BestForImmigration from '@/components/BestForImmigration';
import VisionMission from '@/components/VisionMission';
import { pathways, news, ui } from '@/lib/data-ar';

export default function ArHome() {
  const [heroMode, setHeroMode] = useState<'skilled' | 'investor'>('skilled');
  const [activePathway, setActivePathway] = useState(pathways[0].id);

  const activePathwayData = pathways.find((p) => p.id === activePathway) || pathways[0];

  return (
    <>
      <section className="home-hero">
        <div className="home-hero__media">
          <HeroSlides lang="ar" />
        </div>

        <div className="home-hero__desktop">
          <div className="home-hero__content">
            <div className="home-hero__headline">
              <h1 className="home-hero__title">عالمك، <span className="home-hero__accent">مفتوح</span></h1>
              <p className="home-hero__description">متخصصون في الإقامة الدائمة والجنسية والتأشيرات العالمية</p>
            </div>

            <div className="home-hero-search--desktop">
              <div className="home-hero-search__tabs" data-mode={heroMode}>
                <button className={heroMode === 'skilled' ? 'active' : ''} onClick={() => setHeroMode('skilled')} type="button">
                  {ui.home.skilledWorker}
                </button>
                <button className={heroMode === 'investor' ? 'active' : ''} onClick={() => setHeroMode('investor')} type="button">
                  {ui.home.businessInvestor}
                </button>
              </div>
              <form className="home-hero-filter-form" action="/free-assessment" method="get">
                <input type="hidden" name="mode" value={heroMode} />
                <div className="home-hero-filter">
                  <select aria-label={ui.home.destination} name="destination" className="home-hero-filter__select" defaultValue="">
                    <option value="" disabled>{ui.home.destination}</option>
                    <option value="all">{ui.home.allDestinations}</option><option value="canada">كندا</option><option value="australia">أستراليا</option><option value="united-kingdom">المملكة المتحدة</option><option value="united-states">الولايات المتحدة</option><option value="european-union">الاتحاد الأوروبي</option><option value="portugal">البرتغال</option>
                  </select>
                </div>
                <div className="home-hero-filter">
                  <select aria-label={ui.home.programType} name="type" className="home-hero-filter__select" defaultValue="">
                    <option value="" disabled>{ui.home.programType}</option>
                    <option value="all">{ui.home.allPrograms}</option><option value="skilled-worker">عامل ماهر</option><option value="business-investor">أعمال ومستثمر</option><option value="study-visa">تأشيرة دراسة</option><option value="citizenship">جنسية</option>
                  </select>
                </div>
                <div className="home-hero-filter">
                  <select aria-label={ui.home.investmentRange} name="investment" className="home-hero-filter__select" defaultValue="">
                    <option value="" disabled>{ui.home.investmentRange}</option>
                    <option value="any">{ui.home.anyRange}</option><option value="under-50000">أقل من 50,000</option><option value="50000-250000">50,000 – 250,000</option><option value="over-250000">أكثر من 250,000</option>
                  </select>
                </div>
                <button type="submit" className="home-hero-search-button">
                  {ui.home.searchPrograms}
                  <ArrowIcon />
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="home-hero__mobile">
          <div className="home-hero-search--desktop">
            <div className="home-hero-search__tabs" data-mode={heroMode}>
              <button className={heroMode === 'skilled' ? 'active' : ''} onClick={() => setHeroMode('skilled')} type="button">عامل ماهر</button>
              <button className={heroMode === 'investor' ? 'active' : ''} onClick={() => setHeroMode('investor')} type="button">مستثمر</button>
            </div>
            <form className="home-hero-filter-form" action="/free-assessment" method="get">
              <input type="hidden" name="mode" value={heroMode} />
              <div className="home-hero-filter">
                <select aria-label={ui.home.destination} name="destination" className="home-hero-filter__select" defaultValue="">
                  <option value="" disabled>{ui.home.destination}</option>
                  <option value="all">{ui.home.allDestinations}</option><option value="canada">كندا</option><option value="australia">أستراليا</option><option value="united-kingdom">المملكة المتحدة</option><option value="united-states">الولايات المتحدة</option><option value="european-union">الاتحاد الأوروبي</option>
                </select>
              </div>
              <div className="home-hero-filter">
                <select aria-label={ui.home.programType} name="type" className="home-hero-filter__select" defaultValue="">
                  <option value="" disabled>البرنامج</option>
                  <option value="all">{ui.home.allPrograms}</option><option value="skilled-worker">عامل ماهر</option><option value="business-investor">أعمال ومستثمر</option><option value="study-visa">تأشيرة دراسة</option>
                </select>
              </div>
              <div className="home-hero-filter">
                <select aria-label={ui.home.investmentRange} name="investment" className="home-hero-filter__select" defaultValue="">
                  <option value="" disabled>الاستثمار</option>
                  <option value="any">{ui.home.anyRange}</option><option value="under-50000">أقل من 50,000</option><option value="50000-250000">50,000 – 250,000</option><option value="over-250000">أكثر من 250,000</option>
                </select>
              </div>
              <button type="submit" className="home-hero-search-button">بحث<ArrowIcon /></button>
            </form>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <div className="featured-header">
            <p className="section-label">{ui.sections.popularPrograms}</p>
            <h2 className="section-title">
              نقدم برامج هجرة جاهزة للتقديم الفوري. لمن لا يريد الانتظار.
            </h2>
          </div>

          <div className="featured-grid">
            <Link href="/tools/canada-express-entry-crs" className="featured-item card">
              <Image width={900} height={600} className="featured-item-image" src="/assets/countries/canada.webp" alt="كندا" />
              <div className="featured-item-header">
                <h3 className="featured-item-title">الهجرة الماهرة – كندا</h3>
                <span className="featured-item-tag">مفتوح</span>
              </div>
              <div className="featured-item-content">
                <div className="featured-item-details">
                  <div className="featured-item-detail"><span className="featured-item-detail-title">الموقع</span><span className="featured-item-detail-value">كندا</span></div>
                  <div className="featured-item-detail"><span className="featured-item-detail-title">الفئة</span><span className="featured-item-detail-value">الهجرة الماهرة</span></div>
                </div>
                <span className="btn-arrow" aria-label="عرض البرنامج"><ArrowIcon /></span>
              </div>
            </Link>

            <Link href="/tools/australia-points-test" className="featured-item card">
              <Image width={900} height={600} className="featured-item-image" src="/assets/countries/australia.webp" alt="أستراليا" />
              <div className="featured-item-header">
                <h3 className="featured-item-title">الهجرة الماهرة – أستراليا</h3>
                <span className="featured-item-tag">مفتوح</span>
              </div>
              <div className="featured-item-content">
                <div className="featured-item-details">
                  <div className="featured-item-detail"><span className="featured-item-detail-title">الموقع</span><span className="featured-item-detail-value">أستراليا</span></div>
                  <div className="featured-item-detail"><span className="featured-item-detail-title">الفئة</span><span className="featured-item-detail-value">الهجرة الماهرة</span></div>
                </div>
                <span className="btn-arrow" aria-label="عرض البرنامج"><ArrowIcon /></span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <PopularVisa lang="ar" />

      <BestForImmigration lang="ar" />

      <VisionMission lang="ar" />

      <section className="about-section">
        <div className="about-wrapper">
          <div className="about-content container">
            <p className="section-label" style={{ color: 'rgba(255,255,255,0.7)' }}>{ui.sections.aboutUs}</p>
            <h2 className="section-title" style={{ maxWidth: '720px' }}>
              {ui.home.heroText}
            </h2>
            <p className="about-text">
              {ui.home.aboutText}
            </p>
            <Link href="/ar/about" className="btn btn-outline">{ui.buttons.learnMore}</Link>
          </div>
        </div>
      </section>

      <section className="pathways-section">
        <div className="container">
          <p className="section-label" style={{ textAlign: 'center' }}>{ui.sections.immigrationPathways}</p>
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '40px' }}>{ui.home.discoverRoute}</h2>
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
              <Link href={activePathwayData.href} className="btn btn-outline">{ui.buttons.discover}<ArrowIcon /></Link>
            </div>
          </article>
        </div>
      </section>

      <section className="news-section">
        <div className="container">
          <p className="section-label">{ui.sections.newsEvents}</p>
          <h2 className="section-title">{ui.home.latestNews}</h2>
          <div className="news-grid">
            {news.map((item, idx) => (
              <article className="news-item" key={idx}>
                <Link href={`/ar/news/${item.slug}`} className="news-item-image">
                <Image width={900} height={600} src={`/assets/images/${['1506744038136-46273834b3fb', '1454165804606-c3d57bc86b40', '1521791136064-7986c2920216', '1573497019940-1c28c88b4f3e'][idx]}.webp`} alt={item.title} />
                </Link>
                <span className="news-item-date">{item.date}</span>
                <Link href={`/ar/news/${item.slug}`}><h3 className="news-item-title">{item.title}</h3></Link>
                <p className="news-item-description">{item.description}</p>
                <Link href={`/ar/news/${item.slug}`} className="btn btn-dark btn-sm">{ui.buttons.readMore}</Link>
              </article>
            ))}
          </div>
          <div className="news-btn">
            <Link href="/ar/news" className="btn btn-outline" style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>{ui.buttons.moreNews}<ArrowIcon /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
