import { useState } from 'react';
import { Brain, User, LogOut, ChevronDown, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const isLoggedIn = !!user;

  const handleLogout = async () => {
    await signOut();
    navigate('/');
    setShowProfileMenu(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-orange-500 p-2 rounded-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">BrainDump</span>
          </Link>
          
          {/* Navigation */}
          {!isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <Link 
                to="/login" 
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200 flex items-center space-x-1"
              >
                <User className="w-4 h-4" />
                <span>Log In</span>
              </Link>
              <Link 
                to="/signup" 
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
              >
                Start Dumping
              </Link>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-3 bg-orange-100 hover:bg-orange-200 px-4 py-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                  {(profile?.full_name || user?.email || 'U').charAt(0).toUpperCase()}
                </div>
                <span className="font-medium text-gray-800 hidden sm:block">{profile?.full_name || user?.email}</span>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-10">
                  {/* User details */}
                  <div className="px-4 py-4 flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                      {(profile?.full_name || user?.email || 'U').charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{profile?.full_name || user?.email}</p>
                      <p className="text-sm text-gray-600 flex items-center space-x-1">
                        <Mail className="w-3 h-3" />
                        <span>{user?.email}</span>
                      </p>
                    </div>
                  </div>
                  <hr className="my-1 border-gray-100" />
                  <button
                    onClick={() => { navigate('/profile'); setShowProfileMenu(false); }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center space-x-3 transition-colors duration-200"
                  >
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">Profile Settings</span>
                  </button>
                  <hr className="my-1 border-gray-100" />
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 hover:bg-red-50 flex items-center space-x-3 transition-colors duration-200 text-red-600"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;