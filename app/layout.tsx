import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { Inter, Noto_Kufi_Arabic } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactDock from '@/components/ContactDock';
import { siteConfig, type Locale } from '@/lib/site-config';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const kufi = Noto_Kufi_Arabic({ subsets: ['arabic'], variable: '--font-kufi', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: 'Migrantly — Immigration & Residency Guidance', template: '%s | Migrantly' },
  description: 'Clear immigration pathway information and personal consultation support for individuals and families.',
  openGraph: { type: 'website', siteName: 'Migrantly' },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const requestHeaders = await headers();
  const locale: Locale = requestHeaders.get('x-site-locale') === 'ar' ? 'ar' : 'en';
  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} className={`${inter.variable} ${kufi.variable}`} suppressHydrationWarning>
      <head>
        {/* Apply the saved theme before first paint so there is no light flash in dark mode. Defaults to light. */}
        <script dangerouslySetInnerHTML={{ __html: "try{document.documentElement.dataset.theme=localStorage.getItem('theme')==='dark'?'dark':'light'}catch(e){document.documentElement.dataset.theme='light'}" }} />
      </head>
      <body>
        <a className="skip-link" href="#main-content">{locale === 'ar' ? 'انتقل إلى المحتوى' : 'Skip to content'}</a>
        <Header lang={locale} />
        <main id="main-content">{children}</main>
        <Footer lang={locale} />
        <ContactDock lang={locale} />
      </body>
    </html>
  );
}
