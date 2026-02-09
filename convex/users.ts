import { mutation, query } from "./_generated/server";
import { getIdentityOrThrow, getOrCreateUser } from "./authz";

export const me = query({
  args: {},
  handler: async (ctx) => {
    const identity = await getIdentityOrThrow(ctx);

    const user = await ctx.db
      .query("users")
      .withIndex("by_externalId", (q) => q.eq("externalId", identity.subject))
      .unique();

    if (!user) return null;
    return {
      id: user._id,
      email: user.email,
      role: user.role,
      name: user.name ?? null,
    };
  },
});

export const syncMe = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await getOrCreateUser(ctx);
    return { id: user._id, email: user.email, role: user.role };
  },
});
