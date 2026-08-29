import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  UploadCloud,
  FileText,
  X,
  CheckCircle2,
  Briefcase,
  User
} from 'lucide-react';
import { Link } from 'react-router-dom';
import QevrixNavbar from '../components/landing/QevrixNavbar';
import QevrixFooter from '../components/landing/QevrixFooter';

export default function CareerApplicationPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    location: '',
    experience: '',
    skills: '',
    linkedin: '',
    portfolio: '',
    coverNote: ''
  });

  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle, loading, success
  const fileInputRef = useRef(null);

  useEffect(() => {
    document.title = "Apply to QEVRIX | Career Application";
    window.scrollTo(0, 0);

    const updateMetaTag = (name, property, content) => {
      let element = document.querySelector(`meta[${name ? `name="${name}"` : `property="${property}"`}]`);
      if (!element) {
        element = document.createElement('meta');
        if (name) element.setAttribute('name', name);
        if (property) element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const updateCanonical = (url) => {
      let element = document.querySelector('link[rel="canonical"]');
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', 'canonical');
        document.head.appendChild(element);
      }
      element.setAttribute('href', url);
    };

    const desc = "Submit your profile to QEVRIX for current or future career opportunities across our business areas.";
    const url = "https://qevrix.in/careers/apply";
    const title = "Apply to QEVRIX | Career Application";

    updateMetaTag('description', '', desc);
    updateMetaTag('', 'og:title', title);
    updateMetaTag('', 'og:description', desc);
    updateMetaTag('', 'og:url', url);
    updateMetaTag('', 'og:type', 'website');
    updateMetaTag('twitter:card', '', 'summary_large_image');
    updateMetaTag('twitter:title', '', title);
    updateMetaTag('twitter:description', '', desc);
    updateCanonical(url);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for the field being typed in
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    validateAndSetFile(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    validateAndSetFile(droppedFile);
  };

  const validateAndSetFile = (selectedFile) => {
    setFileError('');
    if (!selectedFile) return;

    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (!validTypes.includes(selectedFile.type) && !selectedFile.name.match(/\.(pdf|doc|docx)$/i)) {
      setFileError('Please upload a PDF, DOC, or DOCX file.');
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setFileError('File size must be under 5 MB.');
      return;
    }

    setFile(selectedFile);
  };

  const removeFile = () => {
    setFile(null);
    setFileError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone Number is required.';
    } else if (!/^\+?[0-9\s-]{8,15}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number.';
    }
    if (!formData.position) newErrors.position = 'Please select a Position / Area of Interest.';
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Scroll to top of form to see errors
      const formEl = document.getElementById('application-form');
      if (formEl) formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    setStatus('loading');
    
    const subject = encodeURIComponent(`Career Application - ${formData.fullName} - ${formData.position}`);
    
    const bodyText = `Personal Information
----------------------------------------
Full Name: ${formData.fullName}
Email Address: ${formData.email}
Phone Number: ${formData.phone}
Location: ${formData.location || 'N/A'}

Professional Details
----------------------------------------
Position / Area of Interest: ${formData.position}
Experience Level: ${formData.experience || 'N/A'}
Key Skills: ${formData.skills || 'N/A'}
LinkedIn Profile: ${formData.linkedin || 'N/A'}
Portfolio / Website: ${formData.portfolio || 'N/A'}

Resume
----------------------------------------
Resume File Selected: ${file ? file.name : 'No file selected. Please attach manually.'}

Cover Note
----------------------------------------
${formData.coverNote || 'N/A'}`;

    const body = encodeURIComponent(bodyText);

    setTimeout(() => {
      window.location.href = `mailto:contact@qevrix.in?subject=${subject}&body=${body}`;
      setStatus('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);
  };

  const formControlClass = (fieldName) => `
    w-full px-4 py-3 bg-qx-background text-white placeholder-qx-textMuted rounded-xl outline-none transition-all duration-300
    border border-qx-border focus:border-qx-primary focus:ring-4 focus:ring-qx-primary/10 hover:border-qx-borderHover
    ${errors[fieldName] ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/10" : ""}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className="min-h-screen bg-[#060A14] font-sans text-qx-text selection:bg-qx-primary selection:text-white relative">
      <QevrixNavbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden border-b border-white/5 bg-[#0A101D]">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-qx-primary/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-[800px] mx-auto px-6 relative z-10 text-center">
          <Link to="/careers" className="inline-flex items-center gap-2 text-qx-textSecondary hover:text-white transition-colors mb-6 text-sm font-medium">
            <ArrowLeft size={16} /> Back to Careers
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Submit Your Profile
            </h1>
            <p className="text-qx-textSecondary text-lg">
              We are always interested in meeting talented people. Share your profile with QEVRIX for current or future opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 relative">
        <div className="max-w-[800px] mx-auto px-6">
          {status === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-qx-surface border border-qx-border rounded-2xl p-10 text-center shadow-lg"
            >
              <div className="h-20 w-20 bg-qx-success/10 border border-qx-success/20 text-qx-success rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">Application details prepared</h3>
              <p className="text-qx-textSecondary text-lg max-w-lg mx-auto mb-10 leading-relaxed">
                Your email client will open with the application details. Please attach your selected resume before sending the email to <strong>contact@qevrix.in</strong>.
              </p>
              <Link 
                to="/careers" 
                className="inline-flex px-8 py-3 bg-qx-primary hover:bg-blue-600 text-white font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]"
              >
                Back to Careers
              </Link>
            </motion.div>
          ) : (
            <div className="bg-qx-surface border border-qx-border rounded-2xl p-8 md:p-10 shadow-lg relative" id="application-form">
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 border-b border-white/5 pb-2">
                    <User size={18} className="text-qx-primary" /> Personal Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6 pt-2">
                    <div>
                      <label className="block text-[13px] font-semibold text-white mb-2">Full Name *</label>
                      <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Your full name" className={formControlClass('fullName')} />
                      {errors.fullName && <p className="text-red-400 text-[12px] font-medium mt-1.5">{errors.fullName}</p>}
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-white mb-2">Email Address *</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="you@example.com" className={formControlClass('email')} />
                      {errors.email && <p className="text-red-400 text-[12px] font-medium mt-1.5">{errors.email}</p>}
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className="block text-[13px] font-semibold text-white mb-2">Phone Number *</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="e.g. +91 99999 99999" className={formControlClass('phone')} />
                      {errors.phone && <p className="text-red-400 text-[12px] font-medium mt-1.5">{errors.phone}</p>}
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-white mb-2">Location</label>
                      <input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="City, State, Country" className={formControlClass('location')} />
                    </div>
                  </div>
                </div>

                {/* Professional Details */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 border-b border-white/5 pb-2 mt-10">
                    <Briefcase size={18} className="text-qx-primary" /> Professional Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6 pt-2">
                    <div>
                      <label className="block text-[13px] font-semibold text-white mb-2">Position / Area of Interest *</label>
                      <select name="position" value={formData.position} onChange={handleInputChange} className={formControlClass('position')}>
                        <option value="">Select an area</option>
                        <option value="Software & Technology">Software & Technology</option>
                        <option value="AI & Automation">AI & Automation</option>
                        <option value="Workforce Solutions">Workforce Solutions</option>
                        <option value="Civil & Infrastructure">Civil & Infrastructure</option>
                        <option value="Business Operations">Business Operations</option>
                      </select>
                      {errors.position && <p className="text-red-400 text-[12px] font-medium mt-1.5">{errors.position}</p>}
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-white mb-2">Experience Level</label>
                      <select name="experience" value={formData.experience} onChange={handleInputChange} className={formControlClass('experience')}>
                        <option value="">Select experience</option>
                        <option value="Fresher">Fresher</option>
                        <option value="0–2 Years">0–2 Years</option>
                        <option value="2–5 Years">2–5 Years</option>
                        <option value="5+ Years">5+ Years</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-6">
                    <label className="block text-[13px] font-semibold text-white mb-2">Key Skills</label>
                    <input type="text" name="skills" value={formData.skills} onChange={handleInputChange} placeholder="e.g. React, Node.js, Project Management, AutoCAD" className={formControlClass('skills')} />
                  </div>
                </div>

                {/* Links */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[13px] font-semibold text-white mb-2">LinkedIn Profile</label>
                    <input type="url" name="linkedin" value={formData.linkedin} onChange={handleInputChange} placeholder="https://linkedin.com/in/..." className={formControlClass('linkedin')} />
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-white mb-2">Portfolio / Website</label>
                    <input type="url" name="portfolio" value={formData.portfolio} onChange={handleInputChange} placeholder="https://..." className={formControlClass('portfolio')} />
                  </div>
                </div>

                {/* Resume Upload */}
                <div>
                  <label className="block text-[13px] font-semibold text-white mb-2">Resume / CV</label>
                  <div 
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                      file ? 'border-qx-primary bg-qx-primary/5' : 
                      fileError ? 'border-red-500/50 bg-red-500/5' : 
                      'border-qx-border hover:border-qx-primary/50 hover:bg-white/[0.02]'
                    }`}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                  >
                    {!file ? (
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-qx-textSecondary mb-4">
                          <UploadCloud size={24} />
                        </div>
                        <p className="text-white font-medium mb-1">Drag and drop your resume here</p>
                        <p className="text-[12px] text-qx-textMuted mb-4">PDF, DOC, DOCX (Max 5MB)</p>
                        <button 
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                          Browse Files
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-12 h-12 bg-qx-primary/20 text-qx-primary rounded-full flex items-center justify-center mb-3">
                          <FileText size={24} />
                        </div>
                        <p className="text-white font-medium mb-1 truncate max-w-full px-4">{file.name}</p>
                        <p className="text-[12px] text-qx-textSecondary mb-2">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        <p className="text-[12px] text-qx-primary mb-4 px-4 text-center">Your email client will open with the application details. Please attach your selected resume before sending the email.</p>
                        <button 
                          type="button"
                          onClick={removeFile}
                          className="text-red-400 hover:text-red-300 text-sm font-medium flex items-center gap-1 transition-colors"
                        >
                          <X size={16} /> Remove File
                        </button>
                      </div>
                    )}
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileChange} 
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
                      className="hidden" 
                    />
                  </div>
                  {fileError && <p className="text-red-400 text-[12px] font-medium mt-2">{fileError}</p>}
                </div>

                {/* Cover Note */}
                <div>
                  <label className="block text-[13px] font-semibold text-white mb-2">Cover Note / Introduction</label>
                  <textarea 
                    name="coverNote" 
                    rows="4" 
                    value={formData.coverNote} 
                    onChange={handleInputChange} 
                    placeholder="Tell us a bit about yourself and what you're looking for..." 
                    className={formControlClass('coverNote')}
                  ></textarea>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full h-14 bg-qx-primary text-white font-bold rounded-xl hover:bg-qx-primaryHover transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] disabled:opacity-70 disabled:cursor-not-allowed text-[15px]"
                  >
                    {status === 'loading' ? 'Submitting...' : 'Submit Application →'}
                  </button>
                  <p className="text-center text-[12px] text-qx-textSecondary mt-4 leading-relaxed max-w-md mx-auto">
                    By submitting your profile, you agree that QEVRIX may review your information for relevant career opportunities.
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>

      <QevrixFooter />
    </div>
  );
}
