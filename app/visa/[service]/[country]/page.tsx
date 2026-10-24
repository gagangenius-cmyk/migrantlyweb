import { notFound } from 'next/navigation';
import ServicePageView from '@/components/ServicePageView';
import { allDestinationParams, getDestinationPage } from '@/lib/destinations';

type Params = Promise<{ service: string; country: string }>;

export function generateStaticParams() {
  return allDestinationParams();
}

export async function generateMetadata({ params }: { params: Params }) {
  const { service, country } = await params;
  const page = getDestinationPage(service, country);
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: { canonical: page.path },
    openGraph: { type: 'website' as const, title: page.metaTitle, description: page.metaDescription, url: page.path, images: [{ url: page.image }] },
  };
}

export default async function DestinationPage({ params }: { params: Params }) {
  const { service, country } = await params;
  const page = getDestinationPage(service, country);
  if (!page) notFound();
  return <ServicePageView page={page} />;
}
