'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { isLoggedIn } from '@/lib/admin-auth';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) {
      // Hard navigation — no locale prefix
      window.location.replace('/admin/login');
    } else {
      setReady(true);
    }
  }, [pathname]);

  if (!ready) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f1f5f9' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div className="admin-spinner-lg" />
          <p style={{ color: '#64748b', fontSize: '.875rem' }}>Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      
      {/* Mobile overlay */}
      {mobileOpen && (
        <div 
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9998 }} 
          onClick={() => setMobileOpen(false)} 
        />
      )}

      <AdminSidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />
      
      <main className="admin-content">
        {/* Mobile Header Toggle */}
        <div className="admin-mobile-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', fontWeight: 700, fontSize: '1.25rem' }}>
            <div className="logo-mark" style={{ width: 32, height: 32, fontSize: '.875rem' }}>J</div>
            jobandu
          </div>
          <button className="admin-mobile-toggle" onClick={() => setMobileOpen(true)}>
            ☰
          </button>
        </div>

        {children}
      </main>
    </div>
  );
}
