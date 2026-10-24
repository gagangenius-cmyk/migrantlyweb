import Link from 'next/link';
import SocialLinks from './SocialLinks';
import { buildEmailUrl, localeCopy, localizedPath, siteConfig, type Locale } from '@/lib/site-config';

export default function Footer({ lang = 'en' }: { lang?: Locale }) {
  const ar = lang === 'ar';
  const t = localeCopy[lang];
  const emailUrl = buildEmailUrl(lang);
  const services = ar
    ? [['الإقامة الدائمة', 'permanent-residence'], ['الجنسية بالاستثمار', 'citizenship-by-investment'], ['تأشيرة الطالب', 'student-visa'], ['كفالة الأسرة', 'family-sponsorship']]
    : [['Permanent Residence', 'permanent-residence'], ['Citizenship by Investment', 'citizenship-by-investment'], ['Student Visa', 'student-visa'], ['Family Sponsor & Dependent Visa', 'family-sponsorship']];
  const countries = ar
    ? [['كندا', 'canada'], ['أستراليا', 'australia'], ['المملكة المتحدة', 'united-kingdom'], ['الولايات المتحدة', 'united-states']]
    : [['Canada', 'canada'], ['Australia', 'australia'], ['United Kingdom', 'united-kingdom'], ['United States', 'united-states']];

  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer-grid footer-grid--without-newsletter">
          <div className="footer-brand">
            <Link href={localizedPath(lang, '/')} className="footer-logo" aria-label={siteConfig.name}>
              <img src="/assets/logo-dark-330.png" srcSet="/assets/logo-dark-220.png 220w, /assets/logo-dark-330.png 330w, /assets/logo-dark-440.png 440w" sizes="160px" alt={siteConfig.name} width={330} height={165} loading="lazy" decoding="async" />
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
