import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    const user = localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY);
    if (user) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "" || password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          import.meta.env.VITE_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        navigate("/");
      }
    }
  };

  return (
    <>
      <div className="h-screen w-screen flex flex-col justify-center items-center gap-4 bg-[#131324]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-8 bg-[#00000076] rounded-[2rem] p-20"
        >
          <div className="flex items-center justify-center gap-4">
            <img src={Logo} alt="logo" className="h-20" />
            <h1 className="text-white uppercase">snappy</h1>
          </div>

          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
            min="3"
            className="bg-transparent p-4 border border-[#4e0eff] rounded-md text-white w-full text-base focus:outline-none focus:border-[#997af0]"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            className="bg-transparent p-4 border border-[#4e0eff] rounded-md text-white w-full text-base focus:outline-none focus:border-[#997af0]"
          />
          <button
            type="submit"
            className="bg-[#4e0eff] text-white px-8 py-4 font-bold uppercase text-base rounded-md cursor-pointer hover:bg-[#4e0eff]"
          >
            Log In
          </button>
          <span className="text-white uppercase">
            Don't have an account ?{" "}
            <Link
              to="/register"
              className="text-[#4e0eff] font-bold no-underline"
            >
              Create One.
            </Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
