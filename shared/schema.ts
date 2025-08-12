import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, serial } from "drizzle-orm/pg-core";
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
