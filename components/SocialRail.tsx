import { SocialIcon } from './Icons';
import { siteConfig, type Locale, type SocialNetwork } from '@/lib/site-config';

const names: Record<SocialNetwork, string> = { facebook: 'Facebook', instagram: 'Instagram', youtube: 'YouTube', linkedin: 'LinkedIn', x: 'X (Twitter)' };

// Fixed vertical rail of social links; stays in place while scrolling.
export default function SocialRail({ lang }: { lang: Locale }) {
  const entries = (Object.entries(siteConfig.publicContact.social) as [SocialNetwork, string | null][]).filter((e): e is [SocialNetwork, string] => Boolean(e[1]));
  if (!entries.length) return null;
  return (
    <aside className="social-rail" aria-label={lang === 'ar' ? 'وسائل التواصل الاجتماعي' : 'Social media'}>
      {entries.map(([network, url]) => (
        <a key={network} href={url} target="_blank" rel="noopener noreferrer" aria-label={names[network]} title={names[network]} data-network={network}>
          <SocialIcon network={network} />
        </a>
      ))}
    </aside>
  );
}
