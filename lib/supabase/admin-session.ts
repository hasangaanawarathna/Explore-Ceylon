const ADMIN_SESSION_STARTED_AT = "explore-ceylon-admin-session-started-at";
export const ADMIN_SESSION_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

export function isAdminSessionWithinLimit(startedAt: string | null, now = Date.now()) {
  if (!startedAt) return true;
  const timestamp = Number(startedAt);
  return Number.isFinite(timestamp) && timestamp <= now && now - timestamp <= ADMIN_SESSION_MAX_AGE_MS;
}

export function markAdminSessionStarted() {
  window.localStorage.setItem(ADMIN_SESSION_STARTED_AT, String(Date.now()));
}

export function ensureAdminSessionStarted() {
  if (!window.localStorage.getItem(ADMIN_SESSION_STARTED_AT)) markAdminSessionStarted();
}

export function clearAdminSessionStarted() {
  window.localStorage.removeItem(ADMIN_SESSION_STARTED_AT);
}

export function isStoredAdminSessionWithinLimit() {
  return isAdminSessionWithinLimit(window.localStorage.getItem(ADMIN_SESSION_STARTED_AT));
}
