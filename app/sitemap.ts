import type { MetadataRoute } from 'next';
import { countries, news, programs, services } from '@/lib/data';
import { tools } from '@/lib/tools/registry';
import { siteConfig } from '@/lib/site-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/about', '/contact', '/countries', '/programs', '/services', '/news'];
  const routes = [
    ...staticRoutes,
    ...countries.map((item) => `/countries/${item.slug}`),
    ...programs.map((item) => `/programs/${item.slug}`),
    ...services.map((item) => `/services/${item.slug}`),
    ...news.map((item) => `/news/${item.slug}`),
  ];
  const englishOnly = ['/tools', ...tools.map((item) => `/tools/${item.slug}`)].map((route) => ({ url: `${siteConfig.url}${route}`, changeFrequency: 'monthly' as const }));
  return [...englishOnly, ...routes.flatMap((route) => {
    const english = `${siteConfig.url}${route || '/'}`;
    const arabic = `${siteConfig.url}/ar${route}`;
    const languages = { en: english, ar: arabic };
    return [
      { url: english, alternates: { languages }, changeFrequency: 'weekly' as const },
      { url: arabic, alternates: { languages }, changeFrequency: 'weekly' as const },
    ];
  })];
}
