'use client';
import { useEffect } from 'react';
import { isLoggedIn } from '@/lib/admin-auth';

export default function AdminRoot() {
  useEffect(() => {
    // Hard navigation — bypasses Next.js router so no locale prefix is added
    if (isLoggedIn()) {
      window.location.replace('/admin/dashboard');
    } else {
      window.location.replace('/admin/login');
    }
  }, []);
  return null;
}
