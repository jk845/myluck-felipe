import { useNavigate } from "react-router-dom";
import { PaymentFailedPresenter } from "@/components/presenters/registration";

export function PaymentFailedContainer() {
    const navigate = useNavigate();

    const handleRetry = () => {
        navigate('/');
    };

    return <PaymentFailedPresenter onRetry={handleRetry} />;
}