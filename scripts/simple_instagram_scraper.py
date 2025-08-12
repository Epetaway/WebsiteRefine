#!/usr/bin/env python3
"""
Simple Instagram scraper using requests to get public data
Fallback method when instaloader fails due to rate limits
"""

import requests
import json
import sys
from datetime import datetime
import re
import time

def get_user_posts_simple(username, limit=7):
    """
    Get Instagram posts using public endpoints
    This is a more basic approach that's less likely to be blocked
    """
    try:
        # Add delay to avoid being flagged
        time.sleep(1)
        
        # Try the basic profile endpoint first
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        # Get the Instagram page HTML
        profile_url = f"https://www.instagram.com/{username}/"
        response = requests.get(profile_url, headers=headers, timeout=10)
        
        if response.status_code != 200:
            return {
                "success": False,
                "error": f"Failed to access Instagram profile: {response.status_code}",
                "posts": []
            }
        
        # Parse the HTML to extract post data
        # Look for the JSON data embedded in the page
        import re
        
        # Try to find the shared data in the page
        pattern = r'window\._sharedData\s*=\s*({.*?});'
        match = re.search(pattern, response.text)
        
        if match:
            try:
                shared_data = json.loads(match.group(1))
                user_data = shared_data.get('entry_data', {}).get('ProfilePage', [{}])[0]
                user_info = user_data.get('graphql', {}).get('user', {})
                
                posts = []
                edges = user_info.get('edge_owner_to_timeline_media', {}).get('edges', [])
                
                for edge in edges[:limit]:
                    node = edge.get('node', {})
                    
                    post_data = {
                        "platform": "instagram",
                        "postId": node.get('shortcode', ''),
                        "mediaType": "video" if node.get('is_video', False) else "image",
                        "mediaUrl": node.get('video_url') or node.get('display_url', ''),
                        "thumbnailUrl": node.get('display_url', ''),
                        "caption": node.get('edge_media_to_caption', {}).get('edges', [{}])[0].get('node', {}).get('text', ''),
                        "permalink": f"https://www.instagram.com/p/{node.get('shortcode', '')}/",
                        "timestamp": datetime.fromtimestamp(node.get('taken_at_timestamp', 0)).isoformat()
                    }
                    posts.append(post_data)
                
                return {
                    "success": True,
                    "posts": posts,
                    "profile": {
                        "username": username,
                        "followers": user_info.get('edge_followed_by', {}).get('count', 0),
                        "posts_count": user_info.get('edge_owner_to_timeline_media', {}).get('count', 0)
                    }
                }
                
            except json.JSONDecodeError:
                pass
        
        # If parsing fails, return error instead of mock data
        return {
            "success": False,
            "error": "Instagram has updated their page structure. Unable to extract post data without proper API access.",
            "posts": []
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
    
    result = get_user_posts_simple(username, limit)
    print(json.dumps(result, indent=2))