import styles from './Timeline.module.css';

export default function Timeline({ milestones, locale }) {
  return (
    <div className={styles.timeline} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className={styles.line}></div>
      {milestones.map((m, i) => (
        <div key={i} className={styles.item}>
          <div className={styles.dot}></div>
          <div className={styles.content}>
             <span className={styles.date}>{m.date}</span>
             <h4 className={styles.milestone}>{m.title}</h4>
             <p className={styles.desc}>{m.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
