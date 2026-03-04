import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext.jsx";
import { useToast } from "@/hooks/use-toast";
import {
  MessageCircle,
  Search,
  Users,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserListItem from "@/components/UserListItem.jsx";
import ChatHeader from "@/components/ChatHeader.jsx";
import MessageArea from "@/components/MessageArea.jsx";
import MessageInput from "@/components/MessageInput.jsx";

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // ✅ Get token from localStorage
  const token = localStorage.getItem("access");

  // ================= FETCH USERS =================
  useEffect(() => {
    const fetchUsers = async () => {
      if (!currentUser || !token) return;

      try {
        setLoadingUsers(true);

        const response = await fetch(
          "http://127.0.0.1:8000/profile/api/user/",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // ✅ correct
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();

        // If API returns single object, convert to array
        const userList = Array.isArray(data) ? data : [data];

        const filtered = userList.filter(
          (user) => user.id !== currentUser.id
        );

        setUsers(filtered);
      } catch (error) {
        console.error("User fetch error:", error);
        toast({
          title: "Error",
          description: "Failed to load users.",
          variant: "destructive",
        });
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, [currentUser, token, toast]);

  // ================= LOGOUT =================
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // ================= SEARCH FILTER =================
  const filteredUsers = users.filter((user) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      (user.username && user.username.toLowerCase().includes(searchLower)) ||
      (user.email && user.email.toLowerCase().includes(searchLower))
    );
  });

  // ================= GET INITIALS =================
  const getInitials = (username, email) => {
  if (username) return username.substring(0, 2).toUpperCase();
    if (email) return email.substring(0, 2).toUpperCase();
    return "U";
  };

  const currentUserAvatar = currentUser?.avatar || null;

  return (
    <>
      <Helmet>
        <title>Dashboard - ChatApp</title>
      </Helmet>

      <div className="h-screen flex flex-col bg-white font-sans">

        {/* ================= HEADER ================= */}
        <header className="w-full bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">

          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center shadow">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-700 to-teal-700 bg-clip-text text-transparent">
              ChatApp
            </span>
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center space-x-2 hover:bg-gray-100 px-2 py-1 rounded-full"
            >
              <Avatar className="h-9 w-9 border border-gray-300">
                <AvatarImage src={currentUserAvatar} />
                <AvatarFallback className="bg-blue-100 text-blue-700 text-xs font-bold">
                  {getInitials(currentUser?.name, currentUser?.email)}
                </AvatarFallback>
              </Avatar>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {isProfileMenuOpen && (
              <>
                <div
                  className="fixed inset-0"
                  onClick={() => setIsProfileMenuOpen(false)}
                ></div>

                <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-medium truncate">
                      {currentUser?.username || "User"}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {currentUser?.email}
                    </p>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </header>

        {/* ================= MAIN ================= */}
        <div className="flex flex-1 overflow-hidden">

          {/* Sidebar */}
          <div className="w-[320px] border-r border-gray-200 flex flex-col bg-white">

            {/* Search */}
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-gray-100 rounded-xl text-sm"
                />
              </div>

              <Button
                variant="outline"
                className="w-full mt-3 border-dashed border-2 rounded-xl"
              >
                <Users className="w-4 h-4 mr-2" />
                Create Group Chat
              </Button>
            </div>

            {/* Users List */}
            <div className="flex-1 overflow-y-auto">
              {loadingUsers ? (
                <div className="flex justify-center items-center h-32">
                  <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                filteredUsers.map((user) => (
                  <UserListItem
                    key={user.id}
                    user={user}
                    isSelected={selectedUser?.id === user.id}
                    onClick={(u) => setSelectedUser(u)}
                  />
                ))
              )}
            </div>
          </div>

          {/* Chat Section */}
          <div className="flex-1 flex flex-col">
            <ChatHeader
              selectedUser={selectedUser}
              onBack={() => setSelectedUser(null)}
            />
            <MessageArea selectedUser={selectedUser} />
            <MessageInput selectedUser={selectedUser} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;