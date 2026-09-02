import * as React from 'react';
import { cn } from '@/lib/utils';

export function Field({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="field" className={cn('ui-field', className)} {...props} />;
}

export function FieldLabel({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label data-slot="field-label" className={cn('ui-field-label', className)} {...props} />;
}

export function FieldError({ children }: { children?: React.ReactNode }) {
  if (!children) return null;
  return <p data-slot="field-error" className="form-error" role="alert">{children}</p>;
}
