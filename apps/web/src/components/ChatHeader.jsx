import React from "react";

const ChatHeader = ({ selectedUser, onlineCount, onBack }) => {

  if (!selectedUser) {
    return (
      <div className="h-16 flex items-center justify-center border-b text-gray-500">
        Select a chat to start messaging
      </div>
    );
  }

  return (
    <div className="h-16 border-b flex items-center px-4 gap-3">

      <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
        {selectedUser.username.charAt(0).toUpperCase()}
      </div>

      <div>

        <div className="font-medium text-sm">
          {selectedUser.username}
        </div>

        <div className="text-xs text-green-600">
          {onlineCount} online
        </div>

      </div>

    </div>
  );
};

export default ChatHeader;