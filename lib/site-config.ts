export type Locale = 'en' | 'ar';
export type SocialNetwork = 'facebook' | 'instagram' | 'youtube' | 'linkedin' | 'x';

export const siteConfig = {
  name: 'Migrantly',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  publicContact: {
    email: 'info@migrantly.ae' as string | null,
    phone: null as string | null,
    whatsapp: null as string | null,
    // TODO: replace these placeholder links with the real Migrantly profile URLs.
    social: { facebook: 'https://www.facebook.com/', instagram: 'https://www.instagram.com/', youtube: 'https://www.youtube.com/', linkedin: 'https://www.linkedin.com/', x: 'https://x.com/' } satisfies Record<SocialNetwork, string | null>,
  },
  whatsappMessage: {
    en: "Hello Migrantly, I'd like help understanding my immigration options.",
    ar: 'مرحباً ميجرانتلي، أود المساعدة في فهم خيارات الهجرة المتاحة لي.',
  },
} as const;

export const localeCopy = {
  en: { menu: 'Menu', closeMenu: 'Close menu', assessment: 'Assessment', contact: 'Contact Us', home: 'Home', services: 'Services', countries: 'Countries', programs: 'Programs', about: 'About Us', news: 'News & Events', tools: 'Tools', language: 'العربية', whatsapp: 'WhatsApp', email: 'Email', chat: 'Chat' },
  ar: { menu: 'القائمة', closeMenu: 'إغلاق القائمة', assessment: 'التقييم', contact: 'اتصل بنا', home: 'الرئيسية', services: 'الخدمات', countries: 'الدول', programs: 'البرامج', about: 'من نحن', news: 'الأخبار والفعاليات', tools: 'الأدوات', language: 'English', whatsapp: 'واتساب', email: 'البريد', chat: 'الدردشة' },
} satisfies Record<Locale, Record<string, string>>;

export function localizedPath(locale: Locale, path: string) {
  const normalized = path || '/';
  if (locale === 'ar') return normalized === '/' ? '/ar' : `/ar${normalized}`;
  return normalized;
}

export function alternateLocalePath(pathname: string, targetLocale: Locale) {
  const cleanPath = pathname.split(/[?#]/)[0] || '/';
  const pathWithoutLocale = cleanPath.replace(/^\/ar(?=\/|$)/, '') || '/';
  if (targetLocale === 'ar') {
    return pathWithoutLocale === '/' ? '/ar' : `/ar${pathWithoutLocale}`;
  }
  return pathWithoutLocale;
}

export function buildWhatsAppUrl(locale: Locale, context?: string) {
  const number = siteConfig.publicContact.whatsapp?.replace(/\D/g, '');
  if (!number) return null;
  const base = siteConfig.whatsappMessage[locale];
  return `https://wa.me/${number}?text=${encodeURIComponent(context ? `${base}\n\n${context}` : base)}`;
}

export function buildEmailUrl(locale: Locale) {
  const email = siteConfig.publicContact.email;
  if (!email) return null;
  const subject = locale === 'ar' ? 'طلب استشارة هجرة' : 'Immigration consultation enquiry';
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}
