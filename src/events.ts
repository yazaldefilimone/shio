const subscribers = new Map<string, Set<() => void>>();

export function subscribe(key: string, fn: () => void): () => void {
  if (!subscribers.has(key)) subscribers.set(key, new Set());
  subscribers.get(key)!.add(fn);
  return () => subscribers.get(key)!.delete(fn);
}

export function notify(key: string): void {
  subscribers.get(key)?.forEach((fn) => fn());
}
