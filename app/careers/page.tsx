import PageHero from '@/components/PageHero';
import CareersForm from '@/components/CareersForm';
import { siteConfig } from '@/lib/site-config';

const title = 'Careers at Migrantly — Join Our Immigration Team';
const description = 'Join Migrantly and help people move abroad with confidence. Send a general application for immigration consulting, case handling, client relations and more.';

export const metadata = { title, description, alternates: { canonical: '/careers' }, openGraph: { type: 'website' as const, title, description, url: '/careers' } };

const reasons = [
  { t: 'Work that matters', d: 'Every file is someone’s future. You help families and professionals make a life-changing move.' },
  { t: 'Learn from specialists', d: 'Work alongside people who follow rule changes closely and explain them clearly.' },
  { t: 'Honest, ethical practice', d: 'We never promise outcomes no adviser can guarantee, and we expect the same of every colleague.' },
  { t: 'A global, multilingual team', d: 'Serve clients across Canada, Australia, the UK, Europe and the Gulf in English and Arabic.' },
];

export default function CareersPage() {
  return (
    <>
      <PageHero label="Careers" title="Build your career with Migrantly" description="We do not list open roles here yet. Send a general application and we will contact you when a suitable position opens." breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Careers' }]} />
      <section className="page-content">
        <div className="container">
          <div className="careers">
            <div>
              <h2>Why Migrantly</h2>
              <div className="careers__reasons">
                {reasons.map((r) => <div className="pillar__point" key={r.t}><h3>{r.t}</h3><p>{r.d}</p></div>)}
              </div>
              {siteConfig.publicContact.email && <p className="careers__mail">You can also email your CV to <a href={`mailto:${siteConfig.publicContact.email}?subject=Careers`}>{siteConfig.publicContact.email}</a>.</p>}
            </div>
            <CareersForm />
          </div>
        </div>
      </section>
    </>
  );
}
