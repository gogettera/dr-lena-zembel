
let metaCache: any = null;
let lastFetchTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes cache TTL

export function getCachedMeta() {
  const now = Date.now();
  if (metaCache && now - lastFetchTime < CACHE_TTL) {
    return metaCache;
  }
  return null;
}

export function setCachedMeta(data: any) {
  metaCache = data;
  lastFetchTime = Date.now();
}
