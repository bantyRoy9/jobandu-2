'use client';
import {
  deleteApplicant,
  getApplicants, updateApplicant,
  type Applicant
} from '@/lib/admin-api';
import { useCallback, useEffect, useState } from 'react';

const STATUS_OPTIONS = ['applied', 'reviewed', 'contacted', 'placed'];
const STATUS_COLORS: Record<string, string> = {
  applied: '#f59e0b', reviewed: '#3b82f6', contacted: '#10b981',
  placed: '#8b5cf6',
};

function StatusBadge({ status }: { status?: string }) {
  const s = status ?? 'unknown';
  const color = STATUS_COLORS[s] ?? '#64748b';
  return (
    <span style={{ padding: '2px 10px', fontSize: '.7rem', fontWeight: 600, borderRadius: 9999, background: `${color}1a`, color }}>
      {s.charAt(0).toUpperCase() + s.slice(1)}
    </span>
  );
}

export default function ApplicantsPage() {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const load = useCallback(() => {
    setLoading(true);
    const params: Record<string, string> = {};
    if (search) params.search = search;
    if (filterStatus) params.status = filterStatus;
    getApplicants(params)
      .then((data: any) => {
        if (Array.isArray(data)) setApplicants(data);
        else if (data && Array.isArray(data.applicants)) setApplicants(data.applicants);
        else if (data && Array.isArray(data.data)) setApplicants(data.data);
        else setApplicants([]);
        setLoading(false);
      })
      .catch(err => { setError(err.message); setLoading(false); });
  }, [search, filterStatus]);

  useEffect(() => { load(); }, [load]);

  const handleStatusChange = async (id: string, status: string) => {
    setUpdating(id);
    try {
      await updateApplicant(id, { status });
      setApplicants(prev => prev.map(a => a.id === id ? { ...a, status } : a));
      showToast('Status updated!');
    } catch (err) {
      showToast((err as Error).message);
    } finally {
      setUpdating(null);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteApplicant(id);
      setApplicants(prev => prev.filter(a => a.id !== id));
      setDeleteId(null);
      showToast('Applicant deleted.');
    } catch (err) {
      showToast((err as Error).message);
    }
  };

  const handleDownloadCv = (cvUrl?: string) => {
    if (cvUrl) {
      window.open(cvUrl, '_blank');
    } else {
      showToast('No CV attached');
    }
  };

  const getName = (a: Applicant) => a.name ?? a.full_name ?? '—';

  // Safely parse skills because it might be JSON stringified inside the array
  const parseSkills = (skills?: string[]) => {
    if (!skills || skills.length === 0) return '—';
    try {
      if (skills.length === 1 && skills[0].startsWith('[')) {
        const parsed = JSON.parse(skills[0]);
        if (Array.isArray(parsed)) return parsed.join(', ');
      }
    } catch { /* noop */ }
    return skills.join(', ');
  };

  return (
    <div className="admin-page">
      {/* Toast */}
      {toast && <div className="admin-toast">{toast}</div>}

      {/* Delete confirm modal */}
      {deleteId && (
        <div className="admin-modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>🗑️</div>
            <h3 className="admin-modal-title">Delete Applicant?</h3>
            <p style={{ color: '#64748b', fontSize: '.875rem', marginBottom: '1.5rem', textAlign: 'center' }}>
              This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '.75rem', justifyContent: 'center' }}>
              <button className="btn" style={{ background: '#f1f5f9', color: '#475569' }} onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="btn" style={{ background: '#ef4444', color: '#fff' }} onClick={() => handleDelete(deleteId)}>Delete</button>
            </div>
          </div>
        </div>
      )}

      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Talent Pipeline</h1>
          <p className="admin-page-subtitle">Monitoring <span className="text-gradient" style={{ fontWeight: 800 }}>{applicants.length} record{applicants.length !== 1 ? 's' : ''}</span> in our specialist database.</p>
        </div>
      </div>

      {/* Filters Glass Toolbar */}
      <div className="admin-filters" style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', padding: '1rem', borderRadius: '1.25rem', border: '1px solid rgba(226, 232, 240, 0.8)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', gap: '1rem' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <svg style={{ position: 'absolute', left: '.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-primary)', pointerEvents: 'none' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <input
            type="text"
            className="form-input"
            placeholder="Search specialists by name, email, or skill..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: '2.5rem', background: '#fff', border: '1px solid rgba(226, 232, 240, 0.5)', borderRadius: '0.875rem' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <select className="form-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ width: 'auto', minWidth: 160, borderRadius: '0.875rem', background: '#fff' }}>
            <option value="">All Statuses</option>
            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
          </select>
          <button className="btn btn-primary hover-lift" onClick={load} style={{ borderRadius: '0.875rem', padding: '0 1.25rem' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></svg>
            Refresh
          </button>
        </div>
      </div>

      {loading && <div className="admin-loading-block"><div className="admin-spinner-lg" /><p>Syncing data...</p></div>}
      {error && <div className="admin-alert admin-alert-error"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>{error}</div>}

      {!loading && !error && (
        <div className="admin-table-wrap glowing-border-card" style={{ padding: 0, /*overflow: 'hidden',*/ border: '1px solid #e2e8f0' }}>
          <table className="admin-table">
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                <th style={{ padding: '1.25rem 1.5rem' }}>specialist</th>
                <th>contact info</th>
                <th>location</th>
                <th>expertise</th>
                <th>work status</th>
                <th>joined</th>
                <th style={{ textAlign: 'right', paddingRight: '1.5rem' }}>actions</th>
              </tr>
            </thead>
            <tbody>
              {applicants.length === 0 && (
                <tr><td colSpan={7} style={{ textAlign: 'center', color: '#94a3b8', padding: '5rem 1rem' }}>No records match your criteria.</td></tr>
              )}
              {applicants.map(a => (
                <tr key={a.id} className="admin-table-row-hover" style={{ transition: 'background 0.2s' }}>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ fontWeight: 800, color: 'var(--color-secondary)', fontSize: '0.9375rem' }}>{getName(a)}</div>
                    <div style={{ fontSize: '.7rem', color: '#94a3b8', fontWeight: 600, letterSpacing: '0.02em', marginTop: '2px' }}>ID: {a.id.slice(0, 8).toUpperCase()}</div>
                  </td>
                  <td>
                    <div style={{ fontSize: '.875rem', fontWeight: 500 }}>{a.email ?? '—'}</div>
                    <div style={{ fontSize: '.75rem', color: '#64748b', marginTop: '1px' }}>{a.phone ?? ''}</div>
                  </td>
                  <td style={{ fontSize: '.875rem', fontWeight: 600, color: '#475569' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      🌍 {a.location ?? a.nationality ?? '—'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '6px' }}>
                      <span style={{ padding: '3px 12px', fontSize: '.75rem', fontWeight: 700, borderRadius: '6px', background: 'var(--color-primary-glow)', color: 'var(--color-primary-dark)', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', border: '1px solid rgba(34,197,94,0.1)' }}>
                        {parseSkills(a.skills)}
                      </span>
                      {(a.experience_years !== undefined) && (
                        <span style={{ fontSize: '.7rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          ⚡ {a.experience_years} Year{a.experience_years !== 1 ? 's' : ''} Experience
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <select
                        value={a.status ?? ''}
                        onChange={e => handleStatusChange(a.id, e.target.value)}
                        disabled={updating === a.id}
                        className="form-select"
                        style={{ padding: '4px 10px', fontSize: '.75rem', minWidth: 120, borderRadius: '8px', border: '1px solid #e2e8f0' }}
                      >
                        {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                      </select>
                      <StatusBadge status={a.status} />
                    </div>
                  </td>
                  <td style={{ fontSize: '.8125rem', color: '#64748b', fontWeight: 500 }}>
                    {a.created_at ? new Date(a.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                  </td>
                  <td style={{ paddingRight: '1.5rem' }}>
                    <div style={{ display: 'flex', gap: '.5rem', justifyContent: 'flex-end' }}>
                      {(a.cv_url || a.cv || a.cv_filename) && (
                        <button className="admin-action-btn admin-action-btn-blue hover-lift" style={{ borderRadius: '8px', padding: '0.4rem 0.8rem' }} title="View Resume" onClick={() => handleDownloadCv(a.cv_url)}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                          Resume
                        </button>
                      )}
                      <button className="admin-action-btn admin-action-btn-red hover-lift" style={{ borderRadius: '8px', padding: '0.4rem 0.8rem' }} title="Remove Record" onClick={() => setDeleteId(a.id)}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
