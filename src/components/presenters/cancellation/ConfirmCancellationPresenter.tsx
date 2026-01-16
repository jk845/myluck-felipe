import React from 'react';
import PageHeader from '@/components/ui/page-header';
import Footer from '@/components/Footer';

interface ConfirmCancellationPresenterProps {
  isLoading: boolean;
}

export const ConfirmCancellationPresenter: React.FC<ConfirmCancellationPresenterProps> = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1 max-w-md mx-auto px-4 py-8">
        <PageHeader subtitle="Bekrefter avbestilling" />

        <div className="text-center mb-8">
          <div className="flex flex-col items-center">
            <div className="w-full bg-[#f5f5f7] rounded-xl h-40 flex items-center justify-center">
              <div className="animate-pulse text-gray-400">
                Behandler avbestillingen...
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

