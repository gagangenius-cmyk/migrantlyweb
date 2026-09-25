import { describe, expect, it } from 'vitest';
import { validateContactRequest } from '../lib/contact';

const valid = { source: 'contact_form', locale: 'en', firstName: 'Sam', email: 'sam@example.com', preferredChannel: 'email', message: 'Please contact me.', consent: true, startedAt: Date.now() - 5000 };

describe('contact validation', () => {
  it('accepts a valid email enquiry', () => expect(validateContactRequest(valid).data?.email).toBe('sam@example.com'));
  it('requires consent', () => expect(validateContactRequest({ ...valid, consent: false }).fieldErrors.consent).toBeTruthy());
  it('requires a phone for WhatsApp', () => expect(validateContactRequest({ ...valid, preferredChannel: 'whatsapp', phone: '' }).fieldErrors.phone).toBeTruthy());
  it('normalizes an international phone', () => expect(validateContactRequest({ ...valid, preferredChannel: 'phone', phone: '+971 50 123 4567' }).data?.phone).toBe('+971501234567'));
});
