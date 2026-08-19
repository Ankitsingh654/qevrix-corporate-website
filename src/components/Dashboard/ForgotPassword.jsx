import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Send, AlertCircle, ArrowLeft, Info, CheckCircle2 } from "lucide-react";
import AuthLayout from "../auth/AuthLayout";
import AuthInput from "../auth/AuthInput";
import AuthButton from "../auth/AuthButton";
import { motion } from "framer-motion";

const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:8082";

export default function ForgotPassword() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [touchedEmail, setTouchedEmail] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    if (!isEmailValid || loading) return;
    setError(""); setMessage(""); setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (res.ok) {
        setMessage("OTP sent successfully! Please check your email inbox.");
      } else {
        const data = await res.text();
        setError(data || "Unable to send OTP. Please try again.");
      }
    } catch {
      setError("Server error. Please try again or contact support.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Forgot Password?"
      subtitle="No worries! Enter your email and we'll send you an OTP to reset your password."
    >
      <div className="flex flex-col items-center w-full">
        {/* Placeholder Illustration / Icon */}
        <div className="mb-10 mt-2 relative flex items-center justify-center">
          <div className="absolute inset-0 bg-blue-400/20 blur-xl rounded-full" />
          <div className="relative bg-gradient-to-tr from-blue-50 to-indigo-50 border-4 border-white shadow-xl rounded-full w-24 h-24 flex items-center justify-center z-10">
            <Mail size={40} strokeWidth={1.5} className="text-[#2563EB]" />
          </div>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 rounded-xl bg-red-50/80 backdrop-blur-sm border border-red-200 flex items-start gap-3 w-full shadow-sm"
          >
            <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={18} strokeWidth={2.5} />
            <p className="text-[14px] text-red-800 font-semibold">{error}</p>
          </motion.div>
        )}
        
        {message && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 rounded-xl bg-green-50/80 backdrop-blur-sm border border-green-200 flex items-start gap-3 w-full shadow-sm"
          >
            <CheckCircle2 className="text-green-500 flex-shrink-0 mt-0.5" size={18} strokeWidth={2.5} />
            <p className="text-[14px] text-green-800 font-semibold">{message}</p>
          </motion.div>
        )}

        <form className="space-y-8 w-full" onSubmit={handleRequestOtp}>
          
          <AuthInput
            id="email"
            name="email"
            label="Email Address"
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouchedEmail(true)}
            leftIcon={Mail}
            success={email && isEmailValid}
            error={touchedEmail && !isEmailValid ? "Please enter a valid email" : ""}
          />

          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-5 flex gap-4 shadow-sm">
            <div className="mt-0.5 bg-blue-100 p-1.5 rounded-full h-fit">
              <Info size={16} strokeWidth={2.5} className="text-[#2563EB]" />
            </div>
            <p className="text-[13px] text-[#475569] leading-relaxed font-semibold">
              We will send a secure 6-digit OTP to your email address. The OTP will remain valid for exactly 5 minutes.
            </p>
          </div>

          <AuthButton
            type="submit"
            disabled={!isEmailValid}
            loading={loading}
            icon={Send}
          >
            Send OTP
          </AuthButton>
        </form>

        <button 
          onClick={() => navigate("/login")}
          className="mt-10 flex items-center justify-center gap-2 text-[14px] font-bold text-[#64748B] hover:text-[#0F172A] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded px-3 py-1"
        >
          <ArrowLeft size={16} strokeWidth={2.5} />
          Back to Login
        </button>
      </div>
    </AuthLayout>
  );
}
