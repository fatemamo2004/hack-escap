'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import styles from './admin.module.css';

export default function AdminLayout({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();
  const { locale } = useParams();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token && !window.location.pathname.includes('/login')) {
      router.push(`/${locale}/admin/login`);
    } else if (token) {
      setIsAuth(true);
    }
  }, [locale, router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push(`/${locale}/admin/login`);
  };

  // Skip layout for login page
  if (typeof window !== 'undefined' && window.location.pathname.includes('/login')) {
    return <>{children}</>;
  }

  if (!isAuth) return <div className={styles.loading}>VERIFYING_ACCESS...</div>;

  return (
    <div className={styles.adminWrapper} dir="ltr">
      <aside className={styles.sidebar}>
        <div className={styles.brand}>H&E_DASH</div>
        <nav className={styles.nav}>
          <Link href={`/${locale}/admin`} className={styles.navItem}>Inquiries</Link>
          <Link href={`/${locale}/admin/content`} className={styles.navItem}>Content</Link>
          <Link href={`/${locale}/`} className={styles.navItem}>Public Site</Link>
          <button onClick={handleLogout} className={styles.logoutBtn}>LOGOUT</button>
        </nav>
      </aside>
      <main className={styles.content}>
        {children}
      </main>
    </div>
  );
}
