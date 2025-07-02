import React, { useState, useEffect } from "react";
import Logo from "../assets/logo.svg";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    const getUser = async () => {
      const data = await JSON.parse(
        localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY)
      );
      setCurrentUserName(data.username);
      setCurrentUserImage(data.avatarImage);
    };
    getUser();
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <div className="grid grid-rows-[10%_75%_15%] overflow-hidden bg-[#080420]">
          {/* Brand */}
          <div className="flex items-center justify-center gap-4">
            <img src={Logo} alt="logo" className="h-8" />
            <h3 className="text-white uppercase">snappy</h3>
          </div>

          {/* Contacts */}
          <div className="flex flex-col items-center gap-3 overflow-auto scrollbar-thin scrollbar-thumb-white/25 scrollbar-track-transparent">
            {contacts.map((contact, index) => (
              <div
                key={contact._id}
                className={`bg-white/20 w-[90%] min-h-[5rem] cursor-pointer rounded px-2 py-2 flex items-center gap-4 transition-all duration-500 ease-in-out ${
                  index === currentSelected ? "bg-[#9a86f3]" : ""
                }`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="avatar">
                  <img
                    src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                    alt=""
                    className="h-12"
                  />
                </div>
                <div className="username">
                  <h3 className="text-white">{contact.username}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Current User */}
          <div className="bg-[#0d0d30] flex justify-center items-center gap-8 md:gap-2">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
                className="h-16 max-w-full"
              />
            </div>
            <div className="username">
              <h2 className="text-white text-lg md:text-sm">{currentUserName}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
