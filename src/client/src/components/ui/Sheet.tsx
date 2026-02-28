import React, {
  useEffect,
  useRef,
  forwardRef,
  createContext,
  useContext } from
'react';
import { createPortal } from 'react-dom';
import { XIcon } from 'lucide-react';
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
interface SheetContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
const SheetContext = createContext<SheetContextValue | null>(null);
function useSheetContext() {
  const context = useContext(SheetContext);
  if (!context) throw new Error('Sheet components must be used within a Sheet');
  return context;
}
export interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}
export function Sheet({ open, onOpenChange, children }: SheetProps) {
  return (
    <SheetContext.Provider
      value={{
        open,
        onOpenChange
      }}>

      {children}
    </SheetContext.Provider>);

}
export interface SheetTriggerProps extends
  React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}
export const SheetTrigger = forwardRef<HTMLButtonElement, SheetTriggerProps>(
  ({ children, onClick, ...props }, ref) => {
    const { onOpenChange } = useSheetContext();
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      onOpenChange(true);
    };
    return (
      <button ref={ref} onClick={handleClick} {...props}>
        {children}
      </button>);

  }
);
SheetTrigger.displayName = 'SheetTrigger';
export interface SheetContentProps {
  children: React.ReactNode;
  className?: string;
  side?: 'left' | 'right';
}
export function SheetContent({
  children,
  className,
  side = 'left'
}: SheetContentProps) {
  const { open, onOpenChange } = useSheetContext();
  const contentRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number | null>(null);
  const currentXRef = useRef<number>(0);
  // Escape key
  useEffect(() => {
    if (!open) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onOpenChange]);
  // Lock body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      // Prevent iOS bounce scroll
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [open]);
  // Focus first focusable element
  useEffect(() => {
    if (open && contentRef.current) {
      const focusable = contentRef.current.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      focusable?.focus();
    }
  }, [open]);
  // Touch swipe-to-close for mobile
  useEffect(() => {
    if (!open || !contentRef.current) return;
    const el = contentRef.current;
    const handleTouchStart = (e: TouchEvent) => {
      startXRef.current = e.touches[0].clientX;
      currentXRef.current = 0;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (startXRef.current === null) return;
      const diff = e.touches[0].clientX - startXRef.current;
      // Only track leftward swipes (to close left-side sheet)
      if (side === 'left' && diff < 0) {
        currentXRef.current = diff;
        el.style.transform = `translateX(${diff}px)`;
        el.style.transition = 'none';
      }
    };
    const handleTouchEnd = () => {
      if (startXRef.current === null) return;
      el.style.transition = '';
      // If swiped more than 80px left, close
      if (side === 'left' && currentXRef.current < -80) {
        el.style.transform = 'translateX(-100%)';
        setTimeout(() => onOpenChange(false), 200);
      } else {
        el.style.transform = '';
      }
      startXRef.current = null;
      currentXRef.current = 0;
    };
    el.addEventListener('touchstart', handleTouchStart, {
      passive: true
    });
    el.addEventListener('touchmove', handleTouchMove, {
      passive: true
    });
    el.addEventListener('touchend', handleTouchEnd, {
      passive: true
    });
    return () => {
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
      el.removeEventListener('touchend', handleTouchEnd);
    };
  }, [open, side, onOpenChange]);
  if (!open) return null;
  const sideClasses = {
    left: 'left-0 animate-slide-in-left',
    right: 'right-0'
  };
  return createPortal(
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={() => onOpenChange(false)}
        aria-hidden="true" />

      <div
        ref={contentRef}
        className={cn(
          'fixed top-0 h-full w-[280px] max-w-[85vw] bg-sidebar-background border-r border-sidebar-border shadow-xl',
          'flex flex-col',
          // Safe area padding for notched devices
          'pb-[env(safe-area-inset-bottom)]',
          sideClasses[side],
          className
        )}>

        {children}
      </div>
    </div>,
    document.body
  );
}
export interface SheetHeaderProps {
  children: React.ReactNode;
  className?: string;
}
export function SheetHeader({ children, className }: SheetHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col space-y-2 p-4 border-b border-sidebar-border',
        className
      )}>

      {children}
    </div>);

}
export interface SheetTitleProps {
  children: React.ReactNode;
  className?: string;
}
export function SheetTitle({ children, className }: SheetTitleProps) {
  return (
    <h2
      className={cn(
        'font-heading text-lg font-semibold text-sidebar-foreground',
        className
      )}>

      {children}
    </h2>);

}
export interface SheetCloseProps extends
  React.ButtonHTMLAttributes<HTMLButtonElement> {}
export const SheetClose = forwardRef<HTMLButtonElement, SheetCloseProps>(
  ({ className, children, onClick, ...props }, ref) => {
    const { onOpenChange } = useSheetContext();
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      onOpenChange(false);
    };
    return (
      <button
        ref={ref}
        onClick={handleClick}
        className={cn(
          'absolute right-4 top-4 rounded-sm p-1 min-h-[44px] min-w-[44px] flex items-center justify-center opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          className
        )}
        {...props}>

        {children || <XIcon className="h-5 w-5" />}
        <span className="sr-only">Close</span>
      </button>);

  }
);
SheetClose.displayName = 'SheetClose';