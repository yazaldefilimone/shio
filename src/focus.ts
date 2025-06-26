import { invalidate } from "./cache";
import { notify } from "./events";

const activeKeys = new Set<string>();

window.addEventListener("focus", () => {
  for (const key of activeKeys) {
    invalidate(key);
    notify(key);
  }
});

export function tracKey(key: string): () => void {
  activeKeys.add(key);
  return () => activeKeys.delete(key);
}
