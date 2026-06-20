'use client';
import { useEffect, useState } from 'react';
import { addJob, updateJob, deleteJob, type JobContent } from '@/lib/admin-api';

const BACKEND = 'https://jobandubackend.up.railway.app/api';
const EMPTY_FORM = { title: '', location: '', apply_url: '', is_active: true };

export default function AdminJobsContentPage() {
  const [jobs, setJobs] = useState<JobContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<JobContent | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  const [confirmDelete, setConfirmDelete] = useState<JobContent | null>(null);
  const [deleting,      setDeleting]      = useState(false);
  const [successMsg,    setSuccessMsg]    = useState('');

  const upd = (key: string) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm(p => ({ ...p, [key]: e.target.value }));

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${BACKEND}/content/jobs`, { cache: 'no-store' });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();
      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      setError((err as Error).message || 'Failed to load jobs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditing(null); setForm(EMPTY_FORM); setFormError(''); setModalOpen(true); };
  const openEdit = (j: JobContent) => {
    setEditing(j);
    setForm({ title: j.title, location: j.location, apply_url: j.apply_url ?? '', is_active: j.is_active });
    setFormError('');
    setModalOpen(true);
  };
  const closeModal = () => { setModalOpen(false); setEditing(null); setForm(EMPTY_FORM); setFormError(''); };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFormError('');
    try {
      const payload = { ...form, apply_url: form.apply_url || null };
      if (editing) {
        await updateJob(editing.id, payload);
        showSuccess('Job updated successfully!');
      } else {
        await addJob(payload);
        showSuccess('Job added successfully!');
      }
      closeModal();
      await load(); // ← always re-fetch so table reflects latest API state
    } catch (err) {
      setFormError((err as Error).message || 'Save failed.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    setDeleting(true);
    try {
      await deleteJob(confirmDelete.id);
      setConfirmDelete(null);
      showSuccess('Job removed.');
      await load();
    } catch (err) {
      alert((err as Error).message || 'Delete failed.');
    } finally {
      setDeleting(false);
    }
  };

  const toggleActive = async (job: JobContent) => {
    try {
      await updateJob(job.id, { ...job, apply_url: job.apply_url ?? null, is_active: !job.is_active });
      await load(); // re-fetch so status change is reflected from API
    } catch (err) {
      alert((err as Error).message || 'Failed to update status.');
    }
  };

  const activeCount = jobs.filter(j => j.is_active).length;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Job Openings</h1>
          <p className="admin-page-subtitle">
            Manage listings shown on the For Applicants page.{' '}
            <span className="admin-badge">{activeCount} active</span>
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-outline-dark" onClick={load} disabled={loading} title="Refresh from API">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="23 4 23 10 17 10"/>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
            </svg>
            Refresh
          </button>
          <button className="btn btn-primary" onClick={openAdd}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add Job
          </button>
        </div>
      </div>

      {error      && <div className="admin-alert admin-alert-error"   style={{ marginBottom: '1rem' }}>{error}</div>}
      {successMsg && <div className="admin-alert admin-alert-success" style={{ marginBottom: '1rem' }}>{successMsg}</div>}

      {loading ? (
        <div className="admin-loading-block"><div className="admin-spinner-lg"/><p>Loading jobs…</p></div>
      ) : jobs.length === 0 ? (
        <div className="admin-empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
          </svg>
          <p>No job openings yet. Click <strong>Add Job</strong> to create the first one.</p>
        </div>
      ) : (
        <div className="admin-form-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Location</th>
                  <th>Apply URL</th>
                  <th style={{ textAlign: 'center' }}>Status</th>
                  <th style={{ width: 90 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map(job => (
                  <tr key={job.id} style={{ opacity: job.is_active ? 1 : 0.6 }}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                        <div className="admin-avatar-sm" style={{ background: '#f0fdf4', color: '#15803d' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
                          </svg>
                        </div>
                        <span style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.875rem' }}>{job.title}</span>
                      </div>
                    </td>
                    <td>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.85rem', color: '#475569' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                        </svg>
                        {job.location}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.8rem' }}>
                      {job.apply_url
                        ? <a href={job.apply_url} target="_blank" rel="noopener noreferrer" className="admin-link"
                            style={{ maxWidth: 160, display: 'inline-block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {job.apply_url}
                          </a>
                        : <span style={{ color: '#94a3b8' }}>—</span>}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button
                        onClick={() => toggleActive(job)}
                        className={`admin-status-toggle ${job.is_active ? 'active' : 'inactive'}`}
                        title={job.is_active ? 'Click to deactivate' : 'Click to activate'}
                      >
                        {job.is_active ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <button className="admin-btn-icon admin-btn-edit" onClick={() => openEdit(job)} title="Edit">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                          </svg>
                        </button>
                        <button className="admin-btn-icon admin-btn-delete" onClick={() => setConfirmDelete(job)} title="Delete">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
                            <path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="admin-modal-backdrop" onClick={e => { if (e.target === e.currentTarget) closeModal(); }}>
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h3>{editing ? 'Edit Job Opening' : 'Add Job Opening'}</h3>
              <button className="admin-modal-close" onClick={closeModal}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <form onSubmit={handleSave} className="admin-modal-body">
              <div className="admin-field">
                <label className="admin-field-label">Job Title *</label>
                <input required className="admin-field-input"
                  placeholder="e.g. Forklift Operator (m/f/d) – Full-Time"
                  value={form.title} onChange={upd('title')} />
              </div>
              <div className="admin-field">
                <label className="admin-field-label">Location *</label>
                <input required className="admin-field-input"
                  placeholder="e.g. Hamburg Area"
                  value={form.location} onChange={upd('location')} />
              </div>
              <div className="admin-field">
                <label className="admin-field-label">
                  Apply URL{' '}
                  <span style={{ color: '#94a3b8', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span>
                </label>
                <input type="url" className="admin-field-input"
                  placeholder="https://…"
                  value={form.apply_url} onChange={upd('apply_url')} />
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', cursor: 'pointer', userSelect: 'none' }}>
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={e => setForm(p => ({ ...p, is_active: e.target.checked }))}
                  style={{ width: 16, height: 16, accentColor: '#137a42', cursor: 'pointer' }}
                />
                <span style={{ fontSize: '0.875rem', color: '#334155', fontWeight: 500 }}>
                  Active – show on For Applicants page
                </span>
              </label>

              {formError && <div className="admin-alert admin-alert-error">{formError}</div>}

              <div className="admin-modal-footer">
                <button type="button" className="btn btn-ghost" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? <><span className="admin-spinner-sm"/> Saving…</> : (editing ? 'Update Job' : 'Add Job')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {confirmDelete && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal" style={{ maxWidth: 420 }}>
            <div className="admin-modal-header">
              <h3>Delete Job Opening</h3>
              <button className="admin-modal-close" onClick={() => setConfirmDelete(null)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <div className="admin-modal-body">
              <p style={{ color: '#475569' }}>
                Remove <strong style={{ color: '#0f172a' }}>{confirmDelete.title}</strong>? This cannot be undone.
              </p>
              <div className="admin-modal-footer">
                <button className="btn btn-ghost" onClick={() => setConfirmDelete(null)}>Cancel</button>
                <button className="btn btn-danger" onClick={handleDelete} disabled={deleting}>
                  {deleting ? <><span className="admin-spinner-sm"/> Deleting…</> : 'Yes, Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
