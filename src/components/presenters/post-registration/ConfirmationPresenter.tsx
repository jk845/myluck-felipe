import PageContainer from "@/components/ui/page-container";
import ProgressIndicator from "@/components/ui/progress-indicator";
import { PaymentPendingCard } from "@/components/ui/payment-pending-card";
import PaymentSuccessStep from "@/pages/post-registration/PaymentSuccessStep";
import TrainingTypeStep from "@/pages/post-registration/TrainingTypeStep";
import TrainingVariationStep from "@/pages/post-registration/TrainingVariationStep";
import ExerciseConfidenceStep from "@/pages/post-registration/ExerciseConfidenceStep";
import InsecuritiesStep from "@/pages/post-registration/InsecuritiesStep";
import MentalityFocusStep from "@/pages/post-registration/MentalityFocusStep";
import PreviousObstaclesStep from "@/pages/post-registration/PreviousObstaclesStep";
import InnerCircleStep from "@/pages/post-registration/InnerCircleStep";
import InstructionsStep from "@/pages/post-registration/InstructionsStep";
import {
    PostRegistrationStep,
    TrainingTypeData,
    TrainingVariationData,
    TrainingConfidenceData,
    InsecuritiesData,
} from "@/types/post-registration";

interface CustomerInfo {
    orderId: string;
    subscriptionType: string;
    subscriptionPlan: string;
    renewalDate: string;
    nextPaymentDate: string;
    nextCycleDate: string;
    price: string;
    email: string;
    password?: string;
}

interface ConfirmationPresenterProps {
    isLoading: boolean;
    showPendingPayment: boolean;
    customerInfo: CustomerInfo;
    formStep: PostRegistrationStep;
    totalSteps: number;
    currentProgressStep: number;
    showHeader: boolean;
    showProgressIndicator: boolean;
    trainingTypeData: TrainingTypeData | null;
    trainingVariationData: TrainingVariationData | null;
    exerciseConfidenceData: TrainingConfidenceData | null;
    insecuritiesData: InsecuritiesData | null;
    mentalityFocusData: { mentalityFocus: string } | null;
    previousObstaclesData: { previousObstacles: string } | null;
    innerCircleData: { interestedInInnerCircle: string } | null;
    onPaymentSuccessNext: (feedback?: string) => void;
    onTrainingTypeNext: (data: TrainingTypeData) => void;
    onTrainingVariationNext: (data: TrainingVariationData) => void;
    onExerciseConfidenceNext: (data: TrainingConfidenceData) => void;
    onInsecuritiesNext: (data: InsecuritiesData) => void;
    onMentalityFocusNext: (data: { mentalityFocus: string }) => void;
    onPreviousObstaclesNext: (data: { previousObstacles: string }) => void;
    onInnerCircleNext: (data: { interestedInInnerCircle: string }) => void;
    onInstructionsFinish: () => Promise<void>;
    onGoBack: () => void;
}


export function ConfirmationPresenter({
    isLoading,
    showPendingPayment,
    customerInfo,
    formStep,
    totalSteps,
    currentProgressStep,
    showHeader,
    showProgressIndicator,
    trainingTypeData,
    trainingVariationData,
    exerciseConfidenceData,
    insecuritiesData,
    mentalityFocusData,
    previousObstaclesData,
    innerCircleData,
    onPaymentSuccessNext,
    onTrainingTypeNext,
    onTrainingVariationNext,
    onExerciseConfidenceNext,
    onInsecuritiesNext,
    onMentalityFocusNext,
    onPreviousObstaclesNext,
    onInnerCircleNext,
    onInstructionsFinish,
    onGoBack,
}: ConfirmationPresenterProps) {
    // Show loading or pending payment state
    if (isLoading || showPendingPayment) {
        return (
            <PageContainer>
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-normal font-['Averia_Serif_Libre'] mb-8">
                        myluck
                    </h1>
                </div>
                <PaymentPendingCard
                    isLoading={isLoading}
                    customerInfo={customerInfo}
                />
            </PageContainer>
        );
    }

    const renderStep = () => {
        console.log('ConfirmationPresenter: Current step:', formStep);
        switch (formStep) {
            case PostRegistrationStep.PaymentSuccess:
                console.log('ConfirmationPresenter: Rendering PaymentSuccessStep');
                return <PaymentSuccessStep onNext={onPaymentSuccessNext} customerInfo={customerInfo} />;
            case PostRegistrationStep.TrainingType:
                return (
                    <TrainingTypeStep
                        onNext={onTrainingTypeNext}
                        onBack={onGoBack}
                        initialData={trainingTypeData}
                    />
                );
            case PostRegistrationStep.TrainingVariation:
                return (
                    <TrainingVariationStep
                        onNext={onTrainingVariationNext}
                        onBack={onGoBack}
                        initialData={trainingVariationData}
                    />
                );
            case PostRegistrationStep.ExerciseConfidence:
                return (
                    <ExerciseConfidenceStep
                        onNext={onExerciseConfidenceNext}
                        onBack={onGoBack}
                        initialData={exerciseConfidenceData}
                    />
                );
            case PostRegistrationStep.Insecurities:
                return (
                    <InsecuritiesStep
                        onNext={onInsecuritiesNext}
                        onBack={onGoBack}
                        initialData={insecuritiesData}
                    />
                );
            case PostRegistrationStep.MentalityFocus:
                return (
                    <MentalityFocusStep
                        onNext={onMentalityFocusNext}
                        onBack={onGoBack}
                        initialData={mentalityFocusData}
                    />
                );
            case PostRegistrationStep.PreviousObstacles:
                return (
                    <PreviousObstaclesStep
                        onNext={onPreviousObstaclesNext}
                        onBack={onGoBack}
                        initialData={previousObstaclesData}
                    />
                );
            case PostRegistrationStep.InnerCircle:
                return (
                    <InnerCircleStep
                        onNext={onInnerCircleNext}
                        onBack={onGoBack}
                        initialData={innerCircleData}
                    />
                );
            case PostRegistrationStep.Instructions:
                return <InstructionsStep onFinish={onInstructionsFinish} customerInfo={{ email: customerInfo.email, password: customerInfo.password }} orderId={customerInfo.orderId} />;
            default:
                return null;
        }
    };

    return (
        <PageContainer>
            {showHeader && (
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-normal font-['Averia_Serif_Libre'] mb-10">
                        myluck
                    </h1>
                    <div className="flex flex-col items-center">
                        <div className="text-4xl mb-6">🎉</div>
                        <h2 className="text-2xl font-semibold font-['Hind_Vadodara'] tracking-tighter text-black">
                            Betalingen er fullført!
                        </h2>
                        <p className="text-black/60 text-md font-normal font-['Libre_Baskerville'] mt-6 leading-relaxed max-w-md mx-auto">
                            Nå kommer det flere spørsmål slik at planen skal passe deg best mulig.
                        </p>
                    </div>
                </div>
            )}

            {showProgressIndicator && (
                <ProgressIndicator currentStep={currentProgressStep} totalSteps={totalSteps} />
            )}

            <div className="mt-8">{renderStep()}</div>
        </PageContainer>
    );
}