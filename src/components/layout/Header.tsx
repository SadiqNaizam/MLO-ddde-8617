import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Banknote, UserCircle, Bell, Menu as MenuIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'; // For potential mobile menu
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Dashboard' },
  { href: '/move-money', label: 'Move Money' },
  { href: '/recent-activity', label: 'Activity' },
  { href: '/card-controls', label: 'Card Controls' },
];

const Header: React.FC = () => {
  const location = useLocation();
  console.log('Header component loaded');

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand Name */}
          <Link to="/" className="flex items-center space-x-2 text-tsb-blue hover:text-tsb-blue-dark transition-colors">
            <Banknote className="h-8 w-8" />
            <span className="font-bold text-xl">TSB</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  location.pathname === link.href
                    ? "bg-tsb-blue-light text-tsb-blue-dark"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Icons and Mobile Menu Trigger */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-tsb-blue">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-tsb-blue">
              <UserCircle className="h-6 w-6" />
              <span className="sr-only">User Profile</span>
            </Button>

            {/* Mobile Menu Trigger */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-gray-600 hover:text-tsb-blue">
                    <MenuIcon className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] p-0">
                  <div className="flex flex-col space-y-1 p-4">
                     <Link to="/" className="flex items-center space-x-2 text-tsb-blue p-2 mb-4">
                        <Banknote className="h-7 w-7" />
                        <span className="font-bold text-lg">TSB</span>
                    </Link>
                    {navLinks.map((link) => (
                      <Link
                        key={`mobile-${link.href}`}
                        to={link.href}
                        className={cn(
                          "block px-3 py-2 rounded-md text-base font-medium",
                          location.pathname === link.href
                            ? "bg-tsb-blue-light text-tsb-blue-dark"
                            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;