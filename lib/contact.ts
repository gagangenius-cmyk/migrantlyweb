import type { Locale } from './site-config';

export type ContactSource = 'contact_form' | 'chat_assistant';
export type PreferredChannel = 'email' | 'whatsapp' | 'phone';
export interface ContactRequest { source: ContactSource; locale: Locale; firstName: string; lastName?: string; email?: string; phone?: string; preferredChannel: PreferredChannel; service?: string; destination?: string; message?: string; consent: true; website?: string; startedAt: number; }
export type ContactFieldErrors = Partial<Record<keyof ContactRequest, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[1-9]\d{7,14}$/;
const clean = (value: unknown, max: number) => typeof value === 'string' ? value.trim().replace(/\s+/g, ' ').slice(0, max) : '';

export function validateContactRequest(input: unknown): { data?: ContactRequest; fieldErrors: ContactFieldErrors } {
  const value = input && typeof input === 'object' ? input as Record<string, unknown> : {};
  const data = { source: value.source, locale: value.locale, firstName: clean(value.firstName, 80), lastName: clean(value.lastName, 80) || undefined, email: clean(value.email, 160).toLowerCase() || undefined, phone: clean(value.phone, 30).replace(/[\s()-]/g, '') || undefined, preferredChannel: value.preferredChannel, service: clean(value.service, 100) || undefined, destination: clean(value.destination, 100) || undefined, message: clean(value.message, 2500) || undefined, consent: value.consent, website: clean(value.website, 120) || undefined, startedAt: value.startedAt };
  const fieldErrors: ContactFieldErrors = {};
  if (data.source !== 'contact_form' && data.source !== 'chat_assistant') fieldErrors.source = 'Invalid source.';
  if (data.locale !== 'en' && data.locale !== 'ar') fieldErrors.locale = 'Invalid locale.';
  if (data.firstName.length < 2) fieldErrors.firstName = 'Please enter your name.';
  if (data.email && !emailPattern.test(data.email)) fieldErrors.email = 'Enter a valid email address.';
  if (data.phone && !phonePattern.test(data.phone)) fieldErrors.phone = 'Use an international phone number.';
  if (data.preferredChannel === 'email' && !data.email) fieldErrors.email = 'Email is required for email contact.';
  if ((data.preferredChannel === 'phone' || data.preferredChannel === 'whatsapp') && !data.phone) fieldErrors.phone = 'A phone number is required for this contact method.';
  if (!['email', 'whatsapp', 'phone'].includes(String(data.preferredChannel))) fieldErrors.preferredChannel = 'Choose a contact method.';
  if (!data.message && data.source === 'contact_form') fieldErrors.message = 'Tell us briefly how we can help.';
  if (data.consent !== true) fieldErrors.consent = 'Consent is required.';
  if (typeof data.startedAt !== 'number' || !Number.isFinite(data.startedAt)) fieldErrors.startedAt = 'Invalid form session.';
  return Object.keys(fieldErrors).length ? { fieldErrors } : { data: data as ContactRequest, fieldErrors };
}

export function escapeHtml(value: string | undefined) {
  return (value || '').replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character] || character);
}
