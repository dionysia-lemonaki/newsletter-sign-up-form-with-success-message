import Button from "./Button";
import iconSuccess from "../assets/images/icon-success.svg";

interface SuccessMessageProps {
  email: string;
  onReset: () => void;
}

const SuccessMessage = ({ email, onReset }: SuccessMessageProps) => {
  return (
    <div className="max-w-[31.5rem] bg-white rounded-4xl p-16 flex flex-col gap-8">
      <img src={iconSuccess} alt="" width="64" height="64" />
      <h2 className="text-[2.5rem] md:text-[3.5rem] leading-none font-bold">
        Thanks for subscribing!
      </h2>
      <p className="text-base leading-[1.5] font-normal">
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
