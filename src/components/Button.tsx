import type { ReactNode } from "react";

interface ButtonProps {
  type: "submit" | "button";
  onClick?: () => void;
  children: ReactNode;
}

const Button = ({ type, children, onClick }: ButtonProps) => {
  return (
    <button type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
