const COOKIE_NAME = 'admin_token';

/** Read token from cookie (client-side only) */
export function getToken(): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie
    .split(';')
    .find(c => c.trim().startsWith(COOKIE_NAME + '='));
  return match ? decodeURIComponent(match.trim().split('=').slice(1).join('=')) : null;
}

/** Save Basic-auth token to cookie (1-day TTL) */
export function setToken(token: string, days = 1): void {
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(token)}; path=/; max-age=${maxAge}; SameSite=Strict`;
}

/** Remove token cookie (logout) */
export function removeToken(): void {
  document.cookie = `${COOKIE_NAME}=; path=/; max-age=0`;
}

export function isLoggedIn(): boolean {
  return !!getToken();
}

/** Create HTTP Basic Auth base64 token from username + password */
export function createBasicToken(username: string, password: string): string {
  return btoa(`${username}:${password}`);
}

/** Return auth header object for fetch calls */
export function authHeaders(): Record<string, string> {
  const token = getToken();
  if (!token) return {};
  return {
    Authorization: `Basic ${token}`,
    'ngrok-skip-browser-warning': 'true',
  };
}
