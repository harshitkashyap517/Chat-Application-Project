import React from 'react';
import { ArrowLeft, MoreVertical, Phone, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

const ChatHeader = ({ selectedUser, onBack }) => {
  const { toast } = useToast();

  if (!selectedUser) return null;

  const getInitials = (name, email) => {
    if (name) return name.substring(0, 2).toUpperCase();
    return email.substring(0, 2).toUpperCase();
  };

  // 🔥 Django backend avatar URL
  // Make sure your API sends full URL like:
  // http://127.0.0.1:8000/media/profile.jpg
  const avatarUrl = selectedUser.avatar || null;

  const handleNotImplemented = (feature) => {
    toast({
      title: "Feature Coming Soon",
      description: `🚧 ${feature} isn't implemented yet.`,
    });
  };

  return (
    <div className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-4 shadow-sm z-10">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden mr-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50"
          onClick={onBack}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <div className="flex items-center">
          <Avatar className="h-10 w-10 border border-gray-200">
            <AvatarImage
              src={avatarUrl}
              alt={selectedUser.name || selectedUser.email}
            />
            <AvatarFallback className="bg-gradient-to-br from-blue-100 to-teal-100 text-blue-700 font-medium">
              {getInitials(selectedUser.name, selectedUser.email)}
            </AvatarFallback>
          </Avatar>

          <div className="ml-3">
            <h2 className="text-sm font-semibold text-gray-900">
              {selectedUser.name || selectedUser.email?.split('@')[0]}
            </h2>
            <p className="text-xs text-green-600 font-medium flex items-center">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
              Online
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-1">
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-500 hover:text-blue-600 hover:bg-blue-50"
          onClick={() => handleNotImplemented('Voice Call')}
        >
          <Phone className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="text-gray-500 hover:text-blue-600 hover:bg-blue-50"
          onClick={() => handleNotImplemented('Video Call')}
        >
          <Video className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="text-gray-500 hover:text-blue-600 hover:bg-blue-50"
          onClick={() => handleNotImplemented('More Options')}
        >
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;