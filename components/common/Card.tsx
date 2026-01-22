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
export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('flex flex-col space-y-1.5 mb-4', className)}>{children}</div>;
}

export function CardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h3 className={cn('text-lg font-semibold leading-none tracking-tight', className)}>
      {children}
    </h3>
  );
}

export function CardContent({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('', className)}>{children}</div>;
}