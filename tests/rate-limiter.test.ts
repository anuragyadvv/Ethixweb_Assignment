import { describe, it, expect } from "vitest";
import { checkRateLimit, hashIdentifier } from "@/lib/rate-limiter";

describe("Rate Limiter & Abuse Protection", () => {
  it("should generate deterministic sha256 identifier hashes", () => {
    const hash1 = hashIdentifier("192.168.1.1:Mozilla/5.0");
    const hash2 = hashIdentifier("192.168.1.1:Mozilla/5.0");
    const hash3 = hashIdentifier("10.0.0.1:Mozilla/5.0");

    expect(hash1).toBe(hash2);
    expect(hash1).not.toBe(hash3);
    expect(hash1.length).toBe(16);
  });

  it("should allow submissions within window and block upon exceeding limit", () => {
    const clientKey = "test-client-ip-" + Date.now();
    const limit = 3;
    const windowMs = 5000;

    // 1st request -> success, 2 remaining
    const r1 = checkRateLimit(clientKey, limit, windowMs);
    expect(r1.success).toBe(true);
    expect(r1.remaining).toBe(2);

    // 2nd request -> success, 1 remaining
    const r2 = checkRateLimit(clientKey, limit, windowMs);
    expect(r2.success).toBe(true);
    expect(r2.remaining).toBe(1);

    // 3rd request -> success, 0 remaining
    const r3 = checkRateLimit(clientKey, limit, windowMs);
    expect(r3.success).toBe(true);
    expect(r3.remaining).toBe(0);

    // 4th request -> blocked (rate limited!)
    const r4 = checkRateLimit(clientKey, limit, windowMs);
    expect(r4.success).toBe(false);
    expect(r4.remaining).toBe(0);
    expect(r4.resetInSeconds).toBeGreaterThan(0);
  });

  it("should keep distinct limits for different clients", () => {
    const clientA = "client-A-" + Date.now();
    const clientB = "client-B-" + Date.now();

    const rA = checkRateLimit(clientA, 2, 5000);
    const rB = checkRateLimit(clientB, 2, 5000);

    expect(rA.remaining).toBe(1);
    expect(rB.remaining).toBe(1);
  });
});
