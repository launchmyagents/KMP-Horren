import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-bold tracking-wide uppercase transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-kmp-orange focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-kmp-orange text-white hover:bg-[#d03d22] shadow-md hover:shadow-lg border border-transparent",
    secondary: "bg-kmp-blue text-white hover:bg-[#253252] shadow-sm",
    outline: "border-2 border-kmp-blue bg-transparent hover:bg-kmp-blue hover:text-white text-kmp-blue",
    ghost: "bg-transparent hover:bg-slate-100 text-kmp-blue"
  };

  const sizes = {
    sm: "h-9 px-4 text-xs",
    md: "h-11 px-6 text-sm",
    lg: "h-14 px-8 text-base"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};