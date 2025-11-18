import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertBjjBookingSchema, insertSocialMediaPostSchema } from "@shared/schema";
import { z } from "zod";
import sgMail from '@sendgrid/mail';
import path from 'path';
import fs from 'fs';

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize SendGrid
  if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }
  // OAuth Routes for Threads API
  app.get("/api/auth/threads/connect", (req, res) => {
    const clientId = process.env.THREADS_APP_ID;
    const redirectUri = `${req.protocol}://${req.get('host')}/api/auth/threads/callback`;
    
    if (!clientId) {
      return res.status(500).json({ error: 'Threads App ID not configured' });
    }

    const authUrl = `https://threads.net/oauth/authorize?` +
      `client_id=${clientId}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `scope=threads_basic&` +
      `response_type=code`;

    res.redirect(authUrl);
  });

  app.get("/api/auth/threads/callback", async (req, res) => {
    const { code, error } = req.query;
    
    if (error) {
      return res.redirect('/EarldKaiju?error=access_denied');
    }

    if (!code) {
      return res.redirect('/EarldKaiju?error=no_code');
    }

    try {
      const clientId = process.env.THREADS_APP_ID;
      const clientSecret = process.env.THREADS_APP_SECRET;
      const redirectUri = `${req.protocol}://${req.get('host')}/api/auth/threads/callback`;

      // Exchange code for short-lived token
      const tokenResponse = await fetch('https://graph.threads.net/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: clientId!,
          client_secret: clientSecret!,
          grant_type: 'authorization_code',
          redirect_uri: redirectUri,
          code: code as string,
        }),
      });

      const tokenData = await tokenResponse.json();
      
      if (!tokenResponse.ok) {
        console.error('Token exchange error:', tokenData);
        return res.redirect('/EarldKaiju?error=token_exchange_failed');
      }

      // Exchange for long-lived token (60 days)
      const longLivedResponse = await fetch(`https://graph.threads.net/access_token?` +
        `grant_type=th_exchange_token&` +
        `client_secret=${clientSecret}&` +
        `access_token=${tokenData.access_token}`
      );

      const longLivedData = await longLivedResponse.json();

      if (!longLivedResponse.ok) {
        console.error('Long-lived token error:', longLivedData);
        return res.redirect('/EarldKaiju?error=long_token_failed');
      }

      // Store the long-lived token (in a real app, you'd save this securely)
      process.env.THREADS_ACCESS_TOKEN = longLivedData.access_token;
      process.env.THREADS_USER_ID = tokenData.user_id;

      console.log('Threads OAuth successful! Token expires in:', longLivedData.expires_in, 'seconds');
      
      res.redirect('/EarldKaiju?success=instagram_connected');
    } catch (error) {
      console.error('OAuth callback error:', error);
      res.redirect('/EarldKaiju?error=oauth_failed');
    }
  });

  app.get("/api/auth/threads/status", (req, res) => {
    const hasToken = !!process.env.THREADS_ACCESS_TOKEN;
    res.json({ 
      connected: hasToken,
      user_id: process.env.THREADS_USER_ID || null
    });
  });

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
      
      // Send email notification if SendGrid is configured
      if (process.env.SENDGRID_API_KEY) {
        try {
          const msg = {
            to: 'e@ehicksonjr.com',
            from: 'e@ehicksonjr.com', // Must be verified sender in SendGrid
            subject: `New BJJ Lesson Booking Request from ${validatedData.name}`,
            text: `
New BJJ lesson booking request received:

Name: ${validatedData.name}
Email: ${validatedData.email}
Phone: ${validatedData.phone}
Program: ${validatedData.program || 'Not specified'}
Goals: ${validatedData.goals || 'Not specified'}
Availability: ${validatedData.availability || 'Not specified'}
SMS Consent: ${validatedData.smsConsent ? 'Yes' : 'No'}

Please follow up within 24 hours.
            `,
            html: `
<h2>New BJJ Lesson Booking Request</h2>
<p><strong>A new student is interested in training!</strong></p>

<h3>Contact Information:</h3>
<ul>
  <li><strong>Name:</strong> ${validatedData.name}</li>
  <li><strong>Email:</strong> ${validatedData.email}</li>
  <li><strong>Phone:</strong> ${validatedData.phone}</li>
</ul>

<h3>Training Details:</h3>
<ul>
  <li><strong>Program:</strong> ${validatedData.program || 'Not specified'}</li>
  <li><strong>Goals:</strong> ${validatedData.goals || 'Not specified'}</li>
  <li><strong>Availability:</strong> ${validatedData.availability || 'Not specified'}</li>
  <li><strong>SMS Consent:</strong> ${validatedData.smsConsent ? 'Yes' : 'No'}</li>
</ul>

<p><em>Please follow up within 24 hours.</em></p>
            `
          };
          
          await sgMail.send(msg);
          console.log('Booking notification email sent successfully');
        } catch (emailError) {
          console.error('Failed to send booking notification email:', emailError);
          // Don't fail the booking if email fails
        }
      } else {
        console.warn('SendGrid API key not configured - booking notification email not sent');
      }
      
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

  // Get social media posts
  app.get("/api/social-media", async (req, res) => {
    try {
      const platform = req.query.platform as string | undefined;
      const posts = await storage.getSocialMediaPosts(platform);
      res.json({ posts });
    } catch (error) {
      console.error("Error fetching social media posts:", error);
      res.status(500).json({ message: "Failed to fetch social media posts" });
    }
  });

  // Fetch Instagram posts using public scraping
  app.post("/api/social-media/fetch-instagram", async (req, res) => {
    try {
      // Use Python scraper for public Instagram posts
      const { spawn } = await import('child_process');
      const path = await import('path');
      
      const username = 'earld.kaiju'; // Your Instagram username
      const limit = 7; // Number of posts to fetch
      
      // Try simple scraper first, fallback to instaloader if needed
      const scriptPath = path.default.join(process.cwd(), 'scripts', 'simple_instagram_scraper.py');
      const pythonProcess = spawn('python3', [scriptPath, username, limit.toString()]);
      
      let output = '';
      let errorOutput = '';
      
      pythonProcess.stdout.on('data', (data) => {
        output += data.toString();
      });
      
      pythonProcess.stderr.on('data', (data) => {
        errorOutput += data.toString();
      });
      
      pythonProcess.on('close', async (code) => {
        try {
          if (code !== 0) {
            console.error('Instagram scraper error:', errorOutput);
            return res.status(500).json({ 
              message: `Instagram scraper failed with code ${code}: ${errorOutput}` 
            });
          }
          
          const result = JSON.parse(output);
          
          if (!result.success) {
            return res.status(400).json({ 
              message: `Instagram scraping failed: ${result.error}` 
            });
          }
          
          const posts = [];
          
          // Fetch existing posts once to avoid N+1 query problem
          const existingPosts = await storage.getSocialMediaPosts('instagram');
          const existingPostIds = new Set(existingPosts.map(p => p.postId));
          
          for (const item of result.posts || []) {
            try {
              // Check if post already exists using Set for O(1) lookup
              if (!existingPostIds.has(item.postId)) {
                const post = await storage.createSocialMediaPost({
                  platform: 'instagram',
                  postId: item.postId,
                  mediaType: item.mediaType,
                  mediaUrl: item.mediaUrl,
                  thumbnailUrl: item.thumbnailUrl,
                  caption: item.caption,
                  permalink: item.permalink,
                  timestamp: new Date(item.timestamp)
                });
                posts.push(post);
              }
            } catch (error) {
              console.error(`Error processing Instagram post ${item.postId}:`, error);
            }
          }
          
          res.json({ 
            message: `Successfully fetched ${posts.length} new Instagram posts from @${username}`,
            posts: posts,
            profile: result.profile
          });
          
        } catch (parseError) {
          console.error('Error parsing scraper output:', parseError);
          console.error('Raw output:', output);
          res.status(500).json({ 
            message: "Failed to parse Instagram scraper output" 
          });
        }
      });
      
    } catch (error) {
      console.error("Instagram scraping error:", error);
      res.status(500).json({ message: "Failed to fetch Instagram posts" });
    }
  });

  // Fetch YouTube videos automatically
  app.post("/api/social-media/fetch-youtube", async (req, res) => {
    try {
      const apiKey = process.env.YOUTUBE_API_KEY;
      if (!apiKey) {
        return res.status(400).json({ 
          message: "YouTube API key not configured. Please set YOUTUBE_API_KEY environment variable." 
        });
      }

      const channelId = process.env.YOUTUBE_CHANNEL_ID || 'UCYourChannelId'; // Replace with actual channel ID
      
      // Fetch from YouTube Data API v3
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&order=date&maxResults=10&type=video`
      );
      
      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status}`);
      }

      const data = await response.json();
      const posts = [];

      // Fetch existing posts once to avoid N+1 query problem
      const existingPosts = await storage.getSocialMediaPosts('youtube');
      const existingVideoIds = new Set(existingPosts.map(p => p.postId));

      for (const item of data.items || []) {
        try {
          // Check if video already exists using Set for O(1) lookup
          if (!existingVideoIds.has(item.id.videoId)) {
            const post = await storage.createSocialMediaPost({
              platform: 'youtube',
              postId: item.id.videoId,
              mediaType: 'video',
              mediaUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
              thumbnailUrl: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url,
              caption: item.snippet.description || '',
              permalink: `https://www.youtube.com/watch?v=${item.id.videoId}`,
              timestamp: new Date(item.snippet.publishedAt)
            });
            posts.push(post);
          }
        } catch (error) {
          console.error(`Error processing YouTube video ${item.id.videoId}:`, error);
        }
      }

      res.json({ 
        message: `Successfully fetched ${posts.length} new YouTube videos`,
        newPosts: posts.length,
        posts
      });
    } catch (error) {
      console.error("YouTube fetch error:", error);
      res.status(500).json({ message: "Failed to fetch YouTube videos" });
    }
  });

  // Resume download endpoint
  app.get("/api/resume", (req, res) => {
    // Resume download placeholder - replace with actual resume file in production
    res.status(404).json({ 
      error: "Resume file not found",
      message: "Please contact e@ehicksonjr.com for the latest resume or add your resume file to the project"
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
