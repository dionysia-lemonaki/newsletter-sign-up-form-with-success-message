import Button from "./Button";
import iconSuccess from "../assets/images/icon-success.svg";

interface SuccessMessageProps {
  email: string;
  onReset: () => void;
}

const SuccessMessage = ({ email, onReset }: SuccessMessageProps) => {
  return (
    <div>
      <img src={iconSuccess} alt="" />
      <h2>Thanks for subscribing!</h2>
      <p>
        A confirmation email has been sent to <strong>{email}</strong>. Please
        open it and click the button inside to confirm your subscription.
      </p>
      <Button type="button" onClick={onReset}>
        Dismiss message
      </Button>
    </div>
  );
};

export default SuccessMessage;
