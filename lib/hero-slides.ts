export type HeroLang = 'en' | 'ar';

export interface HeroSlide {
  src: string;
  alt: string;
  /** Slide 1 is the brand slide; its headline is rendered with the gold "Unlocked" word. */
  brand?: boolean;
  title: Record<HeroLang, string>;
  line: Record<HeroLang, string>;
}

// Pictures are temporary stand-ins until the final images are chosen.
export const heroSlides: HeroSlide[] = [
  {
    src: '/assets/countries/canada.webp', alt: 'Moraine Lake in Banff National Park, Canada', brand: true,
    title: { en: 'Your world, Unlocked', ar: 'عالمك، مفتوح' },
    line: { en: 'Specialized in Permanent Residency, Citizenship & Global Visas', ar: 'متخصصون في الإقامة الدائمة والجنسية والتأشيرات العالمية' },
  },
  {
    src: '/assets/images/1521791136064-7986c2920216.webp', alt: 'Handshake after a consultation',
    title: { en: 'Immigration & Visa Consultant', ar: 'مستشار الهجرة والتأشيرات' },
    line: { en: 'Clear, honest guidance from your first consultation to approval.', ar: 'إرشاد واضح وصادق من استشارتك الأولى حتى الموافقة.' },
  },
  {
    src: '/assets/countries/australia.webp', alt: 'Sydney Opera House and Harbour Bridge',
    title: { en: 'Global Tourist Visa Specialist', ar: 'متخصص التأشيرات السياحية العالمية' },
    line: { en: 'Complete, well-organised applications for destinations worldwide.', ar: 'طلبات متكاملة ومنظمة لوجهات حول العالم.' },
  },
  {
    src: '/assets/hero/hero-investment.webp', alt: 'Dubai skyline at night',
    title: { en: 'Citizenship & Residency by Investment', ar: 'الجنسية والإقامة بالاستثمار' },
    line: { en: 'Your route to a second residency or citizenship, planned with care.', ar: 'طريقك إلى إقامة ثانية أو جنسية، مخطط له بعناية.' },
  },
  {
    src: '/assets/hero/hero-study.webp', alt: 'Radcliffe Camera, Oxford',
    title: { en: 'Study Abroad', ar: 'الدراسة في الخارج' },
    line: { en: 'From choosing your course to visa approval, we guide every step.', ar: 'من اختيار تخصصك إلى الموافقة على التأشيرة، نرافقك في كل خطوة.' },
  },
];
