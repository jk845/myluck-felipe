import { TermsAndConditionsPresenter } from '@/components/presenters/static-pages';

export function TermsAndConditionsV3Container() {
    const sections = [
        // --- ENGLISH VERSION ---
        {
            number: '1',
            title: 'Service Description',
            content: 'Gymfluence OÜ provides fitness-related services via its website and the Myluck by Mila app. This includes:<br />• Access to exercise programs, video demonstrations, and nutrition recipes<br />• Personalised coaching and guidance through the app<br />• Community support through private groups<br />• Subscription-based access to exclusive content'
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
                    subtitle: '3.1 Subscription Plan',
                    text: 'Myluck by Mila offers a single subscription plan with the following structure:<br />• <b>Initial binding period:</b> 6 months from the date of purchase<br />• <b>Price:</b> NOK 649 per month, charged monthly<br />• <b>Total cost during the binding period:</b> NOK 3,894 (6 × NOK 649)<br />• <b>After the binding period:</b> The subscription automatically renews on a <b>month-to-month basis</b> at NOK 649/month, indefinitely, until you cancel<br /><br />By subscribing, you commit to completing all 6 monthly payments of the initial binding period. Cancellation during the binding period does not waive your obligation to pay for the remaining months of that period.<br /><br />After the binding period, you may cancel at any time, and no further charges will be made after the end of the current paid month.'
                },
                {
                    subtitle: '3.2 Automatic Renewal',
                    text: 'After the initial 6-month binding period ends, your subscription automatically renews each month at NOK 649, on the same date of the month as your original purchase, until you cancel.<br /><br />To avoid being charged for the next monthly renewal after the binding period, you must cancel before the renewal date.'
                },
                {
                    subtitle: '3.3 Payment and Billing',
                    text: '• Payments are processed monthly via our payment provider. Payment may be facilitated by Mollie, Stripe, or another provider used at the time of your subscription.<br />• Prices include applicable taxes unless stated otherwise.<br />• You are responsible for ensuring your payment method remains valid and updated.<br />• If a payment fails or is declined, we reserve the right to suspend your subscription access until payment is successfully processed.'
                },
                {
                    subtitle: '3.4 Promotional Pricing',
                    text: 'We may offer promotional pricing at our sole discretion. Promotional offers are subject to specific eligibility criteria and cannot be transferred or reused across different accounts.'
                }
            ]
        },
        {
            number: '4',
            title: 'Cancellation and Refunds',
            content: [
                {
                    subtitle: '4.1 Right of Withdrawal (Angrerett) — Angrerettloven §22',
                    text: 'You have the right to withdraw from this contract within 14 days of the date of purchase, without giving any reason (the "withdrawal period").<br /><br /><b>Immediate delivery and waiver of refund right:</b><br />By completing your purchase, you expressly request that Gymfluence OÜ begins providing the digital service immediately, before the 14-day withdrawal period has expired. At the time of purchase, you are asked to confirm this request by actively ticking a checkbox. By doing so, you acknowledge that you waive your right to a refund for the portion of the service already delivered, in accordance with Angrerettloven §22(m).<br /><br />The service is provisioned as an indivisible monthly unit. The first month is considered fully delivered from the moment your subscription is activated.<br /><br /><b>Effect of cancellation within 14 days:</b><br />If you exercise your right of withdrawal within the 14-day period, your subscription will be cancelled immediately and no further monthly charges will be made. However, no refund will be issued for the first monthly payment, as the digital service for that period has already been delivered and you consented to immediate delivery at checkout.<br /><br /><b>Cancellation after 14 days:</b><br />After the 14-day withdrawal period has expired:<br />• <b>During the 6-month binding period:</b> You may cancel at any time, but you remain obligated to complete all remaining monthly payments for the binding period. Access continues until the end of the binding period.<br />• <b>After the binding period (monthly renewal phase):</b> You may cancel at any time. Your subscription remains active until the end of the current paid month. No further charges will be made after that date. No partial refunds are issued.'
                },
                {
                    subtitle: '4.2 How to Cancel',
                    text: 'To cancel your subscription at any time, send an email to our support team at <a href="mailto:ask@myluck.no"><b>ask@myluck.no</b></a> stating your full name and the email address associated with your account.<br /><br />To exercise your right of withdrawal specifically (within the 14-day period), you may use the standard withdrawal form (Angrerettskjema) available here: [Angrerettskjema Link] — but this is not obligatory. Any clear written statement sent to ask@myluck.no is sufficient, provided it is sent before the withdrawal deadline expires.<br /><br />We will confirm receipt of your cancellation by email.'
                },
                {
                    subtitle: '4.3 No Refund Policy',
                    text: 'As you consented to immediate delivery of the digital service at checkout, no refunds are issued once the service has commenced. Each monthly period is treated as an indivisible, fully delivered unit from the moment it is activated.<br /><br />If you believe you have not received the service or have a complaint, please contact us at <a href="mailto:ask@myluck.no"><b>ask@myluck.no</b></a> and we will investigate promptly.'
                }
            ]
        },
        {
            number: '5',
            title: 'Use of the App and Content',
            content: '• You are granted a limited, non-exclusive, non-transferable licence to use Myluck by Mila and its content for personal, non-commercial purposes.<br />• You must not share your login credentials, resell access, or attempt to reverse-engineer, copy, or manipulate our technology or materials.<br />• All content, including videos, training plans, and nutrition materials, is the property of Gymfluence OÜ or its licensors and is protected under copyright and other applicable laws.'
        },
        {
            number: '6',
            title: 'Community Participation',
            content: 'We encourage engagement through community groups. By participating, you agree to:<br />• Communicate respectfully with others<br />• Avoid offensive, discriminatory, or abusive language<br />• Comply with the group\'s rules and guidelines<br /><br />We reserve the right to remove participants who do not adhere to these standards.'
        },
        {
            number: '7',
            title: 'Processing of Financial Data',
            content: 'To process subscription payments, we partner with Mollie and/or other third-party payment providers. These providers handle payments and store and process your card details directly. They may process your name, billing information, and transaction history to fulfil payment obligations and prevent fraud.<br /><br />We receive only limited payment-related data (e.g., transaction confirmation or failure) for subscription management purposes. Please refer to the relevant provider\'s privacy policy for further details.'
        },
        {
            number: '8',
            title: 'Limitation of Liability',
            content: 'Participation in any fitness programme involves inherent risk. By using our services, you agree that Gymfluence OÜ is not liable for any injuries, health conditions, or losses arising from your participation. You accept responsibility for your own health and well-being during use.'
        },
        {
            number: '9',
            title: 'Disclaimers',
            content: '• Our services are not a substitute for professional medical advice or treatment.<br />• Individual results will vary and are not guaranteed.<br />• We are not liable for delays or interruptions in access to our services.'
        },
        {
            number: '10',
            title: 'Modification of Services and Terms',
            content: 'We reserve the right to modify, suspend, or discontinue any part of our services at any time. Where possible, we will notify users in advance of material changes.<br /><br />We also reserve the right to update these Terms at any time. Any changes will be posted on our website. If changes are material, we will notify you by email at least 30 days before they take effect. Continued use of the service after that date constitutes acceptance of the updated Terms.'
        },
        {
            number: '11',
            title: 'Dispute Resolution',
            content: 'These Terms are governed by the laws of Estonia. However, if you are a consumer residing in Norway, you retain all mandatory rights and protections under Norwegian consumer law, including:<br />• The Norwegian Cancellation Rights Act (Angrerettloven)<br />• The Norwegian Consumer Purchases Act (Forbrukerkjøpsloven)<br />• The Norwegian Marketing Control Act (Markedsføringsloven)<br /><br />No provision in these Terms limits or overrides those statutory rights.<br /><br />If a dispute arises, we encourage you to contact us first at <a href="mailto:ask@myluck.no"><b>ask@myluck.no</b></a> so we can attempt to resolve the matter directly.<br /><br />If we are unable to reach a resolution, Norwegian consumers have the right to bring the matter before:<br />• <b>Forbrukerrådet</b> (the Norwegian Consumer Council) at <a href="https://www.forbrukerradet.no" target="_blank">forbrukerradet.no</a><br />• <b>Forbrukertilsynet</b> (the Norwegian Consumer Authority) at <a href="https://www.forbrukertilsynet.no" target="_blank">forbrukertilsynet.no</a><br />• <b>The EU/EEA Online Dispute Resolution (ODR) platform</b> at <a href="https://ec.europa.eu/consumers/odr" target="_blank">ec.europa.eu/consumers/odr</a>'
        },
        {
            number: '12',
            title: 'Termination',
            content: 'We may suspend or terminate your access to the services if you breach these Terms or misuse the platform. In such cases, you may forfeit access to any remaining subscription time.'
        },
        {
            number: '13',
            title: 'Contact Information',
            content: 'Support is available exclusively via email at <a href="mailto:ask@myluck.no"><b>ask@myluck.no</b></a>.'
        },

        // --- NORWEGIAN VERSION ---
        {
            id: 'norwegian-version',
            isHeader: true,
            title: 'Vilkår og betingelser – Myluck by Gymfluence',
            jumpButton: {
                text: 'Go to English Version',
                targetId: 'english-version'
            },
            content: '<b>Sist oppdatert: 06-July-2026</b><br /><br />Velkommen til Gymfluence OÜ (Paepargi tn 43, 11417 Tallinn, Estland). Disse vilkårene og betingelsene («Vilkår») regulerer din bruk av nettstedet vårt, mobilapplikasjonen («Appen») og tilknyttede tjenester. Ved å få tilgang til eller bruke noen del av tjenestene våre, samtykker du i å være bundet av disse Vilkårene. Hvis du ikke godtar dem, vennligst ikke bruk tjenestene våre.'
        },
        {
            number: '1',
            title: 'Tjenestebeskrivelse',
            content: 'Gymfluence OÜ tilbyr treningstjenester via sitt nettsted og Myluck by Mila-appen. Dette inkluderer:<br />• Tilgang til treningsprogrammer, videodemonstrasjoner og oppskrifter<br />• Personlig coaching og veiledning gjennom appen<br />• Kommunikasjonsstøtte gjennom private grupper<br />• Abonnementsbasert tilgang til eksklusivt innhold'
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
                    subtitle: '3.1 Abonnementsplan',
                    text: 'Myluck by Mila tilbyr én abonnementsplan med følgende struktur:<br />• <b>Innledende bindingsperiode:</b> 6 måneder fra kjøpsdatoen<br />• <b>Pris:</b> NOK 649 per måned, fakturert månedlig<br />• <b>Totalkostnad i bindingsperioden:</b> NOK 3 894 (6 × NOK 649)<br />• <b>Etter bindingsperioden:</b> Abonnementet fornyes automatisk <b>måned for måned</b> til NOK 649/mnd, på ubestemt tid, frem til du kansellerer<br /><br />Ved å abonnere forplikter du deg til å gjennomføre alle 6 månedlige betalinger i den innledende bindingsperioden. Kansellering i bindingsperioden fritar ikke betalingsplikten for gjenværende måneder i denne perioden.<br /><br />Etter bindingsperioden kan du kansellere når som helst, og ingen ytterligere kostnader vil påløpe etter utgangen av den allerede betalte måneden.'
                },
                {
                    subtitle: '3.2 Automatisk fornyelse',
                    text: 'Etter at den innledende 6-månedersperioden er over, fornyes abonnementet automatisk hver måned til NOK 649, på samme dato i måneden som det opprinnelige kjøpet, frem til du kansellerer.<br /><br />For å unngå å bli belastet for neste månedlige fornyelse etter bindingsperioden må du kansellere før fornyelsesdatoen.'
                },
                {
                    subtitle: '3.3 Betaling og fakturering',
                    text: '• Betalinger behandles månedlig via vår betalingsleverandør. Betaling kan bli levert av Mollie, Stripe eller en annen leverandør som benyttes på tidspunktet for abonnementet.<br />• Prisene inkluderer gjeldende avgifter med mindre annet er oppgitt.<br />• Du er ansvarlig for å sikre at betalingsmetoden din er gyldig og oppdatert.<br />• Dersom en betaling mislykkes eller avvises, forbeholder vi oss retten til å suspendere abonnementstilgangen din til betalingen er gjennomført.'
                },
                {
                    subtitle: '3.4 Kampanjepriser',
                    text: 'Vi kan tilby kampanjepriser etter vårt eget skjønn. Slike tilbud er underlagt egne kvalifikasjonskrav og kan ikke overføres eller gjenbrukes på andre kontoer.'
                }
            ]
        },
        {
            number: '4',
            title: 'Kansellering og refusjoner',
            content: [
                {
                    subtitle: '4.1 Angrerett — Angrerettloven §22',
                    text: 'Du har rett til å trekke deg fra denne avtalen innen 14 dager fra kjøpsdatoen, uten å oppgi grunn («angreperioden»).<br /><br /><b>Umiddelbar levering og frafall av refusjonsrett:</b><br />Ved å gjennomføre kjøpet ber du uttrykkelig om at Gymfluence OÜ begynner å levere den digitale tjenesten umiddelbart, før 14-dagersfristen er utløpt. På kjøpstidspunktet bekrefter du dette ved å aktivt krysse av en boks. Ved å gjøre dette erkjenner du at du frasier deg retten til refusjon for den allerede leverte tjenesten, i samsvar med Angrerettloven §22(m).<br /><br />Tjenesten leveres som en udelelig månedlig enhet. Den første måneden anses som fullt levert fra det øyeblikket abonnementet ditt aktiveres.<br /><br /><b>Virkning av kansellering innen 14 dager:</b><br />Hvis du benytter angreretten innen 14-dagersperioden, vil abonnementet ditt bli kansellert umiddelbart og ingen ytterligere månedlige kostnader vil påløpe. Det vil imidlertid ikke bli gitt refusjon for den første månedlige betalingen, ettersom den digitale tjenesten for den perioden allerede er levert og du samtykket til umiddelbar levering ved kjøp.<br /><br /><b>Kansellering etter 14 dager:</b><br />Etter at angreperioden på 14 dager er utløpt:<br />• <b>I løpet av 6-månedersbindingsperioden:</b> Du kan kansellere når som helst, men du forblir forpliktet til å gjennomføre alle gjenværende månedlige betalinger i bindingsperioden. Tilgangen fortsetter til bindingsperiodens slutt.<br />• <b>Etter bindingsperioden (månedlig fornyelse):</b> Du kan kansellere når som helst. Abonnementet ditt forblir aktivt til slutten av den allerede betalte måneden. Ingen ytterligere kostnader vil påløpe etter den datoen. Ingen delvise refusjoner gis.'
                },
                {
                    subtitle: '4.2 Slik kansellerer du',
                    text: 'For å kansellere abonnementet ditt når som helst, send en e-post til støtteteamet vårt på <a href="mailto:ask@myluck.no"><b>ask@myluck.no</b></a> med ditt fulle navn og e-postadressen tilknyttet kontoen din.<br /><br />For å bruke angreretten spesifikt (innen 14-dagersperioden) kan du benytte standardskjemaet for angrerett (Angrerettskjema) tilgjengelig her: [Angrerettskjema-lenke] — men dette er ikke obligatorisk. Enhver tydelig skriftlig erklæring sendt til ask@myluck.no er tilstrekkelig, forutsatt at den sendes før fristens utløp.<br /><br />Vi vil bekrefte mottak av kanselleringen din på e-post.'
                },
                {
                    subtitle: '4.3 Ingen refusjonspolicy',
                    text: 'Ettersom du samtykket til umiddelbar levering av den digitale tjenesten ved kjøp, gis det ingen refusjoner etter at tjenesten har startet. Hver månedlig periode behandles som en udelelig, fullt levert enhet fra det øyeblikket den aktiveres.<br /><br />Hvis du mener du ikke har mottatt tjenesten eller har en klage, kontakt oss på <a href="mailto:ask@myluck.no"><b>ask@myluck.no</b></a>, og vi vil undersøke saken umiddelbart.'
                }
            ]
        },
        {
            number: '5',
            title: 'Bruk av appen og innhold',
            content: '• Du får en begrenset, ikke-eksklusiv og ikke-overførbar lisens til å bruke Myluck by Mila og tilhørende innhold til personlig og ikke-kommersiell bruk.<br />• Du må ikke dele innloggingsinformasjon, videreselge tilgang, eller forsøke å reversere, kopiere eller manipulere teknologi eller materiale.<br />• Alt innhold, inkludert videoer, treningsplaner og ernæringsmateriale, tilhører Gymfluence OÜ eller deres lisensgivere og er beskyttet av opphavsrett og andre gjeldende lover.'
        },
        {
            number: '6',
            title: 'Deltakelse i fellesskapet',
            content: 'Vi oppfordrer til deltakelse i fellesskapsgrupper. Ved deltakelse samtykker du i å:<br />• Kommunisere respektfullt med andre<br />• Unngå støtende, diskriminerende eller krenkende språk<br />• Følge gruppens regler og retningslinjer<br /><br />Vi forbeholder oss retten til å fjerne deltakere som ikke følger disse standardene.'
        },
        {
            number: '7',
            title: 'Behandling av finansielle data',
            content: 'For å behandle abonnementsbetalinger samarbeider vi med Mollie og/eller andre tredjeparts betalingsleverandører. Disse leverandørene håndterer betalinger og lagrer og behandler kortinformasjon direkte. De kan behandle navn, faktureringsinformasjon og transaksjonshistorikk for å oppfylle betalingsforpliktelser og forhindre svindel.<br /><br />Vi mottar kun begrenset betalingsrelatert data (f.eks. bekreftelse eller avvisning av transaksjon) for administrasjon av abonnementet. Se den aktuelle leverandørens personvernerklæring for mer informasjon.'
        },
        {
            number: '8',
            title: 'Ansvarsbegrensning',
            content: 'Deltakelse i treningsprogram innebærer iboende risiko. Ved å bruke tjenestene våre godtar du at Gymfluence OÜ ikke er ansvarlig for skader, helseproblemer eller tap som oppstår i forbindelse med din deltakelse. Du tar selv ansvar for egen helse og sikkerhet.'
        },
        {
            number: '9',
            title: 'Ansvarsfraskrivelse',
            content: '• Tjenestene våre er ikke en erstatning for profesjonell medisinsk rådgivning eller behandling.<br />• Resultater vil variere fra person til person, og ingen spesifikke resultater garanteres.<br />• Vi er ikke ansvarlige for forsinkelser eller avbrudd i tilgang til tjenestene.'
        },
        {
            number: '10',
            title: 'Endringer i tjenester og vilkår',
            content: 'Vi forbeholder oss retten til å endre, suspendere eller avslutte deler av tjenestene våre når som helst. Der det er mulig, vil vi varsle brukere på forhånd om vesentlige endringer.<br /><br />Vi forbeholder oss også retten til å oppdatere disse Vilkårene når som helst. Endringer publiseres på nettstedet vårt. Ved vesentlige endringer vil vi varsle deg på e-post minst 30 dager før endringene trer i kraft. Videre bruk av tjenesten etter den datoen innebærer aksept av de oppdaterte Vilkårene.'
        },
        {
            number: '11',
            title: 'Tvisteløsning',
            content: 'Disse Vilkårene er underlagt estisk lov. Dersom du er forbruker bosatt i Norge, beholder du imidlertid alle obligatoriske rettigheter og vern etter norsk forbrukerlovgivning, inkludert:<br />• Angrerettloven<br />• Forbrukerkjøpsloven<br />• Markedsføringsloven<br /><br />Ingen bestemmelse i disse Vilkårene begrenser eller overstyrer disse lovfestede rettighetene.<br /><br />Dersom det oppstår en tvist, oppfordrer vi deg til å kontakte oss først på <a href="mailto:ask@myluck.no"><b>ask@myluck.no</b></a>, slik at vi kan forsøke å løse saken direkte.<br /><br />Dersom vi ikke kommer til enighet, har norske forbrukere rett til å bringe saken inn for:<br />• <b>Forbrukerrådet</b> på <a href="https://www.forbrukerradet.no" target="_blank">forbrukerradet.no</a><br />• <b>Forbrukertilsynet</b> på <a href="https://www.forbrukertilsynet.no" target="_blank">forbrukertilsynet.no</a><br />• <b>EUs/EØS-plattform for nettbasert tvisteløsning (ODR)</b> på <a href="https://ec.europa.eu/consumers/odr" target="_blank">ec.europa.eu/consumers/odr</a>'
        },
        {
            number: '12',
            title: 'Stenging av tjenesten',
            content: 'Vi kan suspendere eller avslutte din tilgang dersom du bryter Vilkårene eller misbruker plattformen. I slike tilfeller kan du miste tilgang til gjenværende abonnementsperiode.'
        },
        {
            number: '13',
            title: 'Kontaktinformasjon',
            content: 'Kundeservice er utelukkende tilgjengelig via e-post på <a href="mailto:ask@myluck.no"><b>ask@myluck.no</b></a>.'
        }
    ];

    return (
        <div id="english-version">
            <TermsAndConditionsPresenter
                title="Terms and Conditions – Myluck by Gymfluence"
                lastUpdated="06-July-2026"
                introText='Welcome to Gymfluence OÜ (Paepargi tn 43, 11417 Tallinn, Estonia). These Terms and Conditions ("Terms") govern your use of our website, mobile application ("App"), and related services. By accessing or using any part of our services, you agree to be bound by these Terms. If you do not agree, please do not use our services.'
                sections={sections}
                jumpButtonText="Go to Norwegian Version"
                jumpToId="norwegian-version"
            />
        </div>
    );
}
