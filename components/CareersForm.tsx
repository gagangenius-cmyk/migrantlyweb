'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';

export default function CareersForm() {
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
    const payload = {
      source: 'contact_form', locale: 'en', firstName: v.get('name'), email: v.get('email'), phone: v.get('mobile'),
      preferredChannel: 'email', service: 'careers',
      message: `Careers application. Role of interest: ${v.get('role')}. Profile / CV link: ${v.get('link') || 'not provided'}. ${v.get('message') || ''}`,
      consent: true, website: v.get('website'), startedAt: startedAt.current,
    };
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || (Object.values(data.fieldErrors || {})[0] as string) || 'We could not send your application. Please try again.');
      setStatus('success');
      form.reset();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'We could not send your application.');
      setStatus('error');
    }
  }

  if (status === 'success') return <div className="lead__card"><h2>Thank you</h2><p className="lead__success">We have received your details and will be in touch if there is a suitable role.</p></div>;

  return (
    <form className="lead__card careers-form" onSubmit={submit}>
      <p className="lead__eyebrow">General application</p>
      <h2>Tell us about yourself</h2>
      <div className="lead__field"><label htmlFor="cr-name">Full name</label><input id="cr-name" name="name" required minLength={2} autoComplete="name" /></div>
      <div className="lead__field"><label htmlFor="cr-email">Email</label><input id="cr-email" name="email" type="email" required autoComplete="email" /></div>
      <div className="lead__field"><label htmlFor="cr-mobile">Mobile number</label><input id="cr-mobile" name="mobile" type="tel" required dir="ltr" placeholder="+971 50 123 4567" /></div>
      <div className="lead__field"><label htmlFor="cr-role">Role you are interested in</label>
        <select id="cr-role" name="role" required defaultValue="">
          <option value="" disabled>Select a role</option>
          <option>Immigration consultant</option><option>Case officer / documentation</option><option>Client relations</option><option>Marketing and content</option><option>Language coach</option><option>Other</option>
        </select></div>
      <div className="lead__field"><label htmlFor="cr-link">CV or LinkedIn link (optional)</label><input id="cr-link" name="link" type="url" placeholder="https://" /></div>
      <div className="lead__field"><label htmlFor="cr-msg">Anything else (optional)</label><input id="cr-msg" name="message" /></div>
      <input name="website" tabIndex={-1} autoComplete="off" className="form-honeypot" aria-hidden="true" />
      {error && <p className="lead__error" role="alert">{error}</p>}
      <button type="submit" className="lead__submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Submit application'}</button>
      <p className="lead__privacy">We use your details only to consider your application.</p>
    </form>
  );
}
