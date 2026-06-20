'use client';
import { useEffect, useState } from 'react';
import { addTeamMember, updateTeamMember, deleteTeamMember, type TeamMember } from '@/lib/admin-api';

const BACKEND = 'https://jobandubackend.up.railway.app/api';
const DEPARTMENTS = ['Sales', 'Recruiting', 'Customer Support'];
const DEPT_ORDER  = ['Sales', 'Recruiting', 'Customer Support'];
const EMPTY_FORM  = { name: '', role: '', department: '', phone: '', email: '' };

export default function AdminTeamContentPage() {
  const [members,       setMembers]       = useState<TeamMember[]>([]);
  const [loading,       setLoading]       = useState(true);
  const [error,         setError]         = useState('');
  const [successMsg,    setSuccessMsg]    = useState('');

  // ── modal ──
  const [modalOpen,  setModalOpen]  = useState(false);
  const [editing,    setEditing]    = useState<TeamMember | null>(null);
  const [form,       setForm]       = useState(EMPTY_FORM);
  const [saving,     setSaving]     = useState(false);
  const [formError,  setFormError]  = useState('');

  // ── delete confirm ──
  const [confirmDelete, setConfirmDelete] = useState<TeamMember | null>(null);
  const [deleting,      setDeleting]      = useState(false);

  // ── field updater ──
  const upd = (key: keyof typeof EMPTY_FORM) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm(p => ({ ...p, [key]: e.target.value }));

  // ── always re-fetch from API to get ground truth ──
  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${BACKEND}/content/team`, { cache: 'no-store' });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();
      setMembers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError((err as Error).message || 'Failed to load team members.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  // ── modal helpers ──
  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setFormError('');
    setModalOpen(true);
  };

  const openEdit = (m: TeamMember) => {
    setEditing(m);
    setForm({
      name:       m.name,
      role:       m.role,
      department: m.department,
      phone:      m.phone ?? '',
      email:      m.email,
    });
    setFormError('');
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
    setForm(EMPTY_FORM);
    setFormError('');
  };

  // ── save: call API → re-fetch → close modal ──
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFormError('');
    try {
      const payload = { ...form, phone: form.phone || "" };
      if (editing) {
        await updateTeamMember(editing.id, payload);
        showSuccess('Member updated successfully!');
      } else {
        await addTeamMember(payload);
        showSuccess('Member added successfully!');
      }
      closeModal();
      await load(); // ← re-fetch so table reflects the latest API state
    } catch (err) {
      setFormError((err as Error).message || 'Save failed. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // ── delete: call API → re-fetch ──
  const handleDelete = async () => {
    if (!confirmDelete) return;
    setDeleting(true);
    try {
      await deleteTeamMember(confirmDelete.id);
      setConfirmDelete(null);
      showSuccess('Member removed.');
      await load();
    } catch (err) {
      alert((err as Error).message || 'Delete failed.');
    } finally {
      setDeleting(false);
    }
  };

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  // ── group by department in fixed order ──
  const grouped: Record<string, TeamMember[]> = {};
  members.forEach(m => {
    const d = m.department || 'Other';
    if (!grouped[d]) grouped[d] = [];
    grouped[d].push(m);
  });
  const orderedGroups: [string, TeamMember[]][] = [
    ...DEPT_ORDER.filter(d => grouped[d]).map(d => [d, grouped[d]] as [string, TeamMember[]]),
    ...Object.entries(grouped).filter(([d]) => !DEPT_ORDER.includes(d)),
  ];

  return (
    <div className="admin-page">

      {/* ── Header ── */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Team Members</h1>
          <p className="admin-page-subtitle">
            Manage the team displayed on the About Us page.{' '}
            {!loading && <span className="admin-badge">{members.length} members</span>}
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
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add Member
          </button>
        </div>
      </div>

      {/* ── Alerts ── */}
      {error      && <div className="admin-alert admin-alert-error"   style={{ marginBottom: '1rem' }}>{error}</div>}
      {successMsg && <div className="admin-alert admin-alert-success" style={{ marginBottom: '1rem' }}>{successMsg}</div>}

      {/* ── Loading ── */}
      {loading ? (
        <div className="admin-loading-block">
          <div className="admin-spinner-lg"/>
          <p>Loading team members…</p>
        </div>

      /* ── Empty ── */
      ) : members.length === 0 ? (
        <div className="admin-empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
          </svg>
          <p>No team members yet. Click <strong>Add Member</strong> to get started.</p>
        </div>

      /* ── Table grouped by department ── */
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {orderedGroups.map(([dept, deptMembers]) => (
            <div key={dept} className="admin-form-card" style={{ padding: 0, overflow: 'hidden' }}>

              {/* Department header */}
              <div style={{
                padding: '0.875rem 1.25rem',
                background: '#f8fafc',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                gap: '0.625rem',
              }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#137a42" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
                </svg>
                <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.875rem' }}>{dept}</span>
                <span className="admin-badge">{deptMembers.length}</span>
              </div>

              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th style={{ width: 90 }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deptMembers.map(m => (
                      <tr key={m.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                            <div className="admin-avatar-sm">
                              {(m.name || '?').charAt(0).toUpperCase()}
                            </div>
                            <span style={{ fontWeight: 600, color: '#0f172a' }}>{m.name}</span>
                          </div>
                        </td>
                        <td><span className="admin-tag">{m.role}</span></td>
                        <td style={{ color: m.phone ? '#334155' : '#94a3b8', fontSize: '0.85rem' }}>
                          {m.phone || '—'}
                        </td>
                        <td>
                          <a href={`mailto:${m.email}`} className="admin-link">{m.email}</a>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '0.4rem' }}>
                            <button
                              className="admin-btn-icon admin-btn-edit"
                              onClick={() => openEdit(m)}
                              title="Edit member"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                              </svg>
                            </button>
                            <button
                              className="admin-btn-icon admin-btn-delete"
                              onClick={() => setConfirmDelete(m)}
                              title="Remove member"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <polyline points="3 6 5 6 21 6"/>
                                <path d="M19 6l-1 14H6L5 6"/>
                                <path d="M10 11v6M14 11v6"/>
                                <path d="M9 6V4h6v2"/>
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
          ))}
        </div>
      )}

      {/* ══════════════════════════════════════════════════
          Add / Edit Modal
      ══════════════════════════════════════════════════ */}
      {modalOpen && (
        <div
          className="admin-modal-backdrop"
          onClick={e => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h3>{editing ? 'Edit Team Member' : 'Add Team Member'}</h3>
              <button className="admin-modal-close" onClick={closeModal} aria-label="Close">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <form onSubmit={handleSave} className="admin-modal-body">
              <div className="admin-field-grid-2">

                <div className="admin-field">
                  <label className="admin-field-label">Full Name *</label>
                  <input
                    required
                    className="admin-field-input"
                    placeholder="e.g. Emilia Skrzypek"
                    value={form.name}
                    onChange={upd('name')}
                  />
                </div>

                <div className="admin-field">
                  <label className="admin-field-label">Role / Title *</label>
                  <input
                    required
                    className="admin-field-input"
                    placeholder="e.g. Recruiting"
                    value={form.role}
                    onChange={upd('role')}
                  />
                </div>

                <div className="admin-field">
                  <label className="admin-field-label">Department *</label>
                  <select
                    required
                    className="admin-field-input"
                    value={form.department}
                    onChange={upd('department')}
                  >
                    <option value="">— Select Department —</option>
                    {DEPARTMENTS.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div className="admin-field">
                  <label className="admin-field-label">
                    Phone{' '}
                    <span style={{ color: '#94a3b8', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>
                      (optional)
                    </span>
                  </label>
                  <input
                    type="tel"
                    className="admin-field-input"
                    placeholder="e.g. +49 (0) 174 1234567"
                    value={form.phone}
                    onChange={upd('phone')}
                  />
                </div>

                <div className="admin-field" style={{ gridColumn: '1 / -1' }}>
                  <label className="admin-field-label">Email Address *</label>
                  <input
                    required
                    type="email"
                    className="admin-field-input"
                    placeholder="e.g. name@jobandu.de"
                    value={form.email}
                    onChange={upd('email')}
                  />
                </div>
              </div>

              {formError && (
                <div className="admin-alert admin-alert-error">{formError}</div>
              )}

              <div className="admin-modal-footer">
                <button type="button" className="btn btn-ghost" onClick={closeModal} disabled={saving}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? (
                    <><span className="admin-spinner-sm"/> Saving…</>
                  ) : editing ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/>
                        <polyline points="17 21 17 13 7 13 7 21"/>
                        <polyline points="7 3 7 8 15 8"/>
                      </svg>
                      Update Member
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                      </svg>
                      Add Member
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════
          Delete Confirm Modal
      ══════════════════════════════════════════════════ */}
      {confirmDelete && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal" style={{ maxWidth: 420 }}>
            <div className="admin-modal-header">
              <h3>Remove Team Member</h3>
              <button className="admin-modal-close" onClick={() => setConfirmDelete(null)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <div className="admin-modal-body">
              <p style={{ color: '#475569' }}>
                Are you sure you want to remove{' '}
                <strong style={{ color: '#0f172a' }}>{confirmDelete.name}</strong>{' '}
                from the team? This action cannot be undone.
              </p>
              <div className="admin-modal-footer">
                <button className="btn btn-ghost" onClick={() => setConfirmDelete(null)} disabled={deleting}>
                  Cancel
                </button>
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
