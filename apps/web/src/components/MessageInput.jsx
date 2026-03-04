import React, { useState } from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const MessageInput = ({ selectedUser }) => {
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    toast({
      title: "Message Sent",
      description: "🚧 Messaging functionality isn't fully implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
    setMessage('');
  };

  const handleNotImplemented = (feature) => {
    toast({
      title: "Feature Coming Soon",
      description: `🚧 ${feature} isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀`,
    });
  };

  return (
    <div className="p-4 bg-white border-t border-gray-200">
      <form onSubmit={handleSend} className="flex items-end space-x-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          disabled={!selectedUser}
          className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 flex-shrink-0"
          onClick={() => handleNotImplemented('Attachments')}
        >
          <Paperclip className="h-5 w-5" />
        </Button>
        
        <div className="flex-1 relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={!selectedUser}
            placeholder={selectedUser ? "Type a message..." : "Select a chat to start messaging"}
            className="w-full bg-gray-100 border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-2xl py-3 pl-4 pr-12 text-gray-900 placeholder-gray-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={!selectedUser}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600"
            onClick={() => handleNotImplemented('Emojis')}
          >
            <Smile className="h-5 w-5" />
          </Button>
        </div>

        <Button
          type="submit"
          disabled={!selectedUser || !message.trim()}
          className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white rounded-full h-12 w-12 flex items-center justify-center shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
        >
          <Send className="h-5 w-5 ml-1" />
        </Button>
      </form>
    </div>
  );
};

export default MessageInput;