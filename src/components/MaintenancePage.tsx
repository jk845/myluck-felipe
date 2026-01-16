export const MaintenancePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-6xl mb-4">🚧</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Vi oppgraderer nettsiden
          </h1>
          <p className="text-gray-600 mb-6">
            Nettsiden er midlertidig utilgjengelig på grunn av vedlikehold. 
            Vi er snart tilbake!
          </p>
          <div className="text-sm text-gray-500">
            Beklager ulempene dette måtte medføre.
          </div>
        </div>
      </div>
    </div>
  );
};