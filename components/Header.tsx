'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { MenuIcon, CloseIcon } from './Icons';
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
            <button ref={triggerRef} className="header-btn" aria-label={t.menu} aria-expanded={menuOpen} aria-controls="site-menu" onClick={() => setMenuOpen(true)}>
              <MenuIcon /><span>{t.menu}</span>
            </button>
          </div>
          <Link href={localizedPath(lang, '/')} className="header-logo" aria-label={`${t.home} — Migrantly`}>
            <Image src="/assets/logo-1.png" alt="Migrantly" width={1386} height={755} priority />
          </Link>
          <div className="header-right">
            <Link href={localizedPath(lang, '/contact')} className="header-btn">{t.contact}</Link>
            <label className="header-lang-select">
              <span className="sr-only">{lang === 'ar' ? 'اختر اللغة' : 'Choose language'}</span>
              <select
                value={lang}
                onChange={(event) => {
                  const targetLocale = event.target.value as Locale;
                  if (targetLocale === lang) return;
                  const suffix = `${window.location.search}${window.location.hash}`;
                  const destination = new URL(`${alternateLocalePath(pathname, targetLocale)}${suffix}`, window.location.origin);
                  window.location.assign(destination.toString());
                }}
              >
                <option value="en">EN</option><option value="ar">AR</option>
              </select>
            </label>
          </div>
        </header>
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
