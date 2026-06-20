import { authHeaders } from './admin-auth';

export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://jobandubackend.up.railway.app/api/admin';
export const PUBLIC_API_BASE = API_BASE.replace('/admin', '');
export const CONTENT_API_BASE = PUBLIC_API_BASE + '/content';

type FetchOptions = RequestInit & { params?: Record<string, string> };

/** Core fetch wrapper — attaches auth headers, handles errors */
export async function adminFetch<T = unknown>(path: string, options: FetchOptions = {}): Promise<T> {
  const { params, ...init } = options;
  let url = `${API_BASE}${path}`;
  if (params) {
    const qs = new URLSearchParams(params).toString();
    if (qs) url += `?${qs}`;
  }
  const res = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...authHeaders(),
      ...(init.headers as Record<string, string> | undefined),
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `Error ${res.status}`);
  }
  // Some DELETE/PATCH endpoints may return 204 with no body
  const text = await res.text();
  return (text ? JSON.parse(text) : null) as T;
}

/* =================== STATS =================== */
export type Stats = Record<string, number | string>;
export const getStats = () => adminFetch<Stats>('/stats');

/* =================== APPLICANTS =================== */
export interface Applicant {
  id: string;
  name?: string;
  full_name?: string;
  email?: string;
  phone?: string;
  nationality?: string;
  location?: string;
  position?: string;
  skills?: string[];
  experience_years?: number;
  dob?: string;
  status?: string;
  tags?: string[];
  cv?: string;
  cv_filename?: string;
  cv_url?: string;
  created_at?: string;
  [key: string]: unknown;
}

export const getApplicants = (params?: Record<string, string>) =>
  adminFetch<Applicant[]>('/applicants', { params });

export const updateApplicant = (id: string, body: Partial<Applicant>) =>
  adminFetch(`/applicants/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  });

export const deleteApplicant = (id: string) =>
  adminFetch(`/applicants/${id}`, { method: 'DELETE' });

export const downloadCvUrl = (id: string) =>
  `${API_BASE}/applicants/${id}/download-cv`;

/* =================== EMPLOYERS =================== */
export interface Employer {
  id: string;
  company_name?: string;
  contact_person?: string;
  email?: string;
  phone?: string;
  requirements?: string[];
  location?: string;
  notes?: string;
  status?: string;
  created_at?: string;
  [key: string]: unknown;
}

export const getEmployers = (params?: Record<string, string>) =>
  adminFetch<Employer[]>('/employers', { params });

export const updateEmployer = (id: string, body: Partial<Employer>) =>
  adminFetch(`/employers/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  });

export const deleteEmployer = (id: string) =>
  adminFetch(`/employers/${id}`, { method: 'DELETE' });

/* =================== SEND EMAIL =================== */
export interface SendEmailPayload {
  recipient_id?: string;
  recipient_type?: 'applicant' | 'employer';
  to?: string;
  subject: string;
  body: string;
}
export const sendEmail = (payload: SendEmailPayload) =>
  adminFetch('/send-email', { method: 'POST', body: JSON.stringify(payload) });

/* =================== CONTENT: CONTACT =================== */
export interface ContactContent {
  id?: string;
  company_name: string;
  street: string;
  zip_code: string;
  city: string;
  country: string;
  phone: string;
  email: string;
}

/** Public GET — no auth required */
export const getContentContact = () =>
  fetch(`${CONTENT_API_BASE}/contact`)
    .then(r => { if (!r.ok) throw new Error(`Error ${r.status}`); return r.json() as Promise<ContactContent>; });

/** Admin PUT — auth required */
export const putContentContact = (body: Omit<ContactContent, 'id'>) =>
  adminFetch<ContactContent>('/content/contact', {
    method: 'PUT',
    body: JSON.stringify(body),
  });

/* =================== CONTENT: TEAM =================== */
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  phone?: string | null;
  email: string;
}

/** Public GET — no auth required */
export const getContentTeam = () =>
  fetch(`${CONTENT_API_BASE}/team`)
    .then(r => { if (!r.ok) throw new Error(`Error ${r.status}`); return r.json() as Promise<TeamMember[]>; });

/** Admin POST — auth required */
export const addTeamMember = (body: Omit<TeamMember, 'id'>) =>
  adminFetch<TeamMember>('/content/team', {
    method: 'POST',
    body: JSON.stringify(body),
  });

/** Admin PATCH — auth required */
export const updateTeamMember = (id: string, body: Omit<TeamMember, 'id'>) =>
  adminFetch<TeamMember>(`/content/team/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  });

/** Admin DELETE — auth required */
export const deleteTeamMember = (id: string) =>
  adminFetch(`/content/team/${id}`, { method: 'DELETE' });

/* =================== CONTENT: JOBS =================== */
export interface JobContent {
  id: string;
  title: string;
  location: string;
  apply_url?: string | null;
  is_active: boolean;
}

/** Public GET — no auth required */
export const getContentJobs = () =>
  fetch(`${CONTENT_API_BASE}/jobs`)
    .then(r => { if (!r.ok) throw new Error(`Error ${r.status}`); return r.json() as Promise<JobContent[]>; });

/** Admin POST — auth required */
export const addJob = (body: Omit<JobContent, 'id'>) =>
  adminFetch<JobContent>('/content/jobs', {
    method: 'POST',
    body: JSON.stringify(body),
  });

/** Admin PATCH — auth required */
export const updateJob = (id: string, body: Omit<JobContent, 'id'>) =>
  adminFetch<JobContent>(`/content/jobs/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  });

/** Admin DELETE — auth required */
export const deleteJob = (id: string) =>
  adminFetch(`/content/jobs/${id}`, { method: 'DELETE' });
