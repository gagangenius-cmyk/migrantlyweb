import type { Locale } from '@/lib/site-config';

const copy = {
  en: [
    { key: 'vision', title: 'Our Vision', text: 'To make immigration clear and accessible for everyone by becoming a benchmark for trust, compliance and client success.' },
    { key: 'mission', title: 'Our Mission', text: 'To deliver world-class migration solutions for individuals, families and investors through expert guidance and ethical immigration practices.' },
    { key: 'values', title: 'Our Values', text: 'Integrity, transparency and excellence in every case: treating every client’s future with the care it deserves.' },
  ],
  ar: [
    { key: 'vision', title: 'رؤيتنا', text: 'أن نجعل الهجرة واضحة ومتاحة للجميع من خلال أن نكون معياراً للثقة والالتزام ونجاح العملاء.' },
    { key: 'mission', title: 'مهمتنا', text: 'تقديم حلول هجرة عالمية المستوى للأفراد والأسر والمستثمرين من خلال إرشاد الخبراء وممارسات هجرة أخلاقية.' },
    { key: 'values', title: 'قيمنا', text: 'النزاهة والشفافية والتميز في كل قضية: نعامل مستقبل كل عميل بالعناية التي يستحقها.' },
  ],
} as const;

const icons = {
  vision: <><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>,
  mission: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" /></>,
  values: <path d="M12 20.5s-8-4.9-8-11A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5c0 6.1-8 11-8 11z" />,
};

export default function VisionMission({ lang = 'en' }: { lang?: Locale }) {
  return (
    <section className="vmv">
      <div className="container">
        <div className="vmv__grid">
          {copy[lang].map((item) => (
            <article key={item.key} className="vmv__item">
              <span className="vmv__icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{icons[item.key]}</svg>
              </span>
              <h3 className="vmv__title">{item.title}</h3>
              <p className="vmv__text">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
