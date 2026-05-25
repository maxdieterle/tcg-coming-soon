import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { emailSubscriptions, InsertUser, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// TODO: add feature queries here as your schema grows.

/**
 * Subscribe an email address. Returns { success: true } on new signup,
 * or { success: false, reason: 'already_subscribed' } if the email already exists.
 */
export async function subscribeEmail(
  email: string
): Promise<{ success: true } | { success: false; reason: "already_subscribed" | "db_unavailable" }> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot subscribe email: database not available");
    return { success: false, reason: "db_unavailable" };
  }

  try {
    await db.insert(emailSubscriptions).values({ email });
    return { success: true };
  } catch (err: unknown) {
    // MySQL duplicate entry error code
    if (
      err &&
      typeof err === "object" &&
      "code" in err &&
      (err as { code: string }).code === "ER_DUP_ENTRY"
    ) {
      return { success: false, reason: "already_subscribed" };
    }
    throw err;
  }
}

/** List all email subscriptions (admin use). */
export async function listEmailSubscriptions() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(emailSubscriptions).orderBy(emailSubscriptions.createdAt);
}
