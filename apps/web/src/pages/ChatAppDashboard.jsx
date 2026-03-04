import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import pb from '@/lib/pocketbaseClient';
import {
  MessageCircle,
  Users,
  Settings,
  LogOut,
  Search,
  Plus,
  MoreVertical,
} from 'lucide-react';

const ChatAppDashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarUrl = () => {
    if (currentUser?.avatar) {
      return pb.files.getUrl(currentUser, currentUser.avatar);
    }
    return null;
  };

  return (
    <>
      <Helmet>
        <title>{`Dashboard - ${currentUser?.username || 'User'} | ChatApp`}</title>
        <meta
          name="description"
          content="Access your ChatApp dashboard to manage conversations, connect with friends, and stay updated."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                  ChatApp
                </h1>
              </div>

              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 hover:text-blue-600"
                >
                  <Settings className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-red-600 font-medium"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl shadow-2xl p-8 mb-8 text-white">
            <div className="flex items-center space-x-6">
              <Avatar className="w-20 h-20 border-4 border-white shadow-xl">
                <AvatarImage src={getAvatarUrl()} alt={currentUser?.username} />
                <AvatarFallback className="bg-white text-blue-600 text-2xl font-bold">
                  {getInitials(currentUser?.username)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-3xl font-bold mb-2">
                  Welcome back, {currentUser?.username || 'User'}!
                </h2>
                <p className="text-blue-100 text-lg">
                  {currentUser?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button className="w-full justify-start bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white shadow-lg">
                    <Plus className="w-5 h-5 mr-2" />
                    New Conversation
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-gray-300 hover:border-blue-500 hover:text-blue-600"
                  >
                    <Users className="w-5 h-5 mr-2" />
                    Create Group
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-gray-300 hover:border-blue-500 hover:text-blue-600"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Find Friends
                  </Button>
                </div>
              </div>

              {/* User Stats */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Your Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Messages Sent</span>
                    <span className="text-2xl font-bold text-blue-600">0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Active Chats</span>
                    <span className="text-2xl font-bold text-teal-600">0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Groups</span>
                    <span className="text-2xl font-bold text-purple-600">0</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Recent Conversations */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Recent Conversations</h3>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                  </Button>
                </div>

                {/* Empty State */}
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MessageCircle className="w-12 h-12 text-blue-600" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    No conversations yet
                  </h4>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Start your first conversation by clicking the "New Conversation" button or finding friends to chat with.
                  </p>
                  <Button className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white shadow-lg">
                    <Plus className="w-5 h-5 mr-2" />
                    Start Chatting
                  </Button>
                </div>
              </div>

              {/* Coming Soon Features */}
              <div className="mt-8 grid sm:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200 p-6">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Direct Messages</h4>
                  <p className="text-gray-600 text-sm">
                    Send instant messages to your friends and colleagues
                  </p>
                </div>

                <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl border border-teal-200 p-6">
                  <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Group Chats</h4>
                  <p className="text-gray-600 text-sm">
                    Create groups and chat with multiple people at once
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatAppDashboard;