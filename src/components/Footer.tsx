interface FooterProps {
    hideTermsLink?: boolean;
}

const Footer = ({ hideTermsLink }: FooterProps) => {
    // Заглушки для ссылок, потом заменить на реальные
    const links = {
        terms: "/terms-v3",
        privacy: "/privacy",
        contact: "mailto:ask@myluck.no",
        companyInfo: "/about"
    };

    return (
        <div className="w-full py-10 bg-white">
            {/* Разделительная линия перемещена выше */}
            <div className="w-full mb-6">
                <svg width="100%" height="2" viewBox="0 0 338 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 1L338 1.00003" stroke="black" strokeOpacity="0.3" strokeWidth="0.5" />
                </svg>
            </div>

            <div className="max-w-md mx-auto px-4">
                {/* Содержимое футера */}
                <div className="flex flex-col justify-start items-center gap-11">
                    {/* Ссылки */}
                    <div className="flex flex-col justify-start items-center gap-8">
                        {!hideTermsLink && (
                            <a href={links.terms} className="text-black/60 text-xs font-bold font-['Libre_Baskerville'] leading-3 hover:text-black/80">Vilkår og betingelser</a>
                        )}
                        <a href={links.privacy} className="text-black/60 text-xs font-bold font-['Libre_Baskerville'] leading-3 hover:text-black/80">Personvernerklæring</a>
                        <a href={links.contact} className="text-black/60 text-xs font-bold font-['Libre_Baskerville'] leading-3 hover:text-black/80">Kontakt</a>
                        <a href={links.companyInfo} className="text-black/60 text-xs font-bold font-['Libre_Baskerville'] leading-3 hover:text-black/80">Selskapsinformasjon</a>
                    </div>



                    {/* Копирайт */}
                    <div className="w-full text-center text-black/50 text-[10px] font-normal font-['Hind_Vadodara'] leading-3">
                        © 2025 MyLuck by Gymfluence. All rights reserved.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;