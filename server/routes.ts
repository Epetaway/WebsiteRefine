import { Router } from 'express';
import { createStorage } from './storage.js';
import { insertContactSchema, insertBjjBookingSchema } from '../shared/schema.js';
import { z } from 'zod';

const router = Router();
const storage = createStorage();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Contact form submission
router.post('/contact', async (req, res) => {
  try {
    const validatedData = insertContactSchema.parse(req.body);
    const contact = await storage.createContact(validatedData);
    
    // TODO: Send email notification via SendGrid
    console.log('New contact submission:', contact);
    
    res.status(201).json({ 
      success: true, 
      message: 'Contact form submitted successfully',
      id: contact.id 
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ 
        success: false, 
        message: 'Invalid form data', 
        errors: error.errors 
      });
    } else {
      console.error('Contact form error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Internal server error' 
      });
    }
  }
});

// BJJ booking submission
router.post('/bjj-booking', async (req, res) => {
  try {
    const validatedData = insertBjjBookingSchema.parse(req.body);
    const booking = await storage.createBjjBooking(validatedData);
    
    // TODO: Send email notification via SendGrid
    console.log('New BJJ booking:', booking);
    
    res.status(201).json({ 
      success: true, 
      message: 'BJJ lesson booking submitted successfully',
      id: booking.id 
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ 
        success: false, 
        message: 'Invalid booking data', 
        errors: error.errors 
      });
    } else {
      console.error('BJJ booking error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Internal server error' 
      });
    }
  }
});

// Get social media posts
router.get('/social-posts', async (req, res) => {
  try {
    const platform = req.query.platform as string | undefined;
    const posts = await storage.getSocialPosts(platform);
    
    res.json({ 
      success: true, 
      posts,
      count: posts.length 
    });
  } catch (error) {
    console.error('Social posts error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch social posts' 
    });
  }
});

// Resume download endpoint
router.get('/resume', (req, res) => {
  // TODO: Serve actual resume PDF
  res.json({ 
    message: 'Resume download not yet implemented',
    // For now, redirect to LinkedIn or provide a download link
    linkedinUrl: 'https://linkedin.com/in/earlhicksonjr'
  });
});

// Admin endpoints (for future use)
router.get('/admin/contacts', async (req, res) => {
  try {
    const contacts = await storage.getContacts();
    res.json({ success: true, contacts });
  } catch (error) {
    console.error('Admin contacts error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch contacts' });
  }
});

router.get('/admin/bjj-bookings', async (req, res) => {
  try {
    const bookings = await storage.getBjjBookings();
    res.json({ success: true, bookings });
  } catch (error) {
    console.error('Admin bookings error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch bookings' });
  }
});

export default router;