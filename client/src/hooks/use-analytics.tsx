import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../lib/analytics';

export const useAnalytics = () => {
  const { pathname } = useLocation();
  const prevLocationRef = useRef<string>(pathname);
  
  useEffect(() => {
    if (pathname !== prevLocationRef.current) {
      // Scroll to top on route change
      window.scrollTo(0, 0);
      
      // Track page view
      trackPageView(pathname);
      prevLocationRef.current = pathname;
    }
  }, [pathname]);
};
