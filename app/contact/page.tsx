import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';
import { services } from '@/lib/data';

export const metadata: Metadata = { title: 'Contact', description: 'Send Migrantly a private immigration service enquiry.', alternates: { languages: { en: '/contact', ar: '/ar/contact' } } };

export default function ContactPage() {
  return <><PageHero label="Get in touch" title="Contact Us" description="Tell us what you are planning and our team will review your enquiry." breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} /><section className="page-content"><div className="container"><ContactForm lang="en" services={services.map(({ slug, title }) => ({ slug, title }))} /></div></section></>;
}
