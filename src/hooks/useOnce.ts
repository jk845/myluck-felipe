import { useRef, useEffect } from 'react';

/**
 * Hook that ensures a callback is called only once
 */
export const useOnce = (callback: () => void | Promise<void>) => {
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      callback();
    }
  }, []); // Empty deps - only run on mount
};