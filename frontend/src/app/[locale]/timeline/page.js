import styles from "./timeline-page.module.css";
import Timeline from "@/components/Timeline";
import { fetchData } from "@/lib/api";

export default async function TimelinePage({ params }) {
  const { locale } = await params;
  const apiMilestones = await fetchData('/timeline', locale);

  const milestones = apiMilestones && apiMilestones.length > 0 
    ? apiMilestones.map(m => ({
        date: m.date,
        title: m.milestone,
        desc: m.description
      }))
    : [
    { 
      date: "JAN 2026", 
      title: locale === 'en' ? "Team Formation" : "تكوين الفريق", 
      desc: locale === 'en' ? "Core organizers and technical leads assembled to define the competition scope." : "تجميع المنظمين الأساسيين والقادة التقنيين لتحديد نطاق المسابقة." 
    },
    { 
      date: "MAR 2026", 
      title: locale === 'en' ? "Challenge Development" : "تطوير التحديات", 
      desc: locale === 'en' ? "Drafting complex Attack & Defense scenarios and hybrid Escape Room puzzles." : "صياغة سيناريوهات الهجوم والدفاع المعقدة وألغاز غرفة الهروب الهجينة." 
    },
    { 
      date: "MAY 2026", 
      title: locale === 'en' ? "Infrastructure Setup" : "تجهيز البنية التحتية", 
      desc: locale === 'en' ? "Deploying high-fidelity cyber ranges and secure simulation cloud environments." : "نشر النطاقات السيبرانية عالية الدقة وبيئات السحابة الآمنة للمحاكاة." 
    },
    { 
      date: "JUN 2026", 
      title: locale === 'en' ? "Sponsor Partnerships" : "شراكات الرعاة", 
      desc: locale === 'en' ? "Onboarding industry leaders and academic pioneers to support the vision." : "ضم قادة الصناعة ورواد الأكاديمية لدعم الرؤية." 
    },
    { 
      date: "JULY 1, 2026", 
      title: locale === 'en' ? "Event Launch" : "انطلاق الفعالية", 
      desc: locale === 'en' ? "The main Hack & Escape competition kicks off with teams from across the region." : "تنطلق مسابقة هاك أند إسكيب الرئيسية مع فرق من جميع أنحاء المنطقة." 
    }
  ];

  return (
    <div className={styles.container} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <header className={styles.header}>
        <h1 className="glow-text">{locale === 'en' ? 'Roadmap' : 'خارطة الطريق'}</h1>
        <p className={styles.subtitle}>{locale === 'en' ? 'Tracking our progress toward the ultimate cyber simulation.' : 'تتبع تقدمنا نحو المحاكاة السيبرانية القصوى.'}</p>
      </header>

      <Timeline milestones={milestones} locale={locale} />
    </div>
  );
}
