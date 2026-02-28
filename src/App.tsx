import React, { useEffect, useState } from 'react';
import {
  HomeIcon,
  UserIcon,
  GlobeIcon,
  UsersIcon,
  BookOpenIcon,
  CpuIcon,
  BarChart3Icon,
  HelpCircleIcon,
  SettingsIcon,
  BellIcon,
  SparklesIcon,
  ShieldIcon,
  SwordIcon,
  ScrollIcon,
  MapIcon } from
'lucide-react';
import { Shell } from './client/src/mp/components/layout/Shell';
import { Button } from './client/src/components/ui/Button';
const navItems = [
{
  href: '/',
  label: 'Home',
  icon: HomeIcon
},
{
  href: '/profile',
  label: 'Profile',
  icon: UserIcon
},
{
  href: '/worlds',
  label: 'Worlds',
  icon: GlobeIcon
},
{
  href: '/guilds',
  label: 'Guilds',
  icon: UsersIcon
},
{
  href: '/wiki',
  label: 'Wiki',
  icon: BookOpenIcon
},
{
  href: '/simulators',
  label: 'Simulators',
  icon: CpuIcon
},
{
  href: '/reports',
  label: 'Reports',
  icon: BarChart3Icon
},
{
  href: '/support',
  label: 'Support',
  icon: HelpCircleIcon
},
{
  href: '/settings',
  label: 'Settings',
  icon: SettingsIcon
}];

export function App() {
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);
  const toggleTheme = () => setIsDark((prev) => !prev);
  const notificationsNode =
  <Button
    variant="ghost"
    size="icon"
    aria-label="Notifications"
    className="relative">

      <BellIcon className="h-5 w-5" />
      <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary animate-pulse" />
    </Button>;

  const aiAssistantNode =
  <Button
    variant="ghost"
    size="icon"
    aria-label="AI Assistant"
    className="hidden sm:inline-flex">

      <SparklesIcon className="h-5 w-5" />
    </Button>;

  return (
    <Shell
      displayName="Aldric Stormforge"
      email="aldric@valorkeep.com"
      initials="AS"
      avatarUrl={null}
      location="/"
      navItems={navItems}
      onNavigate={() => {}}
      themeLabel={isDark ? 'Dark Mode' : 'Light Mode'}
      onToggleTheme={toggleTheme}
      notificationsNode={notificationsNode}
      aiAssistantNode={aiAssistantNode}>

      <div className="space-y-5 sm:space-y-8">
        {/* Welcome Hero */}
        <div className="relative overflow-hidden rounded-xl border border-border bg-card p-4 sm:p-6 lg:p-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none" />
          <div className="relative">
            <h1 className="font-heading text-xl sm:text-2xl lg:text-4xl font-bold text-foreground tracking-wide">
              Welcome back, <span className="text-primary">Aldric</span>
            </h1>
            <p className="mt-2 sm:mt-3 text-muted-foreground max-w-2xl text-sm sm:text-base leading-relaxed">
              Your realm awaits. Review your latest quests, manage your guilds,
              and explore new worlds.
            </p>
            <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-3">
              <Button className="text-sm">
                <SwordIcon className="h-4 w-4 mr-2" />
                Start Quest
              </Button>
              <Button variant="outline" className="text-sm">
                <ScrollIcon className="h-4 w-4 mr-2" />
                View Journal
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Grid — 2-col on mobile for compact view */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
          {
            label: 'Active Worlds',
            value: '7',
            icon: GlobeIcon,
            change: '+2 this week'
          },
          {
            label: 'Guild Members',
            value: '142',
            icon: UsersIcon,
            change: '+12 this month'
          },
          {
            label: 'Quests Complete',
            value: '89',
            icon: ShieldIcon,
            change: '3 pending'
          },
          {
            label: 'Wiki Entries',
            value: '1,247',
            icon: BookOpenIcon,
            change: '24 new'
          }].
          map((stat) =>
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-card p-3 sm:p-5">

              <div className="flex items-center justify-between gap-1">
                <span className="text-xs sm:text-sm font-medium text-muted-foreground truncate">
                  {stat.label}
                </span>
                <stat.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary/60 flex-shrink-0" />
              </div>
              <p className="mt-1 sm:mt-2 text-lg sm:text-2xl font-heading font-bold text-foreground">
                {stat.value}
              </p>
              <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-muted-foreground">
                {stat.change}
              </p>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="rounded-xl border border-border bg-card">
          <div className="border-b border-border px-4 sm:px-6 py-3 sm:py-4">
            <h2 className="font-heading text-base sm:text-lg font-semibold text-foreground">
              Recent Activity
            </h2>
          </div>
          <div className="divide-y divide-border">
            {[
            {
              title: 'New world "Ashenvale" created',
              time: '2 hours ago',
              icon: MapIcon
            },
            {
              title: 'Guild "Iron Covenant" reached level 5',
              time: '5 hours ago',
              icon: ShieldIcon
            },
            {
              title: 'Wiki entry updated: Dragon Lore',
              time: '1 day ago',
              icon: BookOpenIcon
            },
            {
              title: 'Combat simulation completed',
              time: '2 days ago',
              icon: SwordIcon
            },
            {
              title: 'New member joined "Silver Dawn"',
              time: '3 days ago',
              icon: UsersIcon
            }].
            map((activity, i) =>
            <div
              key={i}
              className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 transition-colors duration-200 active:bg-accent/50 hover:bg-accent/50">

                <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                  <activity.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {activity.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activity.time}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Shell>);

}