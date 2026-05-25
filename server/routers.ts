import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { subscribeEmail } from "./db";
import { notifyOwner } from "./_core/notification";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  subscription: router({
    subscribe: publicProcedure
      .input(z.object({ email: z.string().email("Please enter a valid email address.") }))
      .mutation(async ({ input }) => {
        const result = await subscribeEmail(input.email);
        if (result.success) {
          // Notify the owner of a new subscriber (fire-and-forget)
          notifyOwner({
            title: "New email subscriber",
            content: `${input.email} signed up for launch notifications.`,
          }).catch((err) => {
            console.warn("[subscription] Owner notification failed (non-critical):", err);
          });
          return { success: true as const };
        }
        if (result.reason === "already_subscribed") {
          return { success: false as const, reason: "already_subscribed" as const };
        }
        throw new Error("Database unavailable. Please try again later.");
      }),
  }),
});

export type AppRouter = typeof appRouter;
