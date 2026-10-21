'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useRef, useState } from 'react';
import type { Locale } from '@/lib/site-config';

interface Msg { role: 'user' | 'bot'; text: string; sources?: { title: string; url: string }[] }

const copy = {
  en: { open: 'Ask Migrantly', title: 'Migrantly Assistant', hello: 'Hi! Ask me anything about visas, countries, programs or our services. I answer from the information on this website.', placeholder: 'Ask about Canada, Australia, UK…', send: 'Send', close: 'Close chat', sources: 'Related pages', thinking: 'Thinking…', error: 'Sorry, something went wrong. Please try again.', hints: ['What is Express Entry?', 'Documents for a tourist visa', 'Australia points test'], note: 'General information only, not legal advice.' },
  ar: { open: 'اسأل ميجرانتلي', title: 'مساعد ميجرانتلي', hello: 'مرحباً! اسألني عن التأشيرات والدول والبرامج وخدماتنا. أجيب من المعلومات الموجودة في هذا الموقع.', placeholder: 'اسأل عن كندا أو أستراليا…', send: 'إرسال', close: 'إغلاق', sources: 'صفحات ذات صلة', thinking: 'جارٍ التفكير…', error: 'عذراً، حدث خطأ. حاول مرة أخرى.', hints: ['ما هو الدخول السريع؟', 'مستندات تأشيرة السياحة', 'اختبار نقاط أستراليا'], note: 'معلومات عامة وليست مشورة قانونية.' },
} as const;

export default function SiteChatbot({ lang = 'en' }: { lang?: Locale }) {
  const t = copy[lang];
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState<Msg[]>([{ role: 'bot', text: t.hello }]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, open]);

  async function ask(text: string) {
    const question = text.trim();
    if (!question || busy) return;
    setMsgs((m) => [...m, { role: 'user', text: question }]);
    setInput('');
    setBusy(true);
    try {
      const res = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: question }) });
      const data = await res.json();
      setMsgs((m) => [...m, { role: 'bot', text: data.answer || t.error, sources: data.sources }]);
    } catch {
      setMsgs((m) => [...m, { role: 'bot', text: t.error }]);
    } finally { setBusy(false); }
  }

  const submit = (e: FormEvent) => { e.preventDefault(); void ask(input); };

  if (!open) {
    return (
      <button type="button" className="bot-fab" onClick={() => setOpen(true)} aria-label={t.open}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" /><path d="M9 10h.01M12 10h.01M15 10h.01" /></svg>
        <span>{t.open}</span>
      </button>
    );
  }

  return (
    <div className="bot" role="dialog" aria-label={t.title}>
      <div className="bot__head">
        <strong>{t.title}</strong>
        <button type="button" onClick={() => setOpen(false)} aria-label={t.close}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      </div>
      <div className="bot__body" aria-live="polite">
        {msgs.map((m, i) => (
          <div key={i} className={`bot__msg bot__msg--${m.role}`}>
            <p>{m.text}</p>
            {m.sources && m.sources.length > 0 && (
              <div className="bot__src">
                <span>{t.sources}</span>
                {m.sources.slice(0, 3).map((s) => <Link key={s.url + s.title} href={s.url}>{s.title}</Link>)}
              </div>
            )}
          </div>
        ))}
        {busy && <div className="bot__msg bot__msg--bot"><p>{t.thinking}</p></div>}
        {msgs.length === 1 && (
          <div className="bot__hints">{t.hints.map((h) => <button key={h} type="button" onClick={() => ask(h)}>{h}</button>)}</div>
        )}
        <div ref={endRef} />
      </div>
      <form className="bot__form" onSubmit={submit}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={t.placeholder} maxLength={500} aria-label={t.placeholder} />
        <button type="submit" disabled={busy || !input.trim()}>{t.send}</button>
      </form>
      <p className="bot__note">{t.note}</p>
    </div>
  );
}
