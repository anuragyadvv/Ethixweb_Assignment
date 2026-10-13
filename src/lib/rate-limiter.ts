import crypto from "crypto";

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

// In-memory sliding window cache for rate limiting
// NOTE: On serverless platforms (like Vercel Lambdas), memory is scoped to warm instances.
// For enterprise multi-region scale across ephemeral containers, a distributed store such as
// Upstash Redis (@upstash/ratelimit) should be attached.
const rateLimitStore = new Map<string, RateLimitRecord>();

// Clean up expired entries every 10 minutes to avoid memory leaks
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    rateLimitStore.forEach((record, key) => {
      if (now > record.resetTime) {
        rateLimitStore.delete(key);
      }
    });
  }, 10 * 60 * 1000).unref?.();
}

export function hashIdentifier(input: string): string {
  return crypto.createHash("sha256").update(input).digest("hex").slice(0, 16);
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetInSeconds: number;
}

/**
 * Checks if a given client key has exceeded the rate limit.
 * @param identifier Client IP or identifier
 * @param limit Max allowed requests in window (default: 5)
 * @param windowMs Time window in milliseconds (default: 10 minutes)
 */
export function checkRateLimit(
  identifier: string,
  limit = 5,
  windowMs = 10 * 60 * 1000
): RateLimitResult {
  const key = hashIdentifier(identifier);
  const now = Date.now();
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetTime) {
    // New or expired window
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + windowMs,
    });

    return {
      success: true,
      limit,
      remaining: limit - 1,
      resetInSeconds: Math.ceil(windowMs / 1000),
    };
  }

  if (record.count >= limit) {
    const resetInSeconds = Math.ceil((record.resetTime - now) / 1000);
    return {
      success: false,
      limit,
      remaining: 0,
      resetInSeconds,
    };
  }

  record.count += 1;
  const resetInSeconds = Math.ceil((record.resetTime - now) / 1000);

  return {
    success: true,
    limit,
    remaining: limit - record.count,
    resetInSeconds,
  };
}
