import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Code2, Users, Building, MessageSquare, Mail, Phone, MapPin, Send } from "lucide-react";
import { companyConfig } from "../config/companyConfig";

export default function Contact({ initialService }) {
  const location = useLocation();
  const stateService = location?.state?.preselectService || location?.state?.interest;
  
  // Default to "General Enquiry" if no prop or state is provided
  const [selectedService, setSelectedService] = useState(
    stateService === "Other / General Enquiry" ? "General Enquiry" : (stateService || initialService || "General Enquiry")
  );
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const serviceParam = params.get("service") || params.get("interest");
    if (serviceParam) {
      const lower = serviceParam.toLowerCase();
      if (lower.includes("it") || lower.includes("software")) {
        setSelectedService("IT & Software");
      } else if (lower.includes("workforce") || lower.includes("staffing")) {
        setSelectedService("Workforce Solutions");
      } else if (lower.includes("civil") || lower.includes("construction")) {
        setSelectedService("Civil & Construction");
      }
    } else if (stateService) {
      setSelectedService(stateService === "Other / General Enquiry" ? "General Enquiry" : stateService);
    } else if (initialService) {
      setSelectedService(initialService === "Other / General Enquiry" ? "General Enquiry" : initialService);
    } else {
      setSelectedService("General Enquiry");
    }
  }, [stateService, initialService, location.search]);

  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    email: "",
    phoneNo: "",
    estimatedBudget: "Not Sure Yet",
    message: ""
  });
  
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [validationErrors, setValidationErrors] = useState({});

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8082";

  const services = [
    { id: "IT & Software", label: "IT & Software", icon: Code2 },
    { id: "Workforce Solutions", label: "Workforce Solutions", icon: Users },
    { id: "Civil & Construction", label: "Civil & Construction", icon: Building },
    { id: "Other / General Enquiry", label: "Other / General Enquiry", icon: MessageSquare }
  ];

  const getHelperText = () => {
    switch (selectedService) {
      case "IT & Software":
        return "Tell us about your IT & Software requirements";
      case "Workforce Solutions":
        return "Tell us about your workforce requirements";
      case "Civil & Construction":
        return "Tell us about your civil or construction requirements";
      default:
        return "Tell us how QEVRIX can help";
    }
  };

  const getMessagePlaceholder = () => {
    switch (selectedService) {
      case "IT & Software":
        return "Tell us more about your software, website, app, AI, or technology requirements...";
      case "Workforce Solutions":
        return "Tell us more about your manpower, staffing, workers, hiring, or workforce needs...";
      case "Civil & Construction":
        return "Tell us more about your construction, project, contractor, labour, or civil requirements...";
      default:
        return "Tell us more about your requirement...";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when typing
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) {
      errors.fullName = "Please enter your full name.";
    }
    if (!formData.email.trim()) {
      errors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!formData.phoneNo.trim()) {
      errors.phoneNo = "Please enter your phone number.";
    }
    if (!formData.message.trim()) {
      errors.message = "Please describe your requirement.";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setStatus("loading");
    
    const payload = {
      fullName: formData.fullName,
      company: formData.company,
      email: formData.email,
      phoneNo: formData.phoneNo,
      interest: selectedService,
      estimatedBudget: formData.estimatedBudget,
      message: formData.message,
      source: "Website Enquiry Form"
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact/created`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.status === 201 || response.ok) {
        setStatus("success");
        setFormData({
          fullName: "",
          company: "",
          email: "",
          phoneNo: "",
          estimatedBudget: "Not Sure Yet",
          message: ""
        });
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  // Shared dark form control class rules
  const formControlClass = (fieldName) => `
    w-full px-4 py-3 bg-[#0F172A] text-white placeholder-slate-500 rounded-xl outline-none transition duration-300
    focus:border-qx-primary focus:ring-4 focus:ring-qx-primary/10 hover:border-slate-600
    ${validationErrors[fieldName] ? "border-red-500/50" : "border-slate-700"}
  `.trim().replace(/\s+/g, ' ');

  return (
    <section id="contact" className="py-24 bg-qx-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none mix-blend-overlay"></div>
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-qx-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16">
          {/* Left Column: Contact info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="text-sm font-bold text-qx-primary tracking-widest uppercase mb-4 flex items-center gap-2">
                <span className="w-4 h-[2px] bg-qx-primary"></span>
                START A CONVERSATION
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
                Let's Discuss <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-qx-primary to-blue-400">
                  Your Requirement.
                </span>
              </h3>
              <p className="text-qx-textSecondary leading-relaxed text-lg mb-10">
                Tell us what you need. Whether you are looking for a technology solution, workforce support or civil project services, our team will review your requirement and get back to you.
              </p>

              {/* Info panel */}
              <div className="bg-qx-surface/60 border border-white/5 rounded-2xl p-6 md:p-8 space-y-6 backdrop-blur-md">
                <h4 className="text-xl font-bold text-white mb-4">Contact {companyConfig.brandName}</h4>
                
                {companyConfig.companyEmail && (
                  <div className="flex items-start space-x-4">
                    <Mail className="text-qx-primary mt-1 flex-shrink-0" size={20} />
                    <div>
                      <div className="text-xs font-semibold text-qx-textSecondary uppercase tracking-wider">Email</div>
                      <a href={`mailto:${companyConfig.companyEmail}`} className="text-white hover:text-qx-primary transition-colors text-[15px]">
                        {companyConfig.companyEmail}
                      </a>
                    </div>
                  </div>
                )}

                {companyConfig.companyPhone && (
                  <div className="flex items-start space-x-4">
                    <Phone className="text-qx-primary mt-1 flex-shrink-0" size={20} />
                    <div>
                      <div className="text-xs font-semibold text-qx-textSecondary uppercase tracking-wider">Phone</div>
                      <a href={`tel:${companyConfig.companyPhone.replace(/\s+/g, '')}`} className="text-white hover:text-qx-primary transition-colors text-[15px]">
                        {companyConfig.companyPhone}
                      </a>
                    </div>
                  </div>
                )}

                {companyConfig.companyLocation && (
                  <div className="flex items-start space-x-4">
                    <MapPin className="text-qx-primary mt-1 flex-shrink-0" size={20} />
                    <div>
                      <div className="text-xs font-semibold text-qx-textSecondary uppercase tracking-wider">Location</div>
                      <div className="text-white text-[15px]">{companyConfig.companyLocation}</div>
                    </div>
                  </div>
                )}

                <p className="text-xs text-qx-textSecondary leading-relaxed pt-2">
                  Please note: Appointments and site meetings are subject to availability.
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-4 mt-8">
              {companyConfig.companyEmail && (
                <a 
                  href={`mailto:${companyConfig.companyEmail}`} 
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-semibold text-white hover:border-qx-primary/40 hover:bg-qx-primary/5 transition-all"
                >
                  Email Us
                </a>
              )}
              {companyConfig.companyPhone && (
                <>
                  <a 
                    href={`tel:${companyConfig.companyPhone.replace(/\s+/g, '')}`} 
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-semibold text-white hover:border-qx-primary/40 hover:bg-qx-primary/5 transition-all"
                  >
                    Call Us
                  </a>
                  <a 
                    href={`https://wa.me/${companyConfig.companyPhone.replace(/[^0-9]/g, '')}`} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-semibold text-white hover:border-qx-primary/40 hover:bg-qx-primary/5 transition-all"
                  >
                    WhatsApp Us
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            <div className="bg-qx-surface/80 border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl backdrop-blur-xl">
              {status === "success" ? (
                <div className="text-center py-12">
                  <div className="h-16 w-16 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2">Enquiry Sent!</h4>
                  <p className="text-qx-textSecondary max-w-md mx-auto">
                    Thank you. Your enquiry has been received. Our team will review your requirement and contact you soon.
                  </p>
                  <button 
                    onClick={() => setStatus("idle")} 
                    className="mt-8 px-6 py-2.5 bg-qx-primary text-black font-bold rounded-xl hover:scale-[1.02] transition-transform"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Service Selection */}
                  <div>
                    <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">
                      What can we help you with? *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {services.map((s) => {
                        const IconComponent = s.icon;
                        const isSelected = selectedService === s.id || (s.id === "Other / General Enquiry" && selectedService === "General Enquiry");
                        return (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => setSelectedService(s.id === "Other / General Enquiry" ? "General Enquiry" : s.id)}
                            className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center transition-all duration-300 ${
                              isSelected
                                ? "bg-qx-primary/10 border-qx-primary text-qx-primary shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                                : "bg-white/5 border-white/10 text-qx-textSecondary hover:border-white/20 hover:text-white"
                            }`}
                          >
                            <IconComponent size={20} className="mb-2" />
                            <span className="text-xs font-semibold">{s.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Form fields */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-white/80 mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        className={formControlClass("fullName")}
                        aria-label="Full Name"
                      />
                      {validationErrors.fullName && (
                        <p className="text-red-400 text-xs mt-1">{validationErrors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-white/80 mb-2">Company / Organisation</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Your company name"
                        className={formControlClass("company")}
                        aria-label="Company / Organisation"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-white/80 mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="you@company.com"
                        className={formControlClass("email")}
                        aria-label="Email Address"
                      />
                      {validationErrors.email && (
                        <p className="text-red-400 text-xs mt-1">{validationErrors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-white/80 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phoneNo"
                        value={formData.phoneNo}
                        onChange={handleInputChange}
                        placeholder="e.g. +91 99999 99999"
                        className={formControlClass("phoneNo")}
                        aria-label="Phone Number"
                      />
                      {validationErrors.phoneNo && (
                        <p className="text-red-400 text-xs mt-1">{validationErrors.phoneNo}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-white/80 mb-2">Estimated Budget (Optional)</label>
                      <select
                        name="estimatedBudget"
                        value={formData.estimatedBudget}
                        onChange={handleInputChange}
                        className={formControlClass("estimatedBudget")}
                        aria-label="Estimated Budget"
                      >
                        <option value="Not Sure Yet">Not Sure Yet</option>
                        <option value="Under ₹25,000">Under ₹25,000</option>
                        <option value="₹25,000 – ₹50,000">₹25,000 – ₹50,000</option>
                        <option value="₹50,000 – ₹1 Lakh">₹50,000 – ₹1 Lakh</option>
                        <option value="₹1 Lakh – ₹5 Lakh">₹1 Lakh – ₹5 Lakh</option>
                        <option value="Above ₹5 Lakh">Above ₹5 Lakh</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-semibold text-white/80">Requirement Details *</label>
                      <span className="text-xs text-qx-primary font-medium">{getHelperText()}</span>
                    </div>
                    <textarea
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={getMessagePlaceholder()}
                      className={formControlClass("message")}
                      aria-label="Requirement Details"
                    ></textarea>
                    {validationErrors.message && (
                      <p className="text-red-400 text-xs mt-1">{validationErrors.message}</p>
                    )}
                  </div>

                  <div className="text-xs text-qx-textSecondary leading-relaxed bg-white/5 border border-white/5 rounded-xl p-3.5">
                    <strong>Note:</strong> Please do not share passwords, OTPs or sensitive financial information.
                  </div>

                  {status === "error" && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm">
                      Something went wrong. Please try again or contact us directly.
                    </div>
                  )}

                  <div>
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full py-4 bg-qx-primary text-black font-bold rounded-xl hover:scale-[1.01] transition-transform duration-300 flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(59,130,246,0.3)] disabled:opacity-50 disabled:pointer-events-none"
                    >
                      <Send size={18} />
                      {status === "loading" ? "Sending..." : "Send Enquiry"}
                    </button>
                    <p className="text-center text-xs text-qx-textSecondary mt-3">
                      Our team will review your requirement and contact you.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Simple placeholder for CheckCircle2 so we don't crash if it is not imported
function CheckCircle2({ size, ...props }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
