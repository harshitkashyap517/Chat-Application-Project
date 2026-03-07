import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const UserListItem = ({ user = {}, isSelected, onClick }) => {

  const getInitials = (username, email) => {
    if (username && typeof username === "string") {
      return username.substring(0, 2).toUpperCase();
    }

    if (email && typeof email === "string") {
      return email.substring(0, 2).toUpperCase();
    }

    return "U";
  };

  // Safe avatar URL
  const avatarUrl =
    user?.avatar ? `http://127.0.0.1:8000${user.avatar}` : null;

  // Safe display name
  const displayName =
    user?.username ||
    (user?.email ? user.email.split("@")[0] : "Unknown User");

  return (
    <div
      onClick={() => onClick(user)}
      className={`flex items-center p-3 cursor-pointer transition-colors duration-200 border-b border-gray-50 last:border-0 ${
        isSelected
          ? 'bg-blue-50 border-l-4 border-l-blue-500'
          : 'hover:bg-gray-50 border-l-4 border-l-transparent'
      }`}
    >
      <div className="relative">
        <Avatar className="h-10 w-10 border border-gray-200">
          <AvatarImage src={avatarUrl} alt={displayName} />
          <AvatarFallback className="bg-gradient-to-br from-blue-100 to-teal-100 text-blue-700 font-medium">
            {getInitials(user?.username, user?.email)}
          </AvatarFallback>
        </Avatar>

        {user?.is_online && (
          <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-white"></span>
        )}
      </div>

      <div className="ml-3 flex-1 overflow-hidden">
        <p className="text-sm font-medium text-gray-900 truncate">
          {displayName}
        </p>
        <p className="text-xs text-gray-500 truncate">
          {user?.email || "No Email"}
        </p>
      </div>
    </div>
  );
};

export default UserListItem;