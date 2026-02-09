// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    externalId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    role: v.union(v.literal("admin"), v.literal("user")),
  })
    .index("by_externalId", ["externalId"])
    .index("by_email", ["email"]),

  cars: defineTable({
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
    status: v.union(v.literal("draft"), v.literal("published")),
    createdBy: v.id("users"),
    updatedAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_createdBy", ["createdBy"])
    .index("by_make_model", ["make", "model"]),
});
