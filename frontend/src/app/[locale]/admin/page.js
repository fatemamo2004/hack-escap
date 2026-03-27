'use client';
import { useState, useEffect } from 'react';
import styles from './admin.module.css';

export default function AdminDashboardPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInquiries = async () => {
      const token = localStorage.getItem('admin_token');
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/inquiries`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setInquiries(data);
      } catch (err) {
        console.error('Failed to fetch inquiries');
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, []);

  if (loading) return <div>FETCHING_SIGNAL_HISTORY...</div>;

  return (
    <div className={styles.dashboard}>
      <header className={styles.dashHeader}>
        <h1>Inquiry Inbox</h1>
        <p>Manage submissions from the public site.</p>
      </header>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Type</th>
              <th>Name</th>
              <th>Email</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.length > 0 ? inquiries.map((iq) => (
              <tr key={iq._id}>
                <td className={styles.typeTag} data-type={iq.type}>{iq.type}</td>
                <td>{iq.name} {iq.details?.companyName ? `(${iq.details.companyName})` : ''}</td>
                <td>{iq.email}</td>
                <td>{new Date(iq.createdAt).toLocaleDateString()}</td>
                <td>
                  <button className={styles.viewBtn}>VIEW_PACKET</button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" className={styles.empty}>Empty signal stream.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
