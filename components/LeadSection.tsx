'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { Locale } from '@/lib/site-config';
import { services } from '@/lib/data';
import { services as servicesAr } from '@/lib/data-ar';
import { servicePages } from '@/lib/service-pages';

const copy = {
  en: {
    eyebrow: 'Free consultation',
    heading: 'Get Your Free Consultation',
    name: 'Your Name', email: 'Email', mobile: 'Mobile No', visa: 'Select Visa',
    namePh: 'Your Name', emailPh: 'Email', mobilePh: '+971 50 123 4567', choose: 'Select Visa', other: 'Other / Not sure',
    submit: 'Get Free Consultation', sending: 'Sending…',
    privacy: 'We don’t share your details with anyone. By submitting you agree we may use them to respond to your enquiry.',
    success: 'Thank you. We have your details and will contact you shortly.', again: 'Send another request',
    error: 'We could not send your request. Please try again.',
    coverTitle: 'Visa & Immigration', coverSub: 'All in one place', coverPoints: ['Skilled & permanent residence', 'Study, work & family visas', 'Investment & citizenship'],
    messagePrefix: 'Free consultation request. Visa of interest:',
  },
  ar: {
    eyebrow: 'استشارة مجانية',
    heading: 'احصل على استشارتك المجانية',
    name: 'الاسم', email: 'البريد الإلكتروني', mobile: 'رقم الجوال',  visa: 'اختر التأشيرة',
    namePh: 'الاسم', emailPh: 'البريد الإلكتروني', mobilePh: '+971 50 123 4567', choose: 'اختر التأشيرة', other: 'أخرى / لست متأكداً',
    submit: 'احصل على استشارة مجانية', sending: 'جارٍ الإرسال…',
    privacy: 'لا نشارك بياناتك مع أي جهة. بإرسال النموذج توافق على استخدامها للرد على استفسارك.',
    success: 'شكراً. وصلتنا بياناتك وسنتواصل معك قريباً.', again: 'إرسال طلب آخر',
    error: 'تعذر إرسال طلبك. حاول مرة أخرى.',
    coverTitle: 'التأشيرات والهجرة', coverSub: 'كل شيء في مكان واحد', coverPoints: ['الإقامة الدائمة والعمالة الماهرة', 'الدراسة والعمل والأسرة', 'الاستثمار والجنسية'],
    messagePrefix: 'طلب استشارة مجانية. التأشيرة المطلوبة:',
  },
} as const;

export default function LeadSection({ lang = 'en' }: { lang?: Locale }) {
  const t = copy[lang];
  const options = lang === 'ar'
    ? servicesAr.map((s) => ({ value: s.title, label: s.title }))
    : [...services, ...servicePages].map((s) => ({ value: s.title, label: s.title }));
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const startedAt = useRef(0);

  useEffect(() => { startedAt.current = Date.now(); }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    setError('');
    const form = event.currentTarget;
    const values = new FormData(form);
    const visa = String(values.get('visa') || t.other);
    const payload = {
      source: 'contact_form',
      locale: lang,
      firstName: values.get('name'),
      email: values.get('email'),
      phone: values.get('mobile'),
      preferredChannel: 'phone',
      service: visa,
      message: `${t.messagePrefix} ${visa}`,
      consent: true,
      website: values.get('website'),
      startedAt: startedAt.current,
    };
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || (Object.values(result.fieldErrors || {})[0] as string) || t.error);
      setStatus('success');
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : t.error);
      setStatus('error');
    }
  }

  return (
    <section className="lead">
      <div className="container">
        <div className="lead__grid">
          <div className="lead__visual" aria-hidden="true">
            <div className="lead__book">
              <span className="lead__spine" />
              <div className="lead__cover">
                <Image src="/assets/logo-light-220.png" alt="" width={220} height={122} className="lead__logo" />
                <h3>{t.coverTitle}</h3>
                <p>{t.coverSub}</p>
                <ul>{t.coverPoints.map((point) => <li key={point}>{point}</li>)}</ul>
              </div>
            </div>
          </div>

          <div className="lead__card">
            <p className="lead__eyebrow">{t.eyebrow}</p>
            <h2>{t.heading}</h2>
            {status === 'success' ? (
              <div className="lead__success" role="status">
                <p>{t.success}</p>
                <button type="button" className="lead__submit" onClick={() => { setStatus('idle'); startedAt.current = Date.now(); }}>{t.again}</button>
              </div>
            ) : (
              <form onSubmit={submit}>
                <div className="lead__field">
                  <label htmlFor="lead-name">{t.name}</label>
                  <input id="lead-name" name="name" required minLength={2} maxLength={80} autoComplete="name" placeholder={t.namePh} />
                </div>
                <div className="lead__field">
                  <label htmlFor="lead-email">{t.email}</label>
                  <input id="lead-email" name="email" type="email" required autoComplete="email" placeholder={t.emailPh} />
                </div>
                <div className="lead__field">
                  <label htmlFor="lead-mobile">{t.mobile}</label>
                  <input id="lead-mobile" name="mobile" type="tel" inputMode="tel" required autoComplete="tel" dir="ltr" placeholder={t.mobilePh} />
                </div>
                <div className="lead__field">
                  <label htmlFor="lead-visa">{t.visa}</label>
                  <select id="lead-visa" name="visa" required defaultValue="">
                    <option value="" disabled>{t.choose}</option>
                    {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                    <option value={t.other}>{t.other}</option>
                  </select>
                </div>
                <input name="website" tabIndex={-1} autoComplete="off" className="form-honeypot" aria-hidden="true" />
                {error && <p className="lead__error" role="alert">{error}</p>}
                <button type="submit" className="lead__submit" disabled={status === 'sending'}>{status === 'sending' ? t.sending : t.submit}</button>
                <p className="lead__privacy">{t.privacy}</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
