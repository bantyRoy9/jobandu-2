'use client';
import { useState, useEffect } from 'react';
import { isLoggedIn, createBasicToken, setToken } from '@/lib/admin-auth';
import { getStats } from '@/lib/admin-api';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    if (isLoggedIn()) window.location.replace('/admin/dashboard');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const token = createBasicToken(username.trim(), password.trim());
      setToken(token);
      await getStats();
      // Hard navigation — no locale prefix
      window.location.replace('/admin/dashboard');
    } catch {
      setError('Invalid credentials. Please check your username and password.');
      import('@/lib/admin-auth').then(({ removeToken }) => removeToken());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      {/* Background effects */}
      <div className="admin-login-bg" />
      <div className="glow-orb glow-orb-primary" style={{ width: 500, height: 500, top: -150, left: -100, opacity: 0.35 }} />
      <div className="glow-orb glow-orb-secondary" style={{ width: 350, height: 350, bottom: -100, right: '5%', opacity: 0.25 }} />

      <div className="admin-login-card">
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '.625rem', textDecoration: 'none', marginBottom: '1.5rem' }}>
            <div className="logo-mark" style={{ width: 44, height: 44, fontSize: '1.25rem' }}>J</div>
            <span className="logo-text" style={{ fontSize: '1.5rem' }}>job<span>andu</span></span>
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)', marginBottom: '.375rem' }}>
            Admin Portal
          </h1>
          <p style={{ fontSize: '.875rem', color: 'var(--color-text-secondary)' }}>
            Sign in to manage applicants &amp; employers
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Username */}
          <div className="form-group">
            <label className="form-label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px', verticalAlign: 'middle' }}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              Username
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter your username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoComplete="username"
              disabled={loading}
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px', verticalAlign: 'middle' }}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPass ? 'text' : 'password'}
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
                disabled={loading}
                style={{ paddingRight: '2.75rem' }}
              />
              <button
                type="button"
                onClick={() => setShowPass(v => !v)}
                style={{ position: 'absolute', right: '.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', padding: 0 }}
                aria-label={showPass ? 'Hide password' : 'Show password'}
              >
                {showPass
                  ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                }
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="admin-alert admin-alert-error">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary btn-full btn-lg"
            disabled={loading}
            style={{ marginTop: '.5rem' }}
          >
            {loading
              ? <><span className="admin-spinner" />Signing in...</>
              : <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>Sign In</>
            }
          </button>
          <a href='/' style={{ marginTop: '.5rem', textAlign: 'center', fontSize: '.8125rem', color: 'var(--color-text-muted)' }}>Back to Home</a>
        </form>

        <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '.8125rem', color: 'var(--color-text-muted)' }}>
          Protected admin area · Jobandu GmbH
        </p>
      </div>
    </div>
  );
}
