import { TermsAndConditionsPresenter } from '@/components/presenters/static-pages';

export function TermsAndConditionsContainer() {
    const sections = [
        {
            number: '1',
            title: 'Service Description',
            content: 'Gymfluence OÜ provides fitness-related services via its website and Myluck by Mila. This includes:<br /><br />- Participation in time-limited Fitness Marathons<br />- Access to exercise programs, video demonstrations, and nutrition recipes<br />- Community support through private Snapchat groups<br />- Subscription-based access to exclusive content'
        },
        {
            number: '2',
            title: 'User Eligibility',
            content: 'Our services are intended for individuals who are <b>18 years or older</b>. By using our services, you confirm that you meet this age requirement and that you are legally capable of entering into a binding agreement.<br /><br />You are advised to consult with a healthcare professional before beginning any fitness program to ensure it is suitable for your health and condition.'
        },
        {
            number: '3',
            title: 'Subscription Terms',
            content: [
                {
                    subtitle: '3.1 Subscription Options',
                    text: 'We offer two types of subscription plans:<br /><br />- <b>Non-Renewing Subscription:</b> This plan requires payment for each billing period individually unless it is cancelled within cancellation period.<br />- <b>Binding Subscription:</b> This plan requires a commitment for a predefined period. By subscribing, you agree to make payments for the entire binding period. Early cancellation does not waive the obligation to pay for the remaining period.'
                },
                {
                    subtitle: '3.2 Automatic Renewal',
                    text: 'All subscriptions automatically renew at the end of the respective subscription term unless cancelled prior to the renewal date. You can cancel at any time through your account settings on our website. If you cancel, your subscription remains active until the end of the paid subscription period. No partial refunds are provided.'
                },
                {
                    subtitle: '3.3 Payment and Billing',
                    text: '- Payments are processed monthly via <b>Mollie</b>, our payment provider.<br />- Prices may vary depending on your location and include applicable taxes unless stated otherwise.<br />- You are responsible for ensuring your payment method remains valid and updated.<br /><br />If a payment fails or is declined, we reserve the right to suspend or terminate your subscription access until payment is successfully processed.'
                },
                {
                    subtitle: '3.4 Free Trials and Promotions',
                    text: 'We may offer promotional pricing or free trial periods at our sole discretion. These offers are subject to specific terms and eligibility criteria and cannot be transferred or reused with different accounts.<br /><br />If your subscription starts with a free trial, billing will commence automatically at the end of the trial period unless cancelled beforehand.'
                }
            ]
        },
        {
            number: '4',
            title: 'Cancellation and Refunds',
            content: [
                {
                    subtitle: '4.1 Right to Refund',
                    text: 'You may request a full refund within 14 days of purchase, no questions asked. After this period, no refunds will be issued. This applies to both <b>non-renewing</b> and <b>binding</b> subscriptions. If you are subscribed to a <b>binding subscription</b>, you remain responsible for the remaining payments after the 14-day refund period.'
                },
                {
                    subtitle: '4.1 Right to Cancel and Refund',
                    text: 'You may cancel your subscription at any time.<br /><br />- <b>Cancellation within 14 days of the initial purchase:</b> Your subscription will be terminated immediately, and access to all services will end. You may be eligible for a refund.<br />- <b>Cancellation after 14 days of the initial purchase:</b> Your subscription will remain active until the end of the current billing cycle, after which access will end. No refunds will be provided.'
                },
                {
                    subtitle: '4.2 Non-Renewing Subscription',
                    text: 'No further charges will be applied after the cancellation is processed.'
                },
                {
                    subtitle: '4.3 Binding Subscription',
                    text: 'Cancellation after the 14-day period, but before the end of the binding period, does not waive your obligation to complete the agreed payments.'
                },
                {
                    subtitle: '4.4 Process of Cancellation',
                    text: 'To cancel your subscription, contact our support team at <a href="mailto:ask@myluck.no" class="underline"><b>ask@myluck.no</b></a> or use the <b>Resources</b> tab in the Fitness App, available through your subscription.'
                },
                {
                    subtitle: '4.5 Process of Refund',
                    text: 'To request a refund, contact our support team at <a href="mailto:ask@myluck.no" class="underline"><b>ask@myluck.no</b></a>.'
                }
            ]
        },
        {
            number: '5',
            title: 'Use of the Fitness App and Content',
            content: '- You are granted a <b>limited, non-exclusive, non-transferable</b> license to use the Myluck by Mila and content for personal, non-commercial purposes.<br />- You must not share your login credentials, resell access, or attempt to reverse-engineer or copy our technology or materials.<br />- All content, including videos, training plans, and nutrition materials, are the property of Gymfluence OÜ or its licensors and protected under copyright and other laws.'
        },
        {
            number: '6',
            title: 'Community Participation',
            content: 'We encourage engagement through community groups (e.g., private Snapchat groups). By participating, you agree to:<br /><br />- Communicate respectfully with others<br />- Avoid offensive, discriminatory, or abusive language<br />- Comply with the group\'s rules and guidelines<br /><br />We reserve the right to remove participants who do not adhere to these standards.'
        },
        {
            number: '7',
            title: 'Processing of Financial Data',
            content: 'To process subscription payments, we partner with <b>Mollie</b>, a third-party payment provider. Mollie handles payments, stores and processes your card details directly. Mollie may process your name, billing information, and transaction history to fulfill payment obligations and prevent fraud.<br /><br />We only receive limited payment-related data (e.g., transaction confirmation or failure) for subscription management purposes. Please refer to Mollie\'s Privacy Policy for further details.'
        },
        {
            number: '8',
            title: 'Limitation of Liability',
            content: 'Participation in any fitness program involves risk. By using our services, you agree that Gymfluence OÜ is not liable for any injuries, health conditions, or losses arising from your participation. You accept responsibility for your health and well-being during use.'
        },
        {
            number: '9',
            title: 'Disclaimers',
            content: '- Our services are not a substitute for professional medical advice or treatment.<br />- Individual results will vary and are not guaranteed.<br />- We are not liable for delays or interruptions in access to our services.'
        },
        {
            number: '10',
            title: 'Modification of Services',
            content: 'We reserve the right to modify, suspend, or discontinue any part of our services at any time, with or without notice. We will aim to notify users in advance where possible.'
        },
        {
            number: '11',
            title: 'Dispute Resolution',
            content: 'Any disputes or claims related to these Terms or our services shall be resolved under the laws of <b>Estonia</b>, through <b>mediation or arbitration</b> before resorting to legal proceedings.'
        },
        {
            number: '12',
            title: 'Termination',
            content: 'We may suspend or terminate your access to the Services if you breach these Terms or misuse the platform. In such cases, you may forfeit access to any remaining subscription time.'
        },
        {
            number: '13',
            title: 'Changes to Terms and Conditions',
            content: 'We reserve the right to update these Terms and Conditions any time. Any changes will be posted on our website and take effect immediately upon publication. Continued use of our services constitutes your acceptance of the updated Terms.'
        },
        {
            number: '14',
            title: 'Contact Information',
            content: 'If you have any questions or concerns about these Terms, please contact us at ask@myluck.no.'
        }
    ];

    return (
        <TermsAndConditionsPresenter 
            title="Terms and conditions Myluck by Gymfluence."
            lastUpdated="08.09.25"
            introText='Welcome to Gymfluence OÜ. These Terms and Conditions ("Terms") govern your use of our website, mobile application ("App"), and related services, including participation in our Fitness Marathons and subscription plans. By accessing or using any part of our services, you agree to be bound by these Terms. If you do not agree, please do not use our services'
            sections={sections}
        />
    );
}