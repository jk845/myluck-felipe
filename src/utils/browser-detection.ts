/**
 * Browser detection utilities for handling Instagram and other in-app browsers
 */

export const isInstagramBrowser = (): boolean => {
  const userAgent = navigator.userAgent || navigator.vendor || '';
  return userAgent.includes('Instagram') || userAgent.includes('FBAN') || userAgent.includes('FBAV');
};

export const isInAppBrowser = (): boolean => {
  const userAgent = navigator.userAgent || navigator.vendor || '';
  return (
    isInstagramBrowser() ||
    userAgent.includes('FBAN') || // Facebook
    userAgent.includes('FBAV') || // Facebook
    userAgent.includes('Twitter') ||
    userAgent.includes('LinkedIn') ||
    userAgent.includes('Snapchat') ||
    userAgent.includes('TikTok')
  );
};

export const isIOS = (): boolean => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
};

export const isSafari = (): boolean => {
  const userAgent = navigator.userAgent.toLowerCase();
  return userAgent.includes('safari') && !userAgent.includes('chrome');
};

// Add Instagram browser class to HTML element for CSS targeting
export const applyBrowserClasses = (): void => {
  const html = document.documentElement;

  if (isInstagramBrowser()) {
    html.classList.add('instagram-browser');
  }

  if (isInAppBrowser()) {
    html.classList.add('in-app-browser');
  }

  if (isIOS()) {
    html.classList.add('ios');
  }

  if (isSafari()) {
    html.classList.add('safari');
  }
};

// Initialize browser detection on app start
if (typeof window !== 'undefined') {
  applyBrowserClasses();
}