import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../common/Header';
import Navigation from '../common/Navigation';

const Layout = () => {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <div className="flex">
        <Navigation />
        <main className="flex-1 md:ml-64 pt-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
