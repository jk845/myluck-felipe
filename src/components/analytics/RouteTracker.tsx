import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { analyticsService } from '@/services/analytics.service';

export const RouteTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Map routes to friendly page names
    const getPageName = (pathname: string): string => {
      const routeMap: Record<string, string> = {
        '/': 'Landing Page',
        '/landing': 'Landing Page',
        '/registration': 'Registration',
        '/subscription': 'Registration - Subscription',
        '/subscription-plan': 'Registration - Plan Selection',
        '/confirmation': 'Post-Registration Onboarding',
        '/thank-you': 'Thank You',
        '/about': 'About',
        '/terms': 'Terms and Conditions',
        '/privacy': 'Privacy Policy',
        '/payment-failed': 'Payment Failed',
        '/cancel-subscription': 'Cancel Subscription',
        '/confirm-cancellation': 'Confirm Cancellation',
        '/cancellation-success': 'Cancellation Success',
        '/cancellation-error': 'Cancellation Error',
      };

      return routeMap[pathname] || pathname;
    };

    // Track page view with additional properties
    const pageName = getPageName(location.pathname);

    analyticsService.trackPageView(pageName, {
      path: location.pathname,
      search: location.search,
      hash: location.hash,
      title: document.title,
    });

    // Also update document title for better tracking
    if (pageName !== location.pathname) {
      document.title = `Mila - ${pageName}`;
    }
  }, [location]);

  return null;
};