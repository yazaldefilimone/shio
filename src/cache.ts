type Entry<T> = {
  value: T;
  ttl?: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const store = new Map<string, Entry<any>>();

export function get<T>(key: string): T | undefined {
  const entry = store.get(key);
  if (!entry) return undefined;
  if (entry.ttl && entry.ttl < Date.now()) {
    store.delete(key);
    return undefined;
  }
  return entry.value;
}

export function set<T>(key: string, value: T, ttlMs?: number): void {
  const ttl = ttlMs ? Date.now() + ttlMs : undefined;
  store.set(key, { value, ttl });
}

export function invalidate(key: string): void {
  store.delete(key);
}
