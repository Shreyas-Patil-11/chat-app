import React, { useState, useEffect } from "react";
import Robot from "../assets/robot.gif";

export default function Welcome() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const data = await JSON.parse(
        localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY)
      );
      setUserName(data?.username || "");
    };
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center text-white text-center">
      <img src={Robot} alt="robot" className="h-80" />
      <h1 className="text-2xl mt-4">
        Welcome, <span className="text-[#4e0eff]">{userName}!</span>
      </h1>
      <h3 className="text-lg mt-2">Please select a chat to Start messaging.</h3>
    </div>
  );
}
