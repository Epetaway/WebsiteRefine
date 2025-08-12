import { pgTable, text, timestamp, integer, serial, boolean } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

// Users table (for future authentication)
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  passwordHash: text('password_hash').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Contacts table for general contact form submissions
export const contacts = pgTable('contacts', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  subject: text('subject').notNull(),
  message: text('message').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// BJJ bookings table for lesson booking requests
export const bjjBookings = pgTable('bjj_bookings', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  experience: text('experience').notNull(),
  goals: text('goals').notNull(),
  availability: text('availability').notNull(),
  message: text('message'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Social media posts table for automatic content
export const socialPosts = pgTable('social_posts', {
  id: serial('id').primaryKey(),
  platform: text('platform').notNull(), // 'youtube', 'instagram'
  postId: text('post_id').notNull().unique(),
  title: text('title').notNull(),
  description: text('description'),
  thumbnailUrl: text('thumbnail_url'),
  url: text('url').notNull(),
  publishedAt: timestamp('published_at').notNull(),
  fetchedAt: timestamp('fetched_at').defaultNow().notNull(),
});

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertContactSchema = createInsertSchema(contacts).omit({ id: true, createdAt: true });
export const insertBjjBookingSchema = createInsertSchema(bjjBookings).omit({ id: true, createdAt: true });
export const insertSocialPostSchema = createInsertSchema(socialPosts).omit({ id: true, fetchedAt: true });

// Type definitions
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Contact = typeof contacts.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;

export type BjjBooking = typeof bjjBookings.$inferSelect;
export type InsertBjjBooking = z.infer<typeof insertBjjBookingSchema>;

export type SocialPost = typeof socialPosts.$inferSelect;
export type InsertSocialPost = z.infer<typeof insertSocialPostSchema>;