import "./button.css";
import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  aria: string;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, aria, type}) => {
  return (
    <button
      className="btn1 medium"
      onClick={onClick}
      type={type}
      aria-label={aria}
    >
      {text}
    </button>
  );
};

export default Button;
