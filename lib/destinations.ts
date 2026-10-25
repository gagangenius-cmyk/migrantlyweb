/**
 * The countries, regions and tests each service covers. They show as cards on the service page
 * (no pages of their own) and as plain names in the Services menu.
 */
export interface MenuService {
  slug: string;
  kind: 'country' | 'test';
  items: string[];
}

export const menuServices: MenuService[] = [
  { slug: 'permanent-residence', kind: 'country', items: ['Canada', 'Australia', 'UK', 'New Zealand'] },
  { slug: 'global-tourist-visa', kind: 'country', items: ['UK', 'USA', 'Canada', 'Australia', 'NZ', 'Europe', 'China', 'Japan', 'Montenegro', 'South Africa', 'Brazil', 'Argentina'] },
  { slug: 'student-visa', kind: 'country', items: ['UK', 'USA', 'Canada', 'Australia', 'Ireland', 'New Zealand', 'Europe'] },
  { slug: 'citizenship-by-investment', kind: 'country', items: ['Dominica', 'Antigua & Barbuda', 'Grenada', 'Saint Lucia', 'Saint Kitts & Nevis', 'Turkey', 'São Tomé & Príncipe'] },
  { slug: 'residence-by-investment', kind: 'country', items: ['Greece', 'Portugal', 'Italy', 'Cyprus', 'Malta', 'Turkey', 'United States', 'Canada', 'Panama'] },
  { slug: 'family-sponsorship', kind: 'country', items: ['Canada', 'Australia', 'UK', 'USA', 'Ireland', 'NZ', 'Europe'] },
  { slug: 'language-coaching', kind: 'test', items: ['IELTS', 'PTE', 'CELPIP', 'German'] },
  { slug: 'job-offers-work-permit', kind: 'country', items: ['Europe'] },
];

const FULL_NAME: Record<string, string> = { UK: 'United Kingdom', USA: 'United States', NZ: 'New Zealand', Europe: 'Europe (Schengen)' };
export const displayName = (item: string) => FULL_NAME[item] ?? item;

const FLAG: Record<string, string> = {
  UK: 'gb', USA: 'us', 'United States': 'us', Canada: 'ca', Australia: 'au', NZ: 'nz', 'New Zealand': 'nz', Europe: 'eu', China: 'cn', Japan: 'jp', Montenegro: 'me',
  'South Africa': 'za', Brazil: 'br', Argentina: 'ar', Ireland: 'ie', Dominica: 'dm', 'Antigua & Barbuda': 'ag', Grenada: 'gd', 'Saint Lucia': 'lc',
  'Saint Kitts & Nevis': 'kn', Turkey: 'tr', 'São Tomé & Príncipe': 'st', Greece: 'gr', Portugal: 'pt', Italy: 'it', Cyprus: 'cy', Malta: 'mt', Panama: 'pa',
};
/** Flag file name (without extension) for a card image, or undefined for tests. */
export const flagFor = (item: string) => FLAG[item];
