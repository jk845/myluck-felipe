import Footer from '@/components/Footer';

interface AboutCompanyPresenterProps {
    companyInfo: {
        name: string;
        registrationNumber: string;
        vatNumber: string;
    };
    address: {
        street: string;
        postalCode: string;
        city: string;
        country: string;
    };
}

export function AboutCompanyPresenter({ companyInfo, address }: AboutCompanyPresenterProps) {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <div className="flex-grow px-6 py-8">
                <div className="max-w-md mx-auto">
                    <div className="space-y-12 mb-10">
                        <h1 className="text-black text-3xl font-semibold font-['Hind_Vadodara'] leading-normal">
                            About Gymfluence
                        </h1>

                        <div>
                            <h2 className="text-black text-xl font-semibold font-['Hind_Vadodara'] leading-normal mb-4">
                                Company
                            </h2>
                            <div className="space-y-1">
                                <p className="text-black/60 text-sm font-normal font-['Libre_Baskerville'] leading-normal">
                                    {companyInfo.name}
                                </p>
                                <p className="text-black/60 text-sm font-normal font-['Libre_Baskerville'] leading-normal">
                                    Reg nr {companyInfo.registrationNumber}
                                </p>
                                <p className="text-black/60 text-sm font-normal font-['Libre_Baskerville'] leading-normal">
                                    VAT {companyInfo.vatNumber}
                                </p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-black text-xl font-semibold font-['Hind_Vadodara'] leading-normal mb-4">
                                Address
                            </h2>
                            <div className="space-y-1">
                                <p className="text-black/60 text-sm font-normal font-['Libre_Baskerville'] leading-normal">
                                    {address.street}
                                </p>
                                <p className="text-black/60 text-sm font-normal font-['Libre_Baskerville'] leading-normal">
                                    {address.postalCode}, {address.city}
                                </p>
                                <p className="text-black/60 text-sm font-normal font-['Libre_Baskerville'] leading-normal">
                                    {address.country}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}