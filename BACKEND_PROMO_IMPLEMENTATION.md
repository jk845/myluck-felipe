# 🚀 Backend Implementation: Promo Pricing

## ✅ ЧТО ДЕЛАТЬ (3 шага):

### 1️⃣ Добавить поле в TypeScript interface:

```typescript
// В вашем subscription type
subscription: {
  plan: "1month" | "6month" | "12month";
  isPromo?: boolean;  // ← ДОБАВИТЬ ТОЛЬКО ЭТО
}
```

### 2️⃣ Добавить логику промо ПЕРЕД созданием Mollie payment:

```typescript
// Где-то перед mollie.payments.create()
let paymentPrice = selectedPlan.price; // "490.00", "590.00" или "890.00"

// Применить промо-цену для первого платежа
if (subscription.isPromo) {
  if (plan === "12month") paymentPrice = "49.00";  // Вместо 490
  if (plan === "6month")  paymentPrice = "59.00";  // Вместо 590
  // 1month - промо НЕТ, остаётся 890
}

console.log('💰 Payment price:', paymentPrice, subscription.isPromo ? '(PROMO)' : '');
```

### 3️⃣ Использовать эту цену в Mollie payment:

```typescript
await mollie.payments.create({
  amount: {
    value: paymentPrice,  // ← ИСПОЛЬЗОВАТЬ paymentPrice вместо selectedPlan.price
    currency: "NOK"
  },
  description: `Premium ${plan} subscription`,
  redirectUrl: `${process.env.PUBLIC_APP_URL}/payment-success`,
  webhookUrl: `${process.env.MOLLIE_WEBHOOK_URL}`,
  metadata: {
    customerId: customer.id,
    subscriptionPlan: plan,
    isPromo: subscription.isPromo || false  // ← Для логов
  }
});
```

---

## 📊 Таблица цен:

| План     | Обычная цена | Промо-цена (isPromo=true) | Последующие платежи |
|----------|--------------|---------------------------|---------------------|
| 1 month  | 890 kr       | 890 kr (нет промо)       | 890 kr/мес          |
| 6 month  | 590 kr       | **59 kr** ✨             | 590 kr/мес × 5      |
| 12 month | 490 kr       | **49 kr** ✨             | 490 kr/мес × 11     |

---

## 🧪 Как проверить что фронт отправляет:

### Откройте DevTools на проде:
```
https://myluck.gymfluence.io/registration?simplified=true&promo=true
```

### В Console увидите:
```
🔍 [useRegistrationSubmit] Building payload with isPromo: true
📦 [useRegistrationSubmit] Built payload.subscriptionInfo.isPromo: true
📤 [Registration Service] API subscription: {
  type: "premium",
  plan: "12month",
  price: "490 kr",
  pricePerDay: "16,33 kr per dag",
  isPromo: true  ← ДОЛЖНО БЫТЬ!
}
```

### В Network → Request Payload:
```json
{
  "subscription": {
    "type": "premium",
    "plan": "12month",
    "price": "490 kr",
    "pricePerDay": "16,33 kr per dag",
    "isPromo": true  ← ВОТ ОНО
  }
}
```

---

## ⚠️ ВАЖНО:

1. **НЕ трогать** остальную структуру запроса (personalInfo, physicalData и т.д.)
2. **НЕ менять** логику создания подписки
3. **ТОЛЬКО** изменить цену первого платежа если `isPromo === true`
4. Последующие платежи идут по **полной цене**

---

## 🎯 Результат:

- Пользователь платит 49 kr сегодня
- Через месяц автоплатёж 490 kr
- Ещё 10 месяцев по 490 kr
- **Итого за год: 49 + (490 × 11) = 5439 kr вместо 5880 kr**

---

## 🔥 ВСЁ ГОТОВО!

Фронтенд уже отправляет `isPromo: true` в объекте `subscription`.

Нужно только добавить 3 строки кода на бэке для применения промо-цены.
