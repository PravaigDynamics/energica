import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="text-center p-8">
        <h1 className="text-9xl font-bold text-lime-500 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-zinc-200 mb-4">Page Not Found</h2>
        <p className="text-zinc-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-lime-500 text-black rounded-lg hover:bg-lime-400 transition"
        >
          <Home className="w-5 h-5" />
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
