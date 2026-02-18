import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const serverurl = "http://localhost:8000"; // apna backend port

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  // ================= SEND OTP =================
  const handleSendOtp = async () => {
    try {
      const result = await axios.post(
        `${serverurl}/api/auth/send-otp`,
        { email },
        { withCredentials: true }
      );

      console.log(result.data);
      alert("OTP Sent Successfully");
      setStep(2);
    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Error sending OTP");
    }
  };

  // ================= VERIFY OTP =================
  const handleVerifyOtp = async () => {
    try {
      const result = await axios.post(
        `${serverurl}/api/auth/verify-otp`,
        { email, otp },
        { withCredentials: true }
      );

      console.log(result.data);
      alert("OTP Verified");
      setStep(3);
    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Invalid OTP");
    }
  };

  // ================= RESET PASSWORD =================
  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      const result = await axios.post(
        `${serverurl}/api/auth/reset-password`,
        { email, newPassword },
        { withCredentials: true }
      );

      console.log(result.data);
      alert("Password Reset Successfully");
      navigate("/signin");
    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <div className="flex items-center gap-4 mb-4">
          <IoArrowBack
            size={30}
            className="text-[#ff4d2d] cursor-pointer"
            onClick={() => navigate("/signin")}
          />
          <h1 className="text-2xl font-bold text-center text-[#ff4d2d]">
            Forgot Password
          </h1>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your Email"
                className="w-full border rounded-lg px-3 py-2"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <button
              type="button"
              onClick={handleSendOtp}
              className="w-full py-2 rounded-lg text-white bg-[#ff4d2d]"
            >
              Send OTP
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-1">
                OTP
              </label>
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full border rounded-lg px-3 py-2"
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
              />
            </div>

            <button
              type="button"
              onClick={handleVerifyOtp}
              className="w-full py-2 rounded-lg text-white bg-[#ff4d2d]"
            >
              Verify
            </button>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-1">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter New Password"
                className="w-full border rounded-lg px-3 py-2"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Enter Confirm Password"
                className="w-full border rounded-lg px-3 py-2"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </div>

            <button
              type="button"
              onClick={handleResetPassword}
              className="w-full py-2 rounded-lg text-white bg-[#ff4d2d]"
            >
              Reset Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
