import AboutPillarPage, { pillarMetadata } from '@/components/AboutPillarPage';

export const metadata = pillarMetadata('ar', 'mission');

export default function Page() {
  return <AboutPillarPage lang="ar" pillar="mission" />;
}
