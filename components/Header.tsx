'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { MenuIcon, CloseIcon } from './Icons';
import NavBar from './NavBar';
import ThemeToggle from './ThemeToggle';
import SocialLinks from './SocialLinks';
import { alternateLocalePath, localeCopy, localizedPath, siteConfig, type Locale } from '@/lib/site-config';

export default function Header({ lang = 'en' }: { lang?: Locale }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const t = localeCopy[lang];
  const alternateLocale: Locale = lang === 'ar' ? 'en' : 'ar';
  const links = [
    ['home', '/'], ['services', '/services'], ['countries', '/countries'],
    ['tools', '/tools'], ['about', '/about'], ['news', '/news'], ['contact', '/contact'],
  ] as const;

  const closeMenu = () => {
    setMenuOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  // Switch to the compact white bar once the page is scrolled
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
            <span className="logo-pair">
              <img className="logo-img logo-img--light" src="/assets/logo-light-330.png" srcSet="/assets/logo-light-220.png 220w, /assets/logo-light-330.png 330w, /assets/logo-light-440.png 440w, /assets/logo-light-660.png 660w" sizes="140px" alt="Migrantly" width={330} height={167} fetchPriority="high" decoding="async" />
              <img className="logo-img logo-img--dark" src="/assets/logo-dark-330.png" srcSet="/assets/logo-dark-220.png 220w, /assets/logo-dark-330.png 330w, /assets/logo-dark-440.png 440w, /assets/logo-dark-660.png 660w" sizes="140px" alt="" aria-hidden="true" width={330} height={165} decoding="async" />
            </span>
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

        <div className={`site-header${stuck ? ' is-stuck' : ''}`}>
          <Link href={localizedPath(lang, '/')} className="site-header__logo" aria-label={`${t.home} — Migrantly`}>
            <span className="logo-pair">
              <img className="logo-img logo-img--light" src="/assets/logo-light-330.png" srcSet="/assets/logo-light-220.png 220w, /assets/logo-light-330.png 330w, /assets/logo-light-440.png 440w, /assets/logo-light-660.png 660w" sizes="170px" alt="Migrantly" width={330} height={167} decoding="async" />
              <img className="logo-img logo-img--dark" src="/assets/logo-dark-330.png" srcSet="/assets/logo-dark-220.png 220w, /assets/logo-dark-330.png 330w, /assets/logo-dark-440.png 440w, /assets/logo-dark-660.png 660w" sizes="170px" alt="" aria-hidden="true" width={330} height={165} decoding="async" />
            </span>
          </Link>
          <div className="site-header__body">
            <div className="site-header__top">
              <div className="site-header__info">
                <Link href="/free-assessment" className="site-header__assess">{lang === 'ar' ? 'تقييم مجاني' : 'Free Assessment'}</Link>
                {siteConfig.publicContact.email && (
                  <a href={`mailto:${siteConfig.publicContact.email}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>
                    <span>{siteConfig.publicContact.email}</span>
                  </a>
                )}
              </div>
              <div className="site-header__tools">
                <div className="site-header__links">
                  <Link href={localizedPath(lang, '/contact')}>{t.contact}</Link>
                  <Link href={localizedPath(lang, '/news')}>{t.news}</Link>
                  <Link href="/faq">{lang === 'ar' ? 'الأسئلة الشائعة' : "FAQ's"}</Link>
                </div>
                <div className="flag-switch" role="group" aria-label={lang === 'ar' ? 'اختر اللغة' : 'Choose language'}>
                  <span className={lang === 'en' ? 'is-on' : undefined} lang="en">EN</span>
                  <a href={alternateLocalePath(pathname, lang === 'ar' ? 'en' : 'ar')} hrefLang={lang === 'ar' ? 'en' : 'ar'} className={`flag-switch__track is-${lang}`} aria-label={lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'} title={lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}>
                    <span className="flag-switch__flag">{lang === 'ar' ? (<svg viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="60" height="10" fill="#00732F" /><rect y="10" width="60" height="10" fill="#fff" /><rect y="20" width="60" height="10" fill="#000" /><rect width="16" height="30" fill="#FF0000" /></svg>) : (<svg viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="60" height="30" fill="#012169" /><path d="M0 0L60 30M60 0L0 30" stroke="#fff" strokeWidth="6" /><path d="M0 0L60 30M60 0L0 30" stroke="#C8102E" strokeWidth="2.5" /><path d="M30 0V30M0 15H60" stroke="#fff" strokeWidth="10" /><path d="M30 0V30M0 15H60" stroke="#C8102E" strokeWidth="6" /></svg>)}</span>
                    <i className="flag-switch__knob" />
                  </a>
                  <span className={lang === 'ar' ? 'is-on' : undefined} lang="ar">AR</span>
                </div>
                <ThemeToggle lang={lang} />
              </div>
            </div>
            <div className="site-header__main">
              <NavBar lang={lang} />
            </div>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-menu-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) closeMenu(); }}>
          <div ref={panelRef} id="site-menu" className="mobile-menu-panel" role="dialog" aria-modal="true" aria-label={t.menu}>
            <button className="mobile-menu-close" onClick={closeMenu} aria-label={t.closeMenu}><CloseIcon /></button>
            <nav className="mobile-menu-nav" aria-label={t.menu}>
              {links.map(([key, href]) => {
                const target = href === '/tools' ? href : localizedPath(lang, href);
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
