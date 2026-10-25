import Link from 'next/link';
import { localizedPath, type Locale } from '@/lib/site-config';

type Key = 'vision' | 'mission' | 'values';

const items: Record<Locale, { key: Key; title: string; text: string; points: string[]; image: string; alt: string }[]> = {
  en: [
    { key: 'vision', title: 'What We Unlocked', text: 'To make immigration clear and accessible for everyone by becoming a benchmark for trust, compliance and client success.', points: ['Clear, honest guidance', 'Access for every applicant', 'A benchmark for trust'], image: '/assets/images/1506744038136-46273834b3fb.webp', alt: 'A clear horizon over a valley' },
    { key: 'mission', title: 'How We Keep Unlocking', text: 'To deliver world-class migration solutions for individuals, families and investors through expert guidance and ethical practice.', points: ['Expert, up-to-date advice', 'Ethical, realistic promises', 'Support from start to approval'], image: '/assets/images/1454165804606-c3d57bc86b40.webp', alt: 'Visa paperwork being prepared on a laptop' },
    { key: 'values', title: "Migrantly's Ethics & Principles", text: 'Integrity, transparency and excellence in every case: treating every client’s future with the care it deserves.', points: ['Integrity in every case', 'Transparent fees and timelines', 'Care for every client'], image: '/assets/images/1521791136064-7986c2920216.webp', alt: 'A handshake after a consultation' },
  ],
  ar: [
    { key: 'vision', title: 'ما فتحناه', text: 'أن نجعل الهجرة واضحة ومتاحة للجميع من خلال أن نكون معياراً للثقة والالتزام ونجاح العملاء.', points: ['إرشاد واضح وصادق', 'متاحة لكل متقدم', 'معيار للثقة'], image: '/assets/images/1506744038136-46273834b3fb.webp', alt: 'أفق واضح فوق وادٍ' },
    { key: 'mission', title: 'كيف نواصل الفتح', text: 'تقديم حلول هجرة عالمية المستوى للأفراد والأسر والمستثمرين من خلال إرشاد الخبراء وممارسات أخلاقية.', points: ['نصيحة الخبراء المحدّثة', 'وعود أخلاقية وواقعية', 'دعم من البداية حتى الموافقة'], image: '/assets/images/1454165804606-c3d57bc86b40.webp', alt: 'تجهيز أوراق التأشيرة على حاسوب محمول' },
    { key: 'values', title: 'أخلاقيات ومبادئ ميجرانتلي', text: 'النزاهة والشفافية والتميز في كل قضية: نعامل مستقبل كل عميل بالعناية التي يستحقها.', points: ['النزاهة في كل قضية', 'رسوم وجداول زمنية شفافة', 'عناية بكل عميل'], image: '/assets/images/1521791136064-7986c2920216.webp', alt: 'مصافحة بعد استشارة' },
  ],
};

const icons: Record<Key, React.ReactNode> = {
  vision: <><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>,
  mission: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" /></>,
  values: <path d="M12 20.5s-8-4.9-8-11A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5c0 6.1-8 11-8 11z" />,
};

const arrow = (
  <svg className="vmv-card__arrow" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M21.5 2.5 2 10.2l7.3 3 3 7.3 9.2-18Z" />
  </svg>
);

export default function VisionMission({ lang = 'en' }: { lang?: Locale }) {
  return (
    <section className="vband">
      <div className="vband__grid">
        {items[lang].map((item) => (
          <Link key={item.key} href={localizedPath(lang, `/about/${item.key}`)} className="vband__col">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[item.key]}</svg>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
