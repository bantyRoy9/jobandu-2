'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { removeToken } from '@/lib/admin-auth';
import { useState } from 'react';

const NAV = [
  {
    href: '/admin/dashboard',
    label: 'Dashboard',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    href: '/admin/applicants',
    label: 'Applicants',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    href: '/admin/employers',
    label: 'Employers',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    href: '/admin/send-email',
    label: 'Send Email',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

export default function AdminSidebar({ mobileOpen, onCloseMobile }: { mobileOpen?: boolean; onCloseMobile?: () => void }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    removeToken();
    window.location.replace('/admin/login');
  };

  return (
    <aside className={`admin-sidebar${collapsed ? ' collapsed' : ''}${mobileOpen ? ' mobile-open' : ''}`}>
      {/* Logo */}
      <div className="admin-sidebar-logo">
        <Link href="/admin/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '.625rem', textDecoration: 'none' }} onClick={onCloseMobile}>
          {/* <div className="logo-mark" style={{ width: 36, height: 36, fontSize: '1rem', flexShrink: 0 }}>J</div>
          {!collapsed && <span className="logo-text" style={{ fontSize: '1.125rem', color: '#fff' }}>job<span>andu</span></span>} */}
          <img
                src="https://jobandu.de/wp-content/uploads/2025/05/1.png"
                alt="Jobandu"
                className="navbar-logo"
              />
        </Link>
        {/* <button className="admin-sidebar-toggle" onClick={() => setCollapsed(v => !v)} aria-label="Toggle sidebar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {collapsed
              ? <><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>
              : <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
            }
          </svg>
        </button> */}
      </div>

      {/* Nav label */}
      {!collapsed && <div className="admin-sidebar-section-label" style={{ opacity: 0.5, letterSpacing: '0.1em' }}>Core Management</div>}

      {/* Nav */}
      <nav className="admin-sidebar-nav">
        {NAV.map(item => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link key={item.href} href={item.href} className={`admin-nav-link${active ? ' active' : ''}`} title={collapsed ? item.label : undefined} onClick={onCloseMobile}>
              <span className="admin-nav-icon" style={{ transition: 'transform 0.2s' }}>{item.icon}</span>
              {!collapsed && <span style={{ fontWeight: active ? 700 : 500 }}>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="admin-sidebar-bottom">
        {!collapsed && (
          <div className="admin-sidebar-user" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '1rem', padding: '0.75rem' }}>
            <div className="admin-sidebar-avatar" style={{ background: 'var(--gradient-green)', boxShadow: '0 0 15px rgba(34,197,94,0.3)' }}>A</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '.8125rem', fontWeight: 800, color: '#fff' }}>Jobandu Admin</div>
              <div style={{ fontSize: '.6875rem', color: 'rgba(255,255,255,.4)', fontWeight: 600, textTransform: 'uppercase' }}>Super User</div>
            </div>
          </div>
        )}
        <button className="admin-nav-link admin-logout-btn hover-lift" onClick={() => { handleLogout(); onCloseMobile?.(); }} title={collapsed ? 'Logout' : undefined} style={{ width: '100%', textAlign: 'left', border: 'none', cursor: 'pointer', background: 'transparent' }}>
          <span className="admin-nav-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </span>
          {!collapsed && <span style={{ fontWeight: 600 }}>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
