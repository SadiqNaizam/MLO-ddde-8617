import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  ArrowRightLeft,
  CreditCard,
  History,
  MessageSquareText,
  Settings2,
  ChevronsLeft,
  ChevronsRight,
  Banknote // Placeholder for TSB Logo
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  disabled?: boolean;
  exact?: boolean;
}

const Sidebar: React.FC = () => {
  console.log('Sidebar loaded');
  const [isCollapsed, setIsCollapsed] = useState(false); // Default to expanded

  const navItems: NavItemProps[] = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard', exact: true },
    { to: '/move-money', icon: ArrowRightLeft, label: 'Move Money' },
    { to: '/card-controls', icon: CreditCard, label: 'Card Controls' },
    { to: '/recent-activity', icon: History, label: 'Recent Activity' },
    { to: '#', icon: MessageSquareText, label: 'Messages', disabled: true },
    { to: '#', icon: Settings2, label: 'Settings', disabled: true },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={cn(
        'flex h-screen flex-col justify-between bg-slate-900 text-slate-50 shadow-lg transition-all duration-300 ease-in-out',
        isCollapsed ? 'w-20' : 'w-64'
      )}
    >
      <div>
        {/* Logo/Branding Area */}
        <div
          className={cn(
            'flex items-center border-b border-slate-700 h-16',
            isCollapsed ? 'justify-center' : 'px-4'
          )}
        >
          <Link
            to="/"
            className="flex items-center text-xl font-bold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500 rounded-md"
            aria-label="TSB Bank Home"
          >
            <Banknote className={cn('h-8 w-8 text-sky-400', !isCollapsed && 'mr-2')} />
            {!isCollapsed && <span>TSB Bank</span>}
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="mt-4 flex-grow px-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const linkBaseClasses =
              'flex items-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-slate-900 focus:ring-sky-500';
            
            const linkSizeClasses = isCollapsed
              ? 'h-12 w-full justify-center' // w-full makes it take parent's padding, justify-center for icon
              : 'p-3';

            if (item.disabled) {
              return (
                <a
                  key={item.label}
                  href={item.to} // Keep href for semantics, but prevent navigation
                  onClick={(e) => e.preventDefault()}
                  className={cn(
                    linkBaseClasses,
                    linkSizeClasses,
                    'text-slate-500 cursor-not-allowed hover:bg-transparent'
                  )}
                  aria-disabled="true"
                  title={item.label + (isCollapsed ? ' (disabled)' : '')}
                >
                  <Icon className={cn('h-5 w-5', !isCollapsed && 'mr-3')} />
                  {!isCollapsed && <span>{item.label}</span>}
                </a>
              );
            }

            return (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.exact}
                className={({ isActive }) =>
                  cn(
                    linkBaseClasses,
                    linkSizeClasses,
                    isActive
                      ? 'bg-sky-600 text-white'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700'
                  )
                }
                title={isCollapsed ? item.label : undefined} // Tooltip for collapsed items
              >
                <Icon className={cn('h-5 w-5', !isCollapsed && 'mr-3')} />
                {!isCollapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Collapse/Expand Toggle Button */}
      <div className="border-t border-slate-700 p-2">
        <Button
          variant="ghost"
          size={isCollapsed ? 'icon' : 'default'}
          className="w-full justify-center text-slate-300 hover:bg-slate-700 hover:text-white focus:ring-offset-slate-900"
          onClick={toggleSidebar}
          aria-expanded={!isCollapsed}
          aria-controls="sidebar-nav" // Assuming nav has id="sidebar-nav" if needed
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronsRight className="h-5 w-5" />
          ) : (
            <>
              <ChevronsLeft className="mr-2 h-5 w-5" />
              <span>Collapse</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;