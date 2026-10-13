import AboutPillarPage, { pillarMetadata } from '@/components/AboutPillarPage';

export const metadata = pillarMetadata('ar', 'values');

export default function Page() {
  return <AboutPillarPage lang="ar" pillar="values" />;
}
