import { describe, expect, it, vi, beforeEach } from "vitest";
import type { TrpcContext } from "./_core/context";

// ─── Mock the db module ───────────────────────────────────────────────────────
vi.mock("./db", () => ({
  subscribeEmail: vi.fn(),
}));

// ─── Mock the notification module ────────────────────────────────────────────
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

import { appRouter } from "./routers";
import { subscribeEmail } from "./db";

const mockedSubscribeEmail = vi.mocked(subscribeEmail);

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("subscription.subscribe", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns success: true for a new email", async () => {
    mockedSubscribeEmail.mockResolvedValueOnce({ success: true });

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.subscription.subscribe({ email: "test@example.com" });

    expect(result).toEqual({ success: true });
    expect(mockedSubscribeEmail).toHaveBeenCalledWith("test@example.com");
  });

  it("returns success: false with reason already_subscribed for duplicate email", async () => {
    mockedSubscribeEmail.mockResolvedValueOnce({
      success: false,
      reason: "already_subscribed",
    });

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.subscription.subscribe({ email: "existing@example.com" });

    expect(result).toEqual({ success: false, reason: "already_subscribed" });
  });

  it("throws an error when the database is unavailable", async () => {
    mockedSubscribeEmail.mockResolvedValueOnce({
      success: false,
      reason: "db_unavailable",
    });

    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.subscription.subscribe({ email: "test@example.com" })
    ).rejects.toThrow("Database unavailable");
  });

  it("rejects an invalid email address", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.subscription.subscribe({ email: "not-an-email" })
    ).rejects.toThrow();
    expect(mockedSubscribeEmail).not.toHaveBeenCalled();
  });
});
