export class RateLimitError extends Error {
  readonly status = 429;
  readonly retryAfterSeconds: number;

  constructor(retryAfterSeconds: number) {
    super("Too many requests. Try again later.");
    this.name = "RateLimitError";
    this.retryAfterSeconds = retryAfterSeconds;
  }
}

type Bucket = {
  startedAt: number;
  count: number;
};

type RateLimitStore = Map<string, Bucket>;

const globalRef = globalThis as typeof globalThis & {
  __leadRateLimits__?: RateLimitStore;
};

const store = (globalRef.__leadRateLimits__ ??= new Map());

export function assertRateLimit(
  userId: string,
  action: "scrape" | "generate",
  limit: number,
  windowMs: number,
) {
  const key = `${userId}:${action}`;
  const now = Date.now();
  const current = store.get(key);

  if (!current || now - current.startedAt >= windowMs) {
    store.set(key, { startedAt: now, count: 1 });
    return;
  }

  if (current.count >= limit) {
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((windowMs - (now - current.startedAt)) / 1000),
    );
    throw new RateLimitError(retryAfterSeconds);
  }

  current.count += 1;
}

export function clearRateLimitStore() {
  store.clear();
}
