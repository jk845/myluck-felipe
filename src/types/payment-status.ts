export const PAYMENT_STATUS = {
    OPEN: 'open',
    PENDING: 'pending',
    PAID: 'paid',
    FAILED: 'failed',
    EXPIRED: 'expired',
    CANCELED: 'canceled',
} as const;

export type PaymentStatus = typeof PAYMENT_STATUS[keyof typeof PAYMENT_STATUS];