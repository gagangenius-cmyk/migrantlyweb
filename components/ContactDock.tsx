'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { ChatIcon, CloseIcon, EmailIcon, WhatsAppIcon } from './Icons';
import { buildEmailUrl, buildWhatsAppUrl, localeCopy, localizedPath, type Locale } from '@/lib/site-config';

type Status = 'idle' | 'sending' | 'success' | 'error';
const serviceOptions = ['skilled-visas', 'business-immigration', 'family-visas', 'study-visas', 'citizenship', 'visit-visas'];
const destinations = ['canada', 'australia', 'united-kingdom', 'united-states', 'european-union', 'portugal'];

const copy = {
  en: {
    title: 'How can we help?', welcome: 'I can help you find the right information or send a consultation request. I do not assess eligibility or provide legal advice.',
    intent: 'Choose a starting point', intents: ['Explore services', 'Find a program', 'Book a consultation', 'Existing enquiry'],
    service: 'Which service interests you?', destination: 'Which destination interests you?', details: 'Your contact details',
    name: 'First name', email: 'Email', phone: 'Phone (international format)', channel: 'Preferred contact', notes: 'Anything else we should know?',
    consent: 'I agree that Migrantly may use these details to respond to my enquiry.', send: 'Send enquiry', sending: 'Sending…',
    success: 'Thank you. Your enquiry was sent to the team.', error: 'We could not send your enquiry. Please try again.',
    back: 'Back', restart: 'Restart', close: 'Close chat', skip: 'Not sure yet', related: 'Related information',
  },
  ar: {
    title: 'كيف يمكننا مساعدتك؟', welcome: 'يمكنني مساعدتك في العثور على المعلومات المناسبة أو إرسال طلب استشارة. لا أقيّم الأهلية ولا أقدم مشورة قانونية.',
    intent: 'اختر نقطة البداية', intents: ['استكشاف الخدمات', 'البحث عن برنامج', 'حجز استشارة', 'متابعة استفسار سابق'],
    service: 'ما الخدمة التي تهمك؟', destination: 'ما الوجهة التي تهمك؟', details: 'بيانات التواصل',
    name: 'الاسم الأول', email: 'البريد الإلكتروني', phone: 'الهاتف بالصيغة الدولية', channel: 'وسيلة التواصل المفضلة', notes: 'هل هناك معلومات أخرى؟',
    consent: 'أوافق على استخدام ميجرانتلي لهذه البيانات للرد على استفساري.', send: 'إرسال الطلب', sending: 'جارٍ الإرسال…',
    success: 'شكراً. تم إرسال طلبك إلى الفريق.', error: 'تعذر إرسال الطلب. يرجى المحاولة مرة أخرى.',
    back: 'رجوع', restart: 'البدء من جديد', close: 'إغلاق الدردشة', skip: 'لست متأكداً', related: 'معلومات ذات صلة',
  },
};

const labels = {
  en: { 'skilled-visas': 'Skilled visas', 'business-immigration': 'Business immigration', 'family-visas': 'Family visas', 'study-visas': 'Study visas', citizenship: 'Citizenship', 'visit-visas': 'Visit visas', canada: 'Canada', australia: 'Australia', 'united-kingdom': 'United Kingdom', 'united-states': 'United States', 'european-union': 'European Union', portugal: 'Portugal' },
  ar: { 'skilled-visas': 'تأشيرات العمالة الماهرة', 'business-immigration': 'هجرة الأعمال', 'family-visas': 'تأشيرات الأسرة', 'study-visas': 'تأشيرات الدراسة', citizenship: 'الجنسية', 'visit-visas': 'تأشيرات الزيارة', canada: 'كندا', australia: 'أستراليا', 'united-kingdom': 'المملكة المتحدة', 'united-states': 'الولايات المتحدة', 'european-union': 'الاتحاد الأوروبي', portugal: 'البرتغال' },
} as const;

export default function ContactDock({ lang }: { lang: Locale }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [intent, setIntent] = useState('');
  const [service, setService] = useState('');
  const [destination, setDestination] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const startedAt = useRef(0);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const t = copy[lang];
  const dock = localeCopy[lang];
  const whatsappUrl = buildWhatsAppUrl(lang);
  const emailUrl = buildEmailUrl(lang);

  const close = () => { setOpen(false); requestAnimationFrame(() => triggerRef.current?.focus()); };
  const restart = () => { setStep(0); setIntent(''); setService(''); setDestination(''); setStatus('idle'); setError(''); startedAt.current = Date.now(); };

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog?.querySelector<HTMLElement>('button, input, select, textarea, a[href]')?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key !== 'Tab' || !dialog) return;
      const items = Array.from(dialog.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href]'));
      if (!items.length) return;
      if (event.shiftKey && document.activeElement === items[0]) { event.preventDefault(); items[items.length - 1].focus(); }
      if (!event.shiftKey && document.activeElement === items[items.length - 1]) { event.preventDefault(); items[0].focus(); }
    };
    document.addEventListener('keydown', keydown);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', keydown); };
  }, [open]);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus('sending'); setError('');
    const form = new FormData(event.currentTarget);
    const message = [intent, service && `${lang === 'ar' ? 'الخدمة' : 'Service'}: ${labels[lang][service as keyof typeof labels.en]}`, destination && `${lang === 'ar' ? 'الوجهة' : 'Destination'}: ${labels[lang][destination as keyof typeof labels.en]}`, String(form.get('message') || '')].filter(Boolean).join('\n');
    const payload = { source: 'chat_assistant', locale: lang, firstName: form.get('firstName'), email: form.get('email'), phone: form.get('phone'), preferredChannel: form.get('preferredChannel'), service, destination, message, consent: form.get('consent') === 'on', website: form.get('website'), startedAt: startedAt.current };
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || Object.values(result.fieldErrors || {})[0] || t.error);
      setStatus('success');
    } catch (submissionError) { setError(submissionError instanceof Error ? submissionError.message : t.error); setStatus('error'); }
  }

  return (
    <>
      <aside className="contact-dock" aria-label={lang === 'ar' ? 'خيارات التواصل' : 'Contact options'}>
        {whatsappUrl && <a className="contact-dock__action contact-dock__action--whatsapp" href={whatsappUrl} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /><span>{dock.whatsapp}</span></a>}
        {emailUrl && <a className="contact-dock__action" href={emailUrl}><EmailIcon /><span>{dock.email}</span></a>}
        <button ref={triggerRef} className="contact-dock__action" type="button" aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen(true)}><ChatIcon /><span>{dock.chat}</span></button>
      </aside>
      {open && (
        <div className="chat-layer" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
          <div ref={dialogRef} className="chat-panel" role="dialog" aria-modal="true" aria-labelledby="chat-title">
            <header className="chat-header"><div><p className="chat-eyebrow">Migrantly</p><h2 id="chat-title">{t.title}</h2></div><button type="button" className="chat-close" onClick={close} aria-label={t.close}><CloseIcon /></button></header>
            <div className="chat-body" aria-live="polite">
              {status === 'success' ? <div className="chat-result"><ChatIcon /><p>{t.success}</p><button type="button" className="btn btn-dark" onClick={restart}>{t.restart}</button></div> : (
                <>
                  <p className="chat-disclaimer">{t.welcome}</p>
                  {step === 0 && <div className="chat-step"><h3>{t.intent}</h3><div className="chat-options">{t.intents.map((item) => <button type="button" key={item} onClick={() => { setIntent(item); setStep(item === t.intents[3] ? 3 : 1); }}>{item}</button>)}</div></div>}
                  {step === 1 && <div className="chat-step"><h3>{t.service}</h3><div className="chat-options">{serviceOptions.map((item) => <button type="button" key={item} onClick={() => { setService(item); setStep(2); }}>{labels[lang][item as keyof typeof labels.en]}</button>)}<button type="button" onClick={() => setStep(2)}>{t.skip}</button></div></div>}
                  {step === 2 && <div className="chat-step"><h3>{t.destination}</h3><div className="chat-options">{destinations.map((item) => <button type="button" key={item} onClick={() => { setDestination(item); setStep(3); }}>{labels[lang][item as keyof typeof labels.en]}</button>)}<button type="button" onClick={() => setStep(3)}>{t.skip}</button></div></div>}
                  {step === 3 && <form className="chat-form" onSubmit={submit}>
                    <h3>{t.details}</h3>
                    <label>{t.name}<input name="firstName" required minLength={2} autoComplete="given-name" /></label>
                    <label>{t.channel}<select name="preferredChannel" defaultValue="email"><option value="email">{dock.email}</option><option value="whatsapp">{dock.whatsapp}</option><option value="phone">{lang === 'ar' ? 'الهاتف' : 'Phone'}</option></select></label>
                    <label>{t.email}<input name="email" type="email" autoComplete="email" /></label>
                    <label>{t.phone}<input name="phone" type="tel" inputMode="tel" autoComplete="tel" /></label>
                    <label>{t.notes}<textarea name="message" rows={3} /></label>
                    <input name="website" tabIndex={-1} autoComplete="off" className="form-honeypot" aria-hidden="true" />
                    <label className="chat-consent"><input name="consent" type="checkbox" required /> <span>{t.consent}</span></label>
                    {service && <p className="chat-related">{t.related}: <Link href={localizedPath(lang, `/services/${service}`)} onClick={close}>{labels[lang][service as keyof typeof labels.en]}</Link></p>}
                    {destination && <p className="chat-related"><Link href={localizedPath(lang, `/countries/${destination}`)} onClick={close}>{labels[lang][destination as keyof typeof labels.en]}</Link></p>}
                    {error && <p className="form-error" role="alert">{error}</p>}
                    <button className="btn btn-dark" type="submit" disabled={status === 'sending'}>{status === 'sending' ? t.sending : t.send}</button>
                  </form>}
                </>
              )}
            </div>
            {status !== 'success' && step > 0 && <footer className="chat-footer"><button type="button" onClick={() => setStep((current) => Math.max(0, current - 1))}>{t.back}</button><button type="button" onClick={restart}>{t.restart}</button>{whatsappUrl && <a href={buildWhatsAppUrl(lang, [intent, service, destination].filter(Boolean).join(' — ')) || whatsappUrl} target="_blank" rel="noopener noreferrer">{dock.whatsapp}</a>}</footer>}
          </div>
        </div>
      )}
    </>
  );
}
