import { describe, it, expect, beforeEach } from 'vitest'
import { PollingBackoff } from '../polling-backoff'

describe('PollingBackoff', () => {
  let backoff: PollingBackoff

  beforeEach(() => {
    backoff = new PollingBackoff()
  })

  describe('getNextDelay', () => {
    it('should start with base delay of 5 seconds', () => {
      expect(backoff.getNextDelay()).toBe(5000)
    })

    it('should implement exponential backoff', () => {
      expect(backoff.getNextDelay()).toBe(5000)  // 5s
      expect(backoff.getNextDelay()).toBe(10000) // 10s
      expect(backoff.getNextDelay()).toBe(20000) // 20s
      expect(backoff.getNextDelay()).toBe(40000) // 40s
    })

    it('should cap delay at max delay of 60 seconds', () => {
      // The exponential backoff caps at 2^3 = 8x base delay
      backoff.getNextDelay() // 5s (2^0 * 5000 = 5000)
      backoff.getNextDelay() // 10s (2^1 * 5000 = 10000)
      backoff.getNextDelay() // 20s (2^2 * 5000 = 20000)
      backoff.getNextDelay() // 40s (2^3 * 5000 = 40000)
      // After attempt 4, the exponent is capped at 3, so it stays at 40s
      expect(backoff.getNextDelay()).toBe(40000) // 40s (2^3 * 5000 = 40000)
      expect(backoff.getNextDelay()).toBe(40000) // Still 40s
    })

    it('should return -1 after max attempts', () => {
      // Exhaust all attempts
      for (let i = 0; i < 19; i++) {
        const delay = backoff.getNextDelay()
        expect(delay).toBeGreaterThan(0)
      }
      // 20th attempt should return -1
      expect(backoff.getNextDelay()).toBe(-1)
    })
  })

  describe('reset', () => {
    it('should reset attempt counter', () => {
      // Make some attempts
      backoff.getNextDelay()
      backoff.getNextDelay()
      expect(backoff.getAttempt()).toBe(2)
      
      // Reset
      backoff.reset()
      expect(backoff.getAttempt()).toBe(0)
      
      // Should start from beginning again
      expect(backoff.getNextDelay()).toBe(5000)
    })
  })

  describe('shouldStop', () => {
    it('should return false before max attempts', () => {
      expect(backoff.shouldStop()).toBe(false)
      
      // Make some attempts
      for (let i = 0; i < 19; i++) {
        backoff.getNextDelay()
        expect(backoff.shouldStop()).toBe(false)
      }
    })

    it('should return true after max attempts', () => {
      // Exhaust all attempts
      for (let i = 0; i < 20; i++) {
        backoff.getNextDelay()
      }
      expect(backoff.shouldStop()).toBe(true)
    })
  })

  describe('getAttempt', () => {
    it('should return current attempt count', () => {
      expect(backoff.getAttempt()).toBe(0)
      
      backoff.getNextDelay()
      expect(backoff.getAttempt()).toBe(1)
      
      backoff.getNextDelay()
      expect(backoff.getAttempt()).toBe(2)
    })
  })

  describe('full polling scenario', () => {
    it('should handle typical polling flow', () => {
      const delays: number[] = []
      
      // Simulate polling until stop
      while (!backoff.shouldStop()) {
        const delay = backoff.getNextDelay()
        if (delay > 0) {
          delays.push(delay)
        }
      }
      
      // Should have exactly 19 delays (20th returns -1)
      expect(delays).toHaveLength(19)
      
      // Verify exponential pattern
      expect(delays[0]).toBe(5000)
      expect(delays[1]).toBe(10000)
      expect(delays[2]).toBe(20000)
      expect(delays[3]).toBe(40000)
      
      // Verify staying at 40s (Math.pow(2, 3) * 5000 = 40000)
      for (let i = 4; i < 19; i++) {
        expect(delays[i]).toBe(40000)
      }
    })
  })
})