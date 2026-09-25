import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { default: 'ميجرانتلي — إرشادات الهجرة والإقامة', template: '%s | ميجرانتلي' },
  description: 'معلومات واضحة حول مسارات الهجرة ودعم الاستشارات الشخصية للأفراد والعائلات.',
  alternates: { languages: { en: '/', ar: '/ar' } },
};

export default function ArabicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
