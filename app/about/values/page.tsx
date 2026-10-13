import AboutPillarPage, { pillarMetadata } from '@/components/AboutPillarPage';

export const metadata = pillarMetadata('en', 'values');

export default function Page() {
  return <AboutPillarPage lang="en" pillar="values" />;
}
