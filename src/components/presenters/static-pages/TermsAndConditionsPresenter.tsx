import Footer from '@/components/Footer';

interface Section {
    title: string;
    number?: string;
    content: string | { subtitle?: string; text: string }[];
    id?: string;
    isHeader?: boolean;
    jumpButton?: {
        text: string;
        targetId: string;
    };
}

interface TermsAndConditionsPresenterProps {
    title: string;
    lastUpdated: string;
    introText: string;
    sections: Section[];
    jumpButtonText?: string;
    jumpToId?: string;
}

export function TermsAndConditionsPresenter({
    title,
    lastUpdated,
    introText,
    sections,
    jumpButtonText,
    jumpToId
}: TermsAndConditionsPresenterProps) {
    const handleJumpToId = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleJump = () => {
        if (jumpToId) {
            handleJumpToId(jumpToId);
        }
    };

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
        <div className="bg-white min-h-screen">
            <div className="w-full max-w-md mx-auto px-6 py-8">
                <div className="flex flex-col gap-12">
                    <h1 className="text-black text-3xl font-semibold font-['Hind_Vadodara'] leading-normal">
                        {title}
                    </h1>

                    {jumpButtonText && jumpToId && (
                        <button
                            onClick={handleJump}
                            className="w-fit px-6 py-2 bg-zinc-900 text-white rounded-full text-sm font-medium hover:bg-zinc-800 transition-colors self-end"
                        >
                            {jumpButtonText}
                        </button>
                    )}

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <div className="text-black text-xl font-semibold font-['Hind_Vadodara'] leading-normal">
                                Last updated:
                            </div>
                            <div className="text-black text-xl font-normal font-['Hind_Vadodara'] leading-normal">
                                {lastUpdated}
                            </div>
                        </div>
                        <div className="text-black/60 text-sm font-normal font-['Libre_Baskerville'] leading-normal">
                            {introText}
                        </div>
                    </div>

                    {sections.map((section, index) => (
                        <div key={index} id={section.id} className={`flex flex-col ${section.isHeader ? 'gap-12 mt-12 pt-12 border-t border-gray-100' : 'gap-3'}`}>
                            {section.isHeader ? (
                                <h1 className="text-black text-3xl font-semibold font-['Hind_Vadodara'] leading-normal">
                                    {section.title}
                                </h1>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <div className="text-black text-xl font-semibold font-['Hind_Vadodara'] leading-normal">
                                        {section.number && `${section.number}. `}{section.title}
                                    </div>
                                </div>
                            )}

                            {section.jumpButton && (
                                <button
                                    onClick={() => handleJumpToId(section.jumpButton!.targetId)}
                                    className="w-fit px-6 py-2 bg-zinc-900 text-white rounded-full text-sm font-medium hover:bg-zinc-800 transition-colors self-end"
                                >
                                    {section.jumpButton.text}
                                </button>
                            )}

                            {renderContent(section.content)}
                        </div>
                    ))}
                </div>
            </div>
            <Footer hideTermsLink={true} />
        </div>
    );
}