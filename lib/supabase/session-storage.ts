type AuthStorage = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
};

export function createSessionOnlyStorage(sessionStorage?: AuthStorage): AuthStorage {
  const memory = new Map<string, string>();

  return {
    getItem(key) {
      try {
        return sessionStorage?.getItem(key) ?? memory.get(key) ?? null;
      } catch {
        return memory.get(key) ?? null;
      }
    },
    setItem(key, value) {
      memory.set(key, value);
      try {
        sessionStorage?.setItem(key, value);
      } catch {
        // Memory keeps the active tab usable when browser storage is unavailable.
      }
    },
    removeItem(key) {
      memory.delete(key);
      try {
        sessionStorage?.removeItem(key);
      } catch {
        // The in-memory copy has still been cleared.
      }
    },
  };
}

export function supabaseAuthStorageKey(url: string) {
  const projectRef = new URL(url).hostname.split(".")[0];
  return `sb-${projectRef}-auth-token`;
}
