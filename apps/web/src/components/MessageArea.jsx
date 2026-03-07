import React, { useEffect, useRef } from "react";

const MessageArea = ({ messages, currentUser }) => {

  const containerRef = useRef(null);
  const bottomRef = useRef(null);

  const formatTime = (time) => {
    if (!time) return "";
    const date = new Date(time);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {

    const container = containerRef.current;
    if (!container) return;

    // check user bottom par hai ya nahi
    const isAtBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight < 100;

    if (isAtBottom) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }

  }, [messages]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto p-4 bg-gray-50"
    >

      {messages.map((msg, index) => {

        const isSender = msg.author === currentUser.username;

        return (
          <div
            key={index}
            className={`flex mb-3 ${isSender ? "justify-end" : "justify-start"}`}
          >

            <div
              className={`max-w-[65%] px-4 py-2 rounded-xl shadow text-sm relative
              ${
                isSender
                  ? "bg-green-500 text-white"
                  : "bg-white text-black border border-gray-200"
              }`}
            >

              <div>{msg.body}</div>

              <div
                className={`text-[10px] mt-1 ${
                  isSender ? "text-green-100 text-right" : "text-gray-400"
                }`}
              >
                {formatTime(msg.created_at)}
              </div>

            </div>

          </div>
        );

      })}

      <div ref={bottomRef}></div>

    </div>
  );
};

export default MessageArea;