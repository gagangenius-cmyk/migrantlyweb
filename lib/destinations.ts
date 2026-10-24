import { getServicePage, type ServicePage } from './service-pages';

/**
 * One list drives both the Services sub-menu and the destination pages, so they never drift apart.
 * Page wording stays general on purpose: entry rules depend on nationality and change often, so the
 * pages point people to a consultation instead of quoting fees, scores or timelines.
 */
export interface MenuService {
  slug: string;
  /** Short name used in page titles. */
  short: string;
  kind: 'country' | 'test';
  items: string[];
}

export const menuServices: MenuService[] = [
  { slug: 'permanent-residence', short: 'Permanent Residence', kind: 'country', items: ['Canada', 'Australia', 'UK', 'New Zealand'] },
  { slug: 'global-tourist-visa', short: 'Tourist Visa', kind: 'country', items: ['UK', 'USA', 'Canada', 'Australia', 'NZ', 'Europe', 'China', 'Japan', 'Montenegro', 'South Africa', 'Brazil', 'Argentina'] },
  { slug: 'student-visa', short: 'Student Visa', kind: 'country', items: ['UK', 'USA', 'Canada', 'Australia', 'Ireland', 'New Zealand', 'Europe'] },
  { slug: 'citizenship-by-investment', short: 'Citizenship by Investment', kind: 'country', items: ['Dominica', 'Antigua & Barbuda', 'Grenada', 'Saint Lucia', 'Saint Kitts & Nevis', 'Turkey', 'São Tomé & Príncipe'] },
  { slug: 'residence-by-investment', short: 'Residence by Investment', kind: 'country', items: ['Greece', 'Portugal', 'Italy', 'Cyprus', 'Malta', 'Turkey', 'United States', 'Canada', 'Panama'] },
  { slug: 'family-sponsorship', short: 'Family & Dependent Visa', kind: 'country', items: ['Canada', 'Australia', 'UK', 'USA', 'Ireland', 'NZ', 'Europe'] },
  { slug: 'language-coaching', short: 'Coaching', kind: 'test', items: ['IELTS', 'PTE', 'CELPIP', 'German'] },
  { slug: 'job-offers-work-permit', short: 'Job Offers & Work Permit', kind: 'country', items: ['Europe'] },
];

export const slugify = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const FULL_NAME: Record<string, string> = { UK: 'United Kingdom', USA: 'United States', NZ: 'New Zealand' };
const PHOTO: Record<string, string> = { canada: 'canada', australia: 'australia', uk: 'united-kingdom', usa: 'united-states', 'united-states': 'united-states', 'new-zealand': 'new-zealand', nz: 'new-zealand' };

export const destinationHref = (service: string, item: string) => `/visa/${service}/${slugify(item)}`;

export function getDestinationPage(serviceSlug: string, itemSlug: string): ServicePage | undefined {
  const svc = menuServices.find((s) => s.slug === serviceSlug);
  const base = getServicePage(serviceSlug);
  const item = svc?.items.find((i) => slugify(i) === itemSlug);
  if (!svc || !base || !item) return undefined;

  const name = svc.kind === 'country' ? FULL_NAME[item] ?? item : item;
  const title = svc.kind === 'test' ? `${name} Coaching` : `${name} ${svc.short}`;
  const lower = base.title.toLowerCase();
  const photoKey = PHOTO[slugify(item)];
  const intro =
    svc.kind === 'test'
      ? [`${name} results can strengthen an immigration application. We help you understand what score your target pathway needs and arrange focused coaching for the ${name} test.`, base.intro[1] ?? base.intro[0]]
      : [`We help clients with ${lower} for ${name}. Requirements, eligibility and timelines for ${name} differ from other destinations and change over time, so we confirm the current rules with you at your consultation.`, base.intro[0]];

  return {
    ...base,
    path: destinationHref(serviceSlug, item),
    title,
    tagline: svc.kind === 'test' ? `Prepare for ${name} with confidence` : `${base.title} for ${name}`,
    metaTitle: `${title} — Eligibility, Documents & Application Help`,
    metaDescription: svc.kind === 'test'
      ? `${name} coaching for immigration: understand the score you need, prepare with expert guidance and strengthen your application with Migrantly.`
      : `${title}: get a clear view of eligibility, documents and next steps for ${name}, with personal guidance from Migrantly.`,
    keywords: [title.toLowerCase(), `${name} ${lower}`, `${name} visa`, `${name} immigration`],
    description: svc.kind === 'test'
      ? `Coaching and practice for the ${name} test, planned around the score your immigration pathway needs.`
      : `${base.description} Here we focus on ${name}.`,
    image: photoKey ? `/assets/countries/${photoKey}.webp` : base.image,
    intro,
    destinations: undefined,
    faqs: [
      { q: `Do the rules for ${name} differ from other countries?`, a: `Yes. Each destination sets its own requirements and they change often, so we confirm the current position for ${name} before you apply.` },
      ...base.faqs.slice(0, 2),
    ],
  };
}

export const allDestinationParams = () => menuServices.flatMap((s) => s.items.map((i) => ({ service: s.slug, country: slugify(i) })));

/** Flag codes used on the tourist visa page, mapped to the destination page they open. */
export const touristFlagHref: Record<string, string> = {
  gb: 'uk', us: 'usa', ca: 'canada', au: 'australia', nz: 'nz', eu: 'europe', cn: 'china', jp: 'japan', me: 'montenegro', za: 'south-africa', br: 'brazil', ar: 'argentina',
};
