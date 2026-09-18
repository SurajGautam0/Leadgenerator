import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { assertRateLimit, clearRateLimitStore, RateLimitError } from "./rate-limit.ts";

afterEach(() => {
  clearRateLimitStore();
});

describe("assertRateLimit", () => {
  it("allows requests up to the configured limit", () => {
    assertRateLimit("user-1", "scrape", 2, 60_000);
    assertRateLimit("user-1", "scrape", 2, 60_000);
  });

  it("rejects requests after the configured limit", () => {
    assertRateLimit("user-1", "scrape", 1, 60_000);

    assert.throws(
      () => assertRateLimit("user-1", "scrape", 1, 60_000),
      (error: unknown) =>
        error instanceof RateLimitError &&
        error.status === 429 &&
        error.retryAfterSeconds > 0,
    );
  });

  it("keeps users and actions isolated", () => {
    assertRateLimit("user-1", "scrape", 1, 60_000);
    assertRateLimit("user-2", "scrape", 1, 60_000);
    assertRateLimit("user-1", "generate", 1, 60_000);
  });
});
