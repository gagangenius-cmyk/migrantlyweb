import { describe, expect, it } from 'vitest';
import { alternateLocalePath, buildEmailUrl, localizedPath } from '../lib/site-config';

describe('localized navigation', () => {
  it('adds and removes only one Arabic prefix', () => {
    expect(localizedPath('ar', '/contact')).toBe('/ar/contact');
    expect(alternateLocalePath('/contact', 'ar')).toBe('/ar/contact');
    expect(alternateLocalePath('/ar/contact', 'en')).toBe('/contact');
    expect(alternateLocalePath('/ar/contact', 'ar')).toBe('/ar/contact');
    expect(alternateLocalePath('/', 'ar')).toBe('/ar');
    expect(alternateLocalePath('/ar', 'en')).toBe('/');
    expect(alternateLocalePath('/programs?destination=canada', 'ar')).toBe('/ar/programs');
  });
  it('builds a public email link', () => expect(buildEmailUrl('en')).toContain('mailto:info@migrantly.com'));
});
