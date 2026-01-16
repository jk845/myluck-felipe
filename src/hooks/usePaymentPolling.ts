import { useState, useEffect, useRef, useCallback } from 'react';

interface UsePaymentPollingOptions {
  onSuccess: (data: any) => void;
  onFailure: (data: any) => void;
  onPending?: () => void;
  maxAttempts?: number;
  initialDelay?: number;
}

export const usePaymentPolling = (
  checkFunction: () => Promise<any>,
  options: UsePaymentPollingOptions
) => {
  const [isPolling, setIsPolling] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);
  const attemptRef = useRef(0);
  
  const {
    onSuccess,
    onFailure,
    onPending,
    maxAttempts = 120, // 2 minutes with fast initial polling
  } = options;

  // Calculate delay with exponential backoff
  const getDelay = useCallback((attemptNumber: number) => {
    if (attemptNumber < 10) return 1000; // First 10 attempts: every 1 second
    if (attemptNumber < 20) return 2000; // Next 10 attempts: every 2 seconds
    if (attemptNumber < 30) return 3000; // Next 10 attempts: every 3 seconds
    if (attemptNumber < 60) return 5000; // Next 30 attempts: every 5 seconds
    return 10000; // After that: every 10 seconds
  }, []);

  const stopPolling = useCallback(() => {
    setIsPolling(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const poll = useCallback(async () => {
    if (!isMountedRef.current) return;

    try {
      const result = await checkFunction();
      
      if (!isMountedRef.current) return;

      if (result.userData) {
        const { paymentStatus, password } = result.userData;

        // Handle different payment statuses
        // If payment explicitly failed, handle as failure regardless of password
        if (['failed', 'expired', 'canceled'].includes(paymentStatus)) {
          stopPolling();
          onFailure(result);
          return;
        }

        // Consider successful if:
        // 1. Payment is confirmed as paid, OR
        // 2. User has password AND payment is still open/pending (normal flow)
        if (paymentStatus === 'paid' || (password && (paymentStatus === 'open' || paymentStatus === 'pending'))) {
          stopPolling();
          onSuccess(result);
          return;
        }
        
        // Still pending
        if (['open', 'pending'].includes(paymentStatus) || !paymentStatus) {
          onPending?.();
          
          // Continue polling if not at max attempts
          if (attemptRef.current < maxAttempts) {
            const delay = getDelay(attemptRef.current);
            attemptRef.current += 1;
            setAttempt(attemptRef.current);
            
            timeoutRef.current = setTimeout(() => {
              if (isMountedRef.current) {
                poll();
              }
            }, delay);
          } else {
            // Max attempts reached
            stopPolling();
            onFailure({ 
              userData: { 
                ...result.userData, 
                paymentStatus: 'timeout' 
              } 
            });
          }
        }
      }
    } catch (error) {
      console.error('Payment polling error:', error);
      // On error, continue polling with longer delay
      if (attemptRef.current < maxAttempts && isMountedRef.current) {
        attemptRef.current += 1;
        setAttempt(attemptRef.current);
        timeoutRef.current = setTimeout(() => {
          if (isMountedRef.current) {
            poll();
          }
        }, 5000);
      }
    }
  }, [checkFunction, getDelay, maxAttempts, onFailure, onPending, onSuccess, stopPolling]);

  const startPolling = useCallback(() => {
    // Проверяем что уже не запущен
    if (isPolling) {
      return;
    }
    setIsPolling(true);
    setAttempt(0);
    attemptRef.current = 0;
    poll();
  }, [poll, isPolling]);

  // Cleanup on unmount
  useEffect(() => {
    isMountedRef.current = true;
    
    return () => {
      isMountedRef.current = false;
      stopPolling();
    };
  }, [stopPolling]);

  return {
    isPolling,
    attempt,
    startPolling,
    stopPolling,
  };
};