import styles from "./sponsors.module.css";
import CyberCard from "@/components/CyberCard";
import { fetchData } from "@/lib/api";
import Link from "next/link";

export default async function SponsorsPage({ params }) {
  const { locale } = await params;
  const sponsors = await fetchData('/sponsors', locale) || [];

  const tierMeta = {
    gold: { title: locale === 'en' ? "Gold Sponsor" : "الراعي الذهبي", variant: "primary" },
    silver: { title: locale === 'en' ? "Silver Sponsor" : "الراعي الفضي", variant: "secondary" },
    bronze: { title: locale === 'en' ? "Bronze Sponsor" : "الراعي البرونزي", variant: "secondary" },
    partner: { title: locale === 'en' ? "Partner" : "شريك", variant: "secondary" }
  };

  const benefitsByTier = {
    gold: [
      locale === 'en' ? "Naming rights" : "حقوق التسمية",
      locale === 'en' ? "Exhibition booth" : "جناح عرض",
      locale === 'en' ? "Database access" : "الوصول إلى قاعدة البيانات",
      locale === 'en' ? "VIP networking" : "شبكات كبار الشخصيات"
    ],
    silver: [
      locale === 'en' ? "Booth space" : "مساحة جناح",
      locale === 'en' ? "Branding" : "العلامة التجارية",
      locale === 'en' ? "Social media mentions" : "ذكر في وسائل التواصل الاجتماعي"
    ],
    bronze: [
      locale === 'en' ? "Website logo" : "شعار الموقع",
      locale === 'en' ? "Event recognition" : "تقدير في الفعالية"
    ],
    partner: [
      locale === 'en' ? "Strategic collaboration" : "تعاون استراتيجي",
      locale === 'en' ? "Mutual promotion" : "ترويج متبادل"
    ]
  };

  return (
    <div className={styles.container} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <header className={styles.header}>
        <h1 className="glow-text">{locale === 'en' ? 'Sponsorship Tiers' : 'مستويات الرعاية'}</h1>
        <p>{locale === 'en' ? 'Partner with us to support the next generation of cybersecurity talent.' : 'شاركنا لدعم الجيل القادم من مواهب الأمن السيبراني.'}</p>
      </header>

      <div className={styles.grid}>
        {Object.keys(tierMeta).map((tierKey) => {
          const tier = tierMeta[tierKey];
          const tierSponsors = sponsors.filter(s => s.tier === tierKey);
          
          return (
            <CyberCard key={tierKey} title={tier.title} variant={tier.variant}>
              {tierSponsors.length > 0 && (
                <div className={styles.sponsorLogos}>
                  {tierSponsors.map((s, idx) => (
                    <div key={idx} className={styles.sponsorItem}>
                      <span className={styles.sponsorName}>{s.name}</span>
                    </div>
                  ))}
                </div>
              )}
              <ul className={styles.benefitList}>
                {benefitsByTier[tierKey].map((benefit, j) => (
                  <li key={j}>{benefit}</li>
                ))}
              </ul>
              <Link href={`/${locale}/register/sponsor`} className={styles.ctaBtn}>
                {locale === 'en' ? 'Contact for Tier' : 'تواصل بخصوص هذا المستوى'}
              </Link>
            </CyberCard>
          );
        })}
      </div>
    </div>
  );
}
