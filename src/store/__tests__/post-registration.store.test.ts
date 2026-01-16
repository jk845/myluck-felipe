import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { usePostRegistrationStore } from '../post-registration.store'
import { PostRegistrationStep } from '@/types/post-registration'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

describe('usePostRegistrationStore', () => {
  beforeEach(() => {
    // Clear store and mocks before each test
    act(() => {
      usePostRegistrationStore.getState().resetPostRegistration()
    })
    vi.clearAllMocks()
  })

  describe('initial state', () => {
    it('should have correct initial values', () => {
      const { result } = renderHook(() => usePostRegistrationStore())
      
      expect(result.current.currentStep).toBe(PostRegistrationStep.PaymentSuccess)
      expect(result.current.paymentFeedback).toBeNull()
      expect(result.current.trainingTypeData).toBeNull()
      expect(result.current.trainingVariationData).toBeNull()
      expect(result.current.exerciseConfidenceData).toBeNull()
      expect(result.current.insecuritiesData).toBeNull()
      expect(result.current.mentalityFocusData).toBeNull()
      expect(result.current.previousObstaclesData).toBeNull()
      expect(result.current.innerCircleData).toBeNull()
      expect(result.current.customerInfo).toBeNull()
    })
  })

  describe('step navigation', () => {
    it('should set current step', () => {
      const { result } = renderHook(() => usePostRegistrationStore())
      
      act(() => {
        result.current.setCurrentStep(PostRegistrationStep.TrainingType)
      })
      
      expect(result.current.currentStep).toBe(PostRegistrationStep.TrainingType)
    })
  })

  describe('data setters', () => {
    it('should set payment feedback', () => {
      const { result } = renderHook(() => usePostRegistrationStore())
      
      act(() => {
        result.current.setPaymentFeedback('Payment successful')
      })
      
      expect(result.current.paymentFeedback).toBe('Payment successful')
    })

    it('should set training type data', () => {
      const { result } = renderHook(() => usePostRegistrationStore())
      const trainingTypeData = {
        trainingType: ['gym', 'home']
      }
      
      act(() => {
        result.current.setTrainingTypeData(trainingTypeData)
      })
      
      expect(result.current.trainingTypeData).toEqual(trainingTypeData)
    })

    it('should set training variation data', () => {
      const { result } = renderHook(() => usePostRegistrationStore())
      const variationData = {
        variationPreference: 'high'
      }
      
      act(() => {
        result.current.setTrainingVariationData(variationData)
      })
      
      expect(result.current.trainingVariationData).toEqual(variationData)
    })

    it('should set exercise confidence data', () => {
      const { result } = renderHook(() => usePostRegistrationStore())
      const confidenceData = {
        trainingConfidence: '7-9'
      }
      
      act(() => {
        result.current.setExerciseConfidenceData(confidenceData)
      })
      
      expect(result.current.exerciseConfidenceData).toEqual(confidenceData)
    })

    it('should set insecurities data', () => {
      const { result } = renderHook(() => usePostRegistrationStore())
      const insecuritiesData = {
        insecurities: ['stomach', 'arms']
      }
      
      act(() => {
        result.current.setInsecuritiesData(insecuritiesData)
      })
      
      expect(result.current.insecuritiesData).toEqual(insecuritiesData)
    })

    it('should set mentality focus data', () => {
      const { result } = renderHook(() => usePostRegistrationStore())
      const mentalityData = {
        mentalityFocus: 'discipline'
      }
      
      act(() => {
        result.current.setMentalityFocusData(mentalityData)
      })
      
      expect(result.current.mentalityFocusData).toEqual(mentalityData)
    })

    it('should set previous obstacles data', () => {
      const { result } = renderHook(() => usePostRegistrationStore())
      const obstaclesData = {
        previousObstacles: 'lack of time'
      }
      
      act(() => {
        result.current.setPreviousObstaclesData(obstaclesData)
      })
      
      expect(result.current.previousObstaclesData).toEqual(obstaclesData)
    })

    it('should set inner circle data', () => {
      const { result } = renderHook(() => usePostRegistrationStore())
      const innerCircleData = {
        interestedInInnerCircle: 'yes'
      }
      
      act(() => {
        result.current.setInnerCircleData(innerCircleData)
      })
      
      expect(result.current.innerCircleData).toEqual(innerCircleData)
    })

    it('should set customer info', () => {
      const { result } = renderHook(() => usePostRegistrationStore())
      const customerInfo = {
        orderId: 'order-123',
        email: 'test@example.com',
        password: 'password123',
        subscriptionPlan: '12month',
        price: '490 kr',
        renewalDate: '2024-12-31',
        nextPaymentDate: '2024-12-31',
        nextCycleDate: '2024-12-31',
        subscriptionType: 'premium'
      }
      
      act(() => {
        result.current.setCustomerInfo(customerInfo)
      })
      
      expect(result.current.customerInfo).toEqual(customerInfo)
    })
  })

  describe('resetPostRegistration', () => {
    it('should reset all data to initial state', () => {
      const { result } = renderHook(() => usePostRegistrationStore())
      
      // Set some data first
      act(() => {
        result.current.setCurrentStep(PostRegistrationStep.TrainingType)
        result.current.setPaymentFeedback('Success')
        result.current.setTrainingTypeData({ trainingType: ['gym'] })
      })
      
      // Reset
      act(() => {
        result.current.resetPostRegistration()
      })
      
      // Verify everything is reset
      expect(result.current.currentStep).toBe(PostRegistrationStep.PaymentSuccess)
      expect(result.current.paymentFeedback).toBeNull()
      expect(result.current.trainingTypeData).toBeNull()
    })

    it('should remove data from localStorage', () => {
      const { result } = renderHook(() => usePostRegistrationStore())
      
      act(() => {
        result.current.resetPostRegistration()
      })
      
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('post-registration-storage')
    })
  })

  describe('getCompletedSteps', () => {
    it('should return empty array when no steps completed', () => {
      const { result } = renderHook(() => usePostRegistrationStore())
      
      expect(result.current.getCompletedSteps()).toEqual([])
    })

    it('should include PaymentSuccess when customer info is set', () => {
      const { result } = renderHook(() => usePostRegistrationStore())
      
      act(() => {
        result.current.setCustomerInfo({
          orderId: 'order-123',
          email: 'test@example.com',
          password: 'password',
          subscriptionPlan: '12month',
          price: '490 kr',
          renewalDate: '2024-12-31',
          nextPaymentDate: '2024-12-31',
          nextCycleDate: '2024-12-31',
          subscriptionType: 'premium'
        })
      })
      
      expect(result.current.getCompletedSteps()).toEqual([PostRegistrationStep.PaymentSuccess])
    })

    it('should return all completed steps in order', () => {
      const { result } = renderHook(() => usePostRegistrationStore())
      
      act(() => {
        result.current.setCustomerInfo({
          orderId: 'order-123',
          email: 'test@example.com',
          password: 'password',
          subscriptionPlan: '12month',
          price: '490 kr',
          renewalDate: '2024-12-31',
          nextPaymentDate: '2024-12-31',
          nextCycleDate: '2024-12-31',
          subscriptionType: 'premium'
        })
        result.current.setTrainingTypeData({ trainingType: ['gym'] })
        result.current.setTrainingVariationData({ variationPreference: 'high' })
      })
      
      expect(result.current.getCompletedSteps()).toEqual([
        PostRegistrationStep.PaymentSuccess,
        PostRegistrationStep.TrainingType,
        PostRegistrationStep.TrainingVariation
      ])
    })
  })

  describe('isStepCompleted', () => {
    it('should return false for incomplete steps', () => {
      const { result } = renderHook(() => usePostRegistrationStore())
      
      expect(result.current.isStepCompleted(PostRegistrationStep.PaymentSuccess)).toBe(false)
      expect(result.current.isStepCompleted(PostRegistrationStep.TrainingType)).toBe(false)
    })

    it('should return true for completed steps', () => {
      const { result } = renderHook(() => usePostRegistrationStore())
      
      act(() => {
        result.current.setCustomerInfo({
          orderId: 'order-123',
          email: 'test@example.com',
          password: 'password',
          subscriptionPlan: '12month',
          price: '490 kr',
          renewalDate: '2024-12-31',
          nextPaymentDate: '2024-12-31',
          nextCycleDate: '2024-12-31',
          subscriptionType: 'premium'
        })
      })
      
      expect(result.current.isStepCompleted(PostRegistrationStep.PaymentSuccess)).toBe(true)
      expect(result.current.isStepCompleted(PostRegistrationStep.TrainingType)).toBe(false)
    })

    it('should always return false for Instructions step', () => {
      const { result } = renderHook(() => usePostRegistrationStore())
      
      expect(result.current.isStepCompleted(PostRegistrationStep.Instructions)).toBe(false)
    })
  })

  describe('canNavigateToStep', () => {
    it('should allow navigation to first step', () => {
      const { result } = renderHook(() => usePostRegistrationStore())
      
      expect(result.current.canNavigateToStep(PostRegistrationStep.PaymentSuccess)).toBe(true)
    })

    it('should allow navigation backwards', () => {
      const { result } = renderHook(() => usePostRegistrationStore())
      
      act(() => {
        result.current.setCurrentStep(PostRegistrationStep.TrainingType)
      })
      
      expect(result.current.canNavigateToStep(PostRegistrationStep.PaymentSuccess)).toBe(true)
    })

    it('should prevent forward navigation when previous steps incomplete', () => {
      const { result } = renderHook(() => usePostRegistrationStore())
      
      // Try to navigate to step 3 without completing steps 1 and 2
      expect(result.current.canNavigateToStep(PostRegistrationStep.TrainingVariation)).toBe(false)
    })

    it('should allow forward navigation when previous steps completed', () => {
      const { result } = renderHook(() => usePostRegistrationStore())
      
      act(() => {
        result.current.setCustomerInfo({
          orderId: 'order-123',
          email: 'test@example.com',
          password: 'password',
          subscriptionPlan: '12month',
          price: '490 kr',
          renewalDate: '2024-12-31',
          nextPaymentDate: '2024-12-31',
          nextCycleDate: '2024-12-31',
          subscriptionType: 'premium'
        })
        result.current.setTrainingTypeData({ trainingType: ['gym'] })
      })
      
      expect(result.current.canNavigateToStep(PostRegistrationStep.TrainingVariation)).toBe(true)
    })
  })
})