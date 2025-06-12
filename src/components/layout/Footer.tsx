import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  console.log('Footer loaded');

  const footerLinks = [
    { name: 'Terms of Service', path: '/terms-of-service' }, // Placeholder path
    { name: 'Privacy Policy', path: '/privacy-policy' },   // Placeholder path
    { name: 'Contact Us', path: '/contact-us' },         // Placeholder path
    { name: 'Security Centre', path: '/security-centre' }, // Placeholder path
    { name: 'Regulatory Information', path: '/regulatory-information' }, // Placeholder path
  ];

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4" aria-label="Footer">
          {footerLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path} // Using placeholder paths as these are not defined in App.tsx
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-tsb-blue dark:hover:text-tsb-light-blue transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} TSB Bank plc. All rights reserved.
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          TSB Bank plc is authorised by the Prudential Regulation Authority and regulated by the Financial Conduct Authority and the Prudential Regulation Authority under registration number 123456.
        </p>
      </div>
    </footer>
  );
};

export default Footer;