/**
 * Exponential backoff for polling
 * Starts with 5 seconds, increases to max 60 seconds
 */
export class PollingBackoff {
  private attempt = 0;
  private readonly baseDelay = 5000; // 5 seconds
  private readonly maxDelay = 60000; // 60 seconds
  private readonly maxAttempts = 20; // Stop after 20 attempts
  
  reset() {
    this.attempt = 0;
  }
  
  getNextDelay(): number {
    this.attempt++;
    
    if (this.attempt >= this.maxAttempts) {
      return -1; // Signal to stop polling
    }
    
    // Exponential backoff: 5s, 10s, 20s, 40s, 60s, 60s...
    const delay = Math.min(
      this.baseDelay * Math.pow(2, Math.min(this.attempt - 1, 3)),
      this.maxDelay
    );
    
    return delay;
  }
  
  shouldStop(): boolean {
    return this.attempt >= this.maxAttempts;
  }
  
  getAttempt(): number {
    return this.attempt;
  }
}