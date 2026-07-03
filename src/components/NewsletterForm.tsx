import { useId, type SubmitEvent } from "react";
import Button from "./Button";

import illustrationMobile from "../assets/images/illustration-sign-up-mobile.svg";
import illustrationDesktop from "../assets/images/illustration-sign-up-desktop.svg";
import iconList from "../assets/images/icon-list.svg";

interface NewsletterFormProps {
  email: string;
  onEmailChange: (value: string) => void;
  error: string;
  onSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
}

const NewsletterForm = ({
  email,
  onEmailChange,
  error,
  onSubmit,
}: NewsletterFormProps) => {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div className="bg-white max-w-[56.5rem] grid md:grid-cols-2 md:gap-x-16 md:p-8 rounded-4xl">
      <picture className="md:order-2">
        <source srcSet={illustrationDesktop} media="(width > 768px)" />
        <img src={illustrationMobile} alt="" className="w-full h-auto" />
      </picture>
      <div className="self-center flex flex-col gap-8 py-10 px-6 md:p-0">
        <h2 className="text-[2.5rem] md:text-[3.5rem] leading-none font-bold">
          Stay updated!
        </h2>
        <p>Join 60,000+ product managers receiving monthly updates on:</p>
        <ul className="flex flex-col gap-2 text-left">
          <li className="flex items-start gap-4">
            <img src={iconList} alt="" className="w-6 h-6" />
            <span>Product discovery and building what matters</span>
          </li>
          <li className="flex items-start gap-4">
            <img src={iconList} alt="" className="w-6 h-6" />
            <span>Measuring to ensure updates are a success</span>
          </li>
          <li className="flex items-start gap-4">
            <img src={iconList} alt="" className="w-6 h-6" />
            <span>And much more!</span>
          </li>
        </ul>
        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <label htmlFor={id} className="text-xs font-bold">
              Email address
            </label>
            {error && (
              <p
                id={errorId}
                aria-live="polite"
                className="text-xs font-bold text-(--red)"
              >
                {error}
              </p>
            )}
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            id={id}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            placeholder="email@company.com"
            className={`py-4 px-6 ${error ? `border-(--red) text-(--red) bg-(--red)/10` : `border-(--grey) text-(--blue-800) bg-white placeholder:text-(--blue-800) placeholder:opacity-50 focus:border-(--blue-800)`} border rounded-lg focus:outline-none`}
          />
          <Button type="submit">Subscribe to monthly newsletter</Button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterForm;
