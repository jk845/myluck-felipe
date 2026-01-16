import Footer from '@/components/Footer';

interface Section {
    title: string;
    number?: string;
    content: string | { subtitle?: string; text: string }[];
}

interface PrivacyPolicyPresenterProps {
    title: string;
    lastUpdated: string;
    sections: Section[];
}

export function PrivacyPolicyPresenter({ title, lastUpdated, sections }: PrivacyPolicyPresenterProps) {
    const renderContent = (content: string | { subtitle?: string; text: string }[]) => {
        if (typeof content === 'string') {
            return (
                <div 
                    className="text-black/60 text-sm font-normal font-['Libre_Baskerville'] leading-normal"
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            );
        }

        return (
            <>
                {content.map((item, index) => (
                    <div key={index}>
                        {item.subtitle && (
                            <div className="text-black text-base font-semibold font-['Hind_Vadodara'] leading-normal">
                                {item.subtitle}
                            </div>
                        )}
                        <div 
                            className="text-black/60 text-sm font-normal font-['Libre_Baskerville'] leading-normal"
                            dangerouslySetInnerHTML={{ __html: item.text }}
                        />
                    </div>
                ))}
            </>
        );
    };

    return (
        <div className="bg-white">
            <div className="w-full max-w-md mx-auto px-6 py-8">
                <div className="flex flex-col gap-12">
                    <h1 className="text-black text-3xl font-semibold font-['Hind_Vadodara'] leading-normal">
                        {title}
                    </h1>

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <div className="text-black text-xl font-semibold font-['Hind_Vadodara'] leading-normal">
                                Last updated: 
                            </div>
                            <div className="text-black text-xl font-normal font-['Hind_Vadodara'] leading-normal">
                                {lastUpdated}
                            </div>
                        </div>
                    </div>

                    {sections.map((section, index) => (
                        <div key={index} className="flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                                <div className="text-black text-xl font-semibold font-['Hind_Vadodara'] leading-normal">
                                    {section.number && `${section.number}. `}{section.title}
                                </div>
                            </div>
                            {renderContent(section.content)}
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}