// components/Button.tsx
import React, { ButtonHTMLAttributes,useState } from 'react';
import './style.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  size?: string;
  className?: string;
  icon?: React.ReactNode;
  tpClass?: boolean;
  ctClass?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  size,
  className,
  icon,
  type,
  onClick,
  tpClass,
  ctClass,
  ...rest
}) => {

  const DefaulClass = 'btn';
  const NameClass = className ? `${className}` : 'undefine';
  const btn = `${DefaulClass} ${NameClass}`;

  return (
    
    <>
      <button 
      type={type} 
      className={btn} 
      onClick={onClick}
      {...rest}
      >
        {icon}
        {title}
      </button>
      </>
  );
};

export default Button;
