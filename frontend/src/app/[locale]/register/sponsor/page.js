'use client';
import { useState } from 'react';
import styles from './register.module.css';

export default function SponsorRegisterPage({ params }) {
  const { locale } = params;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    companyName: '',
    tierInterest: 'gold',
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
        body: JSON.stringify({ 
          ...formData, 
          type: 'sponsor',
          details: { companyName: formData.companyName, tierInterest: formData.tierInterest }
        })
      });
      
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', companyName: '', tierInterest: 'gold', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  const t = {
    en: {
      title: "Become a Partner",
      subtitle: "Join forces with the next generation of cyber talent.",
      company: "Company Name",
      contactName: "Contact Person",
      email: "Corporate Email",
      tier: "Interest Tier",
      message: "Additional Details / Goals",
      submit: "Submit Proposal",
      success: "Proposal Sent. Our partnership team will reach out.",
      error: "Error sending proposal. Please try again."
    },
    ar: {
      title: "كن شريكاً",
      subtitle: "انضم إلى قوى الجيل القادم من المواهب السيبرانية.",
      company: "اسم الشركة",
      contactName: "اسم الشخص المسؤول",
      email: "البريد الإلكتروني للشركة",
      tier: "فئة الاهتمام",
      message: "تفاصيل إضافية / أهداف",
      submit: "إرسال المقترح",
      success: "تم إرسال المقترح. سيتواصل معك فريق الشراكات لدينا.",
      error: "خطأ في إرسال المقترح. يرجى المحاولة مرة أخرى."
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
            <label>{t.company}</label>
            <input 
              type="text" 
              required 
              value={formData.companyName}
              onChange={(e) => setFormData({...formData, companyName: e.target.value})}
              placeholder="Tech Corp Inc." 
            />
          </div>

          <div className={styles.inputGroup}>
            <label>{t.contactName}</label>
            <input 
              type="text" 
              required 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="John Doe" 
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label>{t.email}</label>
            <input 
              type="email" 
              required 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="partners@techcorp.com" 
            />
          </div>

          <div className={styles.inputGroup}>
            <label>{t.tier}</label>
            <select 
              value={formData.tierInterest}
              onChange={(e) => setFormData({...formData, tierInterest: e.target.value})}
              className={styles.select}
            >
              <option value="strategic">Strategic Partner</option>
              <option value="gold">Gold Sponsor</option>
              <option value="silver">Silver Sponsor</option>
              <option value="bronze">Bronze Sponsor</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label>{t.message}</label>
            <textarea 
              rows="4"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              placeholder="Tell us about your sponsorship goals..."
            ></textarea>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={status === 'loading'}>
            {status === 'loading' ? 'Sending...' : t.submit}
          </button>
          
          {status === 'success' && <p className={styles.success}>{t.success}</p>}
          {status === 'error' && <p className={styles.error}>{t.error}</p>}
        </form>
      </div>
    </div>
  );
}
