/**
 * Promotional offer configuration
 * All promo-related settings should be managed here
 */

// Price increase deadline configuration
// Format: new Date(year, monthIndex, day, hour, minute, second)
// Note: monthIndex is 0-based (0 = January, 9 = October)
export const PRICE_INCREASE_DEADLINE = import.meta.env.VITE_PROMO_DEADLINE
  ? new Date(import.meta.env.VITE_PROMO_DEADLINE)
  : new Date(2025, 9, 20, 20, 0, 0); // Default: Oct 20, 2025 at 20:00

// Promotional pricing configuration
export const PROMO_PRICING = {
  firstMonth: {
    '1month': 890,  // No discount for 1 month
    '6month': 59,   // First month at 59 kr
    '12month': 49,  // First month at 49 kr
  },
  regularPrice: {
    '1month': 890,
    '6month': 590,
    '12month': 490,
  },
};

// Feature flags for promotional offers
export const PROMO_FEATURES = {
  showLimitedOffer: true,
  showCountdownTimer: true,
  showGuarantee: true,
};

// Marketing text configuration
export const PROMO_TEXT = {
  timerExpired: 'Prisøkning aktiv',
  timerSubheading: 'Deretter gjelder første måned til full pris',
};

// Timezone configuration (for consistent deadline across regions)
export const PROMO_TIMEZONE = 'Europe/Oslo';