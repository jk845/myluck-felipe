interface FooterProps {
    hideTermsLink?: boolean;
}

const Footer = ({ hideTermsLink }: FooterProps) => {
    // Заглушки для ссылок, потом заменить на реальные
    const links = {
        terms: "/terms-v2",
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

                    {/* Блок оплаты */}
                    <div className="text-black/60 text-sm font-normal font-['Hind_Vadodara'] leading-3 mb-4">Sikre betalinger med:</div>

                    {/* Платежные системы с надежными источниками */}
                    <div className="flex justify-center items-center gap-3.5 mb-8">
                        {/* Google Pay */}
                        <img className="h-5 object-contain" src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="Google Pay" />

                        {/* Apple Pay */}
                        <img className="h-4 object-contain" src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" alt="Apple Pay" />

                        {/* Klarna */}
                        <img className="h-8 object-contain" src="https://sbp-plugin-images.s3.eu-west-1.amazonaws.com/technologies179_664213db808d9_Klarna_Resized_300x300_2.png" alt="Klarna" />

                        {/* Visa */}
                        <img className="h-4 object-contain" src="https://upload.wikimedia.org/wikipedia/commons/d/d6/Visa_2021.svg" alt="Visa" />

                        {/* MasterCard */}
                        <img className="h-5 object-contain" src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="MasterCard" />

                        {/* American Express */}
                        <img className="h-6 object-contain" src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" alt="American Express" />
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