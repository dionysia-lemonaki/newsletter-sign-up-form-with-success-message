import { useId, type SubmitEvent } from "react";
import Button from "./Button";

import illustrationMobile from "../assets/images/illustration-sign-up-mobile.svg";
import illustrationTablet from "../assets/images/illustration-sign-up-tablet.svg";
import illustrationDesktop from "../assets/images/illustration-sign-up-desktop.svg";

interface NewsletterFormProps {
  email: string;
  setEmail: (value: string) => void;
  error: string;
  onSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
}

const NewsletterForm = ({
  email,
  setEmail,
  error,
  onSubmit,
}: NewsletterFormProps) => {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div>
      <picture>
        <source srcSet={illustrationDesktop} media="(width > 1024px)" />
        <source srcSet={illustrationTablet} media="(width > 768px)" />
        <img src={illustrationMobile} alt="" />
      </picture>
      <div>
        <h2>Stay updated!</h2>
        <p>Join 60,000+ product managers receiving monthly updates on:</p>
        <ul>
          <li>Product discovery and building what matters</li>
          <li>Measuring to ensure updates are a success</li>
          <li>And much more!</li>
        </ul>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor={id}>Email address</label>
            {error && (
              <p id={errorId} aria-live="polite">
                {error}
              </p>
            )}
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id={id}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            placeholder="email@company.com"
          />
          <Button type="submit">Subscribe to monthly newsletter</Button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterForm;
