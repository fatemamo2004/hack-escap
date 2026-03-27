import styles from "./team.module.css";
import CyberCard from "@/components/CyberCard";
import { fetchData } from "@/lib/api";

export default async function TeamPage({ params }) {
  const { locale } = await params;
  const team = await fetchData('team', locale);

  const t = {
    en: { title: "The Brains Behind", subtitle: "Jordan Cyber Club & Volunteers" },
    ar: { title: "العقول المدبرة", subtitle: "نادي الأردن للسيبر والمتطوعين" }
  }[locale] || { title: "The Team", subtitle: "" };

  return (
    <div className={styles.container} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <header className={styles.header}>
        <h1 className="glow-text">{t.title}</h1>
        <p className={styles.subtitle}>{t.subtitle}</p>
      </header>

      <div className={styles.grid}>
        {team && team.length > 0 ? (
          team.map((member) => (
            <CyberCard key={member._id} title={member.name} variant="primary">
              <div className={styles.memberInfo}>
                <div className={styles.imagePlaceholder}>
                  {/* Image component would go here */}
                  <div className={styles.cyberAvatar}></div>
                </div>
                <h3 className={styles.role}>{member.role}</h3>
                <p className={styles.bio}>{member.bio}</p>
                <div className={styles.socials}>
                  {member.socials?.linkedin && <span className={styles.socialIcon}>IN</span>}
                  {member.socials?.twitter && <span className={styles.socialIcon}>TW</span>}
                </div>
              </div>
            </CyberCard>
          ))
        ) : (
          <p className={styles.noData}>{locale === 'en' ? 'No team members found.' : 'لا يوجد أعضاء فريق.'}</p>
        )}
      </div>
    </div>
  );
}
