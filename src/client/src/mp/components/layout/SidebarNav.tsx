import React, { Component } from 'react';
// Lightweight Link stand-in (swap for `import { Link } from "wouter"` in your real project)
function Link({
  href,
  onClick,
  className,
  children,
  ...rest


}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {href: string;}) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick?.(e);
  };
  return (
    <a href={href} onClick={handleClick} className={className} {...rest}>
      {children}
    </a>);

}
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
export interface NavItem {
  href: string;
  label: string;
  icon: ComponentType<{
    className?: string;
  }>;
}
export interface NavGroup {
  label: string;
  items: NavItem[];
}
export interface SidebarNavProps {
  items: NavItem[];
  location: string;
  onItemClick?: () => void;
}
function isActive(href: string, location: string): boolean {
  if (href === '/') return location === '/';
  return location === href || location.startsWith(href + '/');
}
function groupItems(items: NavItem[]): NavGroup[] {
  const coreHrefs = new Set(['/', '/profile']);
  const gameHrefs = new Set(['/worlds', '/guilds', '/wiki', '/simulators']);
  const core: NavItem[] = [];
  const game: NavItem[] = [];
  const support: NavItem[] = [];
  for (const item of items) {
    if (coreHrefs.has(item.href)) core.push(item);else
    if (gameHrefs.has(item.href)) game.push(item);else
    support.push(item);
  }
  const groups: NavGroup[] = [];
  if (core.length > 0)
  groups.push({
    label: 'Core',
    items: core
  });
  if (game.length > 0)
  groups.push({
    label: 'Game',
    items: game
  });
  if (support.length > 0)
  groups.push({
    label: 'Support',
    items: support
  });
  return groups;
}
function NavItemLink({
  item,
  active,
  onItemClick




}: {item: NavItem;active: boolean;onItemClick?: () => void;}) {
  const Icon = item.icon;
  return (
    <li>
      <Link
        href={item.href}
        onClick={onItemClick}
        className={cn(
          // min-h-[44px] ensures 44px touch target on mobile (WCAG 2.5.8)
          'relative group flex items-center gap-3 rounded-lg px-3 py-3 min-h-[44px] text-sm font-medium transition-all duration-200',
          active ?
          'bg-sidebar-accent/15 text-sidebar-accent shadow-sm' :
          'text-sidebar-muted-foreground hover:bg-sidebar-muted hover:text-sidebar-foreground active:bg-sidebar-muted'
        )}
        aria-current={active ? 'page' : undefined}>

        <span
          className={cn(
            'absolute left-0 h-8 w-1 rounded-r-full transition-all duration-200',
            active ?
            'bg-sidebar-accent' :
            'bg-transparent group-hover:bg-sidebar-muted-foreground/30'
          )}
          aria-hidden="true" />

        <Icon
          className={cn(
            'h-5 w-5 flex-shrink-0 transition-colors duration-200',
            active ?
            'text-sidebar-accent' :
            'text-sidebar-muted-foreground group-hover:text-sidebar-foreground'
          )}
          aria-hidden="true" />

        <span className="truncate">{item.label}</span>
        {active &&
        <span
          className="absolute inset-0 rounded-lg bg-sidebar-accent/5 pointer-events-none"
          aria-hidden="true" />

        }
      </Link>
    </li>);

}
export function SidebarNav({ items, location, onItemClick }: SidebarNavProps) {
  const groups = groupItems(items);
  return (
    <nav
      className="flex-1 overflow-y-auto py-3 px-3"
      aria-label="Main navigation">

      <div className="space-y-5">
        {groups.map((group, groupIndex) =>
        <div key={group.label}>
            <div className="mb-2 px-3">
              <span className="font-heading text-[10px] font-semibold uppercase tracking-[0.15em] text-sidebar-muted-foreground/60">
                {group.label}
              </span>
            </div>
            <ul className="space-y-0.5" role="list">
              {group.items.map((item) =>
            <NavItemLink
              key={item.href}
              item={item}
              active={isActive(item.href, location)}
              onItemClick={onItemClick} />

            )}
            </ul>
            {groupIndex < groups.length - 1 &&
          <div
            className="mt-3 mx-3 border-t border-sidebar-border/50"
            aria-hidden="true" />

          }
          </div>
        )}
      </div>
    </nav>);

}