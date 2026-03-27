'use client';
import { useState } from 'react';
import styles from './contact.module.css';

export default function ContactPage({ params }) {
  const { locale } = params;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, type: 'contact' })
      });
      
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  const t = {
    en: {
      title: "Get In Touch",
      subtitle: "Questions? Logic errors? Contact the team.",
      name: "Your Name",
      email: "Email Address",
      subject: "Subject",
      message: "Message",
      send: "Transmit Signal",
      success: "Message Received. Agent will respond shortly.",
      error: "Transmission Failed. Try again or check your uplink."
    },
    ar: {
      title: "تواصل معنا",
      subtitle: "أسئلة؟ أخطاء منطقية؟ تواصل مع الفريق.",
      name: "اسمك",
      email: "البريد الإلكتروني",
      subject: "الموضوع",
      message: "الرسالة",
      send: "إرسال الإشارة",
      success: "تم استلام الرسالة. سيرد العميل قريباً.",
      error: "فشل الإرسال. حاول مرة أخرى أو تحقق من الاتصال."
    }
  }[locale];

  return (
    <div className={styles.container} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <header className={styles.header}>
        <h1 className="glow-text">{t.title}</h1>
        <p className={styles.subtitle}>{t.subtitle}</p>
      </header>

      <div className={styles.formWrapper}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>{t.name}</label>
            <input 
              type="text" 
              required 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="0x99..." 
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label>{t.email}</label>
            <input 
              type="email" 
              required 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="user@network.local" 
            />
          </div>

          <div className={styles.inputGroup}>
            <label>{t.subject}</label>
            <input 
              type="text" 
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
              placeholder="Urgnet Inquiry" 
            />
          </div>

          <div className={styles.inputGroup}>
            <label>{t.message}</label>
            <textarea 
              required 
              rows="5"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              placeholder="Type your transmission here..."
            ></textarea>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={status === 'loading'}>
            {status === 'loading' ? 'Transmitting...' : t.send}
          </button>
          
          {status === 'success' && <p className={styles.success}>{t.success}</p>}
          {status === 'error' && <p className={styles.error}>{t.error}</p>}
        </form>
      </div>
    </div>
  );
}
