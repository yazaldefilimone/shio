import { useEffect, useState, useSyncExternalStore } from "react";
import { get } from "./cache";
import { parseTTL } from "./ttl";
import { broadcastInvalidate } from "./channel";
import { set } from "./cache";
import { subscribe } from "./events";

export function useShio<T>(key: string, loader: () => Promise<T>, options?: { ttl?: string | number }) {
  const ttlMs = parseTTL(options?.ttl);

  const subscribeFn = (callback: () => void) => {
    return subscribe(key, callback);
  };

  const getSnapshot = () => {
    return get<T>(key);
  };

  const data = useSyncExternalStore(subscribeFn, getSnapshot);

  useEffect(() => {
    if (data === undefined) {
      let active = true;
      setLoading(true);

      loader()
        .then((fresh) => {
          if (!active) return;
          set(key, fresh, ttlMs);
          broadcastInvalidate(key);
          setLoading(false);
        })
        .catch(() => {
          if (active) setLoading(false);
        });

      return () => {
        active = false;
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, loader, ttlMs]);

  const [loading, setLoading] = useState(data === undefined);

  return { data, loading };
}
