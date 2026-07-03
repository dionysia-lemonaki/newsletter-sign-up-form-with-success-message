import { useState, type SubmitEvent } from "react";
import NewsletterForm from "./components/NewsletterForm";
import SuccessMessage from "./components/SuccessMessage";

const App = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email: string): string => {
    if (email.length === 0) {
      return "Email is required";
    }

    const regex = /^[^@]+@[^@]+\.[^@]+$/;
    if (!regex.test(email)) {
      return "Valid email required";
    }

    return "";
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationError = validateEmail(email);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setIsSubmitted(true);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (error) {
      setError("");
    }
  };

  const handleReset = () => {
    setEmail("");
    setIsSubmitted(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      {!isSubmitted ? (
        <NewsletterForm
          email={email}
          onEmailChange={handleEmailChange}
          error={error}
          onSubmit={handleSubmit}
        />
      ) : (
        <SuccessMessage email={email} onReset={handleReset} />
      )}
    </main>
  );
};

export default App;
