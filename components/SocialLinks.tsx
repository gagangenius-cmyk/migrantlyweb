import { SocialIcon } from './Icons';
import { siteConfig, type Locale, type SocialNetwork } from '@/lib/site-config';

const names: Record<SocialNetwork, string> = { facebook: 'Facebook', instagram: 'Instagram', youtube: 'YouTube', linkedin: 'LinkedIn', x: 'X' };

export default function SocialLinks({ lang, className = '' }: { lang: Locale; className?: string }) {
  const entries = Object.entries(siteConfig.publicContact.social) as [SocialNetwork, string | null][];
  const available = entries.filter((entry): entry is [SocialNetwork, string] => Boolean(entry[1]));
  if (!available.length) return null;
  return (
    <div className={`footer-socials ${className}`} aria-label={lang === 'ar' ? 'وسائل التواصل الاجتماعي' : 'Social media'}>
      {available.map(([network, url]) => (
        <a key={network} href={url} className="footer-social" target="_blank" rel="noopener noreferrer" aria-label={names[network]} title={names[network]}>
          <SocialIcon network={network} />
        </a>
      ))}
    </div>
  );
}
