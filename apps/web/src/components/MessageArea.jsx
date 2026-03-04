import React from 'react';
import { MessageCircle } from 'lucide-react';

const MessageArea = ({ selectedUser }) => {
  if (!selectedUser) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-50/50 p-6">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-teal-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <MessageCircle className="w-12 h-12 text-blue-500 opacity-80" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Welcome to ChatApp</h3>
        <p className="text-gray-500 text-center max-w-md">
          Select a chat from the sidebar to start messaging, or search for new users to connect with.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[#f0f2f5] p-4 overflow-y-auto flex flex-col">
      {/* Placeholder for actual messages */}
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 font-medium">
            This is the beginning of your chat history with {selectedUser.name || selectedUser.email.split('@')[0]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageArea;