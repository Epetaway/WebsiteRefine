import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, serial, integer, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message"),
  type: text("type").notNull().default("general"), // 'general', 'bjj_booking'
  smsConsent: boolean("sms_consent").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const bjjBookings = pgTable("bjj_bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  program: text("program").notNull(),
  goals: text("goals"),
  availability: text("availability"),
  smsConsent: boolean("sms_consent").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Social media content table for automatic feeds
export const socialMediaPosts = pgTable("social_media_posts", {
  id: serial("id").primaryKey(),
  platform: text("platform").notNull(), // 'instagram' or 'youtube'
  postId: text("post_id").notNull().unique(),
  mediaType: text("media_type").notNull(), // 'video', 'image', 'carousel'
  mediaUrl: text("media_url"),
  thumbnailUrl: text("thumbnail_url"),
  caption: text("caption"),
  permalink: text("permalink").notNull(),
  timestamp: timestamp("timestamp").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
});

export const insertBjjBookingSchema = createInsertSchema(bjjBookings).omit({
  id: true,
  createdAt: true,
});

export const insertSocialMediaPostSchema = createInsertSchema(socialMediaPosts).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Contact = typeof contacts.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type BjjBooking = typeof bjjBookings.$inferSelect;
export type InsertBjjBooking = z.infer<typeof insertBjjBookingSchema>;
export type SocialMediaPost = typeof socialMediaPosts.$inferSelect;
export type InsertSocialMediaPost = z.infer<typeof insertSocialMediaPostSchema>;

// Requests to read gated notes (docs/ACCESS-GATE.md). Queried with plain SQL in
// server/access/store.ts; this definition exists so `npm run db:push` creates the table.
export const accessRequests = pgTable("access_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  document: text("document").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  reason: text("reason"),
  status: text("status").notNull().default("pending"), // pending | approved | denied | revoked
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  decidedAt: timestamp("decided_at", { withTimezone: true }),
  passwordHash: text("password_hash"),
  passwordExpiresAt: timestamp("password_expires_at", { withTimezone: true }),
  failedLogins: integer("failed_logins").notNull().default(0),
  lockedUntil: timestamp("locked_until", { withTimezone: true }),
  lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
}, (table) => [
  index("access_requests_email_document_idx").on(table.email, table.document),
  index("access_requests_created_at_idx").on(table.createdAt),
]);
