import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PageContainer from '@/components/ui/page-container';

const TestPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <div className="flex flex-col items-center justify-center min-h-screen-dvh p-4 space-y-6">
        <h1 className="text-3xl font-bold">Test Page</h1>
        
        <div className="flex flex-col gap-4 w-full max-w-sm">
          <Button onClick={() => navigate('/registration')}>
            Обычная регистрация
          </Button>
          
          <Button onClick={() => navigate('/registration?mode=secret')} variant="outline">
            Регистрация с mode=secret
          </Button>
          
          <Button onClick={() => navigate('/landing')} variant="outline">
            Landing Page
          </Button>
          
          <Button onClick={() => navigate('/thank-you')} variant="outline">
            Thank You Page
          </Button>
        </div>
        
        <div className="mt-8 text-sm text-gray-500">
          <p>Supabase URL: {import.meta.env.VITE_SUPABASE_URL || 'Not set'}</p>
          <p>Maintenance Mode: {import.meta.env.VITE_MAINTENANCE_MODE || 'false'}</p>
        </div>
      </div>
    </PageContainer>
  );
};

export default TestPage;