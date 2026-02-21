/**
 * Simple in-memory rate limiter using a sliding window.
 * Limits: max 3 requests per window (10 minutes) per IP.
 *
 * NOTE: This resets on server restart and doesn't work across
 * multiple serverless instances. See TODO_LATER.md to upgrade
 * to Upstash Redis for production.
 */

interface RequestRecord {
    count: number;
    windowStart: number;
}

const store = new Map<string, RequestRecord>();

const MAX_REQUESTS = 3;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes

export function checkRateLimit(ip: string): {
    allowed: boolean;
    remaining: number;
    resetInMs: number;
} {
    const now = Date.now();
    const record = store.get(ip);

    if (!record || now - record.windowStart > WINDOW_MS) {
        // New window
        store.set(ip, { count: 1, windowStart: now });
        return { allowed: true, remaining: MAX_REQUESTS - 1, resetInMs: WINDOW_MS };
    }

    if (record.count >= MAX_REQUESTS) {
        const resetInMs = WINDOW_MS - (now - record.windowStart);
        return { allowed: false, remaining: 0, resetInMs };
    }

    record.count += 1;
    return {
        allowed: true,
        remaining: MAX_REQUESTS - record.count,
        resetInMs: WINDOW_MS - (now - record.windowStart),
    };
}
