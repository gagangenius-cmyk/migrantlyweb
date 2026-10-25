import type { Locale } from '@/lib/site-config';

const copy = {
  en: {
    eyebrow: 'Why Migrantly.ae?', sub: 'Who we are & what we do.', pill: 'Your trusted migration partner',
    title: 'Navigate Your Future, Globally', lead: 'Trusted guidance for your immigration journey — clear, compliant, and confidence-driven.',
    who: 'Who We Are', whoText: 'Migrantly is more than a visa company — we are your migration partner.',
    what: 'What We Do', whatText: 'We turn immigration confusion into a clear journey for Canada, Australia, UK, New Zealand, South Africa, USA.',
  },
  ar: {
    eyebrow: 'لماذا Migrantly.ae؟', sub: 'من نحن وماذا نفعل.', pill: 'شريكك الموثوق في الهجرة',
    title: 'اصنع مستقبلك عالمياً', lead: 'إرشاد موثوق لرحلة هجرتك — واضح وملتزم ويمنحك الثقة.',
    who: 'من نحن', whoText: 'ميجرانتلي أكثر من شركة تأشيرات — نحن شريكك في الهجرة.',
    what: 'ماذا نفعل', whatText: 'نحوّل حيرة الهجرة إلى رحلة واضحة إلى كندا وأستراليا والمملكة المتحدة ونيوزيلندا وجنوب أفريقيا والولايات المتحدة.',
  },
} as const;

export default function WhyMigrantly({ lang = 'en' }: { lang?: Locale }) {
  const t = copy[lang];
  return (
    <section className="why">
      <div className="container">
        <p className="why__eyebrow">{t.eyebrow}</p>
        <p className="why__sub">{t.sub}</p>
        <div className="why__panel">
          <span className="why__pill">{t.pill}</span>
          <h2 className="why__title">{t.title}</h2>
          <p className="why__lead">{t.lead}</p>
          <div className="why__cards">
            <article className="why__card">
              <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="10" r="3" /><path d="M6.5 19c.8-3 2.9-4.5 5.5-4.5s4.7 1.5 5.5 4.5" /><path d="M3 8V4h4M21 8V4h-4M3 16v4h4M21 16v4h-4" /></svg>
              <div><h3>{t.who}</h3><p>{t.whoText}</p></div>
            </article>
            <article className="why__card">
              <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="3" height="3" rx="0.5" /><rect x="3" y="10.5" width="3" height="3" rx="0.5" /><rect x="3" y="17" width="3" height="3" rx="0.5" /><path d="M9 5.5h12M9 12h12M9 18.5h12" /></svg>
              <div><h3>{t.what}</h3><p>{t.whatText}</p></div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
