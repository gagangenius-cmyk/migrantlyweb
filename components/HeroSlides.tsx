'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

// Immigration-relevant stills: destinations (Canada, Australia), documents/paperwork, and the consultation handshake.
const slides = [
  { src: '/assets/images/1503614472-8c93d56e92ce.webp', alt: 'Mountain lake in Canada' },
  { src: '/assets/images/1506744038136-46273834b3fb.webp', alt: 'Australian valley at sunrise' },
  { src: '/assets/images/1454165804606-c3d57bc86b40.webp', alt: 'Visa application paperwork on a laptop desk' },
  { src: '/assets/images/1521791136064-7986c2920216.webp', alt: 'Handshake after a successful consultation' },
] as const;

const INTERVAL_MS = 6000;

export default function HeroSlides({ lang = 'en' }: { lang?: 'en' | 'ar' }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (paused || reduceMotion) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [paused, reduceMotion]);

  return (
    <div className="hero-slides" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {slides.map((slide, index) => (
        <div key={slide.src} className={`hero-slides__item${index === active ? ' is-active' : ''}`} aria-hidden={index !== active}>
          <Image src={slide.src} alt={index === active ? slide.alt : ''} fill sizes="100vw" quality={80} priority={index === 0} loading={index === 0 ? undefined : 'lazy'} className="hero-slides__image" />
        </div>
      ))}
      <div className="hero-slides__dots" role="group" aria-label={lang === 'ar' ? 'شرائح الصور' : 'Slideshow'}>
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            className={index === active ? 'is-active' : undefined}
            aria-label={`${lang === 'ar' ? 'الشريحة' : 'Slide'} ${index + 1}`}
            aria-current={index === active ? 'true' : undefined}
            onClick={() => setActive(index)}
          />
        ))}
      </div>
    </div>
  );
}
