import { Id } from "./_generated/dataModel";
import { MutationCtx, QueryCtx } from "./_generated/server";

type Ctx = QueryCtx | MutationCtx;

function parseAdminEmails(raw: string | undefined): Set<string> {
  if (!raw) return new Set();
  return new Set(
    raw
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean),
  );
}

export async function getIdentityOrThrow(ctx: Ctx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("Not authenticated");
  return identity;
}

export async function getOrCreateUser(ctx: MutationCtx) {
  const identity = await getIdentityOrThrow(ctx);

  const externalId = identity.subject; // Clerk userId
  const email = (identity.email ?? "").toLowerCase();
  const name = identity.name ?? undefined;

  const existing = await ctx.db
    .query("users")
    .withIndex("by_externalId", (q) => q.eq("externalId", externalId))
    .unique();

  if (existing) return existing;

  const allowlist = parseAdminEmails(process.env.ADMIN_EMAILS);
  const role = allowlist.has(email) ? "admin" : "user";

  const userId = await ctx.db.insert("users", {
    externalId,
    email,
    name,
    role,
  });

  return (await ctx.db.get(userId))!;
}

export async function requireAdmin(ctx: MutationCtx) {
  const user = await getOrCreateUser(ctx);
  if (user.role !== "admin") throw new Error("Admin only");
  return user as { _id: Id<"users">; role: "admin" };
}
