import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertBjjBookingSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.json({ message: "Contact form submitted successfully", id: contact.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid form data", errors: error.errors });
      } else {
        console.error("Contact form error:", error);
        res.status(500).json({ message: "Failed to submit contact form" });
      }
    }
  });

  // BJJ booking form submission
  app.post("/api/bjj-booking", async (req, res) => {
    try {
      const validatedData = insertBjjBookingSchema.parse(req.body);
      const booking = await storage.createBjjBooking(validatedData);
      res.json({ message: "BJJ lesson booking submitted successfully", id: booking.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid booking data", errors: error.errors });
      } else {
        console.error("BJJ booking error:", error);
        res.status(500).json({ message: "Failed to submit booking request" });
      }
    }
  });

  // Resume download endpoint
  app.get("/api/resume", (req, res) => {
    // In production, this would serve the actual PDF file
    res.json({ 
      message: "Resume download would be implemented here",
      downloadUrl: "/assets/earl-hickson-jr-resume.pdf"
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
