'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from './Icons';
import type { Locale } from '@/lib/site-config';

const copy = {
  en: {
    eyebrow: 'Free consultation',
    heading: 'Book your consultation with a migration expert',
    intro: 'Tell us a little about your plans and we will get back to you with clear next steps.',
    points: ['Eligibility review for your profile', 'Honest guidance on the best visa route', 'Clear timelines, costs and documents', 'No obligation, no pressure'],
    reply: 'We usually reply within 24 hours.',
    title: 'Request a call back',
    name: 'Full name',
    email: 'Email',
    mobile: 'Mobile number',
    mobileHint: 'Include country code, e.g. +971 50 123 4567',
    message: 'Message',
    placeholder: 'Tell us your destination and goals…',
    consent: 'I agree that Migrantly may use these details only to respond to this enquiry.',
    submit: 'Book consultation',
    sending: 'Sending…',
    success: 'Thank you. Your request has been sent. We will contact you shortly.',
    done: 'Close',
    unavailable: 'We could not send your request. Please try again.',
    close: 'Close',
  },
  ar: {
    eyebrow: 'استشارة مجانية',
    heading: 'احجز استشارتك مع خبير هجرة',
    intro: 'أخبرنا قليلاً عن خططك وسنعود إليك بخطوات واضحة.',
    points: ['مراجعة أهليتك بحسب ملفك', 'إرشاد صادق لأفضل مسار للتأشيرة', 'جداول زمنية وتكاليف ومستندات واضحة', 'بدون التزام وبدون ضغط'],
    reply: 'نرد عادةً خلال 24 ساعة.',
    title: 'اطلب مكالمة',
    name: 'الاسم الكامل',
    email: 'البريد الإلكتروني',
    mobile: 'رقم الجوال',
    mobileHint: 'أضف رمز الدولة، مثال: ‎+971 50 123 4567',
    message: 'الرسالة',
    placeholder: 'أخبرنا بوجهتك وأهدافك…',
    consent: 'أوافق على استخدام ميجرانتلي لهذه البيانات فقط للرد على هذا الاستفسار.',
    submit: 'احجز الاستشارة',
    sending: 'جارٍ الإرسال…',
    success: 'شكراً. تم إرسال طلبك وسنتواصل معك قريباً.',
    done: 'إغلاق',
    unavailable: 'تعذر إرسال طلبك. حاول مرة أخرى.',
    close: 'إغلاق',
  },
} as const;

export default function BookingModal({ open, onClose, lang }: { open: boolean; onClose: () => void; lang: Locale }) {
  const t = copy[lang];
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const panelRef = useRef<HTMLDivElement>(null);
  const startedAt = useRef(0);

  useEffect(() => {
    if (!open) return;
    startedAt.current = Date.now();
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    panelRef.current?.querySelector<HTMLElement>('input')?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { onClose(); return; }
      if (event.key !== 'Tab' || !panelRef.current) return;
      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>('button, a[href], input, textarea, select')).filter((el) => !el.hasAttribute('disabled') && el.tabIndex !== -1);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      previousFocus?.focus?.();
    };
  }, [open, onClose]);

  if (!open || typeof document === 'undefined') return null;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    setError('');
    const form = event.currentTarget;
    const values = new FormData(form);
    const payload = {
      source: 'contact_form',
      locale: lang,
      firstName: values.get('name'),
      email: values.get('email'),
      phone: values.get('mobile'),
      preferredChannel: 'email',
      service: 'consultation',
      message: values.get('message'),
      consent: values.get('consent') === 'on',
      website: values.get('website'),
      startedAt: startedAt.current,
    };
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || (Object.values(result.fieldErrors || {})[0] as string) || t.unavailable);
      setStatus('success');
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : t.unavailable);
      setStatus('error');
    }
  }

  return createPortal(
    <div className="booking-overlay" dir={lang === 'ar' ? 'rtl' : 'ltr'} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div ref={panelRef} className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title">
        <button type="button" className="booking-close" onClick={onClose} aria-label={t.close}><CloseIcon /></button>

        <aside className="booking-aside">
          <span className="booking-aside__eyebrow">{t.eyebrow}</span>
          <h2 className="booking-aside__title" id="booking-title">{t.heading}</h2>
          <p className="booking-aside__intro">{t.intro}</p>
          <ul className="booking-aside__points">
            {t.points.map((point) => (
              <li key={point}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <p className="booking-aside__reply">{t.reply}</p>
        </aside>

        <div className="booking-form-wrap">
          {status === 'success' ? (
            <div className="booking-success" role="status">
              <span className="booking-success__icon" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
              </span>
              <p>{t.success}</p>
              <button type="button" className="booking-submit" onClick={onClose}>{t.done}</button>
            </div>
          ) : (
            <form className="booking-form" onSubmit={submit}>
              <h3 className="booking-form__title">{t.title}</h3>
              <div className="booking-field">
                <label htmlFor="bk-name">{t.name}</label>
                <input id="bk-name" name="name" required minLength={2} maxLength={80} autoComplete="name" />
              </div>
              <div className="booking-field">
                <label htmlFor="bk-email">{t.email}</label>
                <input id="bk-email" name="email" type="email" required autoComplete="email" />
              </div>
              <div className="booking-field">
                <label htmlFor="bk-mobile">{t.mobile}</label>
                <input id="bk-mobile" name="mobile" type="tel" inputMode="tel" required autoComplete="tel" dir="ltr" placeholder="+971 50 123 4567" aria-describedby="bk-mobile-hint" />
                <small id="bk-mobile-hint">{t.mobileHint}</small>
              </div>
              <div className="booking-field">
                <label htmlFor="bk-message">{t.message}</label>
                <textarea id="bk-message" name="message" rows={3} required placeholder={t.placeholder} />
              </div>
              <input name="website" tabIndex={-1} autoComplete="off" className="form-honeypot" aria-hidden="true" />
              <label className="booking-consent"><input name="consent" type="checkbox" required /><span>{t.consent}</span></label>
              {error && <p className="booking-error" role="alert">{error}</p>}
              <button type="submit" className="booking-submit" disabled={status === 'sending'}>{status === 'sending' ? t.sending : t.submit}</button>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
