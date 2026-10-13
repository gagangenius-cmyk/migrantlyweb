import AboutPillarPage, { pillarMetadata } from '@/components/AboutPillarPage';

export const metadata = pillarMetadata('ar', 'vision');

export default function Page() {
  return <AboutPillarPage lang="ar" pillar="vision" />;
}
