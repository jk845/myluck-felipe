import { PrivacyPolicyPresenter } from '@/components/presenters/static-pages';

export function PrivacyPolicyContainer() {
    const sections = [
        {
            title: 'Introduction',
            content: 'Gymfluence OU ("we", "us", "our") respects the privacy of users ("you", "your") who access our services through the Myluck by Mila website and app. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.'
        },
        {
            number: '1',
            title: 'Data Controller',
            content: 'Gymfluence OU is the Data Controller for all personal data collected through the Myluck by Mila website and services. We determine the purposes and means of processing your personal information.'
        },
        {
            number: '2',
            title: 'App Publisher',
            content: 'Skai Digital has been engaged solely for publishing the Myluck by Mila app on the App Store. They do not process your data and act only as the publisher.'
        },
        {
            number: '3',
            title: 'Data Processor',
            content: 'We work with Everfit to deliver our services. Everfit acts as our Data Processor and processes all personal data we collect strictly under our instructions.'
        },
        {
            number: '4',
            title: 'Information We Collect',
            content: 'We may collect the following categories of personal data:<br /><br />- <b>Personal Identification Information</b>: Name, email address, age, gender.<br />- <b>Health and Fitness Data</b>: Your fitness goals, workout progress, metrics.<br />- <b>Payment Information</b>: Collected and processed securely via our payment provider, Mollie.<br />- <b>User Content</b>: Posts, comments, or submissions made in forums or community features.<br />- <b>Technical Data</b>: IP address, browser type, and usage data for analytics.'
        },
        {
            number: '5',
            title: 'Use of Information',
            content: 'We use your information to:<br /><br />- Provide and manage our website, app, and subscription services.<br />- Process and confirm payments.<br />- Communicate service updates, offers, and support responses.<br />- Improve our services based on usage data and feedback.<br />- Comply with legal and regulatory requirements.'
        },
        {
            number: '6',
            title: 'Data Sharing and Disclosure',
            content: 'We may share your data with:<br /><br />- <b>Everfit</b> to deliver fitness content and manage your user experience.<br />- <b>Mollie</b> to securely handle subscription payments and billing information.<br />- Trusted <b>third-party service providers</b> who help us operate our platform.<br />- Authorities if required by law or legal proceedings.'
        },
        {
            number: '7',
            title: 'Subscription and Payments',
            content: [
                {
                    text: 'When you purchase a subscription through our website:<br /><br />- We offer two types: <b>Non-Renewing Subscription</b> and <b>Binding Subscription</b>.<br />- Payments are processed via <b>Mollie</b>, our payment partner. Your payment data is stored and handled by Mollie in compliance with applicable data protection laws.<br />- We do not store your credit card information directly.<br />- For any information regarding Cancellation and Refunds, please consult our Terms and Conditions, or contact us at ask@myluck.no.'
                },
                {
                    subtitle: '7.1 Processing of Financial Data',
                    text: 'To manage subscription payments made through our website, we partner with <b>Mollie</b>, a third-party payment service provider. Please note the following:<br /><br />- We <b>do not collect, store, or process</b> your payment card information directly. All financial data is handled by Mollie in accordance with their privacy and security practices.<br />- Mollie may collect and process information such as your <b>name, email address, billing address, and transaction history</b> for the purposes of payment processing, fraud prevention, and regulatory compliance.<br />- We receive only <b>limited payment-related information</b> from Mollie—such as confirmation of successful transactions, subscription status, and failed payment notifications. This information is used solely to manage your subscription and provide customer support.<br /><br />For more details on how Mollie processes your data, please refer to their Privacy Policy available on <a href="https://www.mollie.com" target="_blank" class="underline">www.mollie.com</a>.'
                }
            ]
        },
        {
            number: '8',
            title: 'Data Security',
            content: 'We implement appropriate technical and organizational measures to protect your data. However, no method of transmission or storage is 100% secure, and we cannot guarantee absolute protection.'
        },
        {
            number: '9',
            title: 'Your Rights (GDPR)',
            content: 'You have the following rights under the General Data Protection Regulation (GDPR):<br /><br />- Right to access, correct, or delete your data.<br />- Right to object to or restrict processing.<br />- Right to data portability.<br />- Right to withdraw consent at any time.<br /><br />To exercise these rights, please contact us at ask@myluck.no.'
        },
        {
            number: '10',
            title: 'Cookies and Tracking',
            content: 'We may use cookies and similar technologies on our website to enhance user experience and analyse performance. You can manage cookie preferences through your browser settings.'
        },
        {
            number: '11',
            title: 'Third-Party Links',
            content: 'Our website may contain links to third-party websites. We are not responsible for the content, security, or privacy practices of those sites.'
        },
        {
            number: '12',
            title: 'Children\'s Privacy',
            content: 'Our services are intended for users aged 18 and older. We do not knowingly collect data from individuals under 18.'
        },
        {
            number: '13',
            title: 'Health Data Usage',
            content: 'Health data is used to personalize your fitness experience and track progress. It is never shared with third-party services and is processed in line with industry standards and applicable data protection laws.'
        },
        {
            number: '14',
            title: 'Account Deletion',
            content: [
                {
                    text: 'To request deletion of your data, you can:<br /><br />- Use the in-app or website settings to request deletion, or<br />- Contact us via email with the subject line <b>"Delete My Account"</b>, including your full name and email.<br /><br />We will take reasonable steps to honour your request, though we may retain certain records as required by law.'
                },
                {
                    subtitle: '14.1 Effect on Active Subscriptions',
                    text: 'When you delete your account, all active subscriptions will be canceled according to our Terms and Conditions:<br /><br />- If your subscription is canceled, <b>except during the 48-hour period before your next payment renewal</b>, you will not be charged for the next billing cycle.<br />- If you cancel <b>within the 48-hour restricted period</b>, the cancellation will take effect <b>after the upcoming payment is processed</b>, and your subscription will remain active until the end of that billing cycle.<br />- Account deletion <b>does not entitle you to a refund</b>, except as outlined in our Refund Policy.'
                }
            ]
        },
        {
            number: '15',
            title: 'Changes to This Privacy Policy',
            content: 'We reserve the right to update this Privacy Policy any time. We will post any updates on this page with a new "Last Updated" date.'
        },
        {
            number: '16',
            title: 'Contact Us',
            content: 'If you have any questions or concerns regarding this Privacy Policy or your personal data, please contact us at ask@myluck.no.'
        }
    ];

    return (
        <PrivacyPolicyPresenter 
            title="Privacy Policy Myluck by Gymfluence"
            lastUpdated="18.09.25"
            sections={sections}
        />
    );
}