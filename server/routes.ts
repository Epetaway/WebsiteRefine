import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertBjjBookingSchema, insertSocialMediaPostSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
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

  // Fetch Instagram/Threads posts automatically
  app.post("/api/social-media/fetch-instagram", async (req, res) => {
    try {
      // Try Threads API first, fallback to Instagram Basic Display API
      const threadsAccessToken = process.env.THREADS_ACCESS_TOKEN;
      const instagramAccessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

      if (!threadsAccessToken && !instagramAccessToken) {
        return res.status(400).json({ 
          message: "Instagram access token required. Please connect your Instagram account using the OAuth flow." 
        });
      }

      let response;
      let apiType = '';

      // Try Threads API first if access token is available  
      if (threadsAccessToken) {
        try {
          // Fetch Threads posts using Graph API with proper access token
          response = await fetch(
            `https://graph.threads.net/v1.0/me/threads?fields=id,media_type,media_url,thumbnail_url,text,permalink,timestamp&access_token=${threadsAccessToken}`
          );
          apiType = 'threads';
          
          console.log('Threads API response status:', response.status);
        } catch (error) {
          console.log("Threads API failed:", error instanceof Error ? error.message : String(error));
        }
      }

      // Fallback to Instagram Basic Display API
      if (!response || !response.ok) {
        if (!instagramAccessToken) {
          return res.status(400).json({ 
            message: "Instagram access token not configured. Please set INSTAGRAM_ACCESS_TOKEN environment variable." 
          });
        }

        response = await fetch(
          `https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,caption,permalink,timestamp&access_token=${instagramAccessToken}`
        );
        apiType = 'instagram';
      }
      
      if (!response.ok) {
        throw new Error(`${apiType} API error: ${response.status}`);
      }

      const data = await response.json();
      const posts = [];

      for (const item of data.data || []) {
        try {
          // Check if post already exists
          const existingPosts = await storage.getSocialMediaPosts('instagram');
          const exists = existingPosts.some(p => p.postId === item.id);
          
          if (!exists) {
            const post = await storage.createSocialMediaPost({
              platform: 'instagram',
              postId: item.id,
              mediaType: item.media_type?.toLowerCase() || 'image',
              mediaUrl: item.media_url,
              thumbnailUrl: item.thumbnail_url,
              caption: item.caption || item.text || '',
              permalink: item.permalink,
              timestamp: new Date(item.timestamp)
            });
            posts.push(post);
          }
        } catch (error) {
          console.error(`Error processing ${apiType} post ${item.id}:`, error);
        }
      }

      res.json({ 
        message: `Successfully fetched ${posts.length} new ${apiType} posts`,
        newPosts: posts.length,
        posts,
        apiUsed: apiType
      });
    } catch (error) {
      console.error("Instagram/Threads fetch error:", error);
      res.status(500).json({ message: "Failed to fetch Instagram/Threads posts" });
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

      for (const item of data.items || []) {
        try {
          // Check if video already exists
          const existingPosts = await storage.getSocialMediaPosts('youtube');
          const exists = existingPosts.some(p => p.postId === item.id.videoId);
          
          if (!exists) {
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
    // In production, this would serve the actual PDF file
    res.json({ 
      message: "Resume download would be implemented here",
      downloadUrl: "/assets/earl-hickson-jr-resume.pdf"
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
