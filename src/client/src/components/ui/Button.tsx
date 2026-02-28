import React, { forwardRef } from 'react';
// Simple className merge utility
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
export interface ButtonProps extends
  React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'ghost' | 'outline' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}
const buttonVariants = {
  base: 'inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50',
  variants: {
    default:
    'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    outline:
    'border border-border bg-transparent hover:bg-accent hover:text-accent-foreground',
    destructive:
    'bg-destructive text-destructive-foreground hover:bg-destructive/90'
  },
  sizes: {
    default: 'h-10 px-4 py-2 text-sm',
    sm: 'h-8 px-3 text-xs rounded-md',
    lg: 'h-12 px-6 text-base rounded-lg',
    icon: 'h-10 w-10'
  }
};
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          buttonVariants.base,
          buttonVariants.variants[variant],
          buttonVariants.sizes[size],
          className
        )}
        ref={ref}
        {...props} />);


  }
);
Button.displayName = 'Button';