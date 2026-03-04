import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext.jsx';
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar';

const ProfileDropdown = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setIsOpen(false);
    logout();
    navigate('/');
  };

  const handleNavigate = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  const getInitials = (name, email) => {
    if (name) return name.charAt(0).toUpperCase();
    if (email) return email.charAt(0).toUpperCase();
    return 'U';
  };

  // 🔥 Django backend avatar URL example
  const avatarUrl = currentUser?.avatar
    ? `http://127.0.0.1:8000${currentUser.avatar}`
    : null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center focus:outline-none rounded-full ring-2 ring-transparent hover:ring-purple-200 transition-all"
      >
        <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
          <AvatarImage
            src={avatarUrl || undefined}
            alt={currentUser?.username || 'User'}
          />
          <AvatarFallback className="bg-purple-600 text-white font-bold">
            {getInitials(currentUser?.username, currentUser?.email)}
          </AvatarFallback>
        </Avatar>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
          
          {/* User Info */}
          <div className="px-4 py-2 border-b">
            <p className="text-sm font-semibold">
              {currentUser?.username || 'User'}
            </p>
          </div>

          {/* Edit Profile */}
          <button
            onClick={() => handleNavigate('/edit-profile')}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Edit Profile
          </button>

          {/* Settings */}
          <button
            onClick={() => handleNavigate('/settings')}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Settings
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
          >
            Logout
          </button>

        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;