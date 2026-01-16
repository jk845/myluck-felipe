# Backend Task: Post-Registration Data Storage

## Задача
Создать новую Supabase Edge Function для сохранения данных пост-регистрационных вопросов.

## Техническая информация

### Новая Edge Function
- **Путь**: `/functions/v1/store-onboarding-data`
- **Метод**: POST
- **Content-Type**: application/json

### Входные данные (Request Body)
```json
{
  "email": "user@example.com",
  "orderId": "mol_abc123",
  "postRegistrationData": {
    "trainingType": ["cardio", "strength"],
    "trainingVariation": "home_and_gym",
    "exerciseConfidence": "quite_well",
    "insecurities": ["belly", "arms"],
    "mentalityFocus": "never_focused",
    "previousObstacles": "Слишком много работы и стресс",
    "interestedInInnerCircle": "yes"
  }
}
```

### Поля данных (подробно)

#### `trainingType` (array)
Возможные значения:
- `"cardio"` - Kondisjon/cardio
- `"strength"` - Styrke
- `"mobility"` - Mobilitet og tøying
- `"mental"` - Mental trening

#### `trainingVariation` (string)
Возможные значения:
- `"home"` - Hjemmetrening
- `"gym"` - Treningssenter
- `"home_and_gym"` - Hjemmetrening og treningssenter

#### `exerciseConfidence` (string)
Возможные значения:
- `"very_well"` - Jeg håndterer trening og øvelser veldig godt
- `"quite_well"` - Jeg klarer meg ganske bra, men utvikler meg fortsatt
- `"middle"` - Jeg er litt midt i mellom
- `"new"` - Jeg er ny på trening

#### `insecurities` (array)
Возможные значения:
- `"belly"` - Magen
- `"arms"` - Armene
- `"legs"` - Bena/rumpa
- `"overall"` - Generell kroppsform
- `"energy"` - Energinivå

#### `mentalityFocus` (string)
Возможные значения:
- `"big_focus"` - Det har vært et stort fokus
- `"some_focus"` - Det har vært noe fokus
- `"little_focus"` - Det har vært lite fokus
- `"never_focused"` - Jeg har aldri fokusert på det

#### `previousObstacles` (string)
Fri tekst fra brukeren

#### `interestedInInnerCircle` (string)
Возможные значения:
- `"yes"` - Ja, det høres interessant ut!
- `"no"` - Nei takk

## Предлагаемое решение для хранения

### Вариант 1: Простое JSON поле (рекомендую)
```sql
-- Добавить новую колонку в существующую таблицу customers
ALTER TABLE customers 
ADD COLUMN post_registration_data JSONB;

-- Индекс для поиска по данным
CREATE INDEX idx_customers_post_registration 
ON customers USING GIN (post_registration_data);
```

### Вариант 2: Отдельная таблица
```sql
CREATE TABLE post_registration_responses (
  id SERIAL PRIMARY KEY,
  customer_email TEXT NOT NULL,
  order_id TEXT NOT NULL,
  training_types JSONB,
  training_variation TEXT,
  exercise_confidence TEXT,
  insecurities JSONB,
  mentality_focus TEXT,
  previous_obstacles TEXT,
  interested_in_inner_circle TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Логика Edge Function

```typescript
import { createClient } from '@supabase/supabase-js'

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const { email, orderId, postRegistrationData } = await req.json()

    // Валидация
    if (!email || !orderId || !postRegistrationData) {
      return new Response('Missing required fields', { status: 400 })
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // Вариант 1: Обновляем существующую запись
    const { error } = await supabase
      .from('customers')
      .update({ 
        post_registration_data: postRegistrationData,
        updated_at: new Date().toISOString()
      })
      .eq('email', email)
      .eq('order_id', orderId)

    if (error) {
      console.error('Database error:', error)
      return new Response('Database error', { status: 500 })
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Function error:', error)
    return new Response('Internal server error', { status: 500 })
  }
}
```

## Когда вызывается
Фронтенд отправляет запрос на шаге 8 из 9 (InnerCircle) после того, как пользователь ответил на последний вопрос.

## Обработка ошибок
- Если запрос fails, пользователь все равно переходит к Instructions
- Логируем ошибку для дебага
- Не блокируем user flow

## Дальнейшие улучшения
1. Добавить RLS политики
2. Валидация enum значений
3. Дедупликация по email + orderId
4. Webhook для интеграции с внешними системами

## Frontend Integration
Уже готово в `/src/containers/post-registration/ConfirmationContainer.tsx:305-348`