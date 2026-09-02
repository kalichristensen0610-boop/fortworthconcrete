import * as React from 'react';
import { cn } from '@/lib/utils';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'secondary' | 'ghost';
};

export function Button({ className, variant = 'default', ...props }: ButtonProps) {
  return <button data-slot="button" data-variant={variant} className={cn('ui-button', className)} {...props} />;
}
