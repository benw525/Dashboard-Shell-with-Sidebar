import React, { useEffect, useState, useRef } from 'react';
import {
  MenuIcon,
  MoonIcon,
  SunIcon,
  ChevronDownIcon,
  LogOutIcon,
  UserIcon,
  SettingsIcon } from
'lucide-react';
import { Button } from '../../../components/ui/Button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose } from
'../../../components/ui/Sheet';
import { SidebarNav, NavItem } from './SidebarNav';
function Link({
  href,
  onClick,
  className,
  children,
  role,
  ...rest


}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {href: string;}) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick?.(e);
  };
  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      role={role}
      {...rest}>

      {children}
    </a>);

}
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
export interface ShellProps {
  children: React.ReactNode;
  displayName: string;
  email?: string;
  initials: string;
  avatarUrl?: string | null;
  location: string;
  navItems: NavItem[];
  onNavigate?: () => void;
  themeLabel: string;
  onToggleTheme: () => void;
  notificationsNode: React.ReactNode;
  aiAssistantNode?: React.ReactNode;
}
export function Shell({
  children,
  displayName,
  email,
  initials,
  avatarUrl,
  location,
  navItems,
  onNavigate,
  themeLabel,
  onToggleTheme,
  notificationsNode,
  aiAssistantNode
}: ShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
      userMenuRef.current &&
      !userMenuRef.current.contains(event.target as Node))
      {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setUserMenuOpen(false);
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);
  const handleMobileNavClick = () => {
    setMobileMenuOpen(false);
    onNavigate?.();
  };
  const isDarkMode = themeLabel.toLowerCase().includes('dark');
  return (
    <div className="flex h-[100dvh] w-full overflow-hidden bg-background">
      {/* ─── Desktop Sidebar ─── */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-sidebar-background border-r border-sidebar-border bg-texture">
        <div className="flex h-16 items-center gap-3 px-6 border-b border-sidebar-border">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 glow-gold-sm">
            <span className="font-heading text-lg font-bold text-primary">
              V
            </span>
          </div>
          <span className="font-heading text-xl font-semibold tracking-wide text-sidebar-foreground">
            Valor
          </span>
        </div>

        <SidebarNav
          items={navItems}
          location={location}
          onItemClick={onNavigate} />


        <div className="mt-auto border-t border-sidebar-border p-4">
          <button
            onClick={onToggleTheme}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-muted-foreground transition-all duration-200 hover:bg-sidebar-muted hover:text-sidebar-foreground"
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}>

            {isDarkMode ?
            <SunIcon className="h-5 w-5" /> :

            <MoonIcon className="h-5 w-5" />
            }
            <span>{themeLabel}</span>
          </button>
        </div>
      </aside>

      {/* ─── Mobile Sheet ─── */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="bg-texture">
          <SheetHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 glow-gold-sm">
                <span className="font-heading text-lg font-bold text-primary">
                  V
                </span>
              </div>
              <SheetTitle>Valor</SheetTitle>
            </div>
            <SheetClose />
          </SheetHeader>

          <SidebarNav
            items={navItems}
            location={location}
            onItemClick={handleMobileNavClick} />


          {/* User info in mobile drawer */}
          <div className="border-t border-sidebar-border px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 overflow-hidden rounded-full bg-muted ring-2 ring-border flex-shrink-0">
                {avatarUrl ?
                <img
                  src={avatarUrl}
                  alt={displayName}
                  className="h-full w-full object-cover" /> :


                <div className="flex h-full w-full items-center justify-center bg-primary/10 text-xs font-medium text-primary">
                    {initials}
                  </div>
                }
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {displayName}
                </p>
                {email &&
                <p className="text-xs text-sidebar-muted-foreground truncate">
                    {email}
                  </p>
                }
              </div>
            </div>
          </div>

          <div className="border-t border-sidebar-border p-4">
            <button
              onClick={onToggleTheme}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-3 min-h-[44px] text-sm font-medium text-sidebar-muted-foreground transition-all duration-200 hover:bg-sidebar-muted hover:text-sidebar-foreground active:bg-sidebar-muted"
              aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}>

              {isDarkMode ?
              <SunIcon className="h-5 w-5" /> :

              <MoonIcon className="h-5 w-5" />
              }
              <span>{themeLabel}</span>
            </button>
          </div>
        </SheetContent>
      </Sheet>

      {/* ─── Main Area ─── */}
      <div className="flex flex-1 flex-col lg:pl-64 min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-40 flex h-14 lg:h-16 items-center gap-3 border-b border-border bg-background/80 backdrop-blur-md px-3 sm:px-4 lg:px-6">
          {/* Mobile: hamburger + brand */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden flex-shrink-0"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu">

            <MenuIcon className="h-5 w-5" />
          </Button>

          {/* Mobile brand — visible below lg */}
          <span className="font-heading text-base font-semibold tracking-wide text-foreground lg:hidden truncate">
            Valor
          </span>

          <div className="flex-1" />

          {/* Right actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {aiAssistantNode}
            {notificationsNode}

            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-1.5 rounded-lg p-1 sm:p-1.5 transition-colors duration-200 hover:bg-accent active:bg-accent"
                aria-expanded={userMenuOpen}
                aria-haspopup="true"
                aria-label="User menu">

                <div className="relative h-8 w-8 overflow-hidden rounded-full bg-muted ring-2 ring-border flex-shrink-0">
                  {avatarUrl ?
                  <img
                    src={avatarUrl}
                    alt={displayName}
                    className="h-full w-full object-cover" /> :


                  <div className="flex h-full w-full items-center justify-center bg-primary/10 text-sm font-medium text-primary">
                      {initials}
                    </div>
                  }
                </div>
                {/* Hide chevron on small screens to save space */}
                <ChevronDownIcon
                  className={cn(
                    'h-4 w-4 text-muted-foreground transition-transform duration-200 hidden sm:block',
                    userMenuOpen && 'rotate-180'
                  )}
                  aria-hidden="true" />

              </button>

              {/* Dropdown — constrained to viewport on mobile */}
              {userMenuOpen &&
              <div
                className="absolute right-0 top-full mt-2 w-56 max-w-[calc(100vw-2rem)] origin-top-right rounded-lg border border-border bg-card shadow-lg ring-1 ring-black/5 animate-fade-in"
                role="menu"
                aria-orientation="vertical">

                  <div className="border-b border-border px-4 py-3">
                    <p className="text-sm font-medium text-foreground truncate">
                      {displayName}
                    </p>
                    {email &&
                  <p className="text-xs text-muted-foreground truncate">
                        {email}
                      </p>
                  }
                  </div>
                  <div className="py-1">
                    <Link
                    href="/profile"
                    className="flex items-center gap-2 px-4 py-2.5 min-h-[44px] text-sm text-foreground hover:bg-accent active:bg-accent transition-colors"
                    role="menuitem"
                    onClick={() => setUserMenuOpen(false)}>

                      <UserIcon className="h-4 w-4" aria-hidden="true" />
                      Profile
                    </Link>
                    <Link
                    href="/settings"
                    className="flex items-center gap-2 px-4 py-2.5 min-h-[44px] text-sm text-foreground hover:bg-accent active:bg-accent transition-colors"
                    role="menuitem"
                    onClick={() => setUserMenuOpen(false)}>

                      <SettingsIcon className="h-4 w-4" aria-hidden="true" />
                      Settings
                    </Link>
                  </div>
                  <div className="border-t border-border py-1">
                    <button
                    className="flex w-full items-center gap-2 px-4 py-2.5 min-h-[44px] text-sm text-destructive hover:bg-accent active:bg-accent transition-colors"
                    role="menuitem">

                      <LogOutIcon className="h-4 w-4" aria-hidden="true" />
                      Sign out
                    </button>
                  </div>
                </div>
              }
            </div>
          </div>
        </header>

        {/* Main Content — safe-area aware padding */}
        <main className="flex-1 overflow-y-auto overscroll-contain">
          <div className="mx-auto max-w-7xl px-3 py-4 sm:px-4 sm:py-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>);

}