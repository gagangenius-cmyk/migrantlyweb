import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';
import { services } from '@/lib/data-ar';

export const metadata: Metadata = { title: 'اتصل بنا', description: 'أرسل إلى ميجرانتلي استفساراً خاصاً حول خدمات الهجرة.', alternates: { languages: { en: '/contact', ar: '/ar/contact' } } };

export default function ArabicContactPage() {
  return <><PageHero label="تواصل معنا" title="اتصل بنا" description="أخبرنا بما تخطط له وسيقوم فريقنا بمراجعة استفسارك." breadcrumb={[{ label: 'الرئيسية', href: '/ar' }, { label: 'اتصل بنا' }]} /><section className="page-content"><div className="container"><ContactForm lang="ar" services={services.map(({ slug, title }) => ({ slug, title }))} /></div></section></>;
}
