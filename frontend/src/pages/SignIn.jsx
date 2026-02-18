import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignIn() {
  const primaryColor = "#ff4d2d";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

  const serverUrl = "http://localhost:8000";

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        { email, password  },
        { withCredentials: true }
      );

      console.log(result);
      alert("Signup Successful ✅");
      navigate("/signin");
    } catch (error) {
      console.log(error);
      alert("Signup Failed ❌");
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-md p-8"
        style={{ border: `1px solid ${borderColor}` }}
      >
        <h1 className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>
          Flingo
        </h1>

        <p className="text-gray-600 mb-8">
          Sign In to your  account to get started with delicious food deliveries
        </p>


        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your Email"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none"
            style={{ border: `1px solid ${borderColor}` }}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>


        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your Password"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none"
              style={{ border: `1px solid ${borderColor}` }}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[14px] text-gray-500 cursor-pointer"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>

      <div className='text-right mb-4 text-[#ff4d2d] font-medium' onClick={()=>navigate("/forgot-password")}>
        Forgot Password
      </div>

        {/* Sign Ip */}
        <button
          type="button"
          onClick={handleSignIn}
          className="w-full font-semibold py-2 rounded-lg text-white bg-[#ff4d2d] hover:bg-[#e64323] transition duration-200 cursor-pointer"
        >
          Sign In
        </button>

        <button
          type="button"
          className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-100 cursor-pointer"
        >
          <FcGoogle size={20} />
          <span>Sign Up with Google</span>
        </button>

        <p
          className="text-center mt-6 cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Want to create a new account ?{" "}
          <span className="text-[#ff4d2d]">Sign In</span>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
