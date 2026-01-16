# Инструкция по настройке воронки регистрации в PostHog

## Обзор трекинга

Теперь ваше приложение отслеживает детальную аналитику регистрации и post-registration onboarding.

### Важное уточнение процесса:
После успешной оплаты пользователь автоматически перенаправляется на `/confirmation` страницу, где начинается post-registration onboarding процесс.

Вот полный список событий:

### События регистрации

1. **`registration_started`** - Пользователь начал регистрацию
   - `timestamp` - время начала
   - UTM-параметры

2. **`registration_step_viewed`** - Просмотр шага регистрации
   - `step_name` - название шага
   - `step_number` - номер шага (1-7)
   - `previous_step` - предыдущий шаг
   - `time_on_previous_step` - время на предыдущем шаге (секунды)
   - `session_duration` - общее время сессии
   - UTM-параметры

3. **`registration_step_completed`** - Завершение шага
   - `step_name` - название шага
   - `step_number` - номер шага
   - `time_on_step` - время на шаге (секунды)
   - `form_data` - данные формы
   - `session_duration` - общее время сессии

4. **`form_validation_error`** - Ошибка валидации
   - `step_name` - шаг где произошла ошибка
   - `field_name` - поле с ошибкой
   - `error_type` - тип ошибки

5. **`registration_navigation_back`** - Возврат на предыдущий шаг
   - `from_step` - откуда вернулся
   - `to_step` - куда вернулся

6. **`payment_initiated`** - Переход к оплате
   - `payment_method` - способ оплаты (monthly/upfront)
   - `subscription_plan` - выбранный план

7. **`registration_completed`** - Регистрация завершена
   - `subscription_plan` - финальный план
   - `payment_method` - способ оплаты

### События Post-Registration (после оплаты)

8. **`payment_success`** - Оплата прошла успешно, пользователь на `/confirmation`
   - `email` - email пользователя
   - `orderId` - ID заказа
   - `subscription_plan` - план подписки

9. **`post_registration_started`** - Начался onboarding после оплаты
   - `email` - email пользователя
   - `orderId` - ID заказа

10. **`post_registration_step_viewed`** - Просмотр шага onboarding
    - `step_name` - название шага
    - `step_number` - номер шага

11. **`post_registration_step_completed`** - Завершение шага onboarding
    - `step_name` - название шага
    - `form_data` - данные формы

12. **`post_registration_completed`** - Onboarding завершен
    - `email` - email пользователя
    - `all_data_submitted` - все данные отправлены

### Шаги Post-Registration Onboarding:
1. `payment-success` - Подтверждение оплаты
2. `training-type` - Тип тренировок
3. `training-variation` - Вариации тренировок
4. `exercise-confidence` - Уверенность в упражнениях
5. `insecurities` - Проблемные зоны
6. `mentality-focus` - Ментальный фокус
7. `previous-obstacles` - Прошлые препятствия
8. `inner-circle` - Интерес к Inner Circle
9. `instructions` - Инструкции

## Настройка воронки в PostHog

### 1. Создание полной воронки (Registration + Post-Registration)

1. Войдите в PostHog
2. Перейдите в **Insights** → **New Insight** → **Funnel**
3. Настройте шаги воронки:

```
REGISTRATION PHASE:
Шаг 1: registration_started
Шаг 2: registration_step_viewed (where step_name = 'subscription-type')
Шаг 3: registration_step_viewed (where step_name = 'motivation')
Шаг 4: registration_step_viewed (where step_name = 'subscription-plan')
Шаг 5: registration_step_viewed (where step_name = 'physical-data')
Шаг 6: registration_step_viewed (where step_name = 'goals-lifestyle')
Шаг 7: registration_step_viewed (where step_name = 'contact-info')
Шаг 8: registration_step_viewed (where step_name = 'order-confirmation')
Шаг 9: payment_initiated
Шаг 10: registration_completed

PAYMENT & POST-REGISTRATION PHASE:
Шаг 11: payment_success
Шаг 12: post_registration_started
Шаг 13: post_registration_step_viewed (where step_name = 'training-type')
Шаг 14: post_registration_step_viewed (where step_name = 'training-variation')
Шаг 15: post_registration_step_viewed (where step_name = 'exercise-confidence')
Шаг 16: post_registration_step_viewed (where step_name = 'insecurities')
Шаг 17: post_registration_step_viewed (where step_name = 'mentality-focus')
Шаг 18: post_registration_step_viewed (where step_name = 'previous-obstacles')
Шаг 19: post_registration_step_viewed (where step_name = 'inner-circle')
Шаг 20: post_registration_step_viewed (where step_name = 'instructions')
Шаг 21: post_registration_completed
```

4. Установите **Conversion window**: 7 дней (так как post-registration может быть завершен позже)
5. Сохраните воронку как "Complete Customer Journey Funnel"

### 2. Создание отдельных воронок

#### Воронка только регистрации:
```
Шаг 1: registration_started
Шаг 2: registration_step_completed (where step_name = 'subscription-type')
Шаг 3: registration_step_completed (where step_name = 'motivation')
Шаг 4: registration_step_completed (where step_name = 'subscription-plan')
Шаг 5: registration_step_completed (where step_name = 'physical-data')
Шаг 6: registration_step_completed (where step_name = 'goals-lifestyle')
Шаг 7: registration_step_completed (where step_name = 'contact-info')
Шаг 8: payment_initiated
Шаг 9: payment_success
```

#### Воронка Post-Registration Onboarding:
```
Шаг 1: payment_success
Шаг 2: post_registration_started
Шаг 3: post_registration_step_completed (where step_name = 'payment-success')
Шаг 4: post_registration_step_completed (where step_name = 'training-type')
Шаг 5: post_registration_step_completed (where step_name = 'training-variation')
Шаг 6: post_registration_step_completed (where step_name = 'exercise-confidence')
Шаг 7: post_registration_step_completed (where step_name = 'insecurities')
Шаг 8: post_registration_step_completed (where step_name = 'mentality-focus')
Шаг 9: post_registration_step_completed (where step_name = 'previous-obstacles')
Шаг 10: post_registration_step_completed (where step_name = 'inner-circle')
Шаг 11: post_registration_step_completed (where step_name = 'instructions')
Шаг 12: post_registration_completed
```

### 3. Настройка дашборда

1. Создайте новый Dashboard: **"Registration Analytics"**
2. Добавьте следующие виджеты:

#### Основные метрики
- **Conversion Rate**: процент завершивших регистрацию
- **Average Time to Complete**: среднее время регистрации
- **Drop-off by Step**: где больше всего отваливаются

#### Детальная аналитика
- **Time per Step**: среднее время на каждом шаге
- **Validation Errors**: топ ошибок валидации по полям
- **Navigation Back Rate**: процент возвратов по шагам
- **Subscription Plans Distribution**: распределение по планам
- **Payment Methods**: соотношение monthly vs upfront

### 4. Настройка сегментации

Создайте сегменты для анализа:

1. **По источнику трафика** (UTM):
   - Фильтр по `utm_source`
   - Фильтр по `utm_campaign`

2. **По плану подписки**:
   - 1 месяц
   - 6 месяцев
   - 12 месяцев

3. **По времени на регистрацию**:
   - Быстрые (< 5 минут)
   - Средние (5-15 минут)
   - Долгие (> 15 минут)

### 5. Настройка алертов

Настройте уведомления для критических метрик:

1. **Low Conversion Alert**:
   - Если конверсия падает ниже 20%

2. **High Drop-off Alert**:
   - Если отвал на каком-то шаге > 50%

3. **Validation Error Spike**:
   - Если количество ошибок валидации растет

## Анализ воронки

### Ключевые метрики для отслеживания

1. **Overall Conversion Rate** - процент дошедших до оплаты
2. **Step-by-Step Conversion** - конверсия между шагами
3. **Time to Convert** - время от старта до оплаты
4. **Abandonment Points** - где чаще всего уходят
5. **Error Rate** - процент пользователей с ошибками валидации

### Оптимизация на основе данных

1. **Если большой отвал на physical-data**:
   - Упростить форму
   - Добавить подсказки
   - Сделать поля опциональными

2. **Если много ошибок валидации на contact-info**:
   - Улучшить валидацию email
   - Добавить автозаполнение
   - Показывать примеры

3. **Если долгое время на motivation**:
   - Упростить выбор
   - Уменьшить количество опций
   - Добавить значения по умолчанию

## Идентификация пользователей

После шага contact-info пользователь идентифицируется по email. Это позволяет:

1. Связать сессии одного пользователя
2. Отслеживать повторные попытки регистрации
3. Строить когорты по user properties
4. Анализировать LTV по когортам

## Дополнительные возможности

### A/B тестирование

Используйте Feature Flags в PostHog для тестирования:
- Разных текстов на шагах
- Количества шагов
- Порядка шагов
- Дефолтных значений

### Retention анализ

После запуска отслеживайте:
- Возвращаются ли незавершившие регистрацию
- Конверсия при повторных попытках
- Эффективность ремаркетинга

## Проверка работы

1. Откройте приложение в режиме инкогнито
2. Пройдите регистрацию с UTM-параметрами: `?utm_source=test&utm_campaign=funnel_test`
3. В PostHog перейдите в **Events** и проверьте наличие всех событий
4. Проверьте воронку - должны появиться данные

## Контакты для вопросов

При возникновении вопросов по настройке обращайтесь к команде разработки.