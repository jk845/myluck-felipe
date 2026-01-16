import { describe, it, expect } from 'vitest'
import { monthToText, getPricePerDay, getSubscriptionPrice } from '../subscription.utils'

describe('subscription.utils', () => {
  describe('monthToText', () => {
    it('should return correct text for 12-month plan', () => {
      expect(monthToText('12month')).toBe('12-måneders binding')
    })

    it('should return correct text for 6-month plan', () => {
      expect(monthToText('6month')).toBe('6-måneders binding')
    })

    it('should return correct text for 1-month plan', () => {
      expect(monthToText('1month')).toBe('1-måneds binding')
    })

    it('should return default text for unknown plan', () => {
      expect(monthToText('unknown')).toBe('Månedlig')
    })

    it('should return default text for empty string', () => {
      expect(monthToText('')).toBe('Månedlig')
    })
  })

  describe('getPricePerDay', () => {
    it('should return correct price per day for 1-month plan', () => {
      expect(getPricePerDay('1month')).toBe('29,66 kr per dag')
    })

    it('should return correct price per day for 6-month plan', () => {
      expect(getPricePerDay('6month')).toBe('19,66 kr per dag')
    })

    it('should return correct price per day for 12-month plan', () => {
      expect(getPricePerDay('12month')).toBe('16,33 kr per dag')
    })

    it('should return empty string for unknown plan', () => {
      expect(getPricePerDay('unknown')).toBe('')
    })

    it('should return empty string for empty string', () => {
      expect(getPricePerDay('')).toBe('')
    })
  })

  describe('getSubscriptionPrice', () => {
    it('should return correct price for 1-month plan', () => {
      expect(getSubscriptionPrice('1month')).toBe('890 kr')
    })

    it('should return correct price for 6-month plan', () => {
      expect(getSubscriptionPrice('6month')).toBe('590 kr')
    })

    it('should return correct price for 12-month plan', () => {
      expect(getSubscriptionPrice('12month')).toBe('490 kr')
    })

    it('should return default price for unknown plan', () => {
      expect(getSubscriptionPrice('unknown')).toBe('490 kr')
    })

    it('should return default price for empty string', () => {
      expect(getSubscriptionPrice('')).toBe('490 kr')
    })
  })
})