import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@/lib/shadcn.tsx";
import ScrollToTop from "@/components/ui/scroll-to-top";
import { RouteTracker } from "@/components/analytics/RouteTracker";
import { MaintenancePage } from "@/components/MaintenancePage";
import RegistrationPage from "./pages/RegistrationPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import ThankYouPage from "./pages/ThankYouPage";
import AboutCompanyPage from "./pages/AboutCompanyPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
import TermsAndConditionsV2Page from "./pages/TermsAndConditionsV2Page";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import PaymentFailedPage from "./pages/PaymentFailedPage";
import CancelSubscriptionPage from "./pages/CancelSubscriptionPage";
import ConfirmCancellationPage from "./pages/ConfirmCancellationPage";
import CancellationSuccessPage from "./pages/CancellationSuccessPage";
import CancellationErrorPage from "./pages/CancellationErrorPage";
import LandingPage from "./pages/LandingPage";
import TestPage from "./pages/TestPage";
import CheckoutPage from "./pages/CheckoutPage";
import CheckoutLimitedOfferPage from "./pages/CheckoutLimitedOfferPage";
import CheckoutV2Page from "./pages/CheckoutV2Page";

const App: React.FC = () => {
  // Maintenance mode через переменную окружения
  const MAINTENANCE_MODE = import.meta.env.VITE_MAINTENANCE_MODE === 'true';

  // Проверка bypass параметра
  const urlParams = new URLSearchParams(window.location.search);
  const bypassMaintenance = urlParams.get('bypass-maintenance') === 'true' ||
    sessionStorage.getItem('bypass-maintenance') === 'true';

  // Сохранение в sessionStorage если параметр есть
  if (urlParams.get('bypass-maintenance') === 'true') {
    sessionStorage.setItem('bypass-maintenance', 'true');
  }

  if (MAINTENANCE_MODE && !bypassMaintenance) {
    return <MaintenancePage />;
  }

  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Router>
          <ScrollToTop />
          <RouteTracker />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/checkout-v2" element={<CheckoutV2Page />} />
            <Route path="/checkout-limited-offer" element={<CheckoutLimitedOfferPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/subscription" element={<RegistrationPage />} />
            <Route path="/subscription-plan" element={<RegistrationPage />} />
            <Route
              path="/cancel-subscription"
              element={<CancelSubscriptionPage />}
            />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="/thank-you" element={<ThankYouPage />} />
            <Route path="/about" element={<AboutCompanyPage />} />
            <Route path="/terms" element={<TermsAndConditionsPage />} />
            <Route path="/terms-v2" element={<TermsAndConditionsV2Page />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/payment-failed" element={<PaymentFailedPage />} />
            <Route path="/confirm-cancellation" element={<ConfirmCancellationPage />} />
            <Route path="/cancellation-success" element={<CancellationSuccessPage />} />
            <Route path="/cancellation-error" element={<CancellationErrorPage />} />
            <Route path="/test" element={<TestPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
};

export default App;
