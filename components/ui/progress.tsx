import { cn } from '@/lib/utils';

export function Progress({ value, className }: { value: number; className?: string }) {
  return <div data-slot="progress" className={cn('ui-progress', className)} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}><span style={{ width: `${value}%` }} /></div>;
}
