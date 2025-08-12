import { drizzle } from 'drizzle-orm/neon-serverless';
import { neon } from '@neondatabase/serverless';
import { eq, desc } from 'drizzle-orm';
import {
  users,
  contacts,
  bjjBookings,
  socialPosts,
  type User,
  type InsertUser,
  type Contact,
  type InsertContact,
  type BjjBooking,
  type InsertBjjBooking,
  type SocialPost,
  type InsertSocialPost,
} from '../shared/schema.js';

export interface IStorage {
  // Users
  createUser(user: InsertUser): Promise<User>;
  getUserByEmail(email: string): Promise<User | null>;
  
  // Contacts
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  
  // BJJ Bookings
  createBjjBooking(booking: InsertBjjBooking): Promise<BjjBooking>;
  getBjjBookings(): Promise<BjjBooking[]>;
  
  // Social Posts
  createSocialPost(post: InsertSocialPost): Promise<SocialPost>;
  getSocialPosts(platform?: string): Promise<SocialPost[]>;
  getSocialPostByPostId(postId: string): Promise<SocialPost | null>;
}

// In-memory storage for development
export class MemStorage implements IStorage {
  private users: User[] = [];
  private contacts: Contact[] = [];
  private bjjBookings: BjjBooking[] = [];
  private socialPosts: SocialPost[] = [];
  private nextId = 1;

  async createUser(user: InsertUser): Promise<User> {
    const newUser: User = {
      ...user,
      id: this.nextId++,
      createdAt: new Date(),
    };
    this.users.push(newUser);
    return newUser;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.users.find(u => u.email === email) || null;
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const newContact: Contact = {
      ...contact,
      id: this.nextId++,
      createdAt: new Date(),
    };
    this.contacts.push(newContact);
    return newContact;
  }

  async getContacts(): Promise<Contact[]> {
    return [...this.contacts];
  }

  async createBjjBooking(booking: InsertBjjBooking): Promise<BjjBooking> {
    const newBooking: BjjBooking = {
      ...booking,
      id: this.nextId++,
      createdAt: new Date(),
      message: booking.message || null,
    };
    this.bjjBookings.push(newBooking);
    return newBooking;
  }

  async getBjjBookings(): Promise<BjjBooking[]> {
    return [...this.bjjBookings];
  }

  async createSocialPost(post: InsertSocialPost): Promise<SocialPost> {
    const newPost: SocialPost = {
      ...post,
      id: this.nextId++,
      fetchedAt: new Date(),
      description: post.description || null,
      thumbnailUrl: post.thumbnailUrl || null,
    };
    this.socialPosts.push(newPost);
    return newPost;
  }

  async getSocialPosts(platform?: string): Promise<SocialPost[]> {
    if (platform) {
      return this.socialPosts.filter(p => p.platform === platform);
    }
    return [...this.socialPosts];
  }

  async getSocialPostByPostId(postId: string): Promise<SocialPost | null> {
    return this.socialPosts.find(p => p.postId === postId) || null;
  }
}

// PostgreSQL storage for production
export class PostgresStorage implements IStorage {
  private db: ReturnType<typeof drizzle>;

  constructor() {
    const sql = neon(process.env.DATABASE_URL!);
    this.db = drizzle(sql);
  }

  async createUser(user: InsertUser): Promise<User> {
    const [result] = await this.db.insert(users).values(user).returning();
    return result;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const [result] = await this.db.select().from(users).where(eq(users.email, email));
    return result || null;
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const [result] = await this.db.insert(contacts).values(contact).returning();
    return result;
  }

  async getContacts(): Promise<Contact[]> {
    return await this.db.select().from(contacts).orderBy(desc(contacts.createdAt));
  }

  async createBjjBooking(booking: InsertBjjBooking): Promise<BjjBooking> {
    const [result] = await this.db.insert(bjjBookings).values(booking).returning();
    return result;
  }

  async getBjjBookings(): Promise<BjjBooking[]> {
    return await this.db.select().from(bjjBookings).orderBy(desc(bjjBookings.createdAt));
  }

  async createSocialPost(post: InsertSocialPost): Promise<SocialPost> {
    const [result] = await this.db.insert(socialPosts).values(post).returning();
    return result;
  }

  async getSocialPosts(platform?: string): Promise<SocialPost[]> {
    if (platform) {
      return await this.db.select().from(socialPosts)
        .where(eq(socialPosts.platform, platform))
        .orderBy(desc(socialPosts.publishedAt));
    }
    return await this.db.select().from(socialPosts).orderBy(desc(socialPosts.publishedAt));
  }

  async getSocialPostByPostId(postId: string): Promise<SocialPost | null> {
    const [result] = await this.db.select().from(socialPosts).where(eq(socialPosts.postId, postId));
    return result || null;
  }
}

// Storage factory
export function createStorage(): IStorage {
  if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL) {
    return new PostgresStorage();
  }
  return new MemStorage();
}