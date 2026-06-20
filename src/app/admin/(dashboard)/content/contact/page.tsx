'use client';
import { useEffect, useState } from 'react';
import { putContentContact } from '@/lib/admin-api';

const BACKEND = 'https://jobandubackend.up.railway.app/api';

interface ContactForm {
  company_name: string;
  street: string;
  zip_code: string;
  city: string;
  country: string;
  phone: string;
  email: string;
}

const EMPTY: ContactForm = {
  company_name: '',
  street: '',
  zip_code: '',
  city: '',
  country: '',
  phone: '',
  email: '',
};

export default function AdminContactContentPage() {
  const [form, setForm] = useState<ContactForm>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${BACKEND}/content/contact`)
      .then(r => r.json())
      .then((data: any) => {
        if (data && typeof data === 'object') {
          setForm({
            company_name: data.company_name ?? '',
            street:       data.street       ?? '',
            zip_code:     data.zip_code     ?? '',
            city:         data.city         ?? '',
            country:      data.country      ?? '',
            phone:        data.phone        ?? '',
            email:        data.email        ?? '',
          });
        }
      })
      .catch(() => setError('Could not load contact details.'))
      .finally(() => setLoading(false));
  }, []);

  const update = (key: keyof ContactForm) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm(prev => ({ ...prev, [key]: e.target.value }));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      await putContentContact(form);
      setSuccess('Contact details saved successfully!');
      setTimeout(() => setSuccess(''), 5000);
    } catch (err) {
      setError((err as Error).message || 'Failed to save.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-loading-block">
          <div className="admin-spinner-lg" />
          <p>Loading contact details…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Company Contact Details</h1>
          <p className="admin-page-subtitle">
            This information is shown on the Contact page, Footer, and Impressum.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="admin-content-form">

        {/* Company Info */}
        <div className="admin-form-card">
          <h2 className="admin-form-card-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Company Information
          </h2>

          <div className="admin-field-grid-2">
            <div className="admin-field">
              <label className="admin-field-label">Company Name</label>
              <input
                type="text"
                className="admin-field-input"
                placeholder="e.g. Jobandu GmbH"
                value={form.company_name}
                onChange={update('company_name')}
                required
              />
            </div>
            <div className="admin-field">
              <label className="admin-field-label">Street Address</label>
              <input
                type="text"
                className="admin-field-input"
                placeholder="e.g. Johannes-Kepler-Str. 7"
                value={form.street}
                onChange={update('street')}
                required
              />
            </div>
            <div className="admin-field">
              <label className="admin-field-label">ZIP / Postal Code</label>
              <input
                type="text"
                className="admin-field-input"
                placeholder="e.g. 54634"
                value={form.zip_code}
                onChange={update('zip_code')}
                required
              />
            </div>
            <div className="admin-field">
              <label className="admin-field-label">City</label>
              <input
                type="text"
                className="admin-field-input"
                placeholder="e.g. Bitburg"
                value={form.city}
                onChange={update('city')}
                required
              />
            </div>
            <div className="admin-field">
              <label className="admin-field-label">Country</label>
              <input
                type="text"
                className="admin-field-input"
                placeholder="e.g. Germany"
                value={form.country}
                onChange={update('country')}
                required
              />
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="admin-form-card">
          <h2 className="admin-form-card-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            Contact Details
          </h2>

          <div className="admin-field-grid-2">
            <div className="admin-field">
              <label className="admin-field-label">Phone Number</label>
              <input
                type="tel"
                className="admin-field-input"
                placeholder="e.g. +49 (0) 65619451-144"
                value={form.phone}
                onChange={update('phone')}
                required
              />
            </div>
            <div className="admin-field">
              <label className="admin-field-label">Email Address</label>
              <input
                type="email"
                className="admin-field-input"
                placeholder="e.g. info@jobandu.de"
                value={form.email}
                onChange={update('email')}
                required
              />
            </div>
          </div>

          {error && <div className="admin-alert admin-alert-error" style={{ marginTop: '1rem' }}>{error}</div>}
          {success && <div className="admin-alert admin-alert-success" style={{ marginTop: '1rem' }}>{success}</div>}

          <div className="admin-form-actions">
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? (
                <><span className="admin-spinner-sm" /> Saving…</>
              ) : (
                <>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/>
                    <polyline points="17 21 17 13 7 13 7 21"/>
                    <polyline points="7 3 7 8 15 8"/>
                  </svg>
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}
