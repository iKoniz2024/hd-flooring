const memoryCache = new Map<string, { data: any; timestamp: number }>();

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
  }
  return data as T;
}

/**
 * Clear memory cache (call this after POST/PUT/DELETE mutations in admin)
 */
export function invalidateApiCache(url?: string) {
  if (url) {
    memoryCache.delete(url);
  } else {
    memoryCache.clear();
  }
}
