import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const primaryColor = "#ff4d2d";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

  const serverUrl = "http://localhost:8000";

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user"); 
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");

  const handleSignUp = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { fullName, email, password, mobile, role },
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
          Create your account to get started with delicious food deliveries
        </p>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter your Full Name"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none"
            style={{ border: `1px solid ${borderColor}` }}
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
          />
        </div>

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

        {/* Mobile */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Mobile
          </label>
          <input
            type="tel"
            placeholder="Enter your Mobile Number"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none"
            style={{ border: `1px solid ${borderColor}` }}
            onChange={(e) => setMobile(e.target.value)}
            value={mobile}
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

        {/* Role */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Role
          </label>
          <div className="flex gap-2">
            {["user", "owner", "deliveryBoy"].map((r) => (  
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className="flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-colors cursor-pointer"
                style={
                  role === r
                    ? { backgroundColor: primaryColor, color: "white" }
                    : {
                        border: `1px solid ${primaryColor}`,
                        color: primaryColor,
                      }
                }
              >
                {r.charAt(0).toUpperCase() + r.slice(1)} {/* UI capital */}
              </button>
            ))}
          </div>
        </div>

        {/* Sign Up */}
        <button
          type="button"
          onClick={handleSignUp}
          className="w-full font-semibold py-2 rounded-lg text-white bg-[#ff4d2d] hover:bg-[#e64323] transition duration-200 cursor-pointer"
        >
          Sign Up
        </button>

        <button
          type="button"
          className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-100 cursor-pointer"
        >
          <FcGoogle size={20} />
          <span>Sign up with Google</span>
        </button>

        <p
          className="text-center mt-6 cursor-pointer"
          onClick={() => navigate("/signin")}
        >
          Already have an account?{" "}
          <span className="text-[#ff4d2d]">Sign In</span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
