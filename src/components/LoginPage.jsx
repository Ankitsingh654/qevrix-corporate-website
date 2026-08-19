import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, LogIn, AlertCircle, Check } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebaseConfig";
import AuthLayout from "./auth/AuthLayout";
import AuthInput from "./auth/AuthInput";
import AuthPasswordInput from "./auth/AuthPasswordInput";
import AuthButton from "./auth/AuthButton";
import { motion } from "framer-motion";

const LoginPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => { 
    const token = localStorage.getItem("userToken") || localStorage.getItem("authToken"); 
    if(token) navigate("/student/onboarding", { replace: true }); 
  }, [navigate]);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8082";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);
  const isFormValid = isEmailValid && password.length >= 6;

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  const handleLogin = async (e) => {
    e?.preventDefault();
    if (!isFormValid || loading) return;

    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("username", data.fullName || data.email);
        alert("Login successful 🎯");
        navigate("/student/onboarding", { replace: true });
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      localStorage.setItem("userToken", user.accessToken);
      localStorage.setItem("username", user.displayName || user.email);

      alert(`Welcome back, ${user.displayName || "User"} 🎉`);

      setTimeout(() => {
        navigate("/student/onboarding", { replace: true });
      }, 700);
    } catch (error) {
      alert("Google login failed — check console");
    }
  };

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Sign in to continue your engineering journey."
    >
      <div className="flex flex-col items-center w-full">
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

        <form className="space-y-6 w-full" onSubmit={handleLogin}>
          
          <AuthInput
            id="email"
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handleBlur('email')}
            leftIcon={Mail}
            success={email && isEmailValid}
            error={touched.email && !isEmailValid ? "Please enter a valid email" : ""}
          />

          <div className="space-y-3">
            <AuthPasswordInput
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => handleBlur('password')}
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <div className="relative flex items-center justify-center w-5 h-5 rounded-[6px] border-2 border-gray-300 bg-gray-50 group-hover:border-[#2563EB] transition-colors">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)} 
                    className="absolute opacity-0 w-full h-full cursor-pointer" 
                  />
                  {rememberMe && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}><Check size={14} strokeWidth={4} className="text-[#2563EB]" /></motion.div>}
                </div>
                <span className="text-[13px] font-semibold text-[#64748B] group-hover:text-[#475569] transition-colors">Remember Me</span>
              </label>
              
              <button 
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-[13px] font-bold text-[#2563EB] hover:text-[#1D4ED8] transition-colors hover:underline underline-offset-4 decoration-2"
              >
                Forgot Password?
              </button>
            </div>
          </div>

          <div className="pt-2">
            <AuthButton
              type="submit"
              disabled={!isFormValid}
              loading={loading}
              icon={LogIn}
            >
              Sign In
            </AuthButton>
          </div>
        </form>

        <div className="my-8 flex items-center w-full gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#E2E8F0] to-[#E2E8F0]"></div>
          <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-widest">OR CONTINUE WITH</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#E2E8F0] to-[#E2E8F0]"></div>
        </div>

        <div className="w-full">
          <AuthButton
            type="button"
            variant="secondary"
            onClick={handleGoogleLogin}
            icon={() => <FcGoogle size={20} />}
          >
            Sign in with Google
          </AuthButton>
        </div>
        
        <p className="text-center text-[#475569] mt-8 text-[14px] font-medium">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-[#2563EB] font-bold hover:text-[#1D4ED8] hover:underline underline-offset-4 decoration-2 transition-colors ml-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded"
          >
            Create Account
          </button>
        </p>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
