import { describe, it, expect } from 'vitest'
import { validateRegistrationPayload, RegistrationValidationError } from '../registration-validation'
import { RegistrationApiPayload } from '@/types/registration-api.types'

describe('registration-validation', () => {
  const getValidPayload = (): RegistrationApiPayload => ({
    personalInfo: {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '+4712345678',
      country: 'NO'
    },
    physicalData: {
      age: 25,
      height: 170,
      weight: 70
    },
    motivationData: {
      motivationLevel: '4-6',
      fitnessGoal: 'weight_loss',
      trainingFrequency: '1-2',
      previousObstacles: []
    },
    lifestyleData: {
      pregnancyStatus: 'Nei',
      breastfeedingStatus: 'Nei'
    },
    subscription: {
      type: 'premium',
      plan: '12month',
      price: '490 kr',
      pricePerDay: '16,33 kr per dag'
    },
    metadata: {
      isLeadMagnet: false,
      registrationDate: new Date().toISOString()
    }
  })

  describe('Personal Info validation', () => {
    it('should validate valid personal info', () => {
      const payload = getValidPayload()
      expect(() => validateRegistrationPayload(payload)).not.toThrow()
    })

    it('should throw error for missing first name', () => {
      const payload = getValidPayload()
      payload.personalInfo.firstName = ''
      expect(() => validateRegistrationPayload(payload))
        .toThrow(new RegistrationValidationError('personalInfo.firstName', 'First name is required'))
    })

    it('should throw error for whitespace-only first name', () => {
      const payload = getValidPayload()
      payload.personalInfo.firstName = '   '
      expect(() => validateRegistrationPayload(payload))
        .toThrow(new RegistrationValidationError('personalInfo.firstName', 'First name is required'))
    })

    it('should throw error for missing last name', () => {
      const payload = getValidPayload()
      payload.personalInfo.lastName = ''
      expect(() => validateRegistrationPayload(payload))
        .toThrow(new RegistrationValidationError('personalInfo.lastName', 'Last name is required'))
    })

    it('should throw error for missing email', () => {
      const payload = getValidPayload()
      payload.personalInfo.email = ''
      expect(() => validateRegistrationPayload(payload))
        .toThrow(new RegistrationValidationError('personalInfo.email', 'Email is required'))
    })

    it('should throw error for invalid email format', () => {
      const payload = getValidPayload()
      const invalidEmails = ['test', 'test@', '@example.com', 'test@example', 'test @example.com']
      
      invalidEmails.forEach(email => {
        payload.personalInfo.email = email
        expect(() => validateRegistrationPayload(payload))
          .toThrow(new RegistrationValidationError('personalInfo.email', 'Invalid email format'))
      })
    })

    it('should accept valid email formats', () => {
      const payload = getValidPayload()
      const validEmails = ['user@example.com', 'test.user@example.co.uk', 'user+tag@example.org']
      
      validEmails.forEach(email => {
        payload.personalInfo.email = email
        expect(() => validateRegistrationPayload(payload)).not.toThrow()
      })
    })

    it('should throw error for missing phone', () => {
      const payload = getValidPayload()
      payload.personalInfo.phone = ''
      expect(() => validateRegistrationPayload(payload))
        .toThrow(new RegistrationValidationError('personalInfo.phone', 'Phone number is required'))
    })
  })

  describe('Physical Data validation', () => {
    it('should throw error for age below minimum', () => {
      const payload = getValidPayload()
      payload.physicalData.age = 15
      expect(() => validateRegistrationPayload(payload))
        .toThrow(new RegistrationValidationError('physicalData.age', 'Age must be between 16 and 120'))
    })

    it('should throw error for age above maximum', () => {
      const payload = getValidPayload()
      payload.physicalData.age = 121
      expect(() => validateRegistrationPayload(payload))
        .toThrow(new RegistrationValidationError('physicalData.age', 'Age must be between 16 and 120'))
    })

    it('should accept edge case ages', () => {
      const payload = getValidPayload()
      payload.physicalData.age = 16
      expect(() => validateRegistrationPayload(payload)).not.toThrow()
      
      payload.physicalData.age = 120
      expect(() => validateRegistrationPayload(payload)).not.toThrow()
    })

    it('should throw error for height below minimum', () => {
      const payload = getValidPayload()
      payload.physicalData.height = 99
      expect(() => validateRegistrationPayload(payload))
        .toThrow(new RegistrationValidationError('physicalData.height', 'Height must be between 100 and 250 cm'))
    })

    it('should throw error for height above maximum', () => {
      const payload = getValidPayload()
      payload.physicalData.height = 251
      expect(() => validateRegistrationPayload(payload))
        .toThrow(new RegistrationValidationError('physicalData.height', 'Height must be between 100 and 250 cm'))
    })

    it('should throw error for weight below minimum', () => {
      const payload = getValidPayload()
      payload.physicalData.weight = 29
      expect(() => validateRegistrationPayload(payload))
        .toThrow(new RegistrationValidationError('physicalData.weight', 'Weight must be between 30 and 300 kg'))
    })

    it('should throw error for weight above maximum', () => {
      const payload = getValidPayload()
      payload.physicalData.weight = 301
      expect(() => validateRegistrationPayload(payload))
        .toThrow(new RegistrationValidationError('physicalData.weight', 'Weight must be between 30 and 300 kg'))
    })
  })

  describe('Motivation Data validation', () => {
    it('should throw error for invalid motivation level', () => {
      const payload = getValidPayload()
      payload.motivationData.motivationLevel = '5' as any
      expect(() => validateRegistrationPayload(payload))
        .toThrow(new RegistrationValidationError('motivationData.motivationLevel', 'Invalid motivation level'))
    })

    it('should accept all valid motivation levels', () => {
      const payload = getValidPayload()
      const validLevels = ['1-3', '4-6', '7-9', '10']
      
      validLevels.forEach(level => {
        payload.motivationData.motivationLevel = level as any
        expect(() => validateRegistrationPayload(payload)).not.toThrow()
      })
    })

    it('should throw error for invalid fitness goal', () => {
      const payload = getValidPayload()
      payload.motivationData.fitnessGoal = 'endurance' as any
      expect(() => validateRegistrationPayload(payload))
        .toThrow(new RegistrationValidationError('motivationData.fitnessGoal', 'Invalid fitness goal'))
    })

    it('should accept valid fitness goals', () => {
      const payload = getValidPayload()
      const validGoals = ['weight_loss', 'muscle_gain']
      
      validGoals.forEach(goal => {
        payload.motivationData.fitnessGoal = goal as any
        expect(() => validateRegistrationPayload(payload)).not.toThrow()
      })
    })

    it('should throw error for invalid training frequency', () => {
      const payload = getValidPayload()
      payload.motivationData.trainingFrequency = 'daily' as any
      expect(() => validateRegistrationPayload(payload))
        .toThrow(new RegistrationValidationError('motivationData.trainingFrequency', 'Invalid training frequency'))
    })

    it('should accept valid training frequencies', () => {
      const payload = getValidPayload()
      const validFrequencies = ['none', '1-2', '3+']
      
      validFrequencies.forEach(frequency => {
        payload.motivationData.trainingFrequency = frequency as any
        expect(() => validateRegistrationPayload(payload)).not.toThrow()
      })
    })

    it('should throw error if previousObstacles is not an array', () => {
      const payload = getValidPayload()
      ;(payload.motivationData as any).previousObstacles = 'not-an-array'
      expect(() => validateRegistrationPayload(payload))
        .toThrow(new RegistrationValidationError('motivationData.previousObstacles', 'Previous obstacles must be an array'))
    })
  })

  describe('Lifestyle Data validation', () => {
    it('should throw error for missing pregnancy status', () => {
      const payload = getValidPayload()
      payload.lifestyleData.pregnancyStatus = ''
      expect(() => validateRegistrationPayload(payload))
        .toThrow(new RegistrationValidationError('lifestyleData.pregnancyStatus', 'Pregnancy status is required'))
    })

    it('should throw error for missing breastfeeding status', () => {
      const payload = getValidPayload()
      payload.lifestyleData.breastfeedingStatus = ''
      expect(() => validateRegistrationPayload(payload))
        .toThrow(new RegistrationValidationError('lifestyleData.breastfeedingStatus', 'Breastfeeding status is required'))
    })
  })

  describe('Subscription validation', () => {
    it('should throw error for invalid subscription plan', () => {
      const payload = getValidPayload()
      payload.subscription.plan = '3month' as any
      expect(() => validateRegistrationPayload(payload))
        .toThrow(new RegistrationValidationError('subscription.plan', 'Invalid subscription plan: 3month'))
    })

    it('should accept all valid subscription plans', () => {
      const payload = getValidPayload()
      const validPlans = ['1month', '6month', '12month', '6month_pay_at_once', '12month_pay_at_once']
      
      validPlans.forEach(plan => {
        payload.subscription.plan = plan as any
        expect(() => validateRegistrationPayload(payload)).not.toThrow()
      })
    })

    it('should throw error for missing subscription price', () => {
      const payload = getValidPayload()
      payload.subscription.price = ''
      expect(() => validateRegistrationPayload(payload))
        .toThrow(new RegistrationValidationError('subscription.price', 'Subscription price is required'))
    })
  })

  describe('Metadata validation', () => {
    it('should throw error if isLeadMagnet is not boolean', () => {
      const payload = getValidPayload()
      ;(payload.metadata as any).isLeadMagnet = 'true'
      expect(() => validateRegistrationPayload(payload))
        .toThrow(new RegistrationValidationError('metadata.isLeadMagnet', 'Lead magnet flag must be a boolean'))
    })

    it('should throw error for missing registration date', () => {
      const payload = getValidPayload()
      ;(payload.metadata as any).registrationDate = null
      expect(() => validateRegistrationPayload(payload))
        .toThrow(new RegistrationValidationError('metadata.registrationDate', 'Registration date is required'))
    })
  })

  describe('RegistrationValidationError', () => {
    it('should have correct properties', () => {
      const error = new RegistrationValidationError('test.field', 'Test message')
      expect(error.name).toBe('RegistrationValidationError')
      expect(error.field).toBe('test.field')
      expect(error.message).toBe('Test message')
      expect(error).toBeInstanceOf(Error)
    })
  })
})