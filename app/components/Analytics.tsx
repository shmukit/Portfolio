'use client';

import { useEffect } from 'react';
import Script from 'next/script';

// Google Analytics component
export function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  useEffect(() => {
    // Track page view on route change
    const handleRouteChange = () => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', measurementId, {
          page_title: document.title,
          page_location: window.location.href,
        });
      }
    };

    // Track initial page view
    handleRouteChange();

    // Listen for popstate events (back/forward navigation)
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [measurementId]);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>
    </>
  );
}

// Microsoft Clarity component
export function MicrosoftClarity() {
  return (
    <Script id="microsoft-clarity" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "tvkllcaqtr");
      `}
    </Script>
  );
}

// Combined Analytics component
export function Analytics() {
  // Google Analytics Measurement ID
  const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-K2973HDR5S';

  return (
    <>
      <GoogleAnalytics measurementId={googleAnalyticsId} />
      <MicrosoftClarity />
    </>
  );
}

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, unknown>) => void;
  }
}
