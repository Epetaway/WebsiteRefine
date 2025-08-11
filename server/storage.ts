import { type User, type InsertUser, type Contact, type InsertContact, type BjjBooking, type InsertBjjBooking } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContact(contact: InsertContact): Promise<Contact>;
  createBjjBooking(booking: InsertBjjBooking): Promise<BjjBooking>;
  getContacts(): Promise<Contact[]>;
  getBjjBookings(): Promise<BjjBooking[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contacts: Map<string, Contact>;
  private bjjBookings: Map<string, BjjBooking>;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.bjjBookings = new Map();
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
      ...insertContact, 
      id, 
      createdAt: new Date() 
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async createBjjBooking(insertBooking: InsertBjjBooking): Promise<BjjBooking> {
    const id = randomUUID();
    const booking: BjjBooking = { 
      ...insertBooking, 
      id, 
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
}

export const storage = new MemStorage();
