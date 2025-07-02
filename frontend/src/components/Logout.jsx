import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";

export default function Logout() {
  const navigate = useNavigate();

  const handleClick = async () => {
    const user = JSON.parse(localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY));
    if (!user) return;
    const id = user._id;

    try {
      const { status } = await axios.get(`${logoutRoute}/${id}`);
      if (status === 200) {
        localStorage.clear();
        navigate("/login");
      }
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center p-2 rounded-md bg-purple-400 hover:bg-purple-500 transition duration-200"
    >
      <BiPowerOff className="text-[#ebe7ff] text-xl" />
    </button>
  );
}
