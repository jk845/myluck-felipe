import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  isInstagramBrowser,
  isInAppBrowser,
  isIOS,
  isSafari,
  applyBrowserClasses,
} from '../browser-detection';

describe('browser-detection', () => {
  let originalUserAgent: PropertyDescriptor | undefined;
  let originalMSStream: any;

  beforeEach(() => {
    // Save original values
    originalUserAgent = Object.getOwnPropertyDescriptor(navigator, 'userAgent');
    originalMSStream = (window as any).MSStream;

    // Clear any existing browser classes
    document.documentElement.className = '';
  });

  afterEach(() => {
    // Restore original values
    if (originalUserAgent) {
      Object.defineProperty(navigator, 'userAgent', originalUserAgent);
    }
    (window as any).MSStream = originalMSStream;

    // Clear browser classes
    document.documentElement.className = '';
  });

  const setUserAgent = (userAgent: string) => {
    Object.defineProperty(navigator, 'userAgent', {
      value: userAgent,
      writable: true,
      configurable: true,
    });
  };

  describe('isInstagramBrowser', () => {
    it('should detect Instagram browser by Instagram keyword', () => {
      setUserAgent('Mozilla/5.0 Instagram 121.0.0.0');
      expect(isInstagramBrowser()).toBe(true);
    });

    it('should detect Instagram browser by FBAN keyword', () => {
      setUserAgent('Mozilla/5.0 FBAN/FBIOS');
      expect(isInstagramBrowser()).toBe(true);
    });

    it('should detect Instagram browser by FBAV keyword', () => {
      setUserAgent('Mozilla/5.0 FBAV/121.0.0.0');
      expect(isInstagramBrowser()).toBe(true);
    });

    it('should return false for non-Instagram browsers', () => {
      setUserAgent('Mozilla/5.0 Chrome/91.0.4472.124');
      expect(isInstagramBrowser()).toBe(false);
    });
  });

  describe('isInAppBrowser', () => {
    it('should detect Instagram in-app browser', () => {
      setUserAgent('Mozilla/5.0 Instagram');
      expect(isInAppBrowser()).toBe(true);
    });

    it('should detect Facebook in-app browser', () => {
      setUserAgent('Mozilla/5.0 FBAN/FBIOS');
      expect(isInAppBrowser()).toBe(true);
    });

    it('should detect Twitter in-app browser', () => {
      setUserAgent('Mozilla/5.0 Twitter for iPhone');
      expect(isInAppBrowser()).toBe(true);
    });

    it('should detect LinkedIn in-app browser', () => {
      setUserAgent('Mozilla/5.0 LinkedIn App');
      expect(isInAppBrowser()).toBe(true);
    });

    it('should detect Snapchat in-app browser', () => {
      setUserAgent('Mozilla/5.0 Snapchat');
      expect(isInAppBrowser()).toBe(true);
    });

    it('should detect TikTok in-app browser', () => {
      setUserAgent('Mozilla/5.0 TikTok');
      expect(isInAppBrowser()).toBe(true);
    });

    it('should return false for regular browsers', () => {
      setUserAgent('Mozilla/5.0 Chrome/91.0.4472.124');
      expect(isInAppBrowser()).toBe(false);
    });
  });

  describe('isIOS', () => {
    it('should detect iPhone', () => {
      setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)');
      (window as any).MSStream = undefined;
      expect(isIOS()).toBe(true);
    });

    it('should detect iPad', () => {
      setUserAgent('Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X)');
      (window as any).MSStream = undefined;
      expect(isIOS()).toBe(true);
    });

    it('should detect iPod', () => {
      setUserAgent('Mozilla/5.0 (iPod touch; CPU iPhone OS 14_0 like Mac OS X)');
      (window as any).MSStream = undefined;
      expect(isIOS()).toBe(true);
    });

    it('should return false for Windows with MSStream', () => {
      setUserAgent('Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X)');
      (window as any).MSStream = {};
      expect(isIOS()).toBe(false);
    });

    it('should return false for Android', () => {
      setUserAgent('Mozilla/5.0 (Linux; Android 11)');
      (window as any).MSStream = undefined;
      expect(isIOS()).toBe(false);
    });
  });

  describe('isSafari', () => {
    it('should detect Safari on macOS', () => {
      setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Safari/605.1.15');
      expect(isSafari()).toBe(true);
    });

    it('should detect Safari on iOS', () => {
      setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1');
      expect(isSafari()).toBe(true);
    });

    it('should return false for Chrome', () => {
      setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
      expect(isSafari()).toBe(false);
    });

    it('should return false for Firefox', () => {
      setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0');
      expect(isSafari()).toBe(false);
    });
  });

  describe('applyBrowserClasses', () => {
    it('should add instagram-browser class for Instagram browser', () => {
      setUserAgent('Mozilla/5.0 Instagram');
      applyBrowserClasses();
      expect(document.documentElement.classList.contains('instagram-browser')).toBe(true);
    });

    it('should add in-app-browser class for in-app browsers', () => {
      setUserAgent('Mozilla/5.0 Twitter');
      applyBrowserClasses();
      expect(document.documentElement.classList.contains('in-app-browser')).toBe(true);
    });

    it('should add ios class for iOS devices', () => {
      setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)');
      (window as any).MSStream = undefined;
      applyBrowserClasses();
      expect(document.documentElement.classList.contains('ios')).toBe(true);
    });

    it('should add safari class for Safari browser', () => {
      setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Safari/605.1.15');
      applyBrowserClasses();
      expect(document.documentElement.classList.contains('safari')).toBe(true);
    });

    it('should add multiple classes when applicable', () => {
      setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 Instagram Safari/604.1');
      (window as any).MSStream = undefined;
      applyBrowserClasses();

      const classList = document.documentElement.classList;
      expect(classList.contains('instagram-browser')).toBe(true);
      expect(classList.contains('in-app-browser')).toBe(true);
      expect(classList.contains('ios')).toBe(true);
      expect(classList.contains('safari')).toBe(true);
    });

    it('should not add any classes for regular Chrome on Windows', () => {
      setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124');
      (window as any).MSStream = undefined;
      applyBrowserClasses();

      const classList = document.documentElement.classList;
      expect(classList.contains('instagram-browser')).toBe(false);
      expect(classList.contains('in-app-browser')).toBe(false);
      expect(classList.contains('ios')).toBe(false);
      expect(classList.contains('safari')).toBe(false);
    });
  });
});