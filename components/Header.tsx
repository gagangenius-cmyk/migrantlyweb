'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { MenuIcon, CloseIcon } from './Icons';
import NavBar from './NavBar';
import ThemeToggle from './ThemeToggle';
import { alternateLocalePath, localeCopy, localizedPath, type Locale } from '@/lib/site-config';

export default function Header({ lang = 'en' }: { lang?: Locale }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const t = localeCopy[lang];
  const alternateLocale: Locale = lang === 'ar' ? 'en' : 'ar';
  const links = [
    ['home', '/'], ['services', '/services'], ['countries', '/countries'],
    ['programs', '/programs'], ['about', '/about'], ['news', '/news'], ['contact', '/contact'],
  ] as const;

  const closeMenu = () => {
    setMenuOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>('button, a')?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu();
      if (event.key !== 'Tab' || !panel) return;
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>('button, a[href]')).filter((item) => !item.hasAttribute('disabled'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', onKeyDown); };
  }, [menuOpen]);

  return (
    <>
      <div className="header-wrapper">
        <header className="header">
          <div className="header-left">
            <ThemeToggle lang={lang} />
            <button ref={triggerRef} className="header-btn header-menu-btn" aria-label={t.menu} aria-expanded={menuOpen} aria-controls="site-menu" onClick={() => setMenuOpen(true)}>
              <MenuIcon /><span>{t.menu}</span>
            </button>
          </div>
          <Link href={localizedPath(lang, '/')} className="header-logo" aria-label={`${t.home} — Migrantly`}>
            {/* Purpose-sized logo files (2x/3x) instead of the 1386px master, which browsers scaled down ~10x and smeared */}
            <picture>
              <source type="image/webp" srcSet="/assets/logo-220.webp 220w, /assets/logo-330.webp 330w, /assets/logo-440.webp 440w, /assets/logo-660.webp 660w" sizes="140px" />
              <img src="/assets/logo-440.png" srcSet="/assets/logo-220.png 220w, /assets/logo-330.png 330w, /assets/logo-440.png 440w, /assets/logo-660.png 660w" sizes="140px" alt="Migrantly" width={440} height={244} fetchPriority="high" decoding="async" />
            </picture>
          </Link>
          <div className="header-right">
            <div className="lang-toggle" role="group" aria-label={lang === 'ar' ? 'اختر اللغة' : 'Choose language'}>
              {(['en', 'ar'] as const).map((code) => (
                <a
                  key={code}
                  href={alternateLocalePath(pathname, code)}
                  hrefLang={code}
                  lang={code}
                  aria-current={code === lang ? 'true' : undefined}
                  className={code === lang ? 'is-active' : undefined}
                >
                  {code.toUpperCase()}
                </a>
              ))}
            </div>
          </div>
        </header>
      </div>

      {/* Outside the sticky wrapper so the nav scrolls away with the page */}
      <div className="nav-slot">
        <NavBar lang={lang} />
      </div>

      {menuOpen && (
        <div className="mobile-menu-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) closeMenu(); }}>
          <div ref={panelRef} id="site-menu" className="mobile-menu-panel" role="dialog" aria-modal="true" aria-label={t.menu}>
            <button className="mobile-menu-close" onClick={closeMenu} aria-label={t.closeMenu}><CloseIcon /></button>
            <nav className="mobile-menu-nav" aria-label={t.menu}>
              {links.map(([key, href]) => {
                const target = localizedPath(lang, href);
                const active = pathname === target || (href !== '/' && pathname.startsWith(`${target}/`));
                return <Link key={key} href={target} aria-current={active ? 'page' : undefined} onClick={closeMenu}>{t[key]}</Link>;
              })}
              <a href={alternateLocalePath(pathname, alternateLocale)} hrefLang={alternateLocale} onClick={closeMenu} className="mobile-menu-language">{t.language}</a>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
