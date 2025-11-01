import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export function Card({ children, className = '', onClick, hoverable = false }: CardProps) {
  const hoverStyles = hoverable ? 'hover:shadow-xl hover:scale-105 cursor-pointer' : '';

  return (
    <div
      className={`bg-white rounded-2xl shadow-lg p-6 transition-all duration-200 ${hoverStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
