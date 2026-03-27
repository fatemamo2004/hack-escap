import styles from "./gallery.module.css";
import { fetchData } from "@/lib/api";

export default async function GalleryPage({ params }) {
  const { locale } = await params;
  const items = await fetchData('gallery', locale);

  const t = {
    en: { title: "Event Gallery", subtitle: "Moments from H&E 2025" },
    ar: { title: "معرض الصور", subtitle: "لحظات من هاك أند إسكيب ٢٠٢٥" }
  }[locale];

  return (
    <div className={styles.container} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <header className={styles.header}>
        <h1 className="glow-text">{t.title}</h1>
        <p className={styles.subtitle}>{t.subtitle}</p>
      </header>

      <div className={styles.masonry}>
        {items && items.length > 0 ? (
          items.map((item) => (
            <div key={item._id} className={styles.galleryItem}>
              <div className={styles.imageWrapper}>
                {/* Image component placeholder */}
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className={styles.actualImage} 
                />
                <div className={styles.overlay}>
                  <span className={styles.category}>{item.category || (locale==='en'?'Competition':'المنافسة')}</span>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noData}>{locale === 'en' ? 'Gallery is currently empty.' : 'المعرض فارغ حالياً.'}</p>
        )}
      </div>
    </div>
  );
}
