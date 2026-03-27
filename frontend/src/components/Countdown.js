'use client';
import { useState, useEffect } from 'react';
import styles from './Countdown.module.css';

export default function Countdown({ targetDate, locale }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const distance = target - now;

      if (isNaN(distance) || distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const labels = {
    en: { days: 'Days', hours: 'Hours', mins: 'Mins', secs: 'Secs' },
    ar: { days: 'يوم', hours: 'ساعة', mins: 'دقيقة', secs: 'ثانية' }
  };

  const t = labels[locale] || labels.en;

  return (
    <div className={styles.container} dir="ltr">
      <div className={styles.segment}>
        <div className={styles.value}>{timeLeft.days.toString().padStart(2, '0')}</div>
        <div className={styles.label}>{t.days}</div>
      </div>
      <div className={styles.divider}>:</div>
      <div className={styles.segment}>
        <div className={styles.value}>{timeLeft.hours.toString().padStart(2, '0')}</div>
        <div className={styles.label}>{t.hours}</div>
      </div>
      <div className={styles.divider}>:</div>
      <div className={styles.segment}>
        <div className={styles.value}>{timeLeft.minutes.toString().padStart(2, '0')}</div>
        <div className={styles.label}>{t.mins}</div>
      </div>
      <div className={styles.divider}>:</div>
      <div className={styles.segment}>
        <div className={styles.value}>{timeLeft.seconds.toString().padStart(2, '0')}</div>
        <div className={styles.label}>{t.secs}</div>
      </div>
    </div>
  );
}
