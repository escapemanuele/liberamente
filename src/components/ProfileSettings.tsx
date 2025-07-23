import React from 'react';
import { ArrowLeft, LogOut, User, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ProfileSettings: React.FC = () => {
  const router = useRouter();

  // Mocked user data – replace with real user context/auth hook
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatarUrl: '' // If you have an avatar URL, pop it here
  };

  const handleLogout = () => {
    // TODO: plug into auth logout logic
    console.log('User logged out');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-orange-50 relative overflow-hidden">
      {/* Decorative dots – keep the playful landing-page vibe */}
      <div className="absolute top-20 left-20 w-16 h-16 bg-yellow-300 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute bottom-32 right-24 w-12 h-12 bg-green-300 opacity-40 transform rotate-45"></div>
      <div className="absolute top-1/3 right-20 w-8 h-8 bg-orange-300 rounded-full opacity-50"></div>

      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Back */}
        <button
          onClick={() => router.back()}
          className="mb-8 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-3 shadow-lg hover:shadow-xl border border-gray-200"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 relative">
          <div className="absolute -top-3 -right-3 w-8 h-8 bg-purple-300 rounded-full opacity-80"></div>
          <div className="flex flex-col items-center text-center space-y-6">
            {/* Avatar */}
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt="Avatar"
                className="w-24 h-24 rounded-full object-cover border-4 border-orange-500"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-orange-500 flex items-center justify-center text-white text-4xl font-bold">
                {user.name.charAt(0)}
              </div>
            )}

            {/* Name & Email */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1 flex items-center justify-center space-x-2">
                <User className="w-6 h-6 text-orange-500" />
                <span>{user.name}</span>
              </h1>
              <p className="text-gray-600 flex items-center justify-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </p>
            </div>

            {/* Actions */}
            <button
              onClick={handleLogout}
              className="mt-6 bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl font-bold transition-all duration-200 flex items-center space-x-2 shadow-lg"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings; 