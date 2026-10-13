import AboutPillarPage, { pillarMetadata } from '@/components/AboutPillarPage';

export const metadata = pillarMetadata('en', 'mission');

export default function Page() {
  return <AboutPillarPage lang="en" pillar="mission" />;
}
