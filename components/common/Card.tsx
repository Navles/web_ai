import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { theme } from '@/lib/theme';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export default function Card({ children, className, padding = 'md' }: CardProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={cn(
        'rounded-lg border',
        paddingClasses[padding],
        className
      )}
      style={{
        backgroundColor: theme.colors.background.card,
        borderColor: theme.colors.border.light,
        boxShadow: theme.shadows.sm,
      }}
    >
      {children}
    </div>
  );
}
