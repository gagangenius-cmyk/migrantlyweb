import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { ArrowIcon } from '@/components/Icons';

export const metadata = { title: 'من نحن — ميجرانتلي' };

export default function ArAboutPage() {
  return (
    <>
      <PageHero
        label="من نحن"
        title="شريك الهجرة الموثوق"
        description="تعرّف على نهج ميجرانتلي في تقديم معلومات واضحة وسهلة حول خدمات الهجرة."
        breadcrumb={[{ label: 'الرئيسية', href: '/ar' }, { label: 'من نحن' }]}
      />

      <section className="page-content">
        <div className="container">
          <div className="page-content-grid">
            <div className="article-content">
              <h2>من نحن</h2>
              <p>
                تأسست ميجرانتلي لتسهيل الوصول إلى معلومات الهجرة وتنظيمها بصورة واضحة. يساعدك الموقع
                على استكشاف فئات الخدمات والوجهات والبرامج، ثم إرسال استفسارك إلى الفريق.
              </p>

              <h2>نهجنا</h2>
              <p>
                كل عميل فريد. نبدأ باستشارة شاملة لفهم أهدافك والجدول الزمني والظروف. من هناك، نبني استراتيجية
                مخصصة تراعي كل مسار متاح — وليس المسار الواضح فقط. عمليتنا الشفافة خطوة بخطوة تبقيك على
                اطلاع في كل مرحلة، حتى تعرف دائماً أين يقف طلبك وما يليه.
              </p>

              <h2>قيمنا</h2>
              <ul>
                <li><strong>النزاهة</strong> — نتولى فقط القضايا التي نؤمن بها. لا وعود زائفة، لا معدلات نجاح مبالغ فيها.</li>
                <li><strong>الوضوح</strong> — نميّز بين المعلومات العامة والمشورة التي تتطلب مختصاً مؤهلاً.</li>
                <li><strong>الشفافية</strong> — رسوم واضحة، جداول زمنية واضحة، تواصل واضح. بلا مفاجآت.</li>
                <li><strong>الرعاية</strong> — نعامل طلبك كما لو كان لعائلتنا. لأن خلف كل ملف مستقبل شخص.</li>
              </ul>

              <h2>فريقنا</h2>
              <p>يجب التحقق من مؤهلات مقدم الخدمة ونطاق أي خدمة مهنية مباشرةً قبل التعاقد. المعلومات الواردة في هذا الموقع عامة ولا تُعد مشورة قانونية.</p>

              <h2>لماذا تختارنا</h2>
              <ul>
                <li>تنظيم واضح لفئات الخدمات والوجهات</li>
                <li>مسارات مباشرة للوصول إلى الصفحات ذات الصلة</li>
                <li>نموذج استفسار موحد وآمن</li>
                <li>توضيح نطاق المعلومات العامة قبل إرسال الطلب</li>
              </ul>
            </div>

            <aside className="sidebar">
              <p className="sidebar-title">روابط سريعة</p>
              <ul className="sidebar-links">
                <li><Link href="/ar/about" className="sidebar-link active">من نحن</Link></li>
                <li><Link href="/ar/services" className="sidebar-link">الخدمات</Link></li>
                <li><Link href="/ar/countries" className="sidebar-link">الدول</Link></li>
                <li><Link href="/ar/programs" className="sidebar-link">البرامج</Link></li>
                <li><Link href="/ar/news" className="sidebar-link">الأخبار</Link></li>
                <li><Link href="/ar/contact" className="sidebar-link">اتصل بنا</Link></li>
              </ul>
              <Link href="/ar/contact" className="btn btn-dark sidebar-cta">احجز استشارة<ArrowIcon /></Link>
            </aside>
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container">
          <h2>لنبن مستقبلك معاً</h2>
          <p>تواصل معنا لمناقشة أهدافك ومعرفة فئات الخدمات المتاحة.</p>
          <Link href="/ar/contact" className="btn btn-primary">ابدأ الآن<ArrowIcon /></Link>
        </div>
      </section>
    </>
  );
}
