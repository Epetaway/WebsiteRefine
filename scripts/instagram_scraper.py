#!/usr/bin/env python3
"""
Instagram scraper for @earld.kaiju using instaloader
Scrapes public posts without requiring OAuth or login
"""

import instaloader
import json
import sys
from datetime import datetime
import os

def scrape_instagram_posts(username, limit=10):
    """
    Scrape public Instagram posts from a username
    Returns list of post data in format compatible with our database
    """
    try:
        # Create instaloader instance
        L = instaloader.Instaloader(
            download_video_thumbnails=False,
            download_geotags=False,
            download_comments=False,
            save_metadata=False,
            compress_json=False,
        )
        
        # Get profile
        profile = instaloader.Profile.from_username(L.context, username)
        
        posts = []
        count = 0
        
        # Iterate through posts
        for post in profile.get_posts():
            if count >= limit:
                break
                
            # Extract post data
            post_data = {
                "platform": "instagram",
                "postId": post.shortcode,
                "mediaType": "video" if post.is_video else "image",
                "mediaUrl": post.video_url if post.is_video else post.url,
                "thumbnailUrl": post.url,  # Use image URL as thumbnail
                "caption": post.caption or "",
                "permalink": f"https://www.instagram.com/p/{post.shortcode}/",
                "timestamp": post.date_utc.isoformat()
            }
            
            posts.append(post_data)
            count += 1
            
        return {
            "success": True,
            "posts": posts,
            "profile": {
                "username": profile.username,
                "followers": profile.followers,
                "posts_count": profile.mediacount
            }
        }
        
    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "posts": []
        }

if __name__ == "__main__":
    username = sys.argv[1] if len(sys.argv) > 1 else "earld.kaiju"
    limit = int(sys.argv[2]) if len(sys.argv) > 2 else 7
    
    result = scrape_instagram_posts(username, limit)
    print(json.dumps(result, indent=2))