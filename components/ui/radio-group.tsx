'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

type RadioContextValue = { value: string; name: string; onValueChange: (value: string) => void };
const RadioContext = React.createContext<RadioContextValue | null>(null);

export function RadioGroup({ value, name, onValueChange, className, children }: RadioContextValue & { className?: string; children: React.ReactNode }) {
  return <RadioContext.Provider value={{ value, name, onValueChange }}><div data-slot="radio-group" className={cn('choice-grid', className)} role="radiogroup">{children}</div></RadioContext.Provider>;
}

export function RadioGroupItem({ value, id, label }: { value: string; id: string; label: string }) {
  const context = React.useContext(RadioContext);
  if (!context) throw new Error('RadioGroupItem must be used within RadioGroup');
  const checked = context.value === value;
  return <label className={cn('choice', checked && 'selected')} htmlFor={id}><input id={id} type="radio" name={context.name} value={value} checked={checked} onChange={() => context.onValueChange(value)} /><span>{label}</span></label>;
}
