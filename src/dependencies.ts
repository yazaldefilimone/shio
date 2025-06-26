import { invalidate } from "./cache";
import { broadcastInvalidate } from "./channel";
import { notify } from "./events";

const dependents = new Map<string, Set<string>>();

/**
 * add dependency from key to dependent_key
 * when key invalidates, dependent_key should also invalidate
 */
export function addDependency(key: string, dependent_key: string) {
  if (!dependents.has(key)) {
    dependents.set(key, new Set());
  }
  dependents.get(key)!.add(dependent_key);
}

/**
 * get all dependents of key
 */
export function getDependents(key: string): Set<string> | undefined {
  return dependents.get(key);
}

/**
 * invalidate key and all its dependents recursively
 */
export function invalidateWithDeps(key: string, visited = new Set<string>()) {
  if (visited.has(key)) return; // avoid loops
  visited.add(key);

  invalidate(key);
  notify(key);
  broadcastInvalidate(key);

  const deps = dependents.get(key);
  if (deps) {
    deps.forEach((dep_key) => {
      invalidateWithDeps(dep_key, visited);
    });
  }
}
