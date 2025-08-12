import { type User, type InsertUser, type Contact, type InsertContact, type BjjBooking, type InsertBjjBooking, type SocialMediaPost, type InsertSocialMediaPost } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContact(contact: InsertContact): Promise<Contact>;
  createBjjBooking(booking: InsertBjjBooking): Promise<BjjBooking>;
  getContacts(): Promise<Contact[]>;
  getBjjBookings(): Promise<BjjBooking[]>;
  createSocialMediaPost(post: InsertSocialMediaPost): Promise<SocialMediaPost>;
  getSocialMediaPosts(platform?: string): Promise<SocialMediaPost[]>;
  updateSocialMediaPost(postId: string, post: Partial<SocialMediaPost>): Promise<SocialMediaPost | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contacts: Map<string, Contact>;
  private bjjBookings: Map<string, BjjBooking>;
  private socialMediaPosts: Map<number, SocialMediaPost>;
  private postIdCounter: number;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.bjjBookings = new Map();
    this.socialMediaPosts = new Map();
    this.postIdCounter = 1;
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = { 
      id,
      name: insertContact.name,
      email: insertContact.email,
      phone: insertContact.phone ?? null,
      message: insertContact.message ?? null,
      type: insertContact.type ?? 'contact',
      smsConsent: insertContact.smsConsent ?? null,
      createdAt: new Date() 
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async createBjjBooking(insertBooking: InsertBjjBooking): Promise<BjjBooking> {
    const id = randomUUID();
    const booking: BjjBooking = { 
      id,
      name: insertBooking.name,
      email: insertBooking.email,
      phone: insertBooking.phone,
      smsConsent: insertBooking.smsConsent,
      program: insertBooking.program,
      goals: insertBooking.goals ?? null,
      availability: insertBooking.availability ?? null,
      createdAt: new Date() 
    };
    this.bjjBookings.set(id, booking);
    return booking;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async getBjjBookings(): Promise<BjjBooking[]> {
    return Array.from(this.bjjBookings.values());
  }

  async createSocialMediaPost(insertPost: InsertSocialMediaPost): Promise<SocialMediaPost> {
    const id = this.postIdCounter++;
    const post: SocialMediaPost = { 
      id,
      platform: insertPost.platform,
      postId: insertPost.postId,
      mediaType: insertPost.mediaType,
      mediaUrl: insertPost.mediaUrl ?? null,
      thumbnailUrl: insertPost.thumbnailUrl ?? null,
      caption: insertPost.caption ?? null,
      permalink: insertPost.permalink,
      timestamp: insertPost.timestamp,
      createdAt: new Date() 
    };
    this.socialMediaPosts.set(id, post);
    return post;
  }

  async getSocialMediaPosts(platform?: string): Promise<SocialMediaPost[]> {
    const posts = Array.from(this.socialMediaPosts.values());
    if (platform) {
      return posts.filter(post => post.platform === platform);
    }
    return posts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  async updateSocialMediaPost(postId: string, updates: Partial<SocialMediaPost>): Promise<SocialMediaPost | undefined> {
    const posts = Array.from(this.socialMediaPosts.entries());
    const postEntry = posts.find(([_, post]) => post.postId === postId);
    if (postEntry) {
      const [id, post] = postEntry;
      const updatedPost = { ...post, ...updates };
      this.socialMediaPosts.set(id, updatedPost);
      return updatedPost;
    }
    return undefined;
  }
}

export const storage = new MemStorage();
