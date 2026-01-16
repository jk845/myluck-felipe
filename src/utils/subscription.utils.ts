/**
 * Subscription utility functions
 */

export const monthToText = (month: string): string => {
    switch (month) {
        case "12month":
            return "12-måneders binding";
        case "6month":
            return "6-måneders binding";
        case "1month":
            return "1-måneds binding";
        default:
            return "Månedlig";
    }
};

export const getPricePerDay = (plan: string): string => {
    const pricesPerDay = {
        '1month': '29,66 kr per dag',
        '6month': '19,66 kr per dag',
        '12month': '16,33 kr per dag'
    };
    return pricesPerDay[plan as keyof typeof pricesPerDay] || '';
};

export const getSubscriptionPrice = (plan: string): string => {
    const prices = {
        '1month': '890 kr',
        '6month': '590 kr',
        '12month': '490 kr'
    };
    return prices[plan as keyof typeof prices] || '490 kr';
};