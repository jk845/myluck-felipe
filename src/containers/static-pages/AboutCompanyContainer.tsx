import { AboutCompanyPresenter } from '@/components/presenters/static-pages';

export function AboutCompanyContainer() {
    const companyInfo = {
        name: 'Gymfluence OÜ',
        registrationNumber: '16864978',
        vatNumber: 'EE102695326',
    };

    const address = {
        street: 'Paepargi tn 43-28',
        postalCode: '11417',
        city: 'Tallinn',
        country: 'Estonia',
    };

    return (
        <AboutCompanyPresenter 
            companyInfo={companyInfo}
            address={address}
        />
    );
}