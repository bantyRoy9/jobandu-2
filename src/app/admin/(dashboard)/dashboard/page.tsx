'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getStats, type Stats } from '@/lib/admin-api';

type StatCard = { key: string; label: string; icon: string; color: string };
// const STATUS_OPTIONS = ['applied', 'reviewed', 'contacted', 'placed'];

const STAT_MAP: Record<string, StatCard> = {
  total_applicants: { key: 'total_applicants', label: 'Total Applicants', icon: '👷', color: '#3b82f6' },
  total_employers: { key: 'total_employers', label: 'Total Employers', icon: '🏢', color: '#8b5cf6' },
  applied_applications: { key: 'applied_applications', label: 'Applied', icon: '⏳', color: '#f59e0b' },
  reviewed_applications: { key: 'reviewed_applications', label: 'Reviewed', icon: '✅', color: '#10b981' },
  contacted_applications: { key: 'contacted_applications', label: 'Contacted', icon: '❌', color: '#ef4444' },
  placed_applications: { key: 'placed_applications', label: 'Placed', icon: '📅', color: '#06b6d4' },
  total_emails_sent: { key: 'total_emails_sent', label: 'Emails Sent', icon: '✉️', color: '#ec4899' },
};

function formatKey(key: string): string {
  return key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function CardMesh() {
  return (
    <div className="card-mesh-bg">
      <div className="mesh-blob mesh-blob-1" />
      <div className="mesh-blob mesh-blob-2" />
    </div>
  );
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getStats()
      .then(data => { setStats(data); setLoading(false); })
      .catch(err => { setError(err.message || 'Failed to load stats'); setLoading(false); });
  }, []);

  /** Flatten nested objects: { applicants: { total: 5 } } → [["applicants_total", 5]] */
  function flattenStats(obj: Record<string, unknown>, prefix = ''): [string, string | number][] {
    const result: [string, string | number][] = [];
    for (const [k, v] of Object.entries(obj)) {
      const key = prefix ? `${prefix}_${k}` : k;
      if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
        result.push(...flattenStats(v as Record<string, unknown>, key));
      } else if (typeof v === 'number' || typeof v === 'string') {
        result.push([key, v]);
      }
    }
    return result;
  }

  const statEntries = stats ? flattenStats(stats as unknown as Record<string, unknown>) : [];


  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Dashboard</h1>
          <p className="admin-page-subtitle">Welcome back — here&apos;s what&apos;s happening</p>
        </div>
        <div style={{ display: 'flex', gap: '.75rem' }}>
          <Link href="/admin/applicants" className="btn btn-outline-dark btn-sm">View Applicants</Link>
          <Link href="/admin/send-email" className="btn btn-primary btn-sm">Send Email</Link>
        </div>
      </div>

      {/* Stats Grid */}
      {loading && (
        <div className="admin-loading-block">
          <div className="admin-spinner-lg" />
          <p>Loading statistics...</p>
        </div>
      )}
      {error && (
        <div className="admin-alert admin-alert-error">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
          {error}
        </div>
      )}
      {stats && (
        <div className="admin-stats-grid">
          {statEntries.map(([key, value]) => {
            const meta = STAT_MAP[key];
            return (
              <div key={key} className="admin-stat-card glowing-border-card">
                <CardMesh />
                <div className="admin-stat-card-icon" style={{ background: `${(meta?.color ?? '#6366f1')}18`, color: meta?.color ?? '#6366f1' }}>
                  <span style={{ fontSize: '1.5rem' }}>{meta?.icon ?? '📊'}</span>
                </div>
                <div className="admin-stat-card-body">
                  <div className="admin-stat-card-value" style={{ color: meta?.color ?? '#6366f1' }}>
                    {typeof value === 'number' ? value.toLocaleString() : String(value)}
                  </div>
                  <div className="admin-stat-card-label">{meta?.label ?? formatKey(key)}</div>
                </div>
                {/* Subtle background spark line */}
                <svg style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '30px', opacity: 0.1, pointerEvents: 'none' }} viewBox="0 0 100 30" preserveAspectRatio="none">
                  <path d="M0,25 Q25,10 50,20 T100,15 L100,30 L0,30 Z" fill={meta?.color ?? '#6366f1'} />
                </svg>
              </div>
            );
          })}
        </div>
      )}

      {/* Quick Actions */}
      <div className="admin-section">
        <h2 className="admin-section-title">Platform Operations</h2>
        <div className="admin-quick-actions">
          <Link href="/admin/applicants" className="admin-quick-card glowing-border-card">
            <CardMesh />
            <div className="admin-quick-card-icon" style={{ background: '#3b82f618', color: '#3b82f6' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>
            </div>
            <div className="admin-quick-card-label">Talent Pipeline</div>
            <div className="admin-quick-card-desc">Review and manage the latest specialist applications effectively.</div>
            <div style={{ marginTop: 'auto', fontSize: '.75rem', fontWeight: 800, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '.05em' }}>Access Records →</div>
          </Link>
          <Link href="/admin/employers" className="admin-quick-card glowing-border-card">
            <CardMesh />
            <div className="admin-quick-card-icon" style={{ background: '#8b5cf618', color: '#8b5cf6' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
            </div>
            <div className="admin-quick-card-label">Corporate Partners</div>
            <div className="admin-quick-card-desc">Analyze workforce requests from industrial and logistics leaders.</div>
            <div style={{ marginTop: 'auto', fontSize: '.75rem', fontWeight: 800, color: '#8b5cf6', textTransform: 'uppercase', letterSpacing: '.05em' }}>Manage Leads →</div>
          </Link>
          <Link href="/admin/send-email" className="admin-quick-card glowing-border-card">
            <CardMesh />
            <div className="admin-quick-card-icon" style={{ background: '#10b98118', color: '#10b981' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
            </div>
            <div className="admin-quick-card-label">Direct Connection</div>
            <div className="admin-quick-card-desc">Communicate directly with candidates and partners via internal mail.</div>
            <div style={{ marginTop: 'auto', fontSize: '.75rem', fontWeight: 800, color: '#10b981', textTransform: 'uppercase', letterSpacing: '.05em' }}>Open Composer →</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
