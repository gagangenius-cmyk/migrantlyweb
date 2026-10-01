import Link from 'next/link';
import SocialLinks from './SocialLinks';
import { buildEmailUrl, localeCopy, localizedPath, siteConfig, type Locale } from '@/lib/site-config';

export default function Footer({ lang = 'en' }: { lang?: Locale }) {
  const ar = lang === 'ar';
  const t = localeCopy[lang];
  const emailUrl = buildEmailUrl(lang);
  const services = ar
    ? [['تأشيرات العمالة الماهرة', 'skilled-visas'], ['هجرة الأعمال', 'business-immigration'], ['تأشيرات الأسرة', 'family-visas'], ['تأشيرات الدراسة', 'study-visas']]
    : [['Skilled Visas', 'skilled-visas'], ['Business Immigration', 'business-immigration'], ['Family Visas', 'family-visas'], ['Study Visas', 'study-visas']];
  const countries = ar
    ? [['كندا', 'canada'], ['أستراليا', 'australia'], ['المملكة المتحدة', 'united-kingdom'], ['الولايات المتحدة', 'united-states']]
    : [['Canada', 'canada'], ['Australia', 'australia'], ['United Kingdom', 'united-kingdom'], ['United States', 'united-states']];

  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer-grid footer-grid--without-newsletter">
          <div className="footer-brand">
            <Link href={localizedPath(lang, '/')} className="footer-logo" aria-label={siteConfig.name}>
              <img src="/assets/logo-1.png" alt={siteConfig.name} width={1386} height={755} loading="lazy" />
            </Link>
            <p className="footer-link">{ar ? 'معلومات واضحة حول مسارات الهجرة ودعم شخصي لخطوتك التالية.' : 'Clear immigration pathway information and personal support for your next step.'}</p>
            {emailUrl && <a className="footer-contact-link" href={emailUrl}>{siteConfig.publicContact.email}</a>}
            <SocialLinks lang={lang} className="footer-socials--spaced" />
          </div>
          <div>
            <p className="footer-title">{t.services}</p>
            <ul className="footer-links">{services.map(([name, slug]) => <li key={slug}><Link className="footer-link" href={localizedPath(lang, `/services/${slug}`)}>{name}</Link></li>)}</ul>
          </div>
          <div>
            <p className="footer-title">{t.countries}</p>
            <ul className="footer-links">{countries.map(([name, slug]) => <li key={slug}><Link className="footer-link" href={localizedPath(lang, `/countries/${slug}`)}>{name}</Link></li>)}</ul>
          </div>
          <div>
            <p className="footer-title">{ar ? 'الشركة' : 'Company'}</p>
            <ul className="footer-links">
              <li><Link className="footer-link" href={localizedPath(lang, '/about')}>{t.about}</Link></li>
              <li><Link className="footer-link" href={localizedPath(lang, '/news')}>{t.news}</Link></li>
              <li><Link className="footer-link" href={localizedPath(lang, '/contact')}>{t.contact}</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} {siteConfig.name}. {ar ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</span></div>
      </div>
    </footer>
  );
}
