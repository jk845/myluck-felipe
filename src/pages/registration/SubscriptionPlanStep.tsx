import ActionButton from "@/components/ui/action-button";
import StatusBadge from "@/components/ui/status-badge";
import CheckIcon from "@/components/ui/check-icon";
import { PlanOptionButton } from "@/components/ui/plan-option-button";

  
interface SubscriptionPlanStepProps {
  onNext: () => void;
  selectedPlan: string;
  setSelectedPlan: (value: string) => void;
  benefits: string[];
}

const SubscriptionPlanStep: React.FC<SubscriptionPlanStepProps> = ({
  onNext,
  selectedPlan,
  setSelectedPlan,
  benefits,
}) => {
  return (
    <div>
      {/* Benefits list */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold font-['Hind_Vadodara'] mb-6 text-black tracking-tighter text-left">
          Hva får du med Premium? ✨
        </h3>
        <div className="bg-[#f5f5f7] rounded-3xl p-6 relative">
          <StatusBadge text="Premium" className="absolute top-[-1rem] left-7" />
          <ul className="space-y-3">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <div className="mr-3 mt-0.5">
                  <CheckIcon />
                </div>
                <span className="text-sm leading-relaxed tracking-tighter font-normal font-['Hind_Vadodara'] text-black/80">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Plan options */}
      <div className="mb-8 space-y-4">
        <PlanOptionButton
          title="Premium 1-måned"
          pricePerDay="29,66 kr per dag"
          price="890"
          emoji="🏃‍♀️"
          isSelected={selectedPlan === '1month'}
          onSelect={() => setSelectedPlan('1month')}
        />

        <PlanOptionButton
          title="Premium 6 måneders binding"
          pricePerDay="19,66 kr per dag"
          price="590"
          emoji="🔥"
          tagText="Mest populær"
          discount="- 300kr"
          isSelected={selectedPlan === '6month'}
          onSelect={() => setSelectedPlan('6month')}
        />

        <PlanOptionButton
          title="Premium 12 måneders binding"
          pricePerDay="16 kr per dag"
          price="490"
          emoji="🚀"
          tagText="Mest for pengene"
          discount="- 400kr"
          isSelected={selectedPlan === '12month'}
          onSelect={() => setSelectedPlan('12month')}
        />
      </div>

      {/* Navigation buttons */}
      <div className="mt-12">
        <ActionButton onClick={onNext}>
          Neste: Fysiske data
        </ActionButton>
      </div>
    </div>
  );
};

export default SubscriptionPlanStep; 