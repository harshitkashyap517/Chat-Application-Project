import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext.jsx";
import { useToast } from "@/hooks/use-toast";

import { MessageCircle, Search, LogOut, Users, User } from "lucide-react";

import UserListItem from "@/components/UserListItem.jsx";
import ChatHeader from "@/components/ChatHeader.jsx";
import MessageArea from "@/components/MessageArea.jsx";
import MessageInput from "@/components/MessageInput.jsx";

const Dashboard = () => {

  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const socketRef = useRef(null);

  const [users, setUsers] = useState([]);
  const [chatrooms, setChatrooms] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentChatroom, setCurrentChatroom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [onlineCount, setOnlineCount] = useState(0);

  const [showProfileModal, setShowProfileModal] = useState(false);

  const [profileData, setProfileData] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
  });

  const token = localStorage.getItem("access");

  // ================= USERS SEARCH =================

  useEffect(() => {

    const fetchUsers = async () => {

      try {

        const res = await fetch(
          `http://127.0.0.1:8000/search/?q=${searchQuery}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        const filtered = data.filter((u) => u.id !== currentUser.id);
        setUsers(filtered);

      } catch {

        toast({
          title: "Error",
          description: "Failed to load users",
          variant: "destructive",
        });

      }

    };

    if (searchQuery) fetchUsers();

  }, [searchQuery]);

  // ================= FETCH CHATROOMS =================

  useEffect(() => {

    const fetchChatrooms = async () => {

      try {

        const res = await fetch(
          "http://127.0.0.1:8000/chatrooms/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setChatrooms(data);

      } catch (err) {

        console.log("Chatroom fetch error", err);

      }

    };

    fetchChatrooms();

  }, []);

  // ================= START CHAT =================

  const startChat = async (user) => {

    try {

      setSelectedUser(user);
      setMessages([]);

      const res = await fetch(
        `http://127.0.0.1:8000/chat/${user.username}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setCurrentChatroom(data.chatroom_name);

      const msgRes = await fetch(
        `http://127.0.0.1:8000/messages/${data.chatroom_name}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const msgData = await msgRes.json();
      setMessages(msgData.messages || []);

    } catch (error) {

      console.error("Chat load error", error);

    }

  };

  // ================= MOVE CHATROOM TO TOP =================

  const moveChatToTop = (username, chatroomName) => {

    setChatrooms((prev) => {

      const existing = prev.find((c) => c.chatroom_name === chatroomName);

      if (existing) {
        const others = prev.filter((c) => c.chatroom_name !== chatroomName);
        return [existing, ...others];
      }

      return [
        {
          username: username,
          chatroom_name: chatroomName,
        },
        ...prev,
      ];

    });

  };

  // ================= WEBSOCKET =================

  useEffect(() => {

    if (!currentChatroom) return;

    if (socketRef.current) {
      socketRef.current.close();
    }

    const ws = new WebSocket(
      `ws://127.0.0.1:8000/ws/chatroom/${currentChatroom}/?token=${token}`
    );

    socketRef.current = ws;

    ws.onmessage = (event) => {

      const data = JSON.parse(event.data);

      if (data.online_count !== undefined) {
        setOnlineCount(data.online_count);
        return;
      }

      if (!data.body) return;

      const newMessage = {
        body: data.body,
        author: data.author,
        created_at: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, newMessage]);

      moveChatToTop(data.author, currentChatroom);
    };

    return () => ws.close();

  }, [currentChatroom]);

  // ================= SEND MESSAGE =================

  const sendMessage = (message) => {

    if (!socketRef.current || socketRef.current.readyState !== 1) return;

    socketRef.current.send(
      JSON.stringify({
        body: message,
      })
    );

    const newMessage = {
      body: message,
      author: currentUser.username,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);

    moveChatToTop(selectedUser.username, currentChatroom);

  };

  // ================= UPDATE PROFILE =================

  const updateProfile = async () => {

    try {

      const res = await fetch("http://127.0.0.1:8000/updated_users/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error();

      toast({
        title: "Profile Updated",
        description: "Profile updated successfully",
      });

      setProfileData({
        username: data.username,
        email: data.email,
      });

      setShowProfileModal(false);

    } catch {

      toast({
        title: "Error",
        description: "Profile update failed",
        variant: "destructive",
      });

    }

  };

  // ================= LOGOUT =================

  const handleLogout = () => {

    logout();
    navigate("/");

  };

  return (
    <>
      <Helmet>
        <title>Dashboard - ChatApp</title>
      </Helmet>

      <div className="h-screen flex flex-col bg-white">

        {/* HEADER */}

        <header className="flex justify-between border-b px-6 py-4">

          <div className="flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-blue-600" />
            <span className="font-bold text-lg">ChatApp</span>
          </div>

          <div className="flex items-center gap-4">

            <button
              onClick={() => setShowProfileModal(true)}
              className="flex items-center gap-2 text-gray-600"
            >
              <User className="w-4 h-4" />
              Edit Profile
            </button>

            <button
              onClick={handleLogout}
              className="text-red-500 flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>

          </div>

        </header>

        {/* MAIN */}

        <div className="flex flex-1 overflow-hidden">

          {/* SIDEBAR */}

          <div className="w-[320px] border-r flex flex-col">

            <div className="p-4 space-y-3">

              <button
                onClick={() => navigate("/create-group")}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg"
              >
                <Users className="w-4 h-4" />
                Create Group Chat
              </button>

              <div className="relative">

                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />

                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-gray-100 rounded-xl text-sm"
                />

              </div>

            </div>

            <div className="px-4 text-xs text-gray-500 font-semibold mt-2 mb-2">
              DIRECT MESSAGES
            </div>

            <div className="flex-1 overflow-y-auto">

              {!searchQuery && chatrooms.map((room) => (

                <div
                  key={room.chatroom_name}
                  onClick={() =>
                    startChat({
                      username: room.username,
                      id: room.user_id,
                    })
                  }
                  className="flex items-center gap-3 px-4 py-3 cursor-pointer border-b hover:bg-gray-100"
                >

                  <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
                    {room.username?.charAt(0).toUpperCase()}
                  </div>

                  <div className="flex-1">

                    <span className="font-medium text-sm">
                      {room.username}
                    </span>

                    <div className="text-xs text-gray-500">
                      Tap to start chat
                    </div>

                  </div>

                </div>

              ))}

              {searchQuery && users.map((user) => (
                <UserListItem
                  key={user.id}
                  user={user}
                  isSelected={selectedUser?.id === user.id}
                  onClick={() => startChat(user)}
                />
              ))}

            </div>

          </div>

          {/* CHAT AREA */}

          <div className="flex-1 flex flex-col">

            <ChatHeader
              selectedUser={selectedUser}
              onlineCount={onlineCount}
              onBack={() => {
                setSelectedUser(null);
                setMessages([]);
                setCurrentChatroom(null);
              }}
            />

            <MessageArea
              messages={messages}
              currentUser={currentUser}
            />

            <MessageInput
              selectedUser={selectedUser}
              sendMessage={sendMessage}
            />

          </div>

        </div>

      </div>

      {/* PROFILE MODAL */}

      {showProfileModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">

          <div className="bg-white rounded-xl p-6 w-[350px] space-y-4">

            <h2 className="text-lg font-semibold">Edit Profile</h2>

            <input
              type="text"
              value={profileData.username}
              onChange={(e) =>
                setProfileData({ ...profileData, username: e.target.value })
              }
              className="w-full border px-3 py-2 rounded"
            />

            <input
              type="email"
              value={profileData.email}
              onChange={(e) =>
                setProfileData({ ...profileData, email: e.target.value })
              }
              className="w-full border px-3 py-2 rounded"
            />

            <div className="flex justify-end gap-2">

              <button
                onClick={() => setShowProfileModal(false)}
                className="px-3 py-2 text-gray-500"
              >
                Cancel
              </button>

              <button
                onClick={updateProfile}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>

            </div>

          </div>

        </div>
      )}

    </>
  );
};

export default Dashboard;