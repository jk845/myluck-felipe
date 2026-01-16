# UI Component Library Structure

## Организация компонентов

### `/core` - Базовые компоненты
- Button variants (ActionButton, BackButton)
- Typography components
- Basic inputs

### `/forms` - Компоненты форм
- **Selectors**: SingleChoiceButton, MultiChoiceButton
- **Inputs**: CountrySelect, CopyField
- **Pickers**: WheelPicker variants
- **Specialized**: PregnancySelector, BreastfeedingSelector

### `/feedback` - Компоненты обратной связи
- Loaders (PaymentProcessingLoader, SkeletonLoader)
- Icons (CheckIcon, SuccessIcon)
- Alerts and errors

### `/layout` - Компоненты макета
- PageContainer
- Cards (OrderDetailsCard, PaymentPendingCard)
- ProgressIndicator

### `/display` - Компоненты отображения
- LazyImage
- PlanOption
- Carousel

## Правила именования

1. **Single vs Multi**: Используем префиксы для ясности выбора
   - `SingleChoice*` - один вариант из многих
   - `MultiChoice*` - несколько вариантов

2. **Суффиксы по типу**:
   - `*Button` - кликабельные элементы
   - `*Card` - контейнеры с информацией
   - `*Selector` - специализированные селекторы
   - `*Picker` - выбор значений

## Использование

```tsx
// Формы с единичным выбором
import { SingleChoiceButton } from '@/components/ui/forms/single-choice-button';

// Формы с множественным выбором  
import { MultiChoiceButton } from '@/components/ui/forms/multi-choice-button';

// Специализированные селекторы
import { PregnancySelector } from '@/components/ui/forms/pregnancy-selector';
```