import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useRegistrationStore } from '../registration.store'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

describe('useRegistrationStore', () => {
  beforeEach(() => {
    // Clear store and mocks before each test
    act(() => {
      useRegistrationStore.getState().resetRegistration()
    })
    vi.clearAllMocks()
  })

  describe('initial state', () => {
    it('should have correct initial values', () => {
      const { result } = renderHook(() => useRegistrationStore())
      
      expect(result.current.currentStep).toBe('subscription-type')
      expect(result.current.subscriptionType).toBeNull()
      expect(result.current.motivationData).toBeNull()
      expect(result.current.subscriptionPlan).toBeNull()
      expect(result.current.physicalData).toBeNull()
      expect(result.current.goalsLifestyle).toBeNull()
      expect(result.current.contactInfo).toBeNull()
      expect(result.current.sessionId).toBeNull()
      expect(result.current.paymentUrl).toBeNull()
    })
  })

  describe('step navigation', () => {
    it('should set current step', () => {
      const { result } = renderHook(() => useRegistrationStore())

      act(() => {
        result.current.setCurrentStep('subscription-plan')
      })

      expect(result.current.currentStep).toBe('subscription-plan')
    })
  })

  describe('data setters', () => {
    it('should set subscription type', () => {
      const { result } = renderHook(() => useRegistrationStore())
      
      act(() => {
        result.current.setSubscriptionType('premium')
      })
      
      expect(result.current.subscriptionType).toBe('premium')
    })

    it('should set subscription plan', () => {
      const { result } = renderHook(() => useRegistrationStore())
      
      act(() => {
        result.current.setSubscriptionPlan('12month')
      })
      
      expect(result.current.subscriptionPlan).toBe('12month')
    })

    it('should set physical data', () => {
      const { result } = renderHook(() => useRegistrationStore())
      const physicalData = {
        age: '25',
        height: '170',
        weight: '70'
      }
      
      act(() => {
        result.current.setPhysicalData(physicalData)
      })
      
      expect(result.current.physicalData).toEqual(physicalData)
    })

    it('should set goals lifestyle data', () => {
      const { result } = renderHook(() => useRegistrationStore())
      const goalsLifestyle = {
        fitnessGoal: 'weightloss' as const,
        pregnancyStatus: 'Nei',
        breastfeedingStatus: 'Nei'
      }

      act(() => {
        result.current.setGoalsLifestyle(goalsLifestyle)
      })
      
      expect(result.current.goalsLifestyle).toEqual(goalsLifestyle)
    })

    it('should set contact info', () => {
      const { result } = renderHook(() => useRegistrationStore())
      const contactInfo = {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        phone: '+4712345678',
        country: 'NO'
      }
      
      act(() => {
        result.current.setContactInfo(contactInfo)
      })
      
      expect(result.current.contactInfo).toEqual(contactInfo)
    })

    it('should set session data', () => {
      const { result } = renderHook(() => useRegistrationStore())
      
      act(() => {
        result.current.setSessionData('session-123', 'https://payment.url')
      })
      
      expect(result.current.sessionId).toBe('session-123')
      expect(result.current.paymentUrl).toBe('https://payment.url')
    })
  })

  describe('resetRegistration', () => {
    it('should reset all data to initial state', () => {
      const { result } = renderHook(() => useRegistrationStore())
      
      // Set some data first
      act(() => {
        result.current.setSubscriptionType('premium')
        result.current.setCurrentStep('physical-data')
        result.current.setSubscriptionPlan('12month')
      })
      
      // Reset
      act(() => {
        result.current.resetRegistration()
      })
      
      // Verify everything is reset
      expect(result.current.currentStep).toBe('subscription-type')
      expect(result.current.subscriptionType).toBeNull()
      expect(result.current.subscriptionPlan).toBeNull()
    })

    it('should reset data (localStorage updated via persist middleware)', () => {
      const { result } = renderHook(() => useRegistrationStore())

      // Set some data first
      act(() => {
        result.current.setSubscriptionType('premium')
        result.current.setSubscriptionPlan('12month')
        result.current.setIsPromo(true)
      })

      // Reset registration
      act(() => {
        result.current.resetRegistration()
      })

      // Verify state is reset
      expect(result.current.subscriptionType).toBeNull()
      expect(result.current.subscriptionPlan).toBeNull()
      expect(result.current.isPromo).toBe(false)
    })

    it('should preserve isPromo flag when preservePromo=true', () => {
      const { result } = renderHook(() => useRegistrationStore())

      // Set promo flag
      act(() => {
        result.current.setIsPromo(true)
        result.current.setSubscriptionPlan('12month')
      })

      // Reset registration but preserve promo
      act(() => {
        result.current.resetRegistration(true)
      })

      // Verify isPromo is preserved but other data is reset
      expect(result.current.isPromo).toBe(true)
      expect(result.current.subscriptionPlan).toBeNull()
    })
  })

  describe('getCompletedSteps', () => {
    it('should return empty array when no steps completed', () => {
      const { result } = renderHook(() => useRegistrationStore())
      
      expect(result.current.getCompletedSteps()).toEqual([])
    })

    it('should return completed steps in order', () => {
      const { result } = renderHook(() => useRegistrationStore())
      
      act(() => {
        result.current.setSubscriptionType('premium')
        result.current.setSubscriptionPlan('12month')
      })

      expect(result.current.getCompletedSteps()).toEqual([
        'subscription-type',
        'subscription-plan'
      ])
    })

    it('should return all completed steps', () => {
      const { result } = renderHook(() => useRegistrationStore())
      
      act(() => {
        result.current.setSubscriptionType('premium')
        result.current.setSubscriptionPlan('12month')
        result.current.setPhysicalData({ age: '25', height: '170', weight: '70' })
        result.current.setContactInfo({
          firstName: 'Test',
          lastName: 'User',
          email: 'test@example.com',
          phone: '+4712345678',
          country: 'NO'
        })
        result.current.setGoalsLifestyle({ fitnessGoal: 'weightloss', pregnancyStatus: 'Nei', breastfeedingStatus: 'Nei' })
      })

      expect(result.current.getCompletedSteps()).toEqual([
        'subscription-type',
        'subscription-plan',
        'physical-data',
        'goals-lifestyle',
        'contact-info'
      ])
    })
  })

  describe('isStepCompleted', () => {
    it('should return false for incomplete steps', () => {
      const { result } = renderHook(() => useRegistrationStore())
      
      expect(result.current.isStepCompleted('subscription-type')).toBe(false)
      expect(result.current.isStepCompleted('subscription-plan')).toBe(false)
    })

    it('should return true for completed steps', () => {
      const { result } = renderHook(() => useRegistrationStore())
      
      act(() => {
        result.current.setSubscriptionType('premium')
      })
      
      expect(result.current.isStepCompleted('subscription-type')).toBe(true)
      expect(result.current.isStepCompleted('subscription-plan')).toBe(false)
    })

    it('should always return false for order-confirmation', () => {
      const { result } = renderHook(() => useRegistrationStore())
      
      expect(result.current.isStepCompleted('order-confirmation')).toBe(false)
    })
  })

  describe('canNavigateToStep', () => {
    it('should allow navigation to first step', () => {
      const { result } = renderHook(() => useRegistrationStore())
      
      expect(result.current.canNavigateToStep('subscription-type')).toBe(true)
    })

    it('should allow navigation backwards', () => {
      const { result } = renderHook(() => useRegistrationStore())
      
      act(() => {
        result.current.setCurrentStep('physical-data')
      })
      
      expect(result.current.canNavigateToStep('subscription-type')).toBe(true)
      expect(result.current.canNavigateToStep('subscription-plan')).toBe(true)
    })

    it('should prevent forward navigation when previous steps incomplete', () => {
      const { result } = renderHook(() => useRegistrationStore())
      
      // Try to navigate to step 3 without completing steps 1 and 2
      expect(result.current.canNavigateToStep('subscription-plan')).toBe(false)
    })

    it('should allow forward navigation when previous steps completed', () => {
      const { result } = renderHook(() => useRegistrationStore())
      
      act(() => {
        result.current.setSubscriptionType('premium')
      })

      expect(result.current.canNavigateToStep('subscription-plan')).toBe(true)
    })

    it('should handle sequential step completion', () => {
      const { result } = renderHook(() => useRegistrationStore())
      
      // Complete steps in order
      act(() => {
        result.current.setSubscriptionType('premium')
      })
      expect(result.current.canNavigateToStep('subscription-plan')).toBe(true)
      expect(result.current.canNavigateToStep('physical-data')).toBe(false)

      act(() => {
        result.current.setSubscriptionPlan('12month')
      })
      expect(result.current.canNavigateToStep('physical-data')).toBe(true)
      expect(result.current.canNavigateToStep('contact-info')).toBe(false)
    })
  })
})