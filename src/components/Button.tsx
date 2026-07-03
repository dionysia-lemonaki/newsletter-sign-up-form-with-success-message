import type { ReactNode } from "react";

interface ButtonProps {
  type: "submit" | "button";
  onClick?: () => void;
  children: ReactNode;
}

const Button = ({ type, children, onClick }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="block bg-(--blue-800) p-4 rounded-lg text-white text-base font-bold leading-[1.5] hover:bg-linear-(--gradient) focus-visible:bg-linear-(--gradient) focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-dotted focus-visible:outline-(--red) cursor-pointer"
    >
      {children}
    </button>
  );
};

export default Button;
