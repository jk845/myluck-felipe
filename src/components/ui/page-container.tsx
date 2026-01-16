import React from "react";
import Footer from "@/components/Footer";
import { IS_TEST_ENVIROMENT } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
}

export const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white py-8 px-6">
      {IS_TEST_ENVIROMENT && (
        <div className="bg-red-200">
          ENV TEST! ENV TEST! ENV TEST! ENV TEST! ENV TEST! ENV TEST!  </div>
      )}

      <div className="max-w-md mx-auto">
        {children}
      </div>
      <Footer />

    </div>
  );
};

export default PageContainer;