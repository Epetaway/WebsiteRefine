import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';

interface ConnectionStatus {
  connected: boolean;
  user_id: string | null;
}

export function OAuthConnect() {
  const [isConnecting, setIsConnecting] = useState(false);

  // Check connection status
  const { data: status, isLoading } = useQuery<ConnectionStatus>({
    queryKey: ['/api/auth/threads/status'],
    refetchInterval: 5000, // Check status every 5 seconds
  });

  const handleConnect = () => {
    setIsConnecting(true);
    // Redirect to OAuth endpoint
    window.location.href = '/api/auth/threads/connect';
  };

  // Handle URL parameters for success/error states
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const error = urlParams.get('error');

    if (success === 'instagram_connected') {
      // Refresh connection status and social media posts
      queryClient.invalidateQueries({ queryKey: ['/api/auth/threads/status'] });
      queryClient.invalidateQueries({ queryKey: ['/api/social-media'] });
      
      // Remove the URL parameter
      const url = new URL(window.location.href);
      url.searchParams.delete('success');
      window.history.replaceState({}, '', url);
      
      setIsConnecting(false);
    }

    if (error) {
      console.error('OAuth error:', error);
      setIsConnecting(false);
      
      // Remove the error parameter
      const url = new URL(window.location.href);
      url.searchParams.delete('error');
      window.history.replaceState({}, '', url);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="text-center p-4">
        <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-[#39FF14]"></div>
        <p className="text-gray-400 text-sm mt-2">Checking connection status...</p>
      </div>
    );
  }

  if (status?.connected) {
    return (
      <div className="text-center p-6 bg-green-900/20 rounded-lg border border-green-600/30">
        <svg className="w-12 h-12 text-green-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>
        <h3 className="text-green-500 font-semibold mb-2">Instagram Connected!</h3>
        <p className="text-gray-300 text-sm">
          Your @earld.kaiju content will now appear automatically. 
          Content refreshes every 5 minutes.
        </p>
      </div>
    );
  }

  return (
    <div className="text-center p-6 bg-blue-900/20 rounded-lg border border-blue-600/30">
      <svg className="w-12 h-12 text-blue-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.65-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
      </svg>
      <h3 className="text-blue-500 font-semibold mb-4">Connect Your Instagram</h3>
      <p className="text-gray-300 text-sm mb-6">
        Connect your @earld.kaiju Instagram account to automatically display your latest posts here.
      </p>
      <button
        onClick={handleConnect}
        disabled={isConnecting}
        className="bg-[#39FF14] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#32E010] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        data-testid="button-connect-instagram"
      >
        {isConnecting ? (
          <span className="flex items-center gap-2">
            <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
            Connecting...
          </span>
        ) : (
          'Connect Instagram Account'
        )}
      </button>
      <p className="text-gray-500 text-xs mt-4">
        Secure OAuth authentication via Meta's Threads API
      </p>
    </div>
  );
}