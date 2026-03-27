import styles from "./media.module.css";
import CyberCard from "@/components/CyberCard";
import { fetchData } from "@/lib/api";

export default async function MediaPage({ params }) {
  const { locale } = await params;
  const articles = await fetchData('media', locale);

  const t = {
    en: { title: "Media Coverage", subtitle: "Hack & Escape in the News" },
    ar: { title: "التغطية الإعلامية", subtitle: "هاك أند إسكيب في الأخبار" }
  }[locale];

  return (
    <div className={styles.container} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <header className={styles.header}>
        <h1 className="glow-text">{t.title}</h1>
        <p className={styles.subtitle}>{t.subtitle}</p>
      </header>

      <div className={styles.list}>
        {articles && articles.length > 0 ? (
          articles.map((article) => (
            <a key={article._id} href={article.link} target="_blank" rel="noopener noreferrer" className={styles.link}>
              <CyberCard title={article.sourceName} variant="secondary">
                <div className={styles.articleBody}>
                  <h3 className={styles.articleTitle}>{article.title}</h3>
                  <div className={styles.footer}>
                    <span>{new Date(article.date).toLocaleDateString(locale)}</span>
                    <span className={styles.readMore}>{locale === 'en' ? 'Read Article →' : 'اقرأ المقال ←'}</span>
                  </div>
                </div>
              </CyberCard>
            </a>
          ))
        ) : (
          <p className={styles.noData}>{locale === 'en' ? 'No recent coverage.' : 'لا توجد تغطية حديثة.'}</p>
        )}
      </div>
    </div>
  );
}
