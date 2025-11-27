import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Mail, User, Calendar, Shield } from 'lucide-react';

const Profile = () => {
  const { currentUser, userRole } = useAuth();

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-200 mb-2">Profile</h1>
        <p className="text-zinc-400">Manage your account settings</p>
      </div>

      <div className="max-w-2xl">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-lime-500 rounded-full flex items-center justify-center text-black text-3xl font-bold">
              {currentUser?.displayName?.[0]?.toUpperCase() || 'U'}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-zinc-200">{currentUser?.displayName}</h2>
              <p className="text-zinc-400">{currentUser?.email}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-zinc-300">
              <Mail className="w-5 h-5 text-lime-500" />
              <span>{currentUser?.email}</span>
            </div>

            <div className="flex items-center gap-3 text-zinc-300">
              <Shield className="w-5 h-5 text-lime-500" />
              <span className="capitalize">{userRole} Account</span>
            </div>

            <div className="flex items-center gap-3 text-zinc-300">
              <Calendar className="w-5 h-5 text-lime-500" />
              <span>Member since {new Date().getFullYear()}</span>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <h3 className="text-lg font-bold text-zinc-200 mb-4">Account Actions</h3>
          <div className="space-y-3">
            <button className="w-full bg-zinc-800 text-zinc-200 font-semibold py-3 rounded-lg hover:bg-zinc-700 transition-colors">
              Change Password
            </button>
            <button className="w-full bg-zinc-800 text-zinc-200 font-semibold py-3 rounded-lg hover:bg-zinc-700 transition-colors">
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
