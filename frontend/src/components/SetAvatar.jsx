import React, { useEffect, useState } from "react";
import axios from "axios";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/ApiRoutes";
import multiavatar from "@multiavatar/multiavatar/esm";

export default function SetAvatar() {
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    const user = localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY);
    if (!user) navigate("/login");
  }, [navigate]);

  const generateRandomName = () => Math.random().toString(36).substring(2, 10);

  useEffect(() => {
    const generateAvatars = () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const randomName = generateRandomName();
        const svgCode = multiavatar(randomName);
        const encoded = btoa(unescape(encodeURIComponent(svgCode)));
        data.push(encoded);
      }
      setAvatars(data);
      setIsLoading(false);
    };

    generateAvatars();
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
      return;
    }

    const user = await JSON.parse(
      localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY)
    );

    const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
      image: avatars[selectedAvatar],
    });

    if (data.isSet) {
      user.isAvatarImageSet = true;
      user.avatarImage = data.image;
      localStorage.setItem(
        import.meta.env.VITE_LOCALHOST_KEY,
        JSON.stringify(user)
      );
      navigate("/");
    } else {
      toast.error("Error setting avatar. Please try again.", toastOptions);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center flex-col gap-12 bg-[#131324] h-screen w-screen">
          <img src={loader} alt="loader" className="max-w-full" />
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col gap-12 bg-[#131324] h-screen w-screen">
          <div className="text-white">
            <h1 className="text-xl">Pick an Avatar as your profile picture</h1>
          </div>
          <div className="flex gap-8">
            {avatars.map((avatar, index) => (
              <div
                key={index}
                className={`p-2 rounded-full flex justify-center items-center transition-all duration-500 cursor-pointer ${
                  selectedAvatar === index
                    ? "border-[6px] border-[#4e0eff]"
                    : "border-[6px] border-transparent"
                } hover:scale-110`}
                onClick={() => setSelectedAvatar(index)}
              >
                <img
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt={`avatar-${index}`}
                  className="h-24 transition-all duration-500"
                />
              </div>
            ))}
          </div>
          <button
            onClick={setProfilePicture}
            className="bg-[#4e0eff] hover:bg-[#3c0edc] text-white px-8 py-4 font-bold uppercase text-base rounded-md cursor-pointer"
          >
            Set as Profile Picture
          </button>
          <ToastContainer />
        </div>
      )}
    </>
  );
}
