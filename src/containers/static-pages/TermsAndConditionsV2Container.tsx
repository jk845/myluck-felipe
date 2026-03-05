import { TermsAndConditionsPresenter } from '@/components/presenters/static-pages';

export function TermsAndConditionsV2Container() {
    const sections = [
        // --- ENGLISH VERSION ---
        {
            number: '1',
            title: 'Service Description',
            content: 'Gymfluence OÜ provides fitness-related services via its website and Myluck by Mila. This includes:<br />• Participation in time-limited Fitness Marathons<br />• Access to exercise programs, video demonstrations, and nutrition recipes<br />• Community support through private Snapchat groups<br />• Subscription-based access to exclusive content.'
        },
        {
            number: '2',
            title: 'User Eligibility',
            content: 'Our services are intended for individuals who are 18 years or older. By using our services, you confirm that you meet this age requirement and that you are legally capable of entering into a binding agreement.<br /><br />You are advised to consult with a healthcare professional before beginning any fitness program to ensure it is suitable for your health and condition.'
        },
        {
            number: '3',
            title: 'Subscription Terms',
            content: [
                {
                    subtitle: '3.1 Subscription Options',
                    text: 'We offer two types of subscription plans:<br />• <b>Non-Renewing Subscription:</b> This plan requires payment for each billing period individually unless it is cancelled within the cancellation period.<br />• <b>Binding Subscription:</b> This plan requires a commitment for a predefined period. By subscribing, you agree to make payments for the entire binding period. Early cancellation does not waive the obligation to pay for the remaining period.'
                },
                {
                    subtitle: '3.2 Automatic Renewal',
                    text: 'All subscriptions automatically renew at the end of the respective subscription term unless cancelled before the renewal date. You can cancel at any time through your account settings on our website. If you cancel, your subscription remains active until the end of the paid subscription period. No partial refunds are provided.'
                },
                {
                    subtitle: '3.3 Payment and Billing',
                    text: '• Payments are processed monthly via multiple payment providers, usually the same provider that the client first used to subscribe to our services. Payment might be provided by <b>Mollie, Stripe, Shopify, Klarna, etc.</b><br />• Prices may vary depending on your location and include applicable taxes unless stated otherwise.<br />• You are responsible for ensuring your payment method remains valid and updated.<br />• If a payment fails or is declined, we reserve the right to suspend or terminate your subscription access until payment is successfully processed.'
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
                    subtitle: '4.1 Right of Withdrawal (Angrerett) — Angrerettloven §22',
                    text: 'You have the right to withdraw from this contract within 14 days of the date of purchase, without giving any reason (the "withdrawal period").<br /><br /><b>Immediate delivery and waiver of refund right:</b><br />By completing your purchase, you expressly request that Gymfluence OÜ begins providing the digital service immediately, before the 14-day withdrawal period has expired. At the time of purchase, you are asked to confirm this request by actively ticking a checkbox. By doing so, you acknowledge that you waive your right to a refund for the service already delivered, in accordance with Angrerettloven §22(m).<br /><br /><b>Effect of cancellation within 14 days:</b><br />If you exercise your right of withdrawal within the 14-day period, your subscription will be cancelled immediately and no further charges will be made. However, no refund will be issued for the current paid period, as the digital service has already been delivered from the moment of purchase and you consented to immediate delivery at checkout.<br /><br /><b>Cancellation after 14 days:</b><br />Your subscription remains active until the end of the current billing cycle (monthly plan) or until the end of the binding period (6-month plan). No refunds are provided after the withdrawal period has expired.'
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
                    text: 'To exercise the right of cancellation, you must inform us of your decision to cancel by sending an email to our support team at <a href="mailto:ask@myluck.no"><b>ask@myluck.no</b></a>.<br /><br />You may use the Angrerettskjema available here, but it is not obligatory:<br /><a href="https://drive.google.com/file/d/1WQ82ajIzdsvHHnn6RQPG7vcV5LCR8Dmf/view?usp=sharing" target="_blank" class="underline">Angrerettskjema Link</a><br /><br />To meet the cancellation deadline, it is sufficient for you to send your communication concerning your exercise of the right of cancellation before the cancellation period has expired.'
                },
                {
                    subtitle: '4.5 No Refund Policy',
                    text: 'As you consented to immediate delivery of the digital service at checkout, no refunds are issued once service delivery has commenced. If you believe you have not received the service or have a complaint, please contact us at <a href="mailto:ask@myluck.no"><b>ask@myluck.no</b></a>, and we will investigate.'
                }
            ]
        },
        {
            number: '5',
            title: 'Use of the Fitness App and Content',
            content: '• You are granted a <b>limited, non-exclusive, non-transferable</b> license to use the Myluck by Mila and content for personal, non-commercial purposes.<br />• You must not share your login credentials, resell access, or attempt to reverse-engineer, copy, or manipulate our technology or materials.<br />• All content, including videos, training plans, and nutrition materials, are the property of Gymfluence OÜ or its licensors and protected under copyright and other laws.'
        },
        {
            number: '6',
            title: 'Community Participation',
            content: 'We encourage engagement through community groups (e.g., private Snapchat groups). By participating, you agree to:<br />• Communicate respectfully with others<br />• Avoid offensive, discriminatory, or abusive language<br />• Comply with the group\'s rules and guidelines. We reserve the right to remove participants who do not adhere to these standards.'
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
            content: '• Our services are not a substitute for professional medical advice or treatment.<br />• Individual results will vary and are not guaranteed.<br />• We are not liable for delays or interruptions in access to our services.'
        },
        {
            number: '10',
            title: 'Modification of Services',
            content: 'We reserve the right to modify, suspend, or discontinue any part of our services at any time, with or without notice. We will aim to notify users in advance where possible.'
        },
        {
            number: '11',
            title: 'Dispute Resolution',
            content: 'These Terms are governed by the laws of Estonia. However, if you are a consumer residing in Norway, you retain all mandatory rights and protections under Norwegian consumer law, including the Norwegian Cancellation Rights Act (Angrerettloven), the Norwegian Consumer Purchases Act (Forbrukerkjøpsloven), and the Norwegian Marketing Control Act (Markedsføringsloven). No provision in these Terms limits or overrides those statutory rights.<br /><br />If a dispute arises, we encourage you to contact us first at <a href="mailto:ask@myluck.no"><b>ask@myluck.no</b></a> so we can attempt to resolve the matter directly.<br /><br />If we are unable to reach a resolution, Norwegian consumers have the right to bring the matter before:<br /><br />• <b>Forbrukerrådet</b> (the Norwegian Consumer Authority) at <a href="https://www.forbrukerradet.no" target="_blank">forbrukerradet.no</a><br />• <b>Forbrukertilsynet</b> (the Norwegian Consumer Protection Authority) at <a href="https://www.forbrukertilsynet.no" target="_blank">forbrukertilsynet.no</a><br />• <b>The EU/EEA Online Dispute Resolution (ODR) platform</b> at <a href="https://ec.europa.eu/consumers/odr" target="_blank">ec.europa.eu/consumers/odr</a>'
        },
        {
            number: '12',
            title: 'Termination',
            content: 'We may suspend or terminate your access to the Services if you breach these Terms or misuse the platform. In such cases, you may forfeit access to any remaining subscription time.'
        },
        {
            number: '13',
            title: 'Changes to Terms and Conditions',
            content: 'We reserve the right to update these Terms and Conditions at any time. Any changes will be posted on our website and take effect immediately upon publication. Continued use of our services constitutes your acceptance of the updated Terms.'
        },
        {
            number: '14',
            title: 'Contact Information',
            content: 'If you have any questions or concerns about these Terms, please contact us. Support is available exclusively via email at <a href="mailto:ask@myluck.no"><b>ask@myluck.no</b></a>.'
        },

        // ---  NORWEGIAN VERSION ---
        {
            id: 'norwegian-version',
            isHeader: true,
            title: 'Vilkår og betingelser – Myluck by Gymfluence',
            jumpButton: {
                text: 'Go to English Version',
                targetId: 'english-version'
            },
            content: '<b>Sist oppdatert: 27.02.2026</b><br /><br />Velkommen til Gymfluence OÜ (Paepargi tn 43, 11417 Tallinn, Estland). Disse vilkårene og betingelsene ("Vilkår") regulerer din bruk av nettstedet vårt, mobilapplikasjonen ("Appen") og tilknyttede tjenester, inkludert deltakelse i våre treningsmaraton og abonnementsplaner. Ved å få tilgang til eller bruke noen del av våre tjenester, samtykker du i å være bundet av disse Vilkårene. Hvis du ikke godtar dem, vennligst ikke bruk tjenestene våre.'
        },
        {
            number: '1',
            title: 'Tjenestebeskrivelse',
            content: 'Gymfluence OÜ tilbyr treningstjenester via sitt nettsted og Myluck by Mila. Dette inkluderer:<br />• Deltakelse i tidsbegrensede treningsmaraton<br />• Tilgang til treningsprogrammer, videodemonstrasjoner og oppskrifter<br />• Kommunikasjonsstøtte gjennom private Snapchat-grupper<br />• Abonnementsbasert tilgang til eksklusivt innhold'
        },
        {
            number: '2',
            title: 'Brukerberettigelse',
            content: 'Tjenestene våre er ment for personer som er 18 år eller eldre. Ved å bruke tjenestene våre bekrefter du at du oppfyller dette alderskravet og at du er juridisk i stand til å inngå en bindende avtale.<br /><br />Du anbefales å konsultere helsepersonell før du starter et treningsprogram for å sikre at det er egnet for din helse og fysiske tilstand.'
        },
        {
            number: '3',
            title: 'Abonnementsvilkår',
            content: [
                {
                    subtitle: '3.1 Abonnementsalternativer',
                    text: 'Vi tilbyr to typer abonnementsplaner:<br />• <b>Ikke-fornyende abonnement:</b> Dette krever betaling for hver faktureringsperiode individuelt, med mindre abonnementet kanselleres innenfor angitt kanselleringsperiode.<br />• <b>Bindende abonnement:</b> Dette krever en forpliktelse i en forhåndsdefinert periode. Ved å abonnere godtar du å betale for hele bindingstiden. Tidlig kansellering fritar ikke betalingsplikten.'
                },
                {
                    subtitle: '3.2 Automatisk fornyelse',
                    text: 'Alle abonnementer fornyes automatisk ved slutten av den respektive abonnementsperioden med mindre du kansellerer før fornyelsesdatoen. Du kan når som helst kansellere via kontoinnstillingene dine på nettstedet vårt. Ved kansellering forblir abonnementet ditt aktivt til slutten av allerede betalt periode. Ingen delvise refusjoner gis.'
                },
                {
                    subtitle: '3.3 Betaling og fakturering',
                    text: '• Betalinger behandles månedlig via flere betalingsleverandører, vanligvis den samme leverandøren som kunden først brukte til å abonnere på våre tjenester. Betaling kan bli levert av <b>Mollie, Stripe, Shopify, Klarna, osv.</b><br />• Prisene kan variere avhengig av lokasjon og inkluderer gjeldende avgifter med mindre annet er oppgitt.<br />• Du er ansvarlig for å sikre at betalingsmetoden din er gyldig og oppdatert.<br />• Dersom en betaling mislykkes eller avvises, forbeholder vi oss retten til å suspendere eller avslutte abonnementstilgangen til betalingen er gjennomført.'
                },
                {
                    subtitle: '3.4 Prøveperioder og kampanjer',
                    text: 'Vi kan tilby kampanjepriser eller gratis prøveperioder etter vårt eget skjønn. Disse tilbudene er underlagt egne vilkår og kvalifikasjonskrav og kan ikke overføres eller gjenbrukes på andre kontoer. Hvis abonnementet ditt starter med en gratis prøveperiode, vil fakturering begynne automatisk når prøveperioden avsluttes, med mindre du kansellerer på forhånd.'
                }
            ]
        },
        {
            number: '4',
            title: 'Kansellering og refusjoner',
            content: [
                {
                    subtitle: '4.1 Angrerett — Angrerettloven §22',
                    text: 'Du har rett til å trekke deg fra denne avtalen innen 14 dager fra kjøpsdatoen, uten å oppgi grunn («angreperioden»).<br /><br /><b>Umiddelbar levering og frafall av refusjonsrett:</b><br />Ved å gjennomføre kjøpet ber du uttrykkelig om at Gymfluence OÜ begynner å levere den digitale tjenesten umiddelbart, før 14-dagersfristen er utløpt. På kjøpstidspunktet bekrefter du dette ved å aktivt krysse av en boks. Ved å gjøre dette erkjenner du at du frasier deg retten til refusjon for tjenesten som allerede er levert, i samsvar med Angrerettloven §22(m).<br /><br /><b>Virkning av kansellering innen 14 dager:</b><br />Hvis du benytter angreretten innen 14-dagersperioden, vil abonnementet ditt bli kansellert umiddelbart og ingen ytterligere kostnader vil påløpe. Det vil imidlertid ikke bli gitt refusjon for den allerede betalte perioden, ettersom den digitale tjenesten er levert fra kjøpstidspunktet og du samtykket til umiddelbar levering ved kjøp.<br /><br /><b>Kansellering etter 14 dager:</b><br />Abonnementet ditt forblir aktivt ut inneværende faktureringsperiode (månedsplan) eller ut bindingstiden (6-månedsplan). Ingen refusjoner gis etter at angreperioden er utløpt.'
                },
                {
                    subtitle: '4.2 Ikke-fornyende abonnement',
                    text: 'Ingen ytterligere kostnader påløper etter at kanselleringen er behandlet.'
                },
                {
                    subtitle: '4.3 Bindende abonnement',
                    text: 'Kansellering etter 14-dagersfristen, men før bindingstiden utløper, fritar ikke dine forpliktelser om å fullføre avtalte betalinger.'
                },
                {
                    subtitle: '4.4 Fremgangsmåte for kansellering',
                    text: 'For å bruke angreretten må du informere oss om din beslutning ved å sende en e-post til vårt supportteam på <a href="mailto:ask@myluck.no"><b>ask@myluck.no</b></a>.<br /><br />Du kan bruke angrerettskjemaet som er tilgjengelig her, men det er ikke obligatorisk:<br /><a href="https://drive.google.com/file/d/1WQ82ajIzdsvHHnn6RQPG7vcV5LCR8Dmf/view?usp=sharing" target="_blank" class="underline">Angrerettskjema Link</a><br /><br />For å overholde fristen er det tilstrekkelig at du sender meldingen før angreperioden er utløpt.'
                },
                {
                    subtitle: '4.5 Ingen refusjonspolicy',
                    text: 'Ettersom du samtykket til umiddelbar levering av den digitale tjenesten ved kjøp, gis det ingen refusjoner når tjenesteleveringen har startet. Hvis du mener du ikke har mottatt tjenesten eller har en klage, kontakt oss på <a href="mailto:ask@myluck.no"><b>ask@myluck.no</b></a>.'
                }
            ]
        },
        {
            number: '5',
            title: 'Bruk av treningsappen og innhold',
            content: '• Du får en begrenset, ikke-eksklusiv og ikke-overførbar lisens til å bruke Myluck by Mila og tilhørende innhold til personlig og ikke-kommersiell bruk.<br />• Du må ikke dele innloggingsinformasjon, videreselge tilgang, eller forsøke å reversere, kopiere eller manipulere teknologi eller materiale.<br />• Alt innhold, inkludert videoer, treningsplaner og ernæringsmateriale, tilhører Gymfluence OÜ eller deres lisensgivere og er beskyttet av opphavsrett og andre lover.'
        },
        {
            number: '6',
            title: 'Deltakelse i fellesskapet',
            content: 'Vi oppfordrer til deltakelse i fellesskapsgrupper (f.eks. private Snapchat-grupper). Ved deltakelse samtykker du i å:<br />• Kommunisere respektfullt<br />• Unngå støtende, diskriminerende eller krenkende språk<br />• Følge gruppens regler og retningslinjer<br />Vi forbeholder oss retten til å fjerne deltakere som ikke følger disse standardene.'
        },
        {
            number: '7',
            title: 'Behandling av finansielle data',
            content: 'For å behandle abonnementbetalinger samarbeider vi med <b>Mollie</b>, en tredjeparts betalingsleverandør. Mollie håndterer betalinger og lagrer og behandler kortinformasjon direkte. De kan behandle navn, faktureringsinformasjon og transaksjonshistorikk for å oppfylle betalingsforpliktelser og forhindre svindel.<br /><br />Vi mottar kun begrenset betalingsrelatert data (f.eks. bekreftelse eller avvisning) for administrasjon av abonnementet. Se Mollies personvernerklæring for mer informasjon.'
        },
        {
            number: '8',
            title: 'Ansvarsbegrensning',
            content: 'Deltakelse i treningsprogram innebærer risiko. Ved å bruke tjenestene våre godtar du at Gymfluence OÜ ikke er ansvarlig for skader, helseproblemer eller tap som oppstår i forbindelse med din deltakelse. Du tar selv ansvar for egen helse og sikkerhet.'
        },
        {
            number: '9',
            title: 'Ansvarsfraskrivelse',
            content: '• Tjenestene våre er ikke en erstatning for profesjonell medisinsk rådgivning eller behandling.<br />• Resultater vil variere fra person til person, og ingen spesifikke resultater garanteres.<br />• Vi er ikke ansvarlige for forsinkelser eller avbrudd i tilgang til tjenestene.'
        },
        {
            number: '10',
            title: 'Endringer i tjenestene',
            content: 'Vi forbeholder oss retten til å endre, suspendere eller avslutte deler av tjenestene våre når som helst, med eller uten varsel. Vi vil forsøke å varsle brukere på forhånd der det er mulig.'
        },
        {
            number: '11',
            title: 'Tvisteløsning',
            content: 'Disse Vilkårene er underlagt estisk lov. Dersom du er forbruker bosatt i Norge, beholder du imidlertid alle obligatoriske rettigheter og vern etter norsk forbrukerlovgivning, inkludert angrerettloven, forbrukerkjøpsloven og markedsføringsloven. Ingen bestemmelse i disse Vilkårene begrenser eller overstyrer disse lovfestede rettighetene.<br /><br />Dersom det oppstår en tvist, oppfordrer vi deg til å kontakte oss først på <a href="mailto:ask@myluck.no"><b>ask@myluck.no</b></a>, slik at vi kan forsøke å løse saken direkte.<br /><br />Dersom vi ikke kommer til enighet, har norske forbrukere rett til å bringe saken inn for:<br /><br />• <b>Forbrukerrådet</b> på <a href="https://www.forbrukerradet.no" target="_blank">forbrukerradet.no</a><br />• <b>Forbrukertilsynet</b> på <a href="https://www.forbrukertilsynet.no" target="_blank">forbrukertilsynet.no</a><br />• <b>EUs/EØS-plattform for nettbasert tvisteløsning (ODR)</b> på <a href="https://ec.europa.eu/consumers/odr" target="_blank">ec.europa.eu/consumers/odr</a>'
        },
        {
            number: '12',
            title: 'Stenging av tjenesten',
            content: 'Vi kan suspendere eller avslutte din tilgang dersom du bryter Vilkårene eller misbruker plattformen. I slike tilfeller kan du miste tilgang til gjenværende abonnementsperiode.'
        },
        {
            number: '13',
            title: 'Endringer i vilkår og betingelser',
            content: 'Vi forbeholder oss retten til å oppdatere disse Vilkårene når som helst. Endringer publiseres på nettstedet vårt og trer i kraft umiddelbart. Videre bruk av tjenestene innebærer aksept av oppdaterte vilkår.'
        },
        {
            number: '14',
            title: 'Kontaktinformasjon',
            content: 'Har du spørsmål eller bekymringer om disse Vilkårene? Kontakt oss. Kundeservice er utelukkende tilgjengelig via e-post på <a href="mailto:ask@myluck.no"><b>ask@myluck.no</b></a>.'
        }
    ];

    return (
        <div id="english-version">
            <TermsAndConditionsPresenter
                title="Terms and Conditions – Myluck by Gymfluence"
                lastUpdated="27.02.2026"
                introText='Welcome to Gymfluence OÜ (Paepargi tn 43, 11417 Tallinn, Estonia). These Terms and Conditions ("Terms") govern your use of our website, mobile application ("App"), and related services, including participation in our Fitness Marathons and subscription plans. By accessing or using any part of our services, you agree to be bound by these Terms. If you do not agree, please do not use our services.'
                sections={sections}
                jumpButtonText="Gå til Norsk Versjon"
                jumpToId="norwegian-version"
            />
        </div>
    );
}
