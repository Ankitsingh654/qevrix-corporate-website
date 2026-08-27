import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Code2, Users, Building, MessageSquare, Mail, Phone, MapPin, Send, CheckCircle2, Calendar } from "lucide-react";
import { companyConfig } from "../config/companyConfig";
import { motion, AnimatePresence } from "framer-motion";

const categoryConfig = {
  "IT & Software": {
    title: "IT & SOFTWARE SOLUTIONS",
    description: "Tell us about your software development, web/app project, IT infrastructure, automation, AI, or technology requirements.",
    helper: "Tell us about your project, features, timeline, technical requirements, or current challenges.",
    placeholder: "Describe your software or technology requirement...",
    types: [
      "Web Application", "Mobile Application", "Custom Software", "AI / Automation", "Cloud / Infrastructure", "UI/UX", "Other IT Requirement"
    ]
  },
  "Workforce Solutions": {
    title: "WORKFORCE SOLUTIONS",
    description: "Tell us about your manpower, staffing, hiring, workforce supply, or operational workforce requirements.",
    helper: "Tell us about your workforce requirements.",
    placeholder: "Example: We need 25 warehouse workers in Noida for a 6-month project. Please mention worker type, quantity, location, duration and joining timeline.",
    types: [
      "Temporary Staffing", "Permanent Hiring", "Contract Workforce", "Skilled Workers", "Unskilled Workers", "Warehouse / Logistics Workforce", "Construction Workforce", "Other Workforce Requirement"
    ]
  },
  "Civil & Construction": {
    title: "CIVIL & CONSTRUCTION SOLUTIONS",
    description: "Tell us about your construction project, civil work, infrastructure requirement, contractor requirement, or project execution needs.",
    helper: "Tell us about your civil or construction project.",
    placeholder: "Please describe the project scope, location, approximate size, work required, timeline and any technical requirements.",
    types: [
      "Residential Project", "Commercial Project", "Industrial Project", "Infrastructure Work", "Renovation", "Labour / Contractor Requirement", "Other Civil Requirement"
    ]
  },
  "Schedule Meeting": {
    title: "SCHEDULE A MEETING",
    description: "Book a meeting with our QEVRIX experts to discuss your requirements, project, or business collaboration in detail.",
    helper: "Please share any specific agenda or topic you'd like to discuss.",
    placeholder: "Write your agenda or topics for discussion...",
    types: [
      "Project Discussion", "IT & Software Requirement", "Workforce Requirement", "Civil & Construction Requirement", "Partnership / Collaboration", "Business Discussion", "Other"
    ]
  },
  "General Enquiry": {
    title: "GENERAL ENQUIRY",
    description: "Tell us how QEVRIX can help you. Our team will review your enquiry and connect you with the right team.",
    helper: "Tell us what you would like to discuss.",
    placeholder: "Write your enquiry, business requirement, partnership proposal, or any other message...",
    types: [
      "Business Enquiry", "Partnership", "Consultation", "Career / Internship", "Vendor / Service Provider", "Other"
    ]
  }
};

const services = [
  { id: "IT & Software", label: "IT & Software", icon: Code2 },
  { id: "Workforce Solutions", label: "Workforce", icon: Users },
  { id: "Civil & Construction", label: "Civil Works", icon: Building },
  { id: "General Enquiry", label: "General", icon: MessageSquare },
  { id: "Schedule Meeting", label: "Schedule Meeting", icon: Calendar }
];

export default function Contact({ initialService }) {
  const location = useLocation();
  const stateService = location?.state?.preselectService || location?.state?.interest;
  
  const resolveService = (val) => {
    if (!val) return "General Enquiry";
    if (val === "Other / General Enquiry") return "General Enquiry";
    return val;
  };

  const [selectedService, setSelectedService] = useState(
    resolveService(stateService || initialService)
  );

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const serviceParam = params.get("service") || params.get("interest");
    if (serviceParam) {
      const lower = serviceParam.toLowerCase();
      if (lower.includes("schedule") || lower.includes("meeting")) setSelectedService("Schedule Meeting");
      else if (lower.includes("it") || lower.includes("software")) setSelectedService("IT & Software");
      else if (lower.includes("workforce") || lower.includes("staffing")) setSelectedService("Workforce Solutions");
      else if (lower.includes("civil") || lower.includes("construction")) setSelectedService("Civil & Construction");
      else setSelectedService("General Enquiry");
    } else if (stateService) {
      setSelectedService(resolveService(stateService));
    } else if (initialService) {
      setSelectedService(resolveService(initialService));
    }
  }, [stateService, initialService, location.search]);

  // When selected service changes, reset the category specific type
  useEffect(() => {
    setFormData(prev => ({ ...prev, requirementType: "", meetingPurpose: "" }));
  }, [selectedService]);

  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    email: "",
    phoneNo: "",
    estimatedBudget: "Not Sure Yet",
    requirementType: "",
    message: "",
    meetingPurpose: "",
    preferredDate: "",
    preferredTime: "",
    agenda: ""
  });
  
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = "Please enter your full name.";
    if (!formData.email.trim()) {
      errors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!formData.phoneNo.trim()) {
      errors.phoneNo = "Please enter your phone number.";
    } else if (!/^\+?[0-9\s-]{8,15}$/.test(formData.phoneNo)) {
      errors.phoneNo = "Please enter a valid phone number.";
    }
    
    if (selectedService === 'Schedule Meeting') {
      if (!formData.meetingPurpose) errors.meetingPurpose = "Meeting purpose is required.";
      if (!formData.preferredDate) {
        errors.preferredDate = "Preferred date is required.";
      } else {
        const selected = new Date(formData.preferredDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selected < today) errors.preferredDate = "Past dates are not allowed.";
      }
      if (!formData.preferredTime) errors.preferredTime = "Preferred time is required.";
    } else {
      if (!formData.message.trim()) {
        errors.message = "Please describe your requirement.";
      }
    }
    
    return errors;
  };

  const resetForm = () => {
    setFormData({
      fullName: "", company: "", email: "", phoneNo: "",
      estimatedBudget: "Not Sure Yet", requirementType: "", message: "",
      meetingPurpose: "", preferredDate: "", preferredTime: "", agenda: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "loading") return;

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setStatus("loading");
    
    const finalMessage = selectedService === 'Schedule Meeting'
      ? `[Meeting Purpose: ${formData.meetingPurpose}]\n[Preferred Date: ${formData.preferredDate}]\n[Preferred Time: ${formData.preferredTime}]\n\nAgenda:\n${formData.agenda || 'None'}`
      : (formData.requirementType ? `[Requirement Type: ${formData.requirementType}]\n\n${formData.message}` : formData.message);

    // Check Form Mode (Default to springboot if not specified)
    const formMode = process.env.REACT_APP_FORM_MODE || "springboot";

    try {
      if (formMode === "external") {
        /*
          EXTERNAL FORM MODE (No Backend Required)
          Perfect for Formspree (https://formspree.io) or Getform (https://getform.io)
        */
        const externalUrl = process.env.REACT_APP_EXTERNAL_FORM_URL;
        
        if (!externalUrl) {
          console.error("REACT_APP_EXTERNAL_FORM_URL is missing. Please set it in your .env file.");
          setStatus("error");
          return;
        }

        const externalPayload = {
          subject: `New QEVRIX Enquiry — ${selectedService}`,
          name: formData.fullName,
          company: formData.company,
          email: formData.email,
          phone: formData.phoneNo,
          category: selectedService,
          budget: formData.estimatedBudget,
          message: finalMessage,
          submissionType: selectedService === 'Schedule Meeting' ? 'meeting_request' : 'general'
        };

        const response = await fetch(externalUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(externalPayload)
        });

        if (response.ok) {
          setStatus("success");
          resetForm();
        } else {
          setStatus("error");
        }

      } else {
        /*
          ORIGINAL SPRING BOOT OR VERCEL MODE
        */
        const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";
        const payload = {
          fullName: formData.fullName,
          company: formData.company,
          email: formData.email,
          phoneNo: formData.phoneNo,
          interest: selectedService,
          estimatedBudget: formData.estimatedBudget,
          message: finalMessage,
          source: "Website Enquiry Form",
          submissionType: selectedService === 'Schedule Meeting' ? 'meeting_request' : 'general',
          meetingPurpose: formData.meetingPurpose,
          preferredDate: formData.preferredDate,
          preferredTime: formData.preferredTime,
          agenda: formData.agenda
        };

        const response = await fetch(`${API_BASE_URL}/api/contact/created`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        if (response.status === 201 || response.ok) {
          setStatus("success");
          resetForm();
        } else {
          setStatus("error");
        }
      }
    } catch (err) {
      setStatus("error");
    }
  };

  const formControlClass = (fieldName) => `
    w-full px-4 py-3 bg-qx-background text-white placeholder-qx-textMuted rounded-xl outline-none transition-all duration-300
    border border-qx-border focus:border-qx-primary focus:ring-4 focus:ring-qx-primary/10 hover:border-qx-borderHover
    ${validationErrors[fieldName] ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/10" : ""}
  `.trim().replace(/\s+/g, ' ');

  const currentConfig = categoryConfig[selectedService] || categoryConfig["General Enquiry"];

  return (
    <section id="contact" className="py-24 bg-qx-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-qx-primary/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Contextual info */}
          <div className="lg:col-span-5 flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div 
                key={selectedService}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <h2 className="text-[12px] font-bold text-qx-primary tracking-widest uppercase mb-4 flex items-center gap-2">
                  <span className="w-6 h-[2px] bg-qx-primary"></span>
                  {currentConfig.title}
                </h2>
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
                  Let's Discuss <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-qx-primary to-blue-400">
                    Your Requirement.
                  </span>
                </h3>
                <p className="text-qx-textSecondary leading-relaxed text-[16px] mb-12 max-w-md">
                  {currentConfig.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Info panel */}
            <div className="bg-qx-surface border border-qx-border rounded-2xl p-6 md:p-8 space-y-6 shadow-sm mt-auto">
              <h4 className="text-[18px] font-bold text-white mb-2">Contact {companyConfig.brandName}</h4>
              
              {companyConfig.companyEmail && (
                <div className="flex items-start space-x-4">
                  <Mail className="text-qx-primary mt-1 flex-shrink-0" size={18} />
                  <div>
                    <div className="text-[11px] font-bold text-qx-textSecondary uppercase tracking-widest">Email</div>
                    <a href={`mailto:${companyConfig.companyEmail}`} className="text-white hover:text-qx-primary transition-colors text-[14px] font-medium">
                      {companyConfig.companyEmail}
                    </a>
                  </div>
                </div>
              )}

              {companyConfig.companyPhone && (
                <div className="flex items-start space-x-4">
                  <Phone className="text-qx-primary mt-1 flex-shrink-0" size={18} />
                  <div>
                    <div className="text-[11px] font-bold text-qx-textSecondary uppercase tracking-widest">Phone</div>
                    <a href={`tel:${companyConfig.companyPhone.replace(/\s+/g, '')}`} className="text-white hover:text-qx-primary transition-colors text-[14px] font-medium">
                      {companyConfig.companyPhone}
                    </a>
                  </div>
                </div>
              )}

              {companyConfig.companyLocation && (
                <div className="flex items-start space-x-4">
                  <MapPin className="text-qx-primary mt-1 flex-shrink-0" size={18} />
                  <div>
                    <div className="text-[11px] font-bold text-qx-textSecondary uppercase tracking-widest">Location</div>
                    <div className="text-white text-[14px] font-medium">{companyConfig.companyLocation}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Dynamic Form */}
          <div className="lg:col-span-7">
            <div className="bg-qx-surface border border-qx-border rounded-[24px] p-8 md:p-10 shadow-lg relative">
              {status === "success" ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="h-16 w-16 bg-qx-success/10 border border-qx-success/20 text-qx-success rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-[24px] font-bold text-white mb-3">
                    {selectedService === 'Schedule Meeting' ? 'Meeting Request Received' : 'Enquiry Sent Successfully'}
                  </h4>
                  <p className="text-qx-textSecondary max-w-md mx-auto text-[15px] leading-relaxed">
                    {selectedService === 'Schedule Meeting' 
                      ? 'Meeting request received successfully. Our QEVRIX team will contact you shortly to confirm the meeting.'
                      : 'Thank you. Your requirement has been received. Our QEVRIX team will review it and get back to you shortly.'}
                  </p>
                  <button 
                    onClick={() => setStatus("idle")} 
                    className="mt-10 px-8 py-3.5 bg-qx-primary hover:bg-qx-primaryHover text-white font-bold rounded-xl transition-colors text-[14px]"
                  >
                    Send Another Request
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Category Selection Grid */}
                  <div>
                    <label className="block text-[12px] font-bold text-white mb-3 uppercase tracking-wider">
                      Select Requirement Category
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                      {services.map((s) => {
                        const IconComponent = s.icon;
                        const isSelected = selectedService === s.id;
                        return (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => setSelectedService(s.id)}
                            className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all duration-200 ${
                              isSelected
                                ? "bg-qx-primary/10 border-qx-primary text-qx-primary shadow-sm"
                                : "bg-qx-background border-qx-border text-qx-textSecondary hover:border-qx-borderHover hover:text-white"
                            }`}
                          >
                            <IconComponent size={18} className="mb-2" />
                            <span className="text-[11px] font-semibold">{s.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {selectedService === 'Schedule Meeting' ? (
                    <>
                      <div className="grid md:grid-cols-2 gap-6 pt-2">
                        <div>
                          <label className="block text-[13px] font-semibold text-white mb-2">Full Name *</label>
                          <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Your full name" className={formControlClass("fullName")} />
                          {validationErrors.fullName && <p className="text-red-400 text-[12px] font-medium mt-1.5">{validationErrors.fullName}</p>}
                        </div>
                        <div>
                          <label className="block text-[13px] font-semibold text-white mb-2">Company / Organisation</label>
                          <input type="text" name="company" value={formData.company} onChange={handleInputChange} placeholder="Your company name" className={formControlClass("company")} />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[13px] font-semibold text-white mb-2">Email Address *</label>
                          <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="you@company.com" className={formControlClass("email")} />
                          {validationErrors.email && <p className="text-red-400 text-[12px] font-medium mt-1.5">{validationErrors.email}</p>}
                        </div>
                        <div>
                          <label className="block text-[13px] font-semibold text-white mb-2">Phone Number *</label>
                          <input type="tel" name="phoneNo" value={formData.phoneNo} onChange={handleInputChange} placeholder="e.g. +91 99999 99999" className={formControlClass("phoneNo")} />
                          {validationErrors.phoneNo && <p className="text-red-400 text-[12px] font-medium mt-1.5">{validationErrors.phoneNo}</p>}
                        </div>
                      </div>
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="md:col-span-1">
                          <label className="block text-[13px] font-semibold text-white mb-2">Meeting Purpose *</label>
                          <select name="meetingPurpose" value={formData.meetingPurpose} onChange={handleInputChange} className={formControlClass("meetingPurpose")}>
                            <option value="">Select purpose</option>
                            {currentConfig.types.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                          {validationErrors.meetingPurpose && <p className="text-red-400 text-[12px] font-medium mt-1.5">{validationErrors.meetingPurpose}</p>}
                        </div>
                        <div className="md:col-span-1">
                          <label className="block text-[13px] font-semibold text-white mb-2">Preferred Date *</label>
                          <input type="date" name="preferredDate" min={new Date().toISOString().split('T')[0]} value={formData.preferredDate} onChange={handleInputChange} className={formControlClass("preferredDate")} style={{colorScheme: 'dark'}} />
                          {validationErrors.preferredDate && <p className="text-red-400 text-[12px] font-medium mt-1.5">{validationErrors.preferredDate}</p>}
                        </div>
                        <div className="md:col-span-1">
                          <label className="block text-[13px] font-semibold text-white mb-2">Preferred Time *</label>
                          <input type="time" name="preferredTime" value={formData.preferredTime} onChange={handleInputChange} className={formControlClass("preferredTime")} style={{colorScheme: 'dark'}} />
                          {validationErrors.preferredTime && <p className="text-red-400 text-[12px] font-medium mt-1.5">{validationErrors.preferredTime}</p>}
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-end mb-2">
                          <label className="block text-[13px] font-semibold text-white">Message / Agenda</label>
                        </div>
                        <textarea name="agenda" rows="3" value={formData.agenda} onChange={handleInputChange} placeholder={currentConfig.placeholder} className={formControlClass("agenda")}></textarea>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* General Fields */}
                      <div className="grid md:grid-cols-2 gap-6 pt-2">
                        <div>
                          <label className="block text-[13px] font-semibold text-white mb-2">Full Name *</label>
                          <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Your full name" className={formControlClass("fullName")} />
                          {validationErrors.fullName && <p className="text-red-400 text-[12px] font-medium mt-1.5">{validationErrors.fullName}</p>}
                        </div>
                        <div>
                          <label className="block text-[13px] font-semibold text-white mb-2">Company / Organisation</label>
                          <input type="text" name="company" value={formData.company} onChange={handleInputChange} placeholder="Your company name" className={formControlClass("company")} />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[13px] font-semibold text-white mb-2">Email Address *</label>
                          <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="you@company.com" className={formControlClass("email")} />
                          {validationErrors.email && <p className="text-red-400 text-[12px] font-medium mt-1.5">{validationErrors.email}</p>}
                        </div>
                        <div>
                          <label className="block text-[13px] font-semibold text-white mb-2">Phone Number *</label>
                          <input type="tel" name="phoneNo" value={formData.phoneNo} onChange={handleInputChange} placeholder="e.g. +91 99999 99999" className={formControlClass("phoneNo")} />
                          {validationErrors.phoneNo && <p className="text-red-400 text-[12px] font-medium mt-1.5">{validationErrors.phoneNo}</p>}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[13px] font-semibold text-white mb-2">Requirement Type</label>
                          <select name="requirementType" value={formData.requirementType} onChange={handleInputChange} className={formControlClass("requirementType")}>
                            <option value="">Select an option</option>
                            {currentConfig.types.map(type => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-[13px] font-semibold text-white mb-2">Estimated Budget</label>
                          <select name="estimatedBudget" value={formData.estimatedBudget} onChange={handleInputChange} className={formControlClass("estimatedBudget")}>
                            <option value="Not Sure Yet">Not Sure Yet</option>
                            <option value="Under ₹50,000">Under ₹50,000</option>
                            <option value="₹50,000 – ₹2 Lakh">₹50,000 – ₹2 Lakh</option>
                            <option value="₹2 Lakh – ₹5 Lakh">₹2 Lakh – ₹5 Lakh</option>
                            <option value="₹5 Lakh – ₹10 Lakh">₹5 Lakh – ₹10 Lakh</option>
                            <option value="₹10 Lakh+">₹10 Lakh+</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-end mb-2">
                          <label className="block text-[13px] font-semibold text-white">Requirement Details *</label>
                        </div>
                        <AnimatePresence mode="wait">
                          <motion.div 
                            key={selectedService}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="text-[11px] text-qx-textSecondary mb-2 font-medium"
                          >
                            {currentConfig.helper}
                          </motion.div>
                        </AnimatePresence>
                        <textarea name="message" rows="4" value={formData.message} onChange={handleInputChange} placeholder={currentConfig.placeholder} className={formControlClass("message")}></textarea>
                        {validationErrors.message && <p className="text-red-400 text-[12px] font-medium mt-1.5">{validationErrors.message}</p>}
                      </div>
                    </>
                  )}

                  {status === "error" && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-[13px] font-medium">
                      Something went wrong submitting your request. Please check your connection and try again.
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full h-14 bg-qx-primary text-white font-bold rounded-xl hover:bg-qx-primaryHover transition-all duration-300 flex items-center justify-center gap-2 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed text-[15px]"
                    >
                      {status === "loading" ? (
                        "Submitting..."
                      ) : (
                        <>
                          <Send size={18} />
                          {selectedService === 'Schedule Meeting' ? 'Request Meeting' : 'Submit Enquiry'}
                        </>
                      )}
                    </button>
                    <p className="text-center text-[12px] text-qx-textSecondary mt-4 font-medium">
                      Your information is secure. We do not share it with third parties.
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
