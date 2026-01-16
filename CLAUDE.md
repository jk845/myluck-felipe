# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Mila Checkout - a fitness and wellness subscription web application handling user registration, subscription management, and post-payment onboarding. The app is entirely in Norwegian.

## Tech Stack

- **Frontend**: React 18.3 with TypeScript, Vite with SWC
- **Routing**: React Router v7
- **Styling**: Tailwind CSS with custom theme, shadcn/ui components
- **State Management**: Zustand with persistence
- **Forms**: React Hook Form
- **Backend**: Supabase (auth, database, edge functions)
- **Deployment**: Vercel
- **Package Manager**: pnpm (preferred), npm (fallback)
- **Analytics**: Vercel Analytics + PostHog
- **Fullpage Scrolling**: @fullpage/react-fullpage for landing page

## Essential Commands

```bash
# Development
npm run dev       # Start dev server on http://localhost:5173 with host access
npm run build     # TypeScript check + production build
npm run lint      # Run ESLint
npm run preview   # Preview production build

# Testing
npm run test          # Run tests with Vitest
npm run test:ui       # Run tests with UI interface
npm run test:coverage # Generate test coverage report
```

## Architecture Overview

### Container/Presenter Pattern
The application uses a clear separation between business logic and presentation:
- `/src/pages/` - Route entry points (*Page.tsx convention)
- `/src/containers/` - Business logic, state management, API calls (*Container.tsx convention)
  - `/cancellation/` - Cancellation flow containers
  - `/registration/` - Registration flow containers (single RegistrationContainer manages all steps)
  - `/post-registration/` - Post-payment onboarding containers
  - `/static-pages/` - Static page containers
  - `/landing/` - Landing page container
- `/src/components/presenters/` - Pure presentation components (*Presenter.tsx convention)
  - Same subdirectory structure as containers
- `/src/hooks/` - Custom React hooks for shared logic
- `/src/services/` - API and external service integrations
- `/src/store/` - Zustand stores for global state

### Multi-Step Registration Flow
The registration is managed by a single `RegistrationContainer` that renders different step components:
1. SubscriptionType - Initial subscription selection
2. Motivation - User motivation assessment
3. SubscriptionPlan - Plan selection with pricing
4. PhysicalData - Body measurements collection
5. GoalsLifestyle - Goals and lifestyle preferences
6. ContactInfo - Contact information
7. OrderConfirmation - Final confirmation

State is persisted across steps using Zustand store in `/src/store/registration.store.ts` with sophisticated navigation control:
- Users cannot skip steps (must complete in order)
- Can navigate backwards to previous steps
- Browser history integration for back/forward buttons
- Progress validation and step completion tracking
- All registration routes (`/registration`, `/subscription`, `/subscription-plan`) render the same RegistrationPage

### Post-Registration Onboarding
After payment, users complete onboarding through multiple steps in `/src/pages/post-registration/`:
- WelcomeStep, GoalsStep, PersonalInfoStep, PhysicalDataPostRegStep
- TrainingFrequencyStep, TrainingTypeStep, TrainingVariationStep
- Additional steps for user profiling (ExerciseConfidence, MentalityFocus, Insecurities, etc.)
- InstructionsStep, PaymentSuccessStep

### Key Patterns

1. **Path Aliases**: Use `@/` for imports from src directory
   ```typescript
   import { Button } from "@/components/ui/button"
   ```

2. **Component Structure**:
   - Pages in `/src/pages/` - Route entry points (*Page.tsx pattern)
   - Containers in `/src/containers/` - Business logic (*Container.tsx pattern)
   - Presenters in `/src/components/presenters/` - Pure UI (*Presenter.tsx pattern)
   - UI primitives in `/src/components/ui/` (shadcn/ui based)
   - Icons in `/src/components/assets/icons/`

3. **Routing**:
   - Main routes defined in `App.tsx`
   - All registration steps handled by single `/registration` route
   - Step management via Zustand store
   - Route components use *Page.tsx naming convention
   - Maintenance mode support via `VITE_MAINTENANCE_MODE` env var

4. **Styling**:
   - Tailwind utilities with custom Norwegian fonts (Hind Vadodara, Libre Baskerville)
   - Mobile-first responsive design (max-w-md containers)
   - Dynamic viewport height support (screen-dvh)
   - PageContainer component for consistent layout
   - Custom styles in `/src/styles/` for specific features

## Supabase Integration

- Environment variable required: `VITE_SUPABASE_URL`
- Custom API service (`/src/services/api.service.ts`):
  - Generic HTTP client with 30-second timeout
  - Automatic retry logic and error handling
  - Custom ApiError class for structured error responses
- Edge functions handle:
  - Order creation and cancellations
  - Email notifications
  - User data persistence and updates

## Type Definitions

- Types co-located with components or in dedicated `.types.ts` files
- Global types in `/src/types/`
- Form schemas typically defined alongside form components

## Important Considerations

- **Language**: All UI content must be in Norwegian
- **Mobile-First**: Design decisions prioritize mobile experience
- **Payment Gateway**: Mollie integration referenced in flows
- **Analytics**: Vercel Analytics + PostHog for user tracking
- **State Persistence**: Registration data saved to localStorage via Zustand persist middleware
- **Testing**: Vitest with happy-dom environment, tests in `__tests__` folders, setup in `/src/test/setup.ts`
- **Payment Integration**: Mollie gateway with polling for payment status updates
- **Image Optimization**: Preloading patterns for next-step images, lazy loading for non-critical assets
- **Error Handling**: Norwegian error messages with structured ApiError responses
- **Default Subscription**: 12-month plan is selected by default
- **Commits**: Commit messages in English

## Development Workflow

1. Clone repository and install: `npm install`
2. Set up environment variables (`.env` with `VITE_SUPABASE_URL`)
3. Run dev server: `npm run dev` (accessible at http://localhost:5173)
4. Make changes following the container/presenter pattern:
   - Create/update Page component for routing
   - Implement Container for business logic
   - Create Presenter for UI rendering
5. Ensure TypeScript checks pass: `npm run build`
6. Check linting: `npm run lint`
7. Run tests: `npm run test`

## Creating New Features

When adding new pages or features:
1. Create a Page component in `/src/pages/*Page.tsx`
2. Create a Container in `/src/containers/[feature]/*Container.tsx`
3. Create a Presenter in `/src/components/presenters/[feature]/*Presenter.tsx`
4. Add route in `App.tsx` using the Page component
5. Export from index files for clean imports
6. If multi-step flow, consider using Zustand store for state management

## Custom Components & Utilities

### Key Custom Components
- `/src/components/ui/wheel-picker/` - Custom wheel picker for measurements
- `/src/components/ui/phone-input/` - International phone number input
- `/src/components/ui/payment-option-button/` - Payment plan selection buttons
- `/src/components/GradientCard.tsx` - Reusable card with gradient backgrounds

### Utility Functions
- `/src/utils/validation.ts` - Form validation helpers
- `/src/utils/subscription.utils.ts` - Subscription plan calculations and formatting
- `/src/utils/preloadImages.ts` - Image preloading for performance
- `/src/utils/polling-backoff.ts` - Exponential backoff for payment polling

### Custom Hooks
- `/src/hooks/usePaymentPolling.ts` - Background payment status checking
- `/src/hooks/useThankYouData.ts` - Customer information fetching for success pages
- `/src/hooks/useOnce.ts` - Execute effect only once

## State Management Patterns

### Zustand Store Structure
Each store uses `persist` middleware for localStorage synchronization:
- **Registration Store**: Multi-step form data with validation states
- **Post-Registration Store**: Onboarding flow progress and user preferences

### Store Methods Pattern
- `setStepData(step, data)` - Update specific step data
- `goToStep(step)` - Navigate with validation
- `getCompletedSteps()` - Calculate completion status
- `canNavigateToStep(step)` - Validate navigation permissions
- `reset()` - Clear all persisted data