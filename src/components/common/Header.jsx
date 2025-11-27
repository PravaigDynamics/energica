import React from 'react';
import { Menu, Bell, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import authService from '../../services/auth.service';

// EnergicaLogo SVG Component
const EnergicaLogo = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M50 10 L70 40 L55 40 L65 70 L35 45 L50 45 L40 10 Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

const Header = () => {
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    await authService.logout();
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-zinc-900 border-b border-zinc-800 z-40">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center gap-3">
          <button className="md:hidden text-zinc-400 hover:text-lime-500">
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <EnergicaLogo className="w-8 h-8 text-lime-500" />
            <span className="text-lime-500 font-bold text-xl">ENERGICA</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-zinc-400 hover:text-lime-500 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-lime-500 rounded-full"></span>
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-lime-500 rounded-full flex items-center justify-center text-black font-semibold">
              {currentUser?.displayName?.[0]?.toUpperCase() || 'U'}
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-zinc-400 hover:text-lime-500 hidden md:block"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
