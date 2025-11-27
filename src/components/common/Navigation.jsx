import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Gauge,
  Wrench,
  ShoppingBag,
  Users,
  Newspaper,
  Activity,
  Settings
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Navigation = () => {
  const { isAdmin } = useAuth();

  const navItems = [
    { to: '/', icon: Gauge, label: 'Dashboard' },
    { to: '/garage', icon: Activity, label: 'Garage' },
    { to: '/shop', icon: ShoppingBag, label: 'Shop' },
    { to: '/service', icon: Wrench, label: 'Service' },
    { to: '/profile', icon: Settings, label: 'Profile' },
  ];

  if (isAdmin) {
    navItems.push({ to: '/admin', icon: Users, label: 'Admin Panel' });
  }

  return (
    <nav className="hidden md:block fixed left-0 top-16 bottom-0 w-64 bg-zinc-900 border-r border-zinc-800 overflow-y-auto">
      <div className="p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-lime-500 text-black'
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-lime-500'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
