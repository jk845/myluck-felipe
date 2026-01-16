import ActionButton from "@/components/ui/action-button";
import SelectionCard from "@/components/ui/selection-card";
import SubscriptionFeatures from "@/components/SubscriptionFeatures";
import { RatingsDisplay } from "@/components/ratings/RatingsDisplay";
import LazyImage from "@/components/ui/lazy-image";
import SuccessPhoto from '@/assets/success_photo.jpg';

interface SubscriptionTypeStepProps {
  onNext: () => void;
  selectedSubscription: string;
  setSelectedSubscription: (value: string) => void;
  isLeadMagnet: boolean;
  textForRating: string;
}

const SubscriptionTypeStep: React.FC<SubscriptionTypeStepProps> = ({
  onNext,
  selectedSubscription,
  setSelectedSubscription,
  isLeadMagnet,
  textForRating,
}) => {
  return (
    <div>
      <div className="flex justify-center mb-8">
        <RatingsDisplay mode='light' title={textForRating} />
      </div>

      {isLeadMagnet && (
        <>
          <div className="flex justify-center mb-8">
            <div className="w-[262px] text-center justify-start text-black text-xl font-semibold font-['Hind_Vadodara'] tracking-tighter leading-tight">Dette er en av hjemme
              <br /> øktene fra Maratonet!  </div>
          </div>
          <div className="flex justify-center mb-10">
            <div className="w-[262px] text-center justify-start text-black text-sm font-normal font-['Libre_Baskerville'] tracking-tighter leading-tight">20 minutter hvem som <br />
              helst kan gjøre.
              <br />
              <br />
              Gjør denne økten 2-3 ganger i uken <br />
              garanterer Mila deg resulatater. </div>
          </div>
          <div className="w-full max-w-sm mx-auto mb-8">
            <div className="relative w-full" style={{ paddingBottom: '178%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-xl"
                src="https://www.youtube.com/embed/oNsvPN_Kz-k"
                title="Hjemme treningsøkt fra Transformasjons Maraton"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </>
      )}

      {isLeadMagnet && (
        <ActionButton
          onClick={onNext}
          className="mb-10"
        >
          Gjennomført økten?
        </ActionButton>
      )}

      {/* Subscription options */}
      <div className="space-y-4 mb-8">
        <SelectionCard
          title="Premium Myluck Abonnement"
          price="fra 490 kr per måned"
          description={<div className="w-full">
            <p className="mb-3">
              16,33 kr per dag
            </p>
            <hr className="mb-6" />
            <SubscriptionFeatures />
          </div>}
          isSelected={selectedSubscription === 'premium'}
          onClick={() => setSelectedSubscription('premium')}
        />

        <SelectionCard
          title="Inner circle"
          price="fra 4 390 kr per måned"
          description="1 til 1 coaching med Mila"
          isSelected={selectedSubscription === 'inner'}
          onClick={() => { }}
          disabled={true}
          secondaryText="Kommer snart"
        />
      </div>

      <ActionButton
        onClick={onNext}
        className="mb-10"
      >
        Drømmen din venter!
      </ActionButton>

      <div className="flex justify-center mb-6">
        <div className="w-[262px] text-center justify-start text-black text-xl font-semibold font-['Hind_Vadodara'] tracking-tighter leading-tight">Mabel har endret livet sitt, det kan du også! </div>
      </div>
      <LazyImage src={SuccessPhoto} alt="Success" className="mb-10 w-full" />
      <div className=" text-center justify-start text-black/60 text-sm font-normal font-['Libre_Baskerville'] leading-tight">"Jeg har dette året gått ned i vekt, jeg sover så mye bedre på natta, jeg er sterkere både fysisk og psykisk, jeg tåler at ikke alt går etter planen alltid – jeg vet at det ikke velter alt. Jeg er en bedre mamma, venn og kollega, jeg er god mot meg selv og er takknemlig hver dag for en sterk kropp og min mulighet til å gjøre noe godt for meg selv & min helse. Jeg er takknemlig for Mila og Maraton som har endret retning. Jeg har gjort jobben, men Mila har gitt meg alt av verktøy og kunnskap hun har! Det er viktig å huske på at en selv må gjøre jobben, men med Maraton har du tidens støtteapparat rundt deg på både gode og dårlige dager 🥰"</div>
    </div>
  );
};

export default SubscriptionTypeStep; 