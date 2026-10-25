'use client';

import Image from 'next/image';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { testimonials } from '@/lib/testimonials';
import type { Locale } from '@/lib/site-config';

// Demo number until the real line is added to siteConfig.publicContact.phone (same as the header).
const DEMO_CALL_NUMBER = '+971 50 000 0000';

const copy = {
  en: {
    title: 'Appointment Request Form', name: 'First Name', email: 'Enter Email', mobile: 'Mobile No', submit: 'My Free Assessment', sending: 'Sending…',
    call: 'Call us on', sub: '24hr contact via WhatsApp and we’ll help you today.', ok: 'Thank you. We have your request and will contact you shortly.', fail: 'We could not send your request. Please check your details and try again.',
    destinations: ['Canada', 'Australia', 'UK', 'USA', 'New Zealand', 'Germany', 'Europe', 'Caribbean Islands', 'Other'],
    promise: 'What you can expect', messagePrefix: 'Appointment request. Destination:',
    commitments: [
      { t: 'A clear answer first', d: 'We tell you honestly which routes are realistic for your profile before you spend anything.' },
      { t: 'No pressure, no guarantees', d: 'We never promise outcomes no adviser can guarantee, and we explain the risks as well as the options.' },
      { t: 'One team, start to finish', d: 'The people who assess your eligibility stay with you through the application and after approval.' },
    ],
  },
  ar: {
    title: 'نموذج طلب موعد', name: 'الاسم الأول', email: 'البريد الإلكتروني', mobile: 'رقم الجوال', submit: 'تقييمي المجاني', sending: 'جارٍ الإرسال…',
    call: 'اتصل بنا على', sub: 'تواصل على مدار الساعة عبر واتساب وسنساعدك اليوم.', ok: 'شكراً. وصلنا طلبك وسنتواصل معك قريباً.', fail: 'تعذر إرسال طلبك. تحقق من بياناتك وحاول مرة أخرى.',
    destinations: ['كندا', 'أستراليا', 'المملكة المتحدة', 'الولايات المتحدة', 'نيوزيلندا', 'ألمانيا', 'أوروبا', 'جزر الكاريبي', 'أخرى'],
    promise: 'ماذا تتوقع', messagePrefix: 'طلب موعد. الوجهة:',
    commitments: [
      { t: 'إجابة واضحة أولاً', d: 'نخبرك بصدق ما هي المسارات الواقعية لملفك قبل أن تنفق أي مبلغ.' },
      { t: 'بلا ضغط وبلا ضمانات', d: 'لا نعد بنتائج لا يستطيع أي مستشار ضمانها، ونشرح المخاطر كما نشرح الخيارات.' },
      { t: 'فريق واحد من البداية للنهاية', d: 'الفريق الذي يقيّم أهليتك يرافقك خلال التقديم وبعد الموافقة.' },
    ],
  },
} as const;

export default function AppointmentSection({ lang = 'en' }: { lang?: Locale }) {
  const t = copy[lang];
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const startedAt = useRef(0);
  useEffect(() => { startedAt.current = Date.now(); }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    setError('');
    const form = event.currentTarget;
    const v = new FormData(form);
    const destination = String(v.get('destination') || '');
    const payload = {
      source: 'contact_form', locale: lang, firstName: v.get('name'), email: v.get('email'), phone: v.get('mobile'), preferredChannel: 'phone',
      destination, message: `${t.messagePrefix} ${destination}`, consent: true, website: v.get('website'), startedAt: startedAt.current,
    };
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || (Object.values(data.fieldErrors || {})[0] as string) || t.fail);
      setStatus('success');
      form.reset();
    } catch (e) {
      setError(e instanceof Error ? e.message : t.fail);
      setStatus('error');
    }
  }

  return (
    <section className="appt" id="consultation">
      <Image src="/assets/images/1454165804606-c3d57bc86b40.webp" alt="" fill sizes="100vw" className="appt__bg" />
      <div className="container appt__grid">
        <div className="appt__left">
          {testimonials.length > 0 ? testimonials.map((item) => (
            <figure className="appt__quote" key={item.name}>
              {item.photo && <Image src={item.photo} alt="" width={96} height={96} className="appt__avatar" />}
              <div>
                <blockquote>“{item.quote}”</blockquote>
                <figcaption>{item.name}{item.detail ? ` — ${item.detail}` : ''}</figcaption>
              </div>
            </figure>
          )) : (
            <>
              <h2 className="appt__promise">{t.promise}</h2>
              {t.commitments.map((c, i) => (
                <div className="appt__quote" key={c.t}>
                  <span className="appt__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <div><blockquote><strong>{c.t}</strong><br />{c.d}</blockquote></div>
                </div>
              ))}
            </>
          )}
        </div>

        <div className="appt__card">
          <h3 className="appt__title">{t.title}</h3>
          {status === 'success' ? <p className="appt__ok" role="status">{t.ok}</p> : (
            <form onSubmit={submit}>
              <input name="name" required minLength={2} autoComplete="given-name" placeholder={t.name} aria-label={t.name} />
              <input name="email" type="email" required autoComplete="email" placeholder={t.email} aria-label={t.email} />
              <input name="mobile" type="tel" required dir="ltr" autoComplete="tel" placeholder={t.mobile} aria-label={t.mobile} />
              <select name="destination" defaultValue={t.destinations[2]} aria-label="Destination">
                {t.destinations.map((d) => <option key={d}>{d}</option>)}
              </select>
              <input name="website" tabIndex={-1} autoComplete="off" className="form-honeypot" aria-hidden="true" />
              {status === 'error' && <p className="appt__err" role="alert">{error}</p>}
              <button type="submit" disabled={status === 'sending'}>{status === 'sending' ? t.sending : t.submit}</button>
            </form>
          )}
          <div className="appt__call">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" /></svg>
            <div>
              <p><strong>{t.call} <a href={`tel:${DEMO_CALL_NUMBER.replace(/\s/g, '')}`} dir="ltr">{DEMO_CALL_NUMBER}</a></strong></p>
              <small>{t.sub}</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
