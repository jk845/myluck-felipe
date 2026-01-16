import React from "react";

interface FeatureItem {
    title: string;
    description?: string;
    price: string;
    regularPrice?: string;
}

interface SubscriptionFeaturesProps {
    className?: string;
}

const SubscriptionFeatures: React.FC<SubscriptionFeaturesProps> = ({ className = "" }) => {
    const features: FeatureItem[] = [
        {
            title: "Daglig kostholdsplan i appen",
            description: "Kalorier og macro foreslått til deg",
            price: "Inkludert",
            regularPrice: "740 kr",
        },
        {
            title: "Hjemme og gym program",
            description: "Enkle treningsøkter å følge i kalenderen din",
            price: "Inkludert",
            regularPrice: "690 kr",
        },
        {
            title: "Tilgang til Myluck Maraton",
            description: "Transformasjonsmaraton som dekker ulike temaer",
            price: "Inkludert",
            regularPrice: "2890 kr",
        },
        {
            title: "Direktesendinger med Mila",
            description: "Maraton-direktesendinger og spørsmålsrunder med Mila",
            price: "Inkludert",
            regularPrice: "540 kr",
        },

        {
            title: "Fullverdig tøyeprogram",
            description: "for å jobbe med holdning",
            price: "Inkludert",
            regularPrice: "630 kr",
        },
        {
            title: "Skånsom magetrening",
            description: "for å styrke kjerne fra innsiden",
            price: "Inkludert",
            regularPrice: "480 kr",
        },
        {
            title: "Vakuum kurs",
            description: "forbedrer holdning, bidrar til lettere fordøyelse, definerer midje",
            price: "Inkludert",
            regularPrice: "540 kr",
        },
    ];

    return (
        <div className={`w-full ${className}`}>
            <div className="space-y-6">
                {features.map((feature, index) => (
                    <div key={index} className="space-y-1 text-start">
                        <div className="flex justify-between items-center">
                            <h4 className="text-black leading-none  tracking-tighter text-base font-semibold font-['Hind_Vadodara']">
                                {feature.title}
                            </h4>
                            <div className="flex items-center">
                                <span className="text-black leading-none  tracking-tighter text-base font-semibold font-['Hind_Vadodara'] mr-2">
                                    {feature.price}
                                </span>
                                {feature.regularPrice && (
                                    <span className="text-black leading-none  tracking-tighter text-opacity-60 text-base line-through font-['Hind_Vadodara']">
                                        {feature.regularPrice}
                                    </span>
                                )}
                            </div>
                        </div>
                        {feature.description && (
                            <p className="text-black text-opacity-60 leading-none tracking-tighter max-w-52 text-xs font-['Libre_Baskerville']">
                                {feature.description}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SubscriptionFeatures;