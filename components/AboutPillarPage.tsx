import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { ArrowIcon } from '@/components/Icons';
import { localizedPath, siteConfig, type Locale } from '@/lib/site-config';

export type Pillar = 'vision' | 'mission' | 'values';

interface PillarCopy {
  title: string;
  label: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  paragraphs: string[];
  points: { title: string; text: string }[];
}

const copy: Record<Locale, Record<Pillar, PillarCopy>> = {
  en: {
    vision: {
      title: 'Our Vision',
      label: 'About Us',
      metaTitle: 'Our Vision — Clear, Accessible Immigration',
      metaDescription: 'Migrantly’s vision is to make immigration clear and accessible for everyone, and to be a benchmark for trust, compliance and client success.',
      lead: 'To make immigration clear and accessible for everyone by becoming a benchmark for trust, compliance and client success.',
      paragraphs: [
        'Moving countries is one of the biggest decisions a person or family can make. Too often, the information around it is confusing, out of date or designed to sell rather than to help.',
        'We want that to change. Our vision is an industry where every applicant understands their options, knows what to expect and is treated with honesty at every step.',
      ],
      points: [
        { title: 'Clarity first', text: 'Plain language, honest timelines and no hidden steps.' },
        { title: 'Access for everyone', text: 'Good guidance should not depend on who you know or where you live.' },
        { title: 'A trusted benchmark', text: 'We hold ourselves to standards other advisers can be measured against.' },
      ],
    },
    mission: {
      title: 'Our Mission',
      label: 'About Us',
      metaTitle: 'Our Mission — World-Class Migration Solutions',
      metaDescription: 'Migrantly’s mission is to deliver world-class migration solutions for individuals, families and investors through expert guidance and ethical practice.',
      lead: 'To deliver world-class migration solutions for individuals, families and investors through expert guidance and ethical immigration practices.',
      paragraphs: [
        'Every client arrives with a different profile, budget and goal. Our mission is to turn that starting point into a realistic, well-prepared application.',
        'We do this by assessing eligibility honestly, recommending only routes that fit, and managing each application with care from first consultation to final decision.',
      ],
      points: [
        { title: 'Expert guidance', text: 'Specialists who follow rule changes and explain what they mean for you.' },
        { title: 'Ethical practice', text: 'We never promise outcomes that no adviser can guarantee.' },
        { title: 'End-to-end support', text: 'From eligibility to submission and the steps after approval.' },
      ],
    },
    values: {
      title: 'Our Values',
      label: 'About Us',
      metaTitle: 'Our Values — Integrity, Transparency, Excellence',
      metaDescription: 'Integrity, transparency and excellence guide every Migrantly case. Learn the values behind how we treat clients and handle applications.',
      lead: 'Integrity, transparency and excellence in every case: treating every client’s future with the care it deserves.',
      paragraphs: [
        'Our values shape everyday decisions, from which routes we recommend to how we communicate when news is not what a client hoped for.',
        'They are the standards we ask our team to meet, and the ones we invite clients to hold us to.',
      ],
      points: [
        { title: 'Integrity', text: 'We do the right thing for the client, even when it is the harder conversation.' },
        { title: 'Transparency', text: 'Clear fees, clear timelines and clear explanations at each stage.' },
        { title: 'Excellence', text: 'Careful preparation and attention to detail on every file.' },
        { title: 'Care', text: 'We treat each application as someone’s future, because it is.' },
      ],
    },
  },
  ar: {
    vision: {
      title: 'رؤيتنا',
      label: 'من نحن',
      metaTitle: 'رؤيتنا — هجرة واضحة ومتاحة للجميع',
      metaDescription: 'رؤية ميجرانتلي أن تكون الهجرة واضحة ومتاحة للجميع، وأن نكون معياراً للثقة والالتزام ونجاح العملاء.',
      lead: 'أن نجعل الهجرة واضحة ومتاحة للجميع من خلال أن نكون معياراً للثقة والالتزام ونجاح العملاء.',
      paragraphs: [
        'الانتقال إلى بلد جديد من أكبر القرارات التي يتخذها الفرد أو الأسرة، وغالباً ما تكون المعلومات المحيطة به مربكة أو قديمة.',
        'نريد تغيير ذلك. رؤيتنا قطاع يفهم فيه كل متقدم خياراته ويعرف ما يتوقعه ويُعامل بصدق في كل خطوة.',
      ],
      points: [
        { title: 'الوضوح أولاً', text: 'لغة بسيطة وجداول زمنية صادقة وخطوات معلنة.' },
        { title: 'متاحة للجميع', text: 'الإرشاد الجيد لا ينبغي أن يعتمد على من تعرف أو أين تعيش.' },
        { title: 'معيار موثوق', text: 'نلتزم بمعايير يمكن للآخرين القياس عليها.' },
      ],
    },
    mission: {
      title: 'مهمتنا',
      label: 'من نحن',
      metaTitle: 'مهمتنا — حلول هجرة عالمية المستوى',
      metaDescription: 'مهمة ميجرانتلي تقديم حلول هجرة عالمية المستوى للأفراد والأسر والمستثمرين من خلال إرشاد الخبراء وممارسات أخلاقية.',
      lead: 'تقديم حلول هجرة عالمية المستوى للأفراد والأسر والمستثمرين من خلال إرشاد الخبراء وممارسات هجرة أخلاقية.',
      paragraphs: [
        'يأتي كل عميل بملف وميزانية وهدف مختلف. مهمتنا تحويل هذه البداية إلى طلب واقعي ومُعدّ بعناية.',
        'نفعل ذلك بتقييم الأهلية بصدق، واقتراح المسارات المناسبة فقط، وإدارة كل طلب منذ الاستشارة الأولى حتى القرار النهائي.',
      ],
      points: [
        { title: 'إرشاد الخبراء', text: 'مختصون يتابعون تغيّر القواعد ويشرحون أثرها عليك.' },
        { title: 'ممارسة أخلاقية', text: 'لا نعد بنتائج لا يستطيع أي مستشار ضمانها.' },
        { title: 'دعم متكامل', text: 'من تقييم الأهلية إلى التقديم وما بعد الموافقة.' },
      ],
    },
    values: {
      title: 'قيمنا',
      label: 'من نحن',
      metaTitle: 'قيمنا — النزاهة والشفافية والتميز',
      metaDescription: 'النزاهة والشفافية والتميز توجّه كل قضية في ميجرانتلي. تعرّف على القيم التي تحكم تعاملنا مع العملاء.',
      lead: 'النزاهة والشفافية والتميز في كل قضية: نعامل مستقبل كل عميل بالعناية التي يستحقها.',
      paragraphs: [
        'تشكّل قيمنا قراراتنا اليومية، من المسارات التي نوصي بها إلى طريقة تواصلنا حين لا تكون الأخبار كما يتمنى العميل.',
        'هي المعايير التي نطلبها من فريقنا، والتي ندعو العملاء إلى محاسبتنا عليها.',
      ],
      points: [
        { title: 'النزاهة', text: 'نفعل ما فيه مصلحة العميل حتى لو كان الحديث أصعب.' },
        { title: 'الشفافية', text: 'رسوم وجداول زمنية وشروحات واضحة في كل مرحلة.' },
        { title: 'التميز', text: 'تحضير دقيق واهتمام بالتفاصيل في كل ملف.' },
        { title: 'العناية', text: 'نتعامل مع كل طلب على أنه مستقبل إنسان، لأنه كذلك.' },
      ],
    },
  },
};

const ui = {
  en: { home: 'Home', about: 'About Us', related: 'More about Migrantly', cta: 'Talk to our team', ctaText: 'Book a free consultation and see how we work.', book: 'Book a consultation' },
  ar: { home: 'الرئيسية', about: 'من نحن', related: 'المزيد عن ميجرانتلي', cta: 'تحدث مع فريقنا', ctaText: 'احجز استشارة مجانية وتعرّف على طريقة عملنا.', book: 'احجز استشارة' },
};

export function pillarMetadata(lang: Locale, pillar: Pillar) {
  const c = copy[lang][pillar];
  const path = localizedPath(lang, `/about/${pillar}`);
  const alt = { en: `/about/${pillar}`, ar: `/ar/about/${pillar}` };
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: path, languages: alt },
    openGraph: { type: 'website' as const, title: c.metaTitle, description: c.metaDescription, url: path },
  };
}

export default function AboutPillarPage({ lang, pillar }: { lang: Locale; pillar: Pillar }) {
  const c = copy[lang][pillar];
  const t = ui[lang];
  const others = (['vision', 'mission', 'values'] as Pillar[]).filter((p) => p !== pillar);
  const structured = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: c.metaTitle,
    description: c.metaDescription,
    url: `${siteConfig.url}${localizedPath(lang, `/about/${pillar}`)}`,
    inLanguage: lang,
    isPartOf: { '@type': 'WebSite', name: siteConfig.name, url: siteConfig.url },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, '\\u003c') }} />
      <PageHero
        label={c.label}
        title={c.title}
        description={c.lead}
        breadcrumb={[{ label: t.home, href: localizedPath(lang, '/') }, { label: t.about, href: localizedPath(lang, '/about') }, { label: c.title }]}
      />
      <section className="page-content">
        <div className="container">
          <div className="pillar">
            <div className="article-content">
              {c.paragraphs.map((p) => <p key={p}>{p}</p>)}
            </div>
            <div className="pillar__points">
              {c.points.map((point, i) => (
                <div className="pillar__point" key={point.title}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <h3>{point.title}</h3>
                  <p>{point.text}</p>
                </div>
              ))}
            </div>
            <nav className="pillar__more" aria-label={t.related}>
              <p>{t.related}</p>
              {others.map((p) => <Link key={p} href={localizedPath(lang, `/about/${p}`)}>{copy[lang][p].title}<ArrowIcon /></Link>)}
            </nav>
          </div>
        </div>
      </section>
      <section className="cta-banner">
        <div className="container">
          <h2>{t.cta}</h2>
          <p>{t.ctaText}</p>
          <Link href={localizedPath(lang, '/contact')} className="btn btn-primary">{t.book}<ArrowIcon /></Link>
        </div>
      </section>
    </>
  );
}
