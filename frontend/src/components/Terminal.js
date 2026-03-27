'use client';
import { useState, useEffect } from 'react';
import styles from './Terminal.module.css';

export default function Terminal({ locale }) {
  const [text, setText] = useState('');
  const fullText = locale === 'en' 
    ? '> Initializing Hack & Escape 2026...\n> System: Online\n> Mission: Building a Cyber-Aware Generation'
    : '> جاري تشغيل هاك أند إسكيب 2026...\n> النظام: متصل\n> المهمة: بناء جيل واعي سيبرانياً';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <div className={styles.terminal}>
      <div className={styles.header}>
        <div className={styles.dot} style={{ backgroundColor: '#ff5f56' }}></div>
        <div className={styles.dot} style={{ backgroundColor: '#ffbd2e' }}></div>
        <div className={styles.dot} style={{ backgroundColor: '#27c93f' }}></div>
        <span className={styles.title}>bash — 80x24</span>
      </div>
      <pre className={styles.content}>
        <code>{text}</code>
        <span className={styles.cursor}>_</span>
      </pre>
    </div>
  );
}
