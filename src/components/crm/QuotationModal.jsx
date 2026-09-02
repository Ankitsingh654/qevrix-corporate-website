import React, { useState, useEffect, useContext } from 'react';
import { X, Search } from 'lucide-react';
import { LeadContext } from '../../context/LeadContext';

export default function QuotationModal({ isOpen, onClose, onSave, quotationLead }) {
  const { leads } = useContext(LeadContext);
  
  const generateQuotationNumber = () => {
    const year = new Date().getFullYear();
    const randomId = Math.floor(Math.random() * 900) + 100;
    return `QEVRIX-QTN-${year}-${randomId}`;
  };

  const getDefaultTerms = (service) => {
    let paymentTerms = `Commercial & Payment Terms:
- Project Initiation — 40% advance
- Development Milestone — 30%
- UAT / Pre-launch — 20%
- Go-live / Handover — 10%

For Managed Services:
- 100% monthly billing in advance unless otherwise agreed.`;

    let specificNote = `Note:
GST extra as applicable. Third-party costs such as hosting, domain, SMS, WhatsApp/API charges, paid plugins, licenses, cloud infrastructure, Salesforce licenses and advertising spend are excluded unless expressly included.`;

    if (service === 'Civil & Infrastructure') {
      paymentTerms = `Commercial & Payment Terms:
- Payment terms as per agreed Work Order / Contract.`;
      specificNote = `Note:
GST extra as applicable. Final commercial is subject to BOQ variations, site conditions, quantities, material specifications, statutory approvals and execution timelines.`;
    } else if (service === 'Workforce Solutions') {
      paymentTerms = `Commercial & Payment Terms:
- Payment terms as per agreed workforce engagement / contract.`;
      specificNote = `Note:
GST extra as applicable. Final commercial depends on skill level, deployment location, shift pattern, contract duration, volume, supervision requirements and statutory/compliance obligations.`;
    }

    return `${paymentTerms}

${specificNote}

Terms & Conditions:
1. All rates are indicative and subject to final scope, technical specifications, project complexity and contractual requirements.
2. A detailed SOW, BOQ or project proposal will supersede indicative rate ranges for the specific engagement.
3. Any additional requirement or change request outside the agreed scope will be quoted separately.
4. Client is responsible for timely approvals, content, credentials, data and required third-party access.
5. Timelines depend on scope, dependencies, approvals and required client inputs.
6. Third-party subscriptions, licenses, infrastructure and media/ad spend are billed separately unless included in writing.
7. Confidentiality, IP ownership, warranty, SLA, data protection and support terms will be defined in the applicable agreement/SOW.
8. Workforce deployments will follow the agreed engagement model for statutory and deployment-related costs.
9. Civil/infrastructure projects are subject to site conditions, BOQ variations, statutory approvals and material specifications.
10. Quotation validity: 15 days from the date of issue, unless otherwise stated.`;
  };

  const emptyWorkforceItem = {
    id: Date.now().toString(),
    skillLevel: 'Skilled',
    jobRole: '',
    deploymentLocation: '',
    shift: '',
    contractDuration: '',
    quantity: 1,
    unit: 'Resource/Month',
    rate: 0,
    discount: 0,
    tax: 18
  };

  const [formData, setFormData] = useState({
    id: '',
    leadId: '',
    quotationNumber: '',
    quotationDate: new Date().toISOString().split('T')[0],
    quotationValidUntil: '',
    quotationStatus: 'Draft',
    quotationService: '',
    quotationSubService: '',
    quotationQuantity: 1,
    quotationUnit: '',
    quotationRate: 0,
    quotationDiscount: 0,
    quotationTax: 18,
    quotationAmount: 0,
    quotationRequirement: '',
    quotationTerms: getDefaultTerms(''),
    workforceLineItems: [emptyWorkforceItem],
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (quotationLead) {
        setFormData({
          id: quotationLead.id,
          leadId: quotationLead.leadId,
          quotationNumber: quotationLead.quotationNumber || generateQuotationNumber(),
          quotationDate: quotationLead.quotationDate || new Date().toISOString().split('T')[0],
          quotationValidUntil: quotationLead.quotationValidUntil || (() => {
            const d = new Date(quotationLead.quotationDate || new Date());
            d.setDate(d.getDate() + 15);
            return d.toISOString().split('T')[0];
          })(),
          quotationStatus: quotationLead.quotationStatus || 'Draft',
          quotationService: quotationLead.quotationService || quotationLead.service || '',
          quotationSubService: quotationLead.quotationSubService || quotationLead.subService || '',
          quotationQuantity: quotationLead.quotationQuantity || 1,
          quotationUnit: quotationLead.quotationUnit || '',
          quotationRate: quotationLead.quotationRate || 0,
          quotationDiscount: quotationLead.quotationDiscount || 0,
          quotationTax: quotationLead.quotationTax !== undefined ? quotationLead.quotationTax : 18,
          quotationAmount: quotationLead.quotationAmount || 0,
          quotationRequirement: quotationLead.quotationRequirement || quotationLead.requirement || '',
          quotationTerms: quotationLead.quotationTerms || getDefaultTerms(quotationLead.quotationService || quotationLead.service || ''),
          workforceLineItems: quotationLead.workforceLineItems && quotationLead.workforceLineItems.length > 0 ? quotationLead.workforceLineItems : [{ ...emptyWorkforceItem }],
        });
      } else {
        const defaultValid = new Date();
        defaultValid.setDate(defaultValid.getDate() + 15);
        setFormData({
          id: '',
          leadId: '',
          quotationNumber: generateQuotationNumber(),
          quotationDate: new Date().toISOString().split('T')[0],
          quotationValidUntil: defaultValid.toISOString().split('T')[0],
          quotationStatus: 'Draft',
          quotationService: '',
          quotationSubService: '',
          quotationQuantity: 1,
          quotationUnit: '',
          quotationRate: 0,
          quotationDiscount: 0,
          quotationTax: 18,
          quotationAmount: 0,
          quotationRequirement: '',
          quotationTerms: getDefaultTerms(''),
          workforceLineItems: [{ ...emptyWorkforceItem }],
        });
      }
      setSearchTerm('');
    }
  }, [isOpen, quotationLead]);

  // Recalculate amount when quantity, rate, discount, or tax change
  useEffect(() => {
    let finalTotal = 0;
    
    if (formData.quotationService === 'Workforce Solutions') {
      finalTotal = formData.workforceLineItems.reduce((acc, item) => {
        const qty = parseFloat(item.quantity) || 0;
        const rate = parseFloat(item.rate) || 0;
        const discount = parseFloat(item.discount) || 0;
        const taxPercent = parseFloat(item.tax) || 0;
        const subtotal = (qty * rate) - discount;
        const taxAmount = subtotal * (taxPercent / 100);
        return acc + subtotal + taxAmount;
      }, 0);
    } else {
      const qty = parseFloat(formData.quotationQuantity) || 0;
      const rate = parseFloat(formData.quotationRate) || 0;
      const discount = parseFloat(formData.quotationDiscount) || 0;
      const taxPercent = parseFloat(formData.quotationTax) || 0;
      
      const subtotal = (qty * rate) - discount;
      const taxAmount = subtotal * (taxPercent / 100);
      finalTotal = subtotal + taxAmount;
    }
    
    if (!isNaN(finalTotal)) {
        setFormData(prev => ({ ...prev, quotationAmount: finalTotal }));
    }
  }, [
    formData.quotationQuantity, formData.quotationRate, formData.quotationDiscount, formData.quotationTax, 
    formData.workforceLineItems, formData.quotationService
  ]);

  const itSoftwareRates = [
    { label: "Corporate Website – Basic (₹35k - ₹75k)", value: 35000 },
    { label: "Business Website – Premium (₹75k - ₹1.5L)", value: 75000 },
    { label: "Dynamic Website + CMS (₹1.25L - ₹3L)", value: 125000 },
    { label: "E-commerce Website (₹1.75L - ₹4.5L+)", value: 175000 },
    { label: "Custom Web Application (₹2.5L - ₹10L+)", value: 250000 },
    { label: "ERP / Management Portal (₹4L - ₹15L+)", value: 400000 },
    { label: "Android Application (₹1.5L - ₹4L+)", value: 150000 },
    { label: "Android + iOS Application (₹3L - ₹7.5L+)", value: 300000 },
    { label: "Custom Software / Automation (₹2.5L - ₹15L+)", value: 250000 },
    { label: "UI/UX Design (₹25k - ₹1.5L)", value: 25000 },
    { label: "API / Third-party Integration (₹25k - ₹1.5L+)", value: 25000 },
    { label: "Cloud / Server Setup (₹15k - ₹75k+)", value: 15000 },
    { label: "Website AMC (₹30k - ₹1L / year)", value: 30000 }
  ];

  const brandingRates = [
    { label: "Logo & Brand Identity — ₹20,000 – ₹75,000", value: 20000 },
    { label: "Complete Branding Package — ₹50,000 – ₹2,00,000", value: 50000 },
    { label: "Social Media Management — ₹25,000 – ₹75,000 / month", value: 25000 },
    { label: "Performance Marketing — ₹30,000 – ₹1,50,000 / month + ad spend", value: 30000 },
    { label: "SEO — ₹25,000 – ₹1,00,000 / month", value: 25000 },
    { label: "Content & Creative Services — ₹20,000 – ₹75,000 / month", value: 20000 },
    { label: "Corporate Presentation / Pitch Deck — ₹15,000 – ₹50,000", value: 15000 },
    { label: "Digital Marketing 360° — ₹75,000 – ₹2,50,000 / month", value: 75000 }
  ];

  const salesforceRates = [
    { label: "Salesforce Consultation — ₹2,500 – ₹5,000 / hour", value: 2500 },
    { label: "Salesforce Implementation — ₹2,00,000 – ₹10,00,000+", value: 200000 },
    { label: "Customization & Integration — ₹50,000 – ₹5,00,000+", value: 50000 },
    { label: "Data Migration — ₹50,000 – ₹3,00,000+", value: 50000 },
    { label: "Salesforce Support — ₹50,000 – ₹2,50,000 / month", value: 50000 },
    { label: "Dedicated Salesforce Resource — ₹1,00,000 – ₹2,50,000 / month / resource", value: 100000 }
  ];

  const managedItRates = [
    { label: "L1 IT Support Resource — ₹35,000 – ₹60,000 / month", value: 35000 },
    { label: "L2 Technical Resource — ₹60,000 – ₹1,00,000 / month", value: 60000 },
    { label: "Senior IT Engineer — ₹90,000 – ₹1,50,000 / month", value: 90000 },
    { label: "Dedicated Developer — ₹75,000 – ₹1,75,000 / month", value: 75000 },
    { label: "Project Manager — ₹1,00,000 – ₹2,00,000 / month", value: 100000 },
    { label: "Managed IT Support — ₹75,000 – ₹5,00,000 / month", value: 75000 },
    { label: "24×7 Support / NOC — Custom Quote", value: 0 }
  ];

  const engagementPackages = [
    { label: "STARTER — ₹75,000 – ₹2,50,000", value: 75000, scope: "Website / digital presence, branding, basic automation, setup & support" },
    { label: "BUSINESS GROWTH — ₹2,50,000 – ₹10,00,000", value: 250000, scope: "Custom web/app, CRM, automation, branding, digital marketing, MIS, support" },
    { label: "ENTERPRISE / INSTITUTIONAL — ₹10,00,000 – ₹1 Crore+", value: 1000000, scope: "Enterprise software, apps, ERP/MIS, Salesforce, cloud, manpower, managed services" }
  ];

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      
      // Auto-update Valid Until date (+15 days) when Quotation Date is manually changed
      if (name === 'quotationDate') {
        const d = new Date(value);
        if (!isNaN(d.getTime())) {
          d.setDate(d.getDate() + 15);
          updated.quotationValidUntil = d.toISOString().split('T')[0];
        }
      }
      return updated;
    });
  };

  const handleWorkforceChange = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      workforceLineItems: prev.workforceLineItems.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const addWorkforceItem = () => {
    setFormData(prev => ({
      ...prev,
      workforceLineItems: [
        ...prev.workforceLineItems, 
        { ...emptyWorkforceItem, id: Date.now().toString() }
      ]
    }));
  };

  const removeWorkforceItem = (id) => {
    setFormData(prev => ({
      ...prev,
      workforceLineItems: prev.workforceLineItems.filter(item => item.id !== id)
    }));
  };

  const handleSelectLead = (leadId) => {
    const lead = leads.find(l => l.id === leadId);
    setFormData(prev => ({ 
        ...prev, 
        leadId: leadId,
        quotationService: lead?.service || '',
        quotationSubService: lead?.subService || '',
        quotationRequirement: lead?.requirement || '',
        quotationTerms: lead?.quotationTerms || getDefaultTerms(lead?.service)
    }));
    setSearchTerm(lead ? `${lead.name} ${lead.company ? `(${lead.company})` : ''}` : '');
    setIsDropdownOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.leadId) {
      alert('Please select a lead to attach this quotation to.');
      return;
    }
    onSave(formData);
  };

  const availableLeads = leads; // Show all existing leads
  const filteredLeads = availableLeads.filter(l => 
    (l.name && l.name.toLowerCase().includes(searchTerm.toLowerCase())) || 
    (l.company && l.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (l.phone && l.phone.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (l.email && l.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (l.id && l.id.toString().includes(searchTerm))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className="bg-qx-background w-full max-w-4xl rounded-2xl shadow-2xl border border-qx-border flex flex-col"
        style={{ maxHeight: '90vh' }}
      >
        <div className="flex items-center justify-between p-6 border-b border-qx-border shrink-0">
          <div>
            <h2 className="text-xl font-bold text-qx-text">
              {quotationLead ? 'Edit Quotation' : 'Create Quotation'}
            </h2>
            <p className="text-sm text-qx-textSecondary mt-1">
              {quotationLead ? `Update quotation details for ${quotationLead.name}` : 'Attach a new quotation to an existing lead'}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-qx-textSecondary hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          <form id="quotationForm" onSubmit={handleSubmit} className="space-y-8">
            
            {!quotationLead && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold border-b border-qx-border pb-2 text-qx-primary">1. Select Client/Lead</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-3 text-qx-textSecondary" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search by client or company name..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setIsDropdownOpen(true);
                    }}
                    onFocus={() => setIsDropdownOpen(true)}
                    className="w-full bg-qx-surface border border-qx-border rounded-xl pl-10 pr-4 py-2.5 text-qx-text focus:outline-none focus:border-qx-primary transition-colors"
                  />
                
                  {isDropdownOpen && (
                    <div className="absolute z-10 w-full mt-2 bg-qx-surface border border-qx-border rounded-xl max-h-48 overflow-y-auto custom-scrollbar shadow-lg">
                  {filteredLeads.length === 0 ? (
                    <div className="p-4 text-center text-qx-textSecondary text-sm">No eligible leads found.</div>
                  ) : (
                    <div className="divide-y divide-qx-border">
                      {filteredLeads.map(l => (
                        <div 
                          key={l.id} 
                          onClick={() => handleSelectLead(l.id)}
                          className={`p-3 cursor-pointer transition-colors flex justify-between items-center ${formData.leadId === l.id ? 'bg-qx-primary/20 border-l-4 border-qx-primary' : 'hover:bg-white/5 border-l-4 border-transparent'}`}
                        >
                          <div>
                            <div className="font-bold text-qx-text">
                          {l.name} <span className="text-qx-textSecondary font-normal text-sm">({l.company || 'No Company'})</span>
                        </div>
                        <div className="text-sm text-qx-textSecondary mt-1">
                          {l.email} | {l.phone}
                        </div>
                      </div>
                      <div className="text-right flex flex-col items-end justify-center">
                        <div className="text-xs text-qx-primary font-medium px-2 py-1 bg-qx-primary/10 rounded mb-1 whitespace-nowrap">
                          {l.service || 'No Service'}
                        </div>
                        <div className="text-xs text-qx-textSecondary">ID: {l.id}</div>
                      </div>
                    </div>
                  ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
            <div className="space-y-4">
              <h3 className="text-lg font-bold border-b border-qx-border pb-2 text-qx-primary">
                {quotationLead ? '1.' : '2.'} Quotation Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-medium text-qx-textSecondary mb-1">Quotation Number</label>
                  <input
                    type="text"
                    readOnly
                    value={formData.quotationNumber}
                    className="w-full bg-qx-surface/50 border border-qx-border rounded-xl px-4 py-2.5 text-qx-textSecondary focus:outline-none cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-qx-textSecondary mb-1">Quotation Date *</label>
                  <input
                    type="date"
                    name="quotationDate"
                    required
                    value={formData.quotationDate}
                    onChange={handleChange}
                    className="w-full bg-qx-surface border border-qx-border rounded-xl px-4 py-2.5 text-qx-text focus:outline-none focus:border-qx-primary transition-colors [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-qx-textSecondary mb-1">Valid Until *</label>
                  <input
                    type="date"
                    name="quotationValidUntil"
                    required
                    value={formData.quotationValidUntil}
                    onChange={handleChange}
                    className="w-full bg-qx-surface border border-qx-border rounded-xl px-4 py-2.5 text-qx-text focus:outline-none focus:border-qx-primary transition-colors [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-qx-textSecondary mb-1">Status *</label>
                  <select
                    name="quotationStatus"
                    required
                    value={formData.quotationStatus}
                    onChange={handleChange}
                    className="w-full bg-qx-surface border border-qx-border rounded-xl px-4 py-2.5 text-qx-text focus:outline-none focus:border-qx-primary transition-colors appearance-none"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Sent">Sent</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Expired">Expired</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold border-b border-qx-border pb-2 text-qx-primary">
                {quotationLead ? '2.' : '3.'} Service Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-qx-textSecondary mb-1">Service</label>
                  <select
                    name="quotationService"
                    required
                    value={formData.quotationService}
                    onChange={(e) => {
                      const newService = e.target.value;
                      const currentDefault = getDefaultTerms(formData.quotationService);
                      
                      setFormData(prev => {
                        const isCurrentDefault = prev.quotationTerms === currentDefault;
                        return { 
                          ...prev, 
                          quotationService: newService,
                          quotationSubService: '', // Reset sub-service on service change
                          quotationRate: '', 
                          quotationTerms: isCurrentDefault ? getDefaultTerms(newService) : prev.quotationTerms
                        };
                      });
                    }}
                    className="w-full bg-qx-surface border border-qx-border rounded-xl px-4 py-2.5 text-qx-text focus:outline-none focus:border-qx-primary transition-colors appearance-none"
                  >
                    <option value="">Select Service</option>
                    <option value="IT & Software">IT & Software</option>
                    <option value="Workforce Solutions">Workforce Solutions</option>
                    <option value="Branding & Creative Design">Branding & Creative Design</option>
                    <option value="Civil & Infrastructure">Civil & Infrastructure</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-qx-textSecondary mb-1">Sub-Service</label>
                  <select
                    name="quotationSubService"
                    value={formData.quotationSubService}
                    onChange={handleChange}
                    className="w-full bg-qx-surface border border-qx-border rounded-xl px-4 py-2.5 text-qx-text focus:outline-none focus:border-qx-primary transition-colors appearance-none"
                  >
                    <option value="">Select Sub-Service</option>
                    {formData.quotationService === 'Workforce Solutions' && (
                      <>
                        <option value="Skilled Workforce">Skilled Workforce</option>
                        <option value="Unskilled Workforce">Unskilled Workforce</option>
                        <option value="Semi-Skilled Workforce">Semi-Skilled Workforce</option>
                        <option value="Contract Staffing">Contract Staffing</option>
                        <option value="Temporary Staffing">Temporary Staffing</option>
                        <option value="Labour Supply">Labour Supply</option>
                        <option value="Recruitment & Staffing">Recruitment & Staffing</option>
                        <option value="Workforce Management">Workforce Management</option>
                        <option value="Other">Other</option>
                      </>
                    )}
                    {formData.quotationService === 'IT & Software' && (
                      <>
                        <option value="Corporate Website">Corporate Website</option>
                        <option value="E-commerce Website">E-commerce Website</option>
                        <option value="Web Application">Web Application</option>
                        <option value="Mobile App Development">Mobile App Development</option>
                        <option value="Custom Software">Custom Software</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                        <option value="Other">Other</option>
                      </>
                    )}
                    {formData.quotationService === 'Branding & Creative Design' && (
                      <>
                        <option value="Logo & Brand Identity">Logo & Brand Identity</option>
                        <option value="Social Media Management">Social Media Management</option>
                        <option value="Performance Marketing">Performance Marketing</option>
                        <option value="SEO">SEO</option>
                        <option value="Other">Other</option>
                      </>
                    )}
                    {formData.quotationService === 'Civil & Infrastructure' && (
                      <>
                        <option value="Interior & Finishing Works">Interior & Finishing Works</option>
                        <option value="Turnkey Construction">Turnkey Construction</option>
                        <option value="Architectural Design">Architectural Design</option>
                        <option value="Project Management">Project Management</option>
                        <option value="Other">Other</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              {formData.quotationService === 'IT & Software' && (
                <div className="bg-qx-primary/5 border border-qx-primary/20 rounded-xl p-4 mt-4">
                  <label className="block text-xs font-medium text-qx-textSecondary mb-2">Indicative Rate Reference (IT & Software)</label>
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        setFormData(prev => ({ ...prev, quotationRate: e.target.value }));
                      }
                    }}
                    className="w-full bg-qx-surface border border-qx-border rounded-xl px-4 py-2.5 text-qx-text focus:outline-none focus:border-qx-primary transition-colors appearance-none"
                  >
                    <option value="">-- Select a Service Reference --</option>
                    {itSoftwareRates.map((rate, idx) => (
                      <option key={idx} value={rate.value}>{rate.label}</option>
                    ))}
                  </select>
                  <p className="text-xs text-qx-textSecondary mt-2">
                    * Rates are indicative based on QEVRIX Commercial Proposal. This auto-fills the base rate below.
                  </p>
                </div>
              )}

              {formData.quotationService === 'Branding & Creative Design' && (
                <div className="bg-qx-primary/5 border border-qx-primary/20 rounded-xl p-4 mt-4">
                  <label className="block text-xs font-medium text-qx-textSecondary mb-2">Indicative Rate Reference (Branding & Marketing)</label>
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        setFormData(prev => ({ ...prev, quotationRate: e.target.value }));
                      }
                    }}
                    className="w-full bg-qx-surface border border-qx-border rounded-xl px-4 py-2.5 text-qx-text focus:outline-none focus:border-qx-primary transition-colors appearance-none"
                  >
                    <option value="">-- Select a Service Reference --</option>
                    {brandingRates.map((rate, idx) => (
                      <option key={idx} value={rate.value}>{rate.label}</option>
                    ))}
                  </select>
                  <p className="text-xs text-qx-textSecondary mt-2">
                    * Rates are indicative based on QEVRIX Commercial Proposal. This auto-fills the base rate below.
                  </p>
                </div>
              )}

              {formData.quotationService === 'Salesforce / CRM Services' && (
                <div className="bg-qx-primary/5 border border-qx-primary/20 rounded-xl p-4 mt-4">
                  <label className="block text-xs font-medium text-qx-textSecondary mb-2">Indicative Rate Reference (Salesforce / CRM)</label>
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        setFormData(prev => ({ ...prev, quotationRate: e.target.value }));
                      }
                    }}
                    className="w-full bg-qx-surface border border-qx-border rounded-xl px-4 py-2.5 text-qx-text focus:outline-none focus:border-qx-primary transition-colors appearance-none"
                  >
                    <option value="">-- Select a Service Reference --</option>
                    {salesforceRates.map((rate, idx) => (
                      <option key={idx} value={rate.value}>{rate.label}</option>
                    ))}
                  </select>
                  <p className="text-xs text-qx-textSecondary mt-2">
                    * Rates are indicative based on QEVRIX Commercial Proposal. This auto-fills the base rate below.
                  </p>
                </div>
              )}

              {formData.quotationService === 'IT Support & Managed Services' && (
                <div className="bg-qx-primary/5 border border-qx-primary/20 rounded-xl p-4 mt-4">
                  <label className="block text-xs font-medium text-qx-textSecondary mb-2">Indicative Rate Reference (IT Support & Managed Services)</label>
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        setFormData(prev => ({ ...prev, quotationRate: e.target.value }));
                      }
                    }}
                    className="w-full bg-qx-surface border border-qx-border rounded-xl px-4 py-2.5 text-qx-text focus:outline-none focus:border-qx-primary transition-colors appearance-none"
                  >
                    <option value="">-- Select a Service Reference --</option>
                    {managedItRates.map((rate, idx) => (
                      <option key={idx} value={rate.value}>{rate.label}</option>
                    ))}
                  </select>
                  <p className="text-xs text-qx-textSecondary mt-2">
                    * Rates are indicative based on QEVRIX Commercial Proposal. This auto-fills the base rate below.
                  </p>
                </div>
              )}

              {formData.quotationService === 'Workforce Solutions' && (
                <div className="bg-qx-primary/5 border border-qx-primary/20 rounded-xl p-4 mt-4">
                  <h4 className="text-sm font-bold text-qx-text mb-2">Indicative Rate Reference (Workforce Solutions)</h4>
                  <ul className="space-y-1 mb-3">
                    <li className="text-sm text-qx-textSecondary flex justify-between">
                      <span>Pricing Type</span>
                      <span className="font-bold text-qx-text">Custom Quote (Enter rate manually below)</span>
                    </li>
                  </ul>
                  <p className="text-xs text-qx-primary bg-qx-primary/10 p-2 rounded border border-qx-primary/20">
                    * Final commercial depends on skill level, deployment location, shift pattern, contract duration, volume, supervision requirements and statutory/compliance obligations.
                  </p>
                </div>
              )}

              {formData.quotationService === 'Civil & Infrastructure' && (
                <div className="bg-qx-primary/5 border border-qx-primary/20 rounded-xl p-4 mt-4">
                  <h4 className="text-sm font-bold text-qx-text mb-2">Indicative Rate Reference (Civil & Infrastructure)</h4>
                  <ul className="space-y-1 mb-3">
                    <li className="text-sm text-qx-textSecondary flex justify-between">
                      <span>Pricing Type</span>
                      <span className="font-bold text-qx-text">Project Specific / Custom Quote</span>
                    </li>
                    <li className="text-sm text-qx-textSecondary flex justify-between">
                      <span>Commercial Basis</span>
                      <span className="font-bold text-qx-text">BOQ / DPR / Site Assessment / Tender / Work Order</span>
                    </li>
                    <li className="text-sm text-qx-textSecondary mt-2">
                      <span className="font-bold text-qx-text">Engagement Models:</span>
                      <div className="grid grid-cols-2 gap-1 mt-1 pl-2 border-l-2 border-qx-primary/30">
                        <span>• Material + Labour Contract</span>
                        <span>• Labour-only Contract</span>
                        <span>• Turnkey EPC</span>
                        <span>• Project Management</span>
                        <span>• Infrastructure Deployment</span>
                        <span>• Annual Maintenance</span>
                      </div>
                    </li>
                  </ul>
                  <p className="text-xs text-qx-primary bg-qx-primary/10 p-2 rounded border border-qx-primary/20">
                    * Civil and infrastructure projects are quoted on a project-specific basis after review of BOQ, DPR, drawings, site conditions, quantities, material specifications and execution timelines.
                  </p>
                </div>
              )}

              {formData.quotationService === 'Engagement Packages' && (
                <div className="bg-qx-primary/5 border border-qx-primary/20 rounded-xl p-4 mt-4">
                  <h4 className="text-sm font-bold text-qx-text mb-2">Indicative Rate Reference (Engagement Packages)</h4>
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        setFormData(prev => ({ ...prev, quotationRate: e.target.value }));
                      }
                    }}
                    className="w-full bg-qx-surface border border-qx-border rounded-xl px-4 py-2.5 text-qx-text focus:outline-none focus:border-qx-primary transition-colors appearance-none mb-3"
                  >
                    <option value="">-- Select an Engagement Package --</option>
                    {engagementPackages.map((pkg, idx) => (
                      <option key={idx} value={pkg.value}>{pkg.label}</option>
                    ))}
                  </select>
                  
                  <div className="space-y-3 mt-4">
                    {engagementPackages.map((pkg, idx) => (
                      <div key={idx} className="bg-white/5 border border-white/10 p-3 rounded-lg">
                        <div className="font-bold text-qx-text text-sm mb-1">{pkg.label.split(' — ')[0]} <span className="text-qx-textSecondary font-normal">— {pkg.label.split(' — ')[1]}</span></div>
                        <div className="text-xs text-qx-textSecondary"><span className="text-qx-primary/80 font-medium">Scope:</span> {pkg.scope}</div>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-qx-textSecondary mt-3">
                    * Package pricing is indicative. Selecting a package auto-fills the base rate below, which can be manually edited.
                  </p>
                </div>
              )}
            </div>

            {/* 4. Pricing Calculation */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold border-b border-qx-border pb-2 text-qx-primary">
                {quotationLead ? '3.' : '4.'} Pricing Calculation
              </h3>
              
              {formData.quotationService === 'Workforce Solutions' ? (
                <div className="space-y-6">
                  {formData.workforceLineItems.map((item, index) => (
                    <div key={item.id} className="bg-qx-surface border border-qx-border p-4 rounded-xl relative">
                      {formData.workforceLineItems.length > 1 && (
                        <button 
                          type="button" 
                          onClick={() => removeWorkforceItem(item.id)}
                          className="absolute -top-3 -right-3 bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white p-1 rounded-full transition-colors"
                        >
                          <X size={16} />
                        </button>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <label className="block text-xs font-medium text-qx-textSecondary mb-1">Skill Level</label>
                          <select
                            value={item.skillLevel}
                            onChange={(e) => handleWorkforceChange(item.id, 'skillLevel', e.target.value)}
                            className="w-full bg-black/20 border border-qx-border rounded-lg px-3 py-2 text-sm text-qx-text focus:outline-none focus:border-qx-primary transition-colors appearance-none"
                          >
                            <option value="Skilled">Skilled</option>
                            <option value="Semi-Skilled">Semi-Skilled</option>
                            <option value="Unskilled">Unskilled</option>
                          </select>
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs font-medium text-qx-textSecondary mb-1">Job Role / Designation</label>
                          <input
                            type="text"
                            value={item.jobRole}
                            onChange={(e) => handleWorkforceChange(item.id, 'jobRole', e.target.value)}
                            placeholder="e.g. Painter, Supervisor"
                            className="w-full bg-black/20 border border-qx-border rounded-lg px-3 py-2 text-sm text-qx-text focus:outline-none focus:border-qx-primary transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-qx-textSecondary mb-1">Deployment Location</label>
                          <input
                            type="text"
                            value={item.deploymentLocation}
                            onChange={(e) => handleWorkforceChange(item.id, 'deploymentLocation', e.target.value)}
                            className="w-full bg-black/20 border border-qx-border rounded-lg px-3 py-2 text-sm text-qx-text focus:outline-none focus:border-qx-primary transition-colors"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-7 gap-4 border-t border-qx-border pt-4">
                        <div>
                          <label className="block text-xs font-medium text-qx-textSecondary mb-1">Shift</label>
                          <input
                            type="text"
                            value={item.shift}
                            onChange={(e) => handleWorkforceChange(item.id, 'shift', e.target.value)}
                            placeholder="e.g. Day"
                            className="w-full bg-black/20 border border-qx-border rounded-lg px-3 py-2 text-sm text-qx-text focus:outline-none focus:border-qx-primary transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-qx-textSecondary mb-1">Duration</label>
                          <input
                            type="text"
                            value={item.contractDuration}
                            onChange={(e) => handleWorkforceChange(item.id, 'contractDuration', e.target.value)}
                            placeholder="e.g. 6 Months"
                            className="w-full bg-black/20 border border-qx-border rounded-lg px-3 py-2 text-sm text-qx-text focus:outline-none focus:border-qx-primary transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-qx-textSecondary mb-1">Qty</label>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleWorkforceChange(item.id, 'quantity', e.target.value)}
                            className="w-full bg-black/20 border border-qx-border rounded-lg px-3 py-2 text-sm text-qx-text focus:outline-none focus:border-qx-primary transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-qx-textSecondary mb-1">Unit</label>
                          <input
                            type="text"
                            value={item.unit}
                            onChange={(e) => handleWorkforceChange(item.id, 'unit', e.target.value)}
                            className="w-full bg-black/20 border border-qx-border rounded-lg px-3 py-2 text-sm text-qx-text focus:outline-none focus:border-qx-primary transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-qx-textSecondary mb-1">Rate (₹)</label>
                          <input
                            type="number"
                            value={item.rate}
                            onChange={(e) => handleWorkforceChange(item.id, 'rate', e.target.value)}
                            className="w-full bg-black/20 border border-qx-border rounded-lg px-3 py-2 text-sm text-qx-text focus:outline-none focus:border-qx-primary transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-qx-textSecondary mb-1">Disc (₹)</label>
                          <input
                            type="number"
                            value={item.discount}
                            onChange={(e) => handleWorkforceChange(item.id, 'discount', e.target.value)}
                            className="w-full bg-black/20 border border-qx-border rounded-lg px-3 py-2 text-sm text-qx-text focus:outline-none focus:border-qx-primary transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-qx-textSecondary mb-1">Tax (%)</label>
                          <input
                            type="number"
                            value={item.tax}
                            onChange={(e) => handleWorkforceChange(item.id, 'tax', e.target.value)}
                            className="w-full bg-black/20 border border-qx-border rounded-lg px-3 py-2 text-sm text-qx-text focus:outline-none focus:border-qx-primary transition-colors"
                          />
                        </div>
                      </div>
                      
                      <div className="mt-4 text-right">
                        <span className="text-xs text-qx-textSecondary mr-2">Item Total:</span>
                        <span className="text-sm font-bold text-qx-text">
                          ₹{((parseFloat(item.quantity || 0) * parseFloat(item.rate || 0)) - parseFloat(item.discount || 0) + ((parseFloat(item.quantity || 0) * parseFloat(item.rate || 0) - parseFloat(item.discount || 0)) * (parseFloat(item.tax || 0)/100))).toLocaleString('en-IN', {maximumFractionDigits: 2})}
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  <button 
                    type="button" 
                    onClick={addWorkforceItem}
                    className="w-full py-3 border-2 border-dashed border-qx-primary/30 text-qx-primary hover:bg-qx-primary/10 rounded-xl font-bold transition-colors"
                  >
                    + Add Workforce Line Item
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-qx-textSecondary mb-1">Quantity</label>
                    <input
                      type="number"
                      name="quotationQuantity"
                      value={formData.quotationQuantity}
                      onChange={handleChange}
                      className="w-full bg-qx-surface border border-qx-border rounded-xl px-4 py-2.5 text-qx-text focus:outline-none focus:border-qx-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-qx-textSecondary mb-1">Unit</label>
                    <select
                      name="quotationUnit"
                      value={formData.quotationUnit}
                      onChange={handleChange}
                      className="w-full bg-qx-surface border border-qx-border rounded-xl px-4 py-2.5 text-qx-text focus:outline-none focus:border-qx-primary transition-colors appearance-none"
                    >
                      <option value="">Select Unit</option>
                      <option value="Project">Project</option>
                      <option value="Lumpsum">Lumpsum</option>
                      <option value="Hour">Hour</option>
                      <option value="Day">Day</option>
                      <option value="Month">Month</option>
                      <option value="Resource">Resource</option>
                      <option value="Resource/Month">Resource/Month</option>
                      <option value="SQFT">SQFT</option>
                      <option value="SQM">SQM</option>
                      <option value="Unit">Unit</option>
                      <option value="As per BOQ">As per BOQ</option>
                      <option value="Custom">Custom</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-qx-textSecondary mb-1">Base Rate (₹)</label>
                    <input
                      type="number"
                      name="quotationRate"
                      value={formData.quotationRate}
                      onChange={handleChange}
                      className="w-full bg-qx-surface border border-qx-border rounded-xl px-4 py-2.5 text-qx-text focus:outline-none focus:border-qx-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-qx-textSecondary mb-1">Discount (₹)</label>
                    <input
                      type="number"
                      name="quotationDiscount"
                      value={formData.quotationDiscount}
                      onChange={handleChange}
                      className="w-full bg-qx-surface border border-qx-border rounded-xl px-4 py-2.5 text-qx-text focus:outline-none focus:border-qx-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-qx-textSecondary mb-1">GST/Tax (%)</label>
                    <input
                      type="number"
                      name="quotationTax"
                      value={formData.quotationTax}
                      onChange={handleChange}
                      className="w-full bg-qx-surface border border-qx-border rounded-xl px-4 py-2.5 text-qx-text focus:outline-none focus:border-qx-primary transition-colors"
                    />
                  </div>
                </div>
              )}
            </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex justify-between items-center mt-4">
                <span className="text-sm font-medium text-qx-textSecondary">Calculated Final Amount:</span>
                <div className="flex items-center gap-3">
                   <span className="text-qx-textSecondary font-bold text-lg">₹</span>
                   <input
                     type="number"
                     name="quotationAmount"
                     required
                     value={formData.quotationAmount}
                     onChange={handleChange}
                     className="bg-qx-surface border border-qx-border rounded-xl px-4 py-2 text-qx-text text-right font-bold text-lg focus:outline-none focus:border-qx-primary transition-colors w-40"
                   />
                </div>
              </div>

            {/* 5. Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold border-b border-qx-border pb-2 text-qx-primary">
                {quotationLead ? '4.' : '5.'} Additional Details
              </h3>
              
              <div>
                <label className="block text-xs font-medium text-qx-textSecondary mb-1">Requirement / Scope of Work</label>
                <textarea
                  name="quotationRequirement"
                  value={formData.quotationRequirement}
                  onChange={handleChange}
                  rows="3"
                  className="w-full bg-qx-surface border border-qx-border rounded-xl px-4 py-2.5 text-qx-text focus:outline-none focus:border-qx-primary transition-colors custom-scrollbar"
                  placeholder="Detailed description of the requirement..."
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-medium text-qx-textSecondary mb-1">Terms & Conditions</label>
                <textarea
                  name="quotationTerms"
                  value={formData.quotationTerms}
                  onChange={handleChange}
                  rows="12"
                  className="w-full bg-qx-surface border border-qx-border rounded-xl px-4 py-2.5 text-qx-text focus:outline-none focus:border-qx-primary transition-colors custom-scrollbar text-xs"
                ></textarea>
              </div>
            </div>
            
          </form>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-qx-border shrink-0 bg-qx-surface rounded-b-2xl">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-bold text-qx-text hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            form="quotationForm"
            disabled={!formData.leadId}
            className={`px-6 py-2.5 text-sm font-bold rounded-xl transition-all ${
              !formData.leadId 
                ? 'bg-qx-border text-qx-textSecondary cursor-not-allowed' 
                : 'bg-qx-primary text-white hover:bg-orange-600 shadow-[0_0_15px_rgba(255,90,0,0.3)]'
            }`}
          >
            Save Quotation
          </button>
        </div>
      </div>
    </div>
  );
}
