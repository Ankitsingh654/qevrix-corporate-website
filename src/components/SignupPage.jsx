import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, UserPlus, AlertCircle, Check } from "lucide-react";
import AuthLayout from "./auth/AuthLayout";
import AuthInput from "./auth/AuthInput";
import AuthPasswordInput from "./auth/AuthPasswordInput";
import AuthButton from "./auth/AuthButton";
import { motion, AnimatePresence } from "framer-motion";

export default function SignupPage() {
  const navigate = useNavigate();
  
  useEffect(() => { 
    const token = localStorage.getItem("userToken") || localStorage.getItem("authToken"); 
    if(token) navigate("/student/onboarding", { replace: true }); 
  }, [navigate]);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false
  });

  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const reqs = {
    length: formData.password.length >= 8,
    upper: /[A-Z]/.test(formData.password),
    lower: /[a-z]/.test(formData.password),
    number: /[0-9]/.test(formData.password),
    special: /[^A-Za-z0-9]/.test(formData.password)
  };

  const strengthScore = Object.values(reqs).filter(Boolean).length;
  const strengthLabels = ["Very Weak", "Weak", "Medium", "Strong", "Very Strong"];
  const strengthColors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-lime-500", "bg-green-500"];

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(formData.email);
  const isMobileValid = /^\d{10}$/.test(formData.mobile);
  const passwordsMatch = formData.password.length > 0 && formData.password === formData.confirmPassword;

  const isFormValid = formData.fullName.trim().length > 0 &&
                      isEmailValid &&
                      isMobileValid &&
                      strengthScore === 5 &&
                      passwordsMatch &&
                      formData.termsAccepted;

  const handleMobileChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    setFormData({ ...formData, mobile: val });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid || loading) return;

    setLoading(true);
    setApiError("");

    let payload = {
      fullName: formData.fullName,
      email: formData.email,
      mobile: formData.mobile,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      role: "STUDENT",
    };

    try {
      const response = await fetch("http://localhost:8082/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.text();
      
      if (response.ok) {
        alert(data);
        navigate("/login");
      } else {
        setApiError(data || "Signup failed");
      }
    } catch (err) {
      setApiError("Server connection failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const RequirementItem = ({ met, text }) => (
    <div className="flex items-center gap-2">
      <motion.div 
        animate={{ 
          backgroundColor: met ? "#10B981" : "#F1F5F9",
          borderColor: met ? "#10B981" : "#E2E8F0"
        }}
        className="w-[18px] h-[18px] rounded-full flex items-center justify-center border-2"
      >
        <AnimatePresence>
          {met && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <Check size={10} strokeWidth={4} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <span className={`text-[13px] font-semibold transition-colors duration-300 ${met ? 'text-[#10B981]' : 'text-[#64748B]'}`}>
        {text}
      </span>
    </div>
  );

  return (
    <AuthLayout 
      title="Create Your Account" 
      subtitle="Join the virtual software engineering company"
    >
      <div className="flex flex-col items-center w-full">
        {apiError && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 rounded-xl bg-red-50/80 backdrop-blur-sm border border-red-200 flex items-start gap-3 w-full shadow-sm"
          >
            <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={18} strokeWidth={2.5} />
            <p className="text-[14px] text-red-800 font-semibold">{apiError}</p>
          </motion.div>
        )}

        <form className="space-y-6 w-full" onSubmit={handleSubmit}>
          
          <AuthInput
            id="fullName"
            name="fullName"
            label="Full Name"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            leftIcon={User}
            success={formData.fullName.trim().length > 0}
            error={touched.fullName && formData.fullName.trim() === "" ? "Full name is required" : ""}
          />

          <AuthInput
            id="email"
            name="email"
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            leftIcon={Mail}
            success={emailRegex.test(formData.email)}
            error={touched.email && !isEmailValid ? "Please enter a valid email" : ""}
          />

          <AuthInput
            id="mobile"
            name="mobile"
            label="Mobile Number"
            type="tel"
            placeholder="Enter 10-digit mobile number"
            value={formData.mobile}
            onChange={handleMobileChange}
            onBlur={handleBlur}
            leftIcon={Phone}
            success={/^\d{10}$/.test(formData.mobile)}
            error={touched.mobile && !isMobileValid ? "Mobile must be exactly 10 digits" : ""}
          />

          <div className="space-y-4">
            <AuthPasswordInput
              id="password"
              name="password"
              label="Password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              success={strengthScore === 5}
            />

            <AnimatePresence>
              {formData.password.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-xl shadow-sm overflow-hidden"
                >
                  <div className="flex justify-between items-center mb-2.5">
                    <span className="text-[13px] font-bold text-[#0F172A]">Password Strength</span>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#64748B]">
                      {strengthScore > 0 ? strengthLabels[strengthScore - 1] : strengthLabels[0]}
                    </span>
                  </div>
                  
                  {/* Animated Progress Bar */}
                  <div className="flex gap-1.5 h-1.5 mb-5 w-full">
                    {[1, 2, 3, 4, 5].map((index) => (
                      <motion.div 
                        key={index} 
                        initial={false}
                        animate={{ 
                          backgroundColor: index <= strengthScore ? strengthColors[strengthScore - 1].replace('bg-', '').replace('-500', '') : '#E2E8F0' 
                        }}
                        className={`h-full flex-1 rounded-full ${index <= strengthScore ? strengthColors[strengthScore - 1] : 'bg-[#E2E8F0]'}`}
                      />
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">
                    <RequirementItem met={reqs.length} text="At least 8 characters" />
                    <RequirementItem met={reqs.upper} text="One uppercase letter" />
                    <RequirementItem met={reqs.lower} text="One lowercase letter" />
                    <RequirementItem met={reqs.number} text="One number" />
                    <RequirementItem met={reqs.special} text="One special character" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AuthPasswordInput
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            success={passwordsMatch && formData.confirmPassword.length > 0}
            error={touched.confirmPassword && !passwordsMatch ? "Passwords do not match" : ""}
          />

          <div className="pt-2">
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center w-5 h-5 mt-0.5 rounded-[6px] border-2 border-gray-300 bg-gray-50 group-hover:border-[#2563EB] transition-colors flex-shrink-0">
                <input 
                  type="checkbox" 
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="absolute opacity-0 w-full h-full cursor-pointer" 
                />
                {formData.termsAccepted && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}><Check size={14} strokeWidth={4} className="text-[#2563EB]" /></motion.div>}
              </div>
              <span className="text-[13px] font-semibold text-[#64748B] leading-relaxed">
                I agree to the <span className="text-[#2563EB] hover:text-[#1D4ED8] hover:underline underline-offset-2 transition-colors">Terms of Service</span> and <span className="text-[#2563EB] hover:text-[#1D4ED8] hover:underline underline-offset-2 transition-colors">Privacy Policy</span>
              </span>
            </label>
          </div>

          <div className="pt-4">
            <AuthButton
              type="submit"
              disabled={!isFormValid}
              loading={loading}
              icon={UserPlus}
            >
              Create Account
            </AuthButton>
          </div>
        </form>

        <p className="text-center text-[#475569] mt-8 text-[14px] font-medium">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-[#2563EB] font-bold hover:text-[#1D4ED8] hover:underline underline-offset-4 decoration-2 transition-colors ml-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded"
          >
            Sign In
          </button>
        </p>
      </div>
    </AuthLayout>
  );
}
