import { cn } from '@/lib/utils';
import type { ComponentPropsWithoutRef, ElementType } from 'react';

type ContainerProps<T extends ElementType> = {
  as?: T;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'className'>;

export function Container<T extends ElementType = 'div'>({
  as,
  className,
  ...props
}: ContainerProps<T>) {
  const Comp = (as ?? 'div') as ElementType;
  return <Comp className={cn('container mx-auto w-full', className)} {...props} />;
}
