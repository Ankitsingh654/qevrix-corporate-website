import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Users, Building, MessageSquare, Calendar, Palette, X, Loader2, ArrowRight } from 'lucide-react';
import { useContactModal } from '../context/ContactModalContext';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

const categoryConfig = {
  "IT & SOFTWARE": {
    title: "IT & SOFTWARE",
    icon: Code2,
    submitLabel: "SUBMIT IT REQUIREMENT"
  },
  "WORKFORCE": {
    title: "WORKFORCE",
    icon: Users,
    submitLabel: "SUBMIT WORKFORCE REQUIREMENT"
  },
  "CIVIL & INFRASTRUCTURE": {
    title: "CIVIL & INFRASTRUCTURE",
    icon: Building,
    submitLabel: "SUBMIT CIVIL REQUIREMENT"
  },
  "BRANDING & DESIGN": {
    title: "BRANDING & DESIGN",
    icon: Palette,
    submitLabel: "SUBMIT BRANDING REQUIREMENT"
  },
  "GENERAL": {
    title: "GENERAL",
    icon: MessageSquare,
    submitLabel: "SUBMIT REQUIREMENT"
  },
  "MEETING": {
    title: "MEETING",
    icon: Calendar,
    submitLabel: "REQUEST MEETING",
    heading: "REQUEST A MEETING",
    desc: "Select a convenient time for us to discuss your requirements."
  }
};

export default function GlobalContactModal() {
  const { isContactModalOpen, closeContactModal, initialCategory } = useContactModal();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("IT & SOFTWARE");
  const [status, setStatus] = useState("idle");
  const [validationErrors, setValidationErrors] = useState({});
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    email: "",
    phoneNo: "",
    message: "", // Maps to requirement/project description/subject
    requirementType: "", // Specific to Branding
    technology: "",
    budget: "",
    timeline: "",
    url: "",
    jobRole: "",
    numWorkers: "",
    workLocation: "",
    skills: "",
    joiningDate: "",
    duration: "",
    additionalDetails: "",
    projectType: "",
    projectValue: "",
    startDate: "",
    completionDate: "",
    tenderRef: "",
    meetingPurpose: "",
    preferredDate: "",
    preferredTime: "",
    meetingType: ""
  });

  useEffect(() => {
    if (initialCategory && categoryConfig[initialCategory]) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  useEffect(() => {
    if (!isContactModalOpen) {
      setTimeout(() => {
        setStatus("idle");
        setFormData({ 
          fullName: "", company: "", email: "", phoneNo: "", message: "", 
          technology: "", budget: "", timeline: "", url: "", 
          jobRole: "", numWorkers: "", workLocation: "", skills: "", joiningDate: "", duration: "", additionalDetails: "",
          projectType: "", projectValue: "", startDate: "", completionDate: "", tenderRef: "",
          meetingPurpose: "", preferredDate: "", preferredTime: "", meetingType: ""
        });
        setValidationErrors({});
      }, 300);
    }
  }, [isContactModalOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = "Required";
    if (!formData.email.trim()) {
      errors.email = "Required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email";
    }
    if (!formData.phoneNo.trim()) {
      errors.phoneNo = "Required";
    } else if (!/^\+?[0-9\s-]{10,15}$/.test(formData.phoneNo)) {
      errors.phoneNo = "Invalid phone number";
    }

    if (selectedCategory === "IT & SOFTWARE") {
      if (!formData.message.trim()) errors.message = "Required"; // Requirement
    } else if (selectedCategory === "WORKFORCE") {
      if (!formData.company.trim()) errors.company = "Required";
      if (!formData.message.trim()) errors.message = "Required"; // Workforce Requirement
      if (!formData.jobRole.trim()) errors.jobRole = "Required";
      if (!formData.numWorkers.trim()) errors.numWorkers = "Required";
      if (!formData.workLocation.trim()) errors.workLocation = "Required";
    } else if (selectedCategory === "CIVIL & INFRASTRUCTURE") {
      if (!formData.projectType.trim()) errors.projectType = "Required";
      if (!formData.workLocation.trim()) errors.workLocation = "Required"; // Project Location
      if (!formData.message.trim()) errors.message = "Required"; // Project Description
    } else if (selectedCategory === "BRANDING & DESIGN") {
      if (!(formData.requirementType || "").trim()) errors.requirementType = "Required";
      if (!formData.message.trim()) errors.message = "Required"; // Project Description
    } else if (selectedCategory === "GENERAL") {
      if (!formData.technology.trim()) errors.technology = "Required"; // Reusing for Subject
      if (!formData.message.trim()) errors.message = "Required"; // Requirement/Message
    } else if (selectedCategory === "MEETING") {
      if (!formData.meetingPurpose.trim()) errors.meetingPurpose = "Required";
      if (!formData.preferredDate.trim()) errors.preferredDate = "Required";
      if (!formData.preferredTime.trim()) errors.preferredTime = "Required";
      if (!formData.meetingType.trim()) errors.meetingType = "Required";
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'loading') return;

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setStatus('loading');
    const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    const API_BASE_URL = isLocal ? (process.env.REACT_APP_API_BASE_URL || "") : "";

    // Mapping custom fields to message for existing backend compatibility
    let formattedMessage = `Category: ${selectedCategory}\n\n`;

    if (selectedCategory === "IT & SOFTWARE") {
      formattedMessage += `Requirement: ${formData.message}\n`;
      if (formData.technology) formattedMessage += `Technology / Platform: ${formData.technology}\n`;
      if (formData.timeline) formattedMessage += `Expected Timeline: ${formData.timeline}\n`;
      if (formData.url) formattedMessage += `Existing URL: ${formData.url}\n`;
    } else if (selectedCategory === "WORKFORCE") {
      formattedMessage += `Workforce Requirement: ${formData.message}\n`;
      formattedMessage += `Job Role: ${formData.jobRole}\n`;
      formattedMessage += `Number of Workers: ${formData.numWorkers}\n`;
      formattedMessage += `Location: ${formData.workLocation}\n`;
      if (formData.skills) formattedMessage += `Required Skills: ${formData.skills}\n`;
      if (formData.joiningDate) formattedMessage += `Expected Joining Date: ${formData.joiningDate}\n`;
      if (formData.duration) formattedMessage += `Duration: ${formData.duration}\n`;
      if (formData.additionalDetails) formattedMessage += `Additional Details: ${formData.additionalDetails}\n`;
    } else if (selectedCategory === "CIVIL & INFRASTRUCTURE") {
      formattedMessage += `Project Type: ${formData.projectType}\n`;
      formattedMessage += `Project Location: ${formData.workLocation}\n`;
      formattedMessage += `Project Description: ${formData.message}\n`;
      if (formData.projectValue) formattedMessage += `Estimated Value: ${formData.projectValue}\n`;
      if (formData.startDate) formattedMessage += `Expected Start Date: ${formData.startDate}\n`;
      if (formData.completionDate) formattedMessage += `Expected Completion: ${formData.completionDate}\n`;
      if (formData.tenderRef) formattedMessage += `Tender/Reference: ${formData.tenderRef}\n`;
    } else if (selectedCategory === "BRANDING & DESIGN") {
      formattedMessage += `Requirement Type: ${formData.requirementType}\n`;
      formattedMessage += `Project Description: ${formData.message}\n`;
    } else if (selectedCategory === "GENERAL") {
      formattedMessage += `Subject: ${formData.technology}\n`; // Mapped subject to technology
      formattedMessage += `Requirement/Message: ${formData.message}\n`;
    } else if (selectedCategory === "MEETING") {
      formattedMessage += `Meeting Purpose: ${formData.meetingPurpose}\n`;
      formattedMessage += `Preferred Date: ${formData.preferredDate}\n`;
      formattedMessage += `Preferred Time: ${formData.preferredTime}\n`;
      formattedMessage += `Meeting Type: ${formData.meetingType}\n`;
      if (formData.message) formattedMessage += `Additional Message: ${formData.message}\n`;
    }

    const currentPage = location.pathname === '/' ? 'home' : location.pathname.substring(1);
    
    // Using interest field for backward compatibility with DTO
    let interestValue = selectedCategory;
    if (selectedCategory === "IT & SOFTWARE") interestValue = "IT_SOFTWARE";
    if (selectedCategory === "CIVIL & INFRASTRUCTURE") interestValue = "CIVIL_INFRASTRUCTURE";
    if (selectedCategory === "BRANDING & DESIGN") interestValue = "BRANDING_DESIGN";

    const payload = {
      fullName: formData.fullName,
      company: formData.company,
      email: formData.email,
      phoneNo: formData.phoneNo,
      interest: interestValue,
      estimatedBudget: formData.budget || "Not Specified",
      message: formattedMessage,
      source: `WEBSITE - ${currentPage}`
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact/created`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok || response.status === 201) {
        toast.success("Request Submitted Successfully!");
        closeContactModal();
      } else {
        setStatus("idle");
        toast.error("Failed to submit request. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setStatus("idle");
      toast.error("An error occurred. Please try again.");
    }
  };

  const currentConfig = categoryConfig[selectedCategory];

  return (
    <AnimatePresence>
      {isContactModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={closeContactModal}
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl bg-[#0A101D] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0 bg-[#060A14]">
              <div>
                <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
                  {selectedCategory === "MEETING" ? "REQUEST A MEETING" : "DISCUSS YOUR REQUIREMENT"}
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  {selectedCategory === "MEETING" 
                    ? "What would you like to discuss?" 
                    : "Tell us what you are looking for. Our team will review your requirement and connect with you."}
                </p>
              </div>
              <button onClick={closeContactModal} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors shrink-0">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col md:flex-row">
                  {/* Sidebar Categories */}
                  <div className="w-full md:w-64 bg-[#060A14] border-b md:border-b-0 md:border-r border-white/10 p-6 flex flex-row md:flex-col gap-3 overflow-x-auto md:overflow-y-auto shrink-0">
                    <div className="hidden md:block mb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                      What can we help you with? *
                    </div>
                    {Object.entries(categoryConfig).map(([key, config]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => {
                          setSelectedCategory(key);
                          setValidationErrors({});
                        }}
                        className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-300 text-left flex-shrink-0 md:flex-shrink ${
                          selectedCategory === key 
                            ? 'bg-qx-primary/10 border border-qx-primary/30 text-white' 
                            : 'bg-transparent border border-transparent text-gray-400 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <config.icon size={20} className={selectedCategory === key ? 'text-qx-primary' : ''} />
                        <span className="font-semibold text-sm whitespace-nowrap md:whitespace-normal">{config.title}</span>
                      </button>
                    ))}
                  </div>

                  {/* Form Area */}
                  <div className="flex-1 p-6 md:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {status === 'error' && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                          Something went wrong. Please try again or email us directly at contact@qevrix.in.
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Full Name *</label>
                          <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className={`w-full bg-[#111827] border ${validationErrors.fullName ? 'border-red-500' : 'border-white/10 focus:border-qx-primary'} rounded-xl px-4 py-3.5 text-white text-sm outline-none transition-colors placeholder:text-gray-600`} placeholder="Your full name" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
                            {selectedCategory === "CIVIL & INFRASTRUCTURE" ? "Company / Organization" : "Company Name"} {selectedCategory === "WORKFORCE" && "*"}
                          </label>
                          <input type="text" name="company" value={formData.company} onChange={handleInputChange} className={`w-full bg-[#111827] border ${validationErrors.company ? 'border-red-500' : 'border-white/10 focus:border-qx-primary'} rounded-xl px-4 py-3.5 text-white text-sm outline-none transition-colors placeholder:text-gray-600`} placeholder="Your company name" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Email *</label>
                          <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={`w-full bg-[#111827] border ${validationErrors.email ? 'border-red-500' : 'border-white/10 focus:border-qx-primary'} rounded-xl px-4 py-3.5 text-white text-sm outline-none transition-colors placeholder:text-gray-600`} placeholder="you@company.com" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Phone *</label>
                          <input type="tel" name="phoneNo" value={formData.phoneNo} onChange={handleInputChange} className={`w-full bg-[#111827] border ${validationErrors.phoneNo ? 'border-red-500' : 'border-white/10 focus:border-qx-primary'} rounded-xl px-4 py-3.5 text-white text-sm outline-none transition-colors placeholder:text-gray-600`} placeholder="+91 99999 99999" />
                        </div>
                      </div>

                      {/* --- IT & SOFTWARE FIELDS --- */}
                      {selectedCategory === "IT & SOFTWARE" && (
                        <>
                          <div>
                            <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">IT / Software Requirement *</label>
                            <textarea name="message" value={formData.message} onChange={handleInputChange} rows={3} className={`w-full bg-[#111827] border ${validationErrors.message ? 'border-red-500' : 'border-white/10 focus:border-qx-primary'} rounded-xl px-4 py-4 text-white text-sm outline-none transition-colors resize-none placeholder:text-gray-600`} placeholder="Example: We need a Java Spring Boot application, React frontend, API development, maintenance or application support..."></textarea>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Technology / Platform</label>
                              <select name="technology" value={formData.technology} onChange={handleInputChange} className="w-full bg-[#111827] border border-white/10 focus:border-qx-primary rounded-xl px-4 py-3.5 text-white text-sm outline-none transition-colors appearance-none">
                                <option value="" className="bg-[#111827] text-gray-400">Select Platform</option>
                                <option value="Java / Spring Boot">Java / Spring Boot</option>
                                <option value="React">React</option>
                                <option value="Node.js">Node.js</option>
                                <option value="Salesforce">Salesforce</option>
                                <option value="AI / Automation">AI / Automation</option>
                                <option value="Cloud / DevOps">Cloud / DevOps</option>
                                <option value="Web Development">Web Development</option>
                                <option value="Mobile App">Mobile App</option>
                                <option value="IT Support">IT Support</option>
                                <option value="Other">Other</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Budget</label>
                              <input type="text" name="budget" value={formData.budget} onChange={handleInputChange} className="w-full bg-[#111827] border border-white/10 focus:border-qx-primary rounded-xl px-4 py-3.5 text-white text-sm outline-none transition-colors placeholder:text-gray-600" placeholder="Estimated budget" />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Expected Timeline</label>
                              <input type="text" name="timeline" value={formData.timeline} onChange={handleInputChange} className="w-full bg-[#111827] border border-white/10 focus:border-qx-primary rounded-xl px-4 py-3.5 text-white text-sm outline-none transition-colors placeholder:text-gray-600" placeholder="E.g., 3 Months" />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Existing Website / URL</label>
                              <input type="url" name="url" value={formData.url} onChange={handleInputChange} className="w-full bg-[#111827] border border-white/10 focus:border-qx-primary rounded-xl px-4 py-3.5 text-white text-sm outline-none transition-colors placeholder:text-gray-600" placeholder="https://" />
                            </div>
                          </div>
                        </>
                      )}

                      {/* --- WORKFORCE FIELDS --- */}
                      {selectedCategory === "WORKFORCE" && (
                        <>
                          <div>
                            <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Workforce Requirement *</label>
                            <textarea name="message" value={formData.message} onChange={handleInputChange} rows={2} className={`w-full bg-[#111827] border ${validationErrors.message ? 'border-red-500' : 'border-white/10 focus:border-qx-primary'} rounded-xl px-4 py-4 text-white text-sm outline-none transition-colors resize-none placeholder:text-gray-600`} placeholder="Example: We require 20 workers for warehouse operations in Bengaluru..."></textarea>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Job Role / Position *</label>
                              <input type="text" name="jobRole" value={formData.jobRole} onChange={handleInputChange} className={`w-full bg-[#111827] border ${validationErrors.jobRole ? 'border-red-500' : 'border-white/10 focus:border-qx-primary'} rounded-xl px-4 py-3.5 text-white text-sm outline-none transition-colors`} placeholder="e.g. Forklift Operator" />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Number of Workers Required *</label>
                              <input type="number" name="numWorkers" value={formData.numWorkers} onChange={handleInputChange} className={`w-full bg-[#111827] border ${validationErrors.numWorkers ? 'border-red-500' : 'border-white/10 focus:border-qx-primary'} rounded-xl px-4 py-3.5 text-white text-sm outline-none transition-colors`} placeholder="e.g. 50" />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Location *</label>
                              <input type="text" name="workLocation" value={formData.workLocation} onChange={handleInputChange} className={`w-full bg-[#111827] border ${validationErrors.workLocation ? 'border-red-500' : 'border-white/10 focus:border-qx-primary'} rounded-xl px-4 py-3.5 text-white text-sm outline-none transition-colors`} placeholder="City, State" />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Required Skills</label>
                              <input type="text" name="skills" value={formData.skills} onChange={handleInputChange} className="w-full bg-[#111827] border border-white/10 focus:border-qx-primary rounded-xl px-4 py-3.5 text-white text-sm outline-none transition-colors" placeholder="e.g. CNC Programming" />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Expected Joining Date</label>
                              <input type="date" name="joiningDate" value={formData.joiningDate} onChange={handleInputChange} className="w-full bg-[#111827] border border-white/10 focus:border-qx-primary rounded-xl px-4 py-3.5 text-white text-sm outline-none transition-colors [&::-webkit-calendar-picker-indicator]:invert" />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Budget / Salary Range</label>
                              <input type="text" name="budget" value={formData.budget} onChange={handleInputChange} className="w-full bg-[#111827] border border-white/10 focus:border-qx-primary rounded-xl px-4 py-3.5 text-white text-sm outline-none transition-colors" placeholder="Estimated budget" />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Duration</label>
                              <input type="text" name="duration" value={formData.duration} onChange={handleInputChange} className="w-full bg-[#111827] border border-white/10 focus:border-qx-primary rounded-xl px-4 py-3.5 text-white text-sm outline-none transition-colors" placeholder="e.g. 6 Months, Permanent" />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Additional Details</label>
                              <input type="text" name="additionalDetails" value={formData.additionalDetails} onChange={handleInputChange} className="w-full bg-[#111827] border border-white/10 focus:border-qx-primary rounded-xl px-4 py-3.5 text-white text-sm outline-none transition-colors" placeholder="Any specific requirements" />
                            </div>
                          </div>
                        </>
                      )}

                      {/* --- BRANDING & DESIGN FIELDS --- */}
                      {selectedCategory === "BRANDING & DESIGN" && (
                        <>
                          <div>
                            <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">What do you need? *</label>
                            <select name="requirementType" value={formData.requirementType} onChange={handleInputChange} className={`w-full bg-[#111827] border ${validationErrors.requirementType ? 'border-red-500' : 'border-white/10 focus:border-qx-primary'} rounded-xl px-4 py-3.5 text-white text-sm outline-none transition-colors appearance-none`}>
                              <option value="" className="bg-[#111827] text-gray-400">Select Requirement</option>
                              <option value="Logo Design" className="bg-[#111827] text-white">Logo Design</option>
                              <option value="Brand Identity" className="bg-[#111827] text-white">Brand Identity</option>
                              <option value="Brand Guidelines" className="bg-[#111827] text-white">Brand Guidelines</option>
                              <option value="Business Card" className="bg-[#111827] text-white">Business Card</option>
                              <option value="Brochure / Flyer" className="bg-[#111827] text-white">Brochure / Flyer</option>
                              <option value="Social Media Design" className="bg-[#111827] text-white">Social Media Design</option>
                              <option value="Packaging Design" className="bg-[#111827] text-white">Packaging Design</option>
                              <option value="Branding Materials" className="bg-[#111827] text-white">Branding Materials</option>
                              <option value="Complete Branding" className="bg-[#111827] text-white">Complete Branding</option>
                              <option value="Other" className="bg-[#111827] text-white">Other</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Project Description *</label>
                            <textarea name="message" value={formData.message} onChange={handleInputChange} rows={4} className={`w-full bg-[#111827] border ${validationErrors.message ? 'border-red-500' : 'border-white/10 focus:border-qx-primary'} rounded-xl px-4 py-4 text-white text-sm outline-none transition-colors resize-none placeholder:text-gray-600`} placeholder="Tell us about your requirement..."></textarea>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Estimated Budget</label>
                              <input type="text" name="budget" value={formData.budget} onChange={handleInputChange} className="w-full bg-[#111827] border border-white/10 focus:border-qx-primary rounded-xl px-4 py-3.5 text-white text-sm outline-none transition-colors" placeholder="e.g., ₹10,000 or Flexible" />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Expected Timeline</label>
                              <input type="text" name="timeline" value={formData.timeline} onChange={handleInputChange} className="w-full bg-[#111827] border border-white/10 focus:border-qx-primary rounded-xl px-4 py-3.5 text-white text-sm outline-none transition-colors" placeholder="e.g., 2 weeks" />
                            </div>
                          </div>
                        </>
                      )}

                      {/* --- CIVIL & INFRASTRUCTURE FIELDS --- */}
                      {selectedCategory === "CIVIL & INFRASTRUCTURE" && (
                        <>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Project Type *</label>
                              <select name="projectType" value={formData.projectType} onChange={handleInputChange} className={`w-full bg-[#111827] border ${validationErrors.projectType ? 'border-red-500' : 'border-white/10 focus:border-qx-primary'} rounded-xl px-4 py-3.5 text-white text-sm outline-none transition-colors appearance-none`}>
                                <option value="" className="bg-[#111827] text-gray-400">Select Type</option>
                                <option value="Building Construction">Building Construction</option>
                                <option value="Civil Works">Civil Works</option>
                                <option value="Renovation">Renovation</option>
                                <option value="Infrastructure">Infrastructure</option>
                                <option value="Maintenance">Maintenance</option>
                                <option value="Government Tender">Government Tender</option>
                                <option value="Private Project">Private Project</option>
                                <option value="Other">Other</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Project Location *</label>
                              <input type="text" name="workLocation" value={formData.workLocation} onChange={handleInputChange} className={`w-full bg-[#111827] border ${validationErrors.workLocation ? 'border-red-500' : 'border-white/10 focus:border-qx-primary'} rounded-xl px-4 py-3.5 text-white text-sm outline-none transition-colors`} placeholder="City, State" />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Project Description *</label>
                            <textarea name="message" value={formData.message} onChange={handleInputChange} rows={3} className={`w-full bg-[#111827] border ${validationErrors.message ? 'border-red-500' : 'border-white/10 focus:border-qx-primary'} rounded-xl px-4 py-4 text-white text-sm outline-none transition-colors resize-none placeholder:text-gray-600`} placeholder="Tell us about the project, location, scope of work and current requirement..."></textarea>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Estimated Project Value</label>
                              <input type="text" name="projectValue" value={formData.projectValue} onChange={handleInputChange} className="w-full bg-[#111827] border border-white/10 focus:border-qx-primary rounded-xl px-4 py-3.5 text-white text-sm outline-none transition-colors" placeholder="Optional" />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Tender / Project Reference</label>
                              <input type="text" name="tenderRef" value={formData.tenderRef} onChange={handleInputChange} className="w-full bg-[#111827] border border-white/10 focus:border-qx-primary rounded-xl px-4 py-3.5 text-white text-sm outline-none transition-colors" placeholder="Optional" />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Expected Start Date</label>
                              <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} className="w-full bg-[#111827] border border-white/10 focus:border-qx-primary rounded-xl px-4 py-3.5 text-white text-sm outline-none transition-colors [&::-webkit-calendar-picker-indicator]:invert" />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Expected Completion</label>
                              <input type="date" name="completionDate" value={formData.completionDate} onChange={handleInputChange} className="w-full bg-[#111827] border border-white/10 focus:border-qx-primary rounded-xl px-4 py-3.5 text-white text-sm outline-none transition-colors [&::-webkit-calendar-picker-indicator]:invert" />
                            </div>
                          </div>
                        </>
                      )}

                      {/* --- GENERAL FIELDS --- */}
                      {selectedCategory === "GENERAL" && (
                        <>
                          <div>
                            <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Subject *</label>
                            <input type="text" name="technology" value={formData.technology} onChange={handleInputChange} className={`w-full bg-[#111827] border ${validationErrors.technology ? 'border-red-500' : 'border-white/10 focus:border-qx-primary'} rounded-xl px-4 py-3.5 text-white text-sm outline-none transition-colors`} placeholder="Enquiry Subject" />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Requirement / Message *</label>
                            <textarea name="message" value={formData.message} onChange={handleInputChange} rows={4} className={`w-full bg-[#111827] border ${validationErrors.message ? 'border-red-500' : 'border-white/10 focus:border-qx-primary'} rounded-xl px-4 py-4 text-white text-sm outline-none transition-colors resize-none placeholder:text-gray-600`} placeholder="Tell us how QEVRIX can help you..."></textarea>
                          </div>
                        </>
                      )}

                      {/* --- MEETING FIELDS --- */}
                      {selectedCategory === "MEETING" && (
                        <>
                          <div>
                            <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Meeting Purpose *</label>
                            <input type="text" name="meetingPurpose" value={formData.meetingPurpose} onChange={handleInputChange} className={`w-full bg-[#111827] border ${validationErrors.meetingPurpose ? 'border-red-500' : 'border-white/10 focus:border-qx-primary'} rounded-xl px-4 py-3.5 text-white text-sm outline-none transition-colors`} placeholder="What would you like to discuss?" />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Preferred Date *</label>
                              <input type="date" name="preferredDate" value={formData.preferredDate} onChange={handleInputChange} className={`w-full bg-[#111827] border ${validationErrors.preferredDate ? 'border-red-500' : 'border-white/10 focus:border-qx-primary'} rounded-xl px-4 py-3.5 text-white text-sm outline-none transition-colors [&::-webkit-calendar-picker-indicator]:invert`} />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Preferred Time *</label>
                              <input type="time" name="preferredTime" value={formData.preferredTime} onChange={handleInputChange} className={`w-full bg-[#111827] border ${validationErrors.preferredTime ? 'border-red-500' : 'border-white/10 focus:border-qx-primary'} rounded-xl px-4 py-3.5 text-white text-sm outline-none transition-colors [&::-webkit-calendar-picker-indicator]:invert`} />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Meeting Type *</label>
                              <select name="meetingType" value={formData.meetingType} onChange={handleInputChange} className={`w-full bg-[#111827] border ${validationErrors.meetingType ? 'border-red-500' : 'border-white/10 focus:border-qx-primary'} rounded-xl px-4 py-3.5 text-white text-sm outline-none transition-colors appearance-none`}>
                                <option value="" className="bg-[#111827] text-gray-400">Select Type</option>
                                <option value="Google Meet">Google Meet</option>
                                <option value="Phone Call">Phone Call</option>
                                <option value="In-person Meeting">In-person Meeting</option>
                              </select>
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Additional Message</label>
                            <textarea name="message" value={formData.message} onChange={handleInputChange} rows={3} className="w-full bg-[#111827] border border-white/10 focus:border-qx-primary rounded-xl px-4 py-4 text-white text-sm outline-none transition-colors resize-none placeholder:text-gray-600" placeholder="Optional details..."></textarea>
                          </div>
                        </>
                      )}

                      <div className="pt-2">
                        <button 
                          type="submit"
                          disabled={status === 'loading'}
                          className="w-full bg-qx-primary text-white font-bold py-4 rounded-xl hover:bg-qx-primaryHover transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,90,0,0.2)] hover:shadow-[0_0_30px_rgba(255,90,0,0.4)] disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {status === 'loading' ? <><Loader2 size={20} className="animate-spin" /> Submitting...</> : <>{currentConfig.submitLabel} <ArrowRight size={20} /></>}
                        </button>
                      </div>
                    </form>
                  </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
