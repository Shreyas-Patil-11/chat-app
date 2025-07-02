import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import Picker from "emoji-picker-react";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiPickerToggle = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emojiObject) => {
    setMsg((prev) => prev + emojiObject.emoji);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <div className="grid grid-cols-[5%,95%] items-center bg-[#080420] px-8 md:px-4 gap-4 relative">
      {/* Emoji Button */}
      <div className="flex items-center text-white gap-4 relative">
        <div className="relative">
          <BsEmojiSmileFill
            onClick={handleEmojiPickerToggle}
            className="text-yellow-300 text-2xl cursor-pointer"
          />
          {showEmojiPicker && (
            <div className="absolute bottom-14 z-50 emoji-picker-theme">
              <Picker
                onEmojiClick={(emojiData) => handleEmojiClick(emojiData)}
                theme="dark"
              />
            </div>
          )}
        </div>
      </div>

      {/* Chat Input */}
      <form
        onSubmit={sendChat}
        className="w-full flex items-center gap-4 bg-white/20 rounded-full px-4 py-2"
      >
        <input
          type="text"
          placeholder="Type your message here"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          className="flex-grow bg-transparent text-white border-none focus:outline-none placeholder-white text-lg"
        />
        <button
          type="submit"
          className="bg-purple-500 hover:bg-purple-600 p-2 rounded-full flex items-center justify-center"
        >
          <IoMdSend className="text-white text-2xl md:text-xl" />
        </button>
      </form>
    </div>
  );
}
