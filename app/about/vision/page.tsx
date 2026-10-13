import AboutPillarPage, { pillarMetadata } from '@/components/AboutPillarPage';

export const metadata = pillarMetadata('en', 'vision');

export default function Page() {
  return <AboutPillarPage lang="en" pillar="vision" />;
}
