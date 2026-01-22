import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { theme } from '@/lib/theme';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}

export default function PageHeader({
  title,
  description,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn('mb-6', className)}>
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-2xl font-bold font-heading tracking-tight"
            style={{ color: theme.colors.text.primary }}
          >
            {title}
          </h1>
          {description && (
            <p
              className="mt-2 text-sm"
              style={{ color: theme.colors.text.secondary }}
            >
              {description}
            </p>
          )}
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </div>
  );
}
