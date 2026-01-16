import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cancellationService } from '@/services/cancellation.service';
import { ApiError } from '@/services/api.service';
import { ConfirmCancellationPresenter } from '@/components/presenters/cancellation';

export const ConfirmCancellationContainer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const confirmCancellation = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('token');

        if (!token) {
          // No token provided, redirect to error page
          navigate('/cancellation-error');
          return;
        }

        // Send request to server to confirm cancellation
        const response = await cancellationService.confirmCancellation({
          token,
        });

        if (!response.success) {
          // Error confirming cancellation
          navigate('/cancellation-error');
          return;
        }

        // Successful cancellation
        navigate('/cancellation-success');
      } catch (error) {
        console.error('Error confirming cancellation:', error);
        
        // Handle API errors specifically if needed
        if (error instanceof ApiError) {
          console.error('API Error:', error.message);
        }
        
        navigate('/cancellation-error');
      } finally {
        setIsLoading(false);
      }
    };

    confirmCancellation();
  }, [location.search, navigate]);

  return <ConfirmCancellationPresenter isLoading={isLoading} />;
};