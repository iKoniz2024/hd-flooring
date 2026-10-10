type CacheListener = (url: string, data: any) => void;

const memoryCache = new Map<string, { data: any; timestamp: number }>();
const listeners = new Set<CacheListener>();

/**
 * Subscribe to API cache updates / invalidations
 */
export function subscribeApiCache(listener: CacheListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function notifyCacheListeners(url: string, data?: any) {
  listeners.forEach((listener) => {
    try {
      listener(url, data);
    } catch (err) {
      console.error('Cache listener error:', err);
    }
  });
}

/**
 * Lightning-fast memory cached fetch helper.
 * Provides instant 0ms data return from memory while updating silently in background.
 */
export async function fetchWithCache<T = any>(url: string): Promise<T> {
  const cached = memoryCache.get(url);
  const now = Date.now();

  // If cached data exists, return immediately for instant 0ms load time!
  if (cached) {
    // Revalidate in background if older than 5 seconds
    if (now - cached.timestamp > 5000) {
      fetch(url, { cache: 'no-store' })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.success !== false) {
            memoryCache.set(url, { data, timestamp: Date.now() });
            notifyCacheListeners(url, data);
          }
        })
        .catch(() => {});
    }
    return cached.data as T;
  }

  // Fetch initial request
  const res = await fetch(url, { cache: 'no-store' });
  const data = await res.json();
  if (data && data.success !== false) {
    memoryCache.set(url, { data, timestamp: Date.now() });
    notifyCacheListeners(url, data);
  }
  return data as T;
}

/**
 * Manually update cache memory data for a specific URL (useful for optimistic updates)
 */
export function updateApiCache<T = any>(url: string, data: T) {
  memoryCache.set(url, { data, timestamp: Date.now() });
  notifyCacheListeners(url, data);
}

/**
 * Clear memory cache (call this after POST/PUT/DELETE mutations in admin)
 */
export function invalidateApiCache(url?: string) {
  if (url) {
    memoryCache.delete(url);
    notifyCacheListeners(url, null);
  } else {
    memoryCache.clear();
    notifyCacheListeners('*', null);
  }
}

