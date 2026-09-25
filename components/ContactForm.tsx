'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { ArrowIcon, EmailIcon, WhatsAppIcon } from './Icons';
import SocialLinks from './SocialLinks';
import { buildEmailUrl, buildWhatsAppUrl, siteConfig, type Locale } from '@/lib/site-config';

const copy = {
  en: { heading: 'Tell us about your plans', intro: 'Share your goals and preferred contact method. We will review your enquiry and respond using the details you provide.', first: 'First name', last: 'Last name', email: 'Email', phone: 'Phone', channel: 'Preferred contact', service: 'Service of interest', choose: 'Select a service', other: 'Other / Not sure', message: 'How can we help?', placeholder: 'Share your destination, goals and any questions…', consent: 'I agree that Migrantly may use these details only to respond to this enquiry.', submit: 'Send enquiry', sending: 'Sending…', success: 'Thank you. Your enquiry has been sent.', again: 'Send another enquiry', unavailable: 'We could not send your enquiry. Please try again or use email.', contactTitle: 'Contact options', contactText: 'Choose the channel that works for you. Immigration outcomes depend on individual circumstances; information on this website is general and is not legal advice.' },
  ar: { heading: 'أخبرنا عن خططك', intro: 'شارك أهدافك ووسيلة التواصل المفضلة. سنراجع استفسارك ونرد باستخدام البيانات التي تقدمها.', first: 'الاسم الأول', last: 'اسم العائلة', email: 'البريد الإلكتروني', phone: 'الهاتف', channel: 'وسيلة التواصل المفضلة', service: 'الخدمة المطلوبة', choose: 'اختر خدمة', other: 'أخرى / لست متأكداً', message: 'كيف يمكننا مساعدتك؟', placeholder: 'شارك الوجهة والأهداف وأي أسئلة لديك…', consent: 'أوافق على استخدام ميجرانتلي لهذه البيانات فقط للرد على هذا الاستفسار.', submit: 'إرسال الطلب', sending: 'جارٍ الإرسال…', success: 'شكراً. تم إرسال استفسارك.', again: 'إرسال استفسار آخر', unavailable: 'تعذر إرسال استفسارك. حاول مرة أخرى أو استخدم البريد الإلكتروني.', contactTitle: 'خيارات التواصل', contactText: 'اختر وسيلة التواصل المناسبة. تعتمد نتائج الهجرة على الظروف الفردية؛ المعلومات الواردة في هذا الموقع عامة وليست مشورة قانونية.' },
};

export default function ContactForm({ lang, services }: { lang: Locale; services: { slug: string; title: string }[] }) {
  const t = copy[lang];
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const startedAt = useRef(0);
  const emailUrl = buildEmailUrl(lang);
  const whatsappUrl = buildWhatsAppUrl(lang);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus('sending'); setMessage('');
    const form = event.currentTarget;
    const values = new FormData(form);
    const payload = { source: 'contact_form', locale: lang, firstName: values.get('firstName'), lastName: values.get('lastName'), email: values.get('email'), phone: values.get('phone'), preferredChannel: values.get('preferredChannel'), service: values.get('service'), message: values.get('message'), consent: values.get('consent') === 'on', website: values.get('website'), startedAt: startedAt.current };
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || Object.values(result.fieldErrors || {})[0] || t.unavailable);
      setStatus('success'); form.reset();
    } catch (error) { setMessage(error instanceof Error ? error.message : t.unavailable); setStatus('error'); }
  }

  return (
    <div className="contact-grid">
      <div>
        <h2 className="contact-form-title">{t.heading}</h2><p className="contact-form-intro">{t.intro}</p>
        {status === 'success' ? <div className="form-success" role="status"><h3>{t.success}</h3><button type="button" className="btn btn-dark" onClick={() => { setStatus('idle'); startedAt.current = Date.now(); }}>{t.again}</button></div> :
          <form className="contact-form" onSubmit={submit}>
            <div className="form-row"><div className="form-field"><label className="form-label" htmlFor="firstName">{t.first}</label><input className="form-input" id="firstName" name="firstName" required autoComplete="given-name" /></div><div className="form-field"><label className="form-label" htmlFor="lastName">{t.last}</label><input className="form-input" id="lastName" name="lastName" autoComplete="family-name" /></div></div>
            <div className="form-row"><div className="form-field"><label className="form-label" htmlFor="email">{t.email}</label><input className="form-input" id="email" name="email" type="email" required autoComplete="email" /></div><div className="form-field"><label className="form-label" htmlFor="phone">{t.phone}</label><input className="form-input" id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" /></div></div>
            <div className="form-field"><label className="form-label" htmlFor="preferredChannel">{t.channel}</label><select className="form-select" id="preferredChannel" name="preferredChannel" defaultValue="email"><option value="email">{t.email}</option><option value="whatsapp">WhatsApp</option><option value="phone">{t.phone}</option></select></div>
            <div className="form-field"><label className="form-label" htmlFor="service">{t.service}</label><select className="form-select" id="service" name="service" defaultValue=""><option value="">{t.choose}</option>{services.map((service) => <option key={service.slug} value={service.slug}>{service.title}</option>)}<option value="other">{t.other}</option></select></div>
            <div className="form-field"><label className="form-label" htmlFor="message">{t.message}</label><textarea className="form-textarea" id="message" name="message" placeholder={t.placeholder} required /></div>
            <input name="website" tabIndex={-1} autoComplete="off" className="form-honeypot" aria-hidden="true" />
            <label className="form-consent"><input name="consent" type="checkbox" required /><span>{t.consent}</span></label>
            {message && <p className="form-error" role="alert">{message}</p>}
            <button type="submit" className="btn btn-dark" disabled={status === 'sending'}>{status === 'sending' ? t.sending : t.submit}<ArrowIcon /></button>
          </form>}
      </div>
      <aside className="contact-info"><h2 className="contact-info-title">{t.contactTitle}</h2><p className="contact-info-copy">{t.contactText}</p><div className="contact-methods">{emailUrl && <a href={emailUrl}><EmailIcon /><span>{siteConfig.publicContact.email}</span></a>}{whatsappUrl && <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /><span>WhatsApp</span></a>}</div><SocialLinks lang={lang} className="contact-socials" /></aside>
    </div>
  );
}
