import React, { useState } from "react";
import { Send, Paperclip, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";

const MessageInput = ({ selectedUser, sendMessage }) => {

  const [message, setMessage] = useState("");

  const handleSend = (e) => {

    e.preventDefault();

    const text = message.trim();

    if (!text || !selectedUser) return;

    sendMessage(text);

    setMessage("");
  };

  return (

    <div className="p-4 bg-white border-t border-gray-200">

      <form onSubmit={handleSend} className="flex items-end space-x-2">

        <Button
          type="button"
          variant="ghost"
          size="icon"
          disabled={!selectedUser}
          className="text-gray-500"
        >
          <Paperclip className="h-5 w-5" />
        </Button>

        <div className="flex-1 relative">

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={!selectedUser}
            placeholder={
              selectedUser
                ? "Type a message..."
                : "Select a chat to start messaging"
            }
            className="w-full bg-gray-100 rounded-2xl py-3 pl-4 pr-12 outline-none"
          />

          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={!selectedUser}
            className="absolute right-1 top-1/2 -translate-y-1/2"
          >
            <Smile className="h-5 w-5" />
          </Button>

        </div>

        <Button
          type="submit"
          disabled={!selectedUser || !message.trim()}
          className="bg-blue-600 text-white rounded-full h-12 w-12 flex items-center justify-center"
        >
          <Send className="h-5 w-5 ml-1" />
        </Button>

      </form>

    </div>
  );
};

export default MessageInput;