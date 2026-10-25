'use client';

import { heroSlides } from '@/lib/hero-slides';
import { useHeroIndex } from '@/lib/hero-store';

/** Headline and tagline that change with the active slide. Slide 1 is the brand line; the rest use the service titles. */
export default function HeroHeadline({ lang = 'en' }: { lang?: 'en' | 'ar' }) {
  const slide = heroSlides[useHeroIndex()] ?? heroSlides[0];
  const title = slide.title[lang];
  const words = title.split(' ');
  const last = words.pop();

  return (
    <div className="home-hero__swap" key={title}>
      <h1 className="home-hero__title">
        {slide.brand ? <>{words.join(' ')} <span className="home-hero__accent">{last}</span></> : title}
      </h1>
      <p className="home-hero__description">{slide.line[lang]}</p>
    </div>
  );
}
