import React, { useState } from 'react';
import { cancellationService } from '@/services/cancellation.service';
import { ApiError } from '@/services/api.service';
import { CancelSubscriptionPresenter } from '@/components/presenters/cancellation';

export const CancelSubscriptionContainer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [cancellationReason, setCancellationReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    if (!email) {
      setError('Vennligst skriv inn e-postadressen din');
      return;
    }

    if (!cancellationService.validateEmail(email)) {
      setError('Vennligst skriv inn en gyldig e-postadresse');
      return;
    }

    // Validate cancellation reason
    if (!cancellationReason.trim()) {
      setError('Vennligst fortell oss hvorfor du ønsker å avbestille');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await cancellationService.requestCancellation({
        email: email.trim(),
        cancellationReason: cancellationReason.trim(),
      });

      if (response.emailNotFound) {
        setError('Vi kunne ikke finne denne e-postadressen i systemet vårt');
        return;
      }

      // If successful, show success message
      setSuccess(true);
    } catch (error) {
      console.error('Feil ved sending av avbestillingsforespørsel:', error);
      
      if (error instanceof ApiError) {
        setError(error.message || 'Kunne ikke behandle forespørselen');
      } else {
        setError('Det oppstod en feil. Vennligst prøv igjen senere.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CancelSubscriptionPresenter
      email={email}
      cancellationReason={cancellationReason}
      isLoading={isLoading}
      error={error}
      success={success}
      onEmailChange={setEmail}
      onCancellationReasonChange={setCancellationReason}
      onSubmit={handleSubmit}
    />
  );
};