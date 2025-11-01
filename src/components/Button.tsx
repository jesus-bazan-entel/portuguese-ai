import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'px-6 py-4 md:py-3 rounded-2xl font-bold text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 text-base md:text-lg min-h-[52px] md:min-h-[48px]';

  const variants = {
    primary: 'bg-green-500 hover:bg-green-600 shadow-lg active:shadow-md',
    secondary: 'bg-blue-500 hover:bg-blue-600 shadow-lg active:shadow-md',
    success: 'bg-emerald-500 hover:bg-emerald-600 shadow-lg active:shadow-md',
    danger: 'bg-red-500 hover:bg-red-600 shadow-lg active:shadow-md',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
