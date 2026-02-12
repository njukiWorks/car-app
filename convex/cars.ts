import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireAdmin } from "./authz";

export const listPublished = query({
  args: {},
  handler: async (ctx) => {
    const cars = await ctx.db
      .query("cars")
      .withIndex("by_status", (q) => q.eq("status", "published"))
      .collect();

    return cars.sort((a, b) => b.updatedAt - a.updatedAt);
  },
});

export const adminList = query({
  args: {},
  handler: async (ctx) => {
    // Server-side enforcement is done on mutations (create/update/delete).

    const cars = await ctx.db.query("cars").collect();
    return cars.sort((a, b) => b.updatedAt - a.updatedAt);
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    make: v.string(),
    model: v.string(),
    year: v.number(),
    price: v.number(),
    currency: v.string(),
    mileageKm: v.number(),
    location: v.string(),
    description: v.string(),
    images: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const admin = await requireAdmin(ctx);

    const now = Date.now();
    const id = await ctx.db.insert("cars", {
      ...args,
      status: "draft",
      createdBy: admin._id,
      updatedAt: now,
    });

    return id;
  },
});

export const update = mutation({
  args: {
    id: v.id("cars"),
    title: v.string(),
    make: v.string(),
    model: v.string(),
    year: v.number(),
    price: v.number(),
    currency: v.string(),
    mileageKm: v.number(),
    location: v.string(),
    description: v.string(),
    images: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    const now = Date.now();
    await ctx.db.patch(args.id, {
      title: args.title,
      make: args.make,
      model: args.model,
      year: args.year,
      price: args.price,
      currency: args.currency,
      mileageKm: args.mileageKm,
      location: args.location,
      description: args.description,
      images: args.images,
      updatedAt: now,
    });
  },
});

export const remove = mutation({
  args: { id: v.id("cars") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    await ctx.db.delete(args.id);
  },
});

export const setStatus = mutation({
  args: {
    id: v.id("cars"),
    status: v.union(v.literal("draft"), v.literal("published")),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    await ctx.db.patch(args.id, { status: args.status, updatedAt: Date.now() });
  },
});
