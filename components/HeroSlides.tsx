'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { heroSlides } from '@/lib/hero-slides';
import { heroStore, useHeroIndex } from '@/lib/hero-store';

const INTERVAL_MS = 6000;

export default function HeroSlides({ lang = 'en' }: { lang?: 'en' | 'ar' }) {
  const active = useHeroIndex();
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    heroStore.set(0);
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (paused || reduceMotion) return;
    const timer = window.setInterval(() => heroStore.set((heroStore.get() + 1) % heroSlides.length), INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [paused, reduceMotion]);

  return (
    <div className="hero-slides" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {heroSlides.map((slide, index) => (
        <div key={slide.src} className={`hero-slides__item${index === active ? ' is-active' : ''}`} aria-hidden={index !== active}>
          <Image src={slide.src} alt={index === active ? slide.alt : ''} fill sizes="100vw" quality={80} priority={index === 0} loading={index === 0 ? undefined : 'lazy'} className="hero-slides__image" />
        </div>
      ))}
      <div className="hero-slides__dots" role="group" aria-label={lang === 'ar' ? 'شرائح الصور' : 'Slideshow'}>
        {heroSlides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            className={index === active ? 'is-active' : undefined}
            aria-label={`${lang === 'ar' ? 'الشريحة' : 'Slide'} ${index + 1}: ${slide.title[lang]}`}
            aria-current={index === active ? 'true' : undefined}
            onClick={() => heroStore.set(index)}
          />
        ))}
      </div>
    </div>
  );
}
