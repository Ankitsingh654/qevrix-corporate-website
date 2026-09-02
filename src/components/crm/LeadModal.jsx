import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';

export default function LeadModal({ isOpen, onClose, onSave, lead = null }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    service: 'IT & Software',
    subService: 'Website Development',
    source: 'Website',
    requirement: '',
    notes: '',
    status: 'New',
    followUpDate: '',
    followUpStatus: 'Pending',
    followUpNote: '',
    quotationAmount: '',
    leadDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (lead) {
      setFormData({
        ...lead,
        leadDate: lead.leadDate || new Date().toISOString().split('T')[0],
        phone: lead.phone || '',
        email: lead.email || '',
        source: lead.source || 'Website',
        notes: lead.notes || '',
        followUpStatus: lead.followUpStatus || 'Pending',
        followUpNote: lead.followUpNote || ''
      });
    } else {
      setFormData({
        name: '',
        company: '',
        phone: '',
        email: '',
        service: 'IT & Software',
        subService: 'Website Development',
        source: 'Website',
        requirement: '',
        notes: '',
        status: 'New',
        followUpDate: '',
        followUpStatus: 'Pending',
        followUpNote: '',
        quotationAmount: '',
        leadDate: new Date().toISOString().split('T')[0]
      });
    }
  }, [lead, isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-qx-surface border border-qx-border rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-qx-border sticky top-0 bg-qx-surface z-10">
          <h2 className="text-2xl font-bold text-qx-text">{lead ? 'Edit Lead' : 'Add New Lead'}</h2>
          <button onClick={onClose} className="text-qx-textSecondary hover:text-qx-text transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div>
              <label className="block text-sm font-medium text-qx-textSecondary mb-2">Lead ID</label>
              <input 
                type="text" 
                disabled
                value={lead ? `QX-${lead.id}` : 'Auto-generated'} 
                className="w-full bg-qx-background/50 border border-qx-border rounded-lg px-4 py-2.5 text-qx-textSecondary cursor-not-allowed" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-qx-textSecondary mb-2">Lead Date</label>
              <input 
                type="date" 
                name="leadDate" 
                required 
                value={formData.leadDate} 
                onChange={handleChange}
                className="w-full bg-qx-background border border-qx-border rounded-lg px-4 py-2.5 text-qx-text focus:outline-none focus:border-qx-primary transition-colors" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-qx-textSecondary mb-2">Lead Source</label>
              <select 
                name="source" 
                value={formData.source} 
                onChange={handleChange}
                className="w-full bg-qx-background border border-qx-border rounded-lg px-4 py-2.5 text-qx-text focus:outline-none focus:border-qx-primary transition-colors appearance-none"
              >
                <option value="Website">Website</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Instagram">Instagram</option>
                <option value="Facebook">Facebook</option>
                <option value="YouTube">YouTube</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Email">Email</option>
                <option value="Phone Call">Phone Call</option>
                <option value="Referral">Referral</option>
                <option value="Direct Outreach">Direct Outreach</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-qx-textSecondary mb-2">Client Name <span className="text-qx-primary">*</span></label>
              <input 
                type="text" 
                name="name" 
                required 
                value={formData.name} 
                onChange={handleChange}
                className="w-full bg-qx-background border border-qx-border rounded-lg px-4 py-2.5 text-qx-text focus:outline-none focus:border-qx-primary transition-colors" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-qx-textSecondary mb-2">Company Name <span className="text-qx-primary">*</span></label>
              <input 
                type="text" 
                name="company" 
                required 
                value={formData.company} 
                onChange={handleChange}
                className="w-full bg-qx-background border border-qx-border rounded-lg px-4 py-2.5 text-qx-text focus:outline-none focus:border-qx-primary transition-colors" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-qx-textSecondary mb-2">Email</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange}
                className="w-full bg-qx-background border border-qx-border rounded-lg px-4 py-2.5 text-qx-text focus:outline-none focus:border-qx-primary transition-colors" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-qx-textSecondary mb-2">Phone Number</label>
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange}
                className="w-full bg-qx-background border border-qx-border rounded-lg px-4 py-2.5 text-qx-text focus:outline-none focus:border-qx-primary transition-colors" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-qx-textSecondary mb-2">Service Needed <span className="text-qx-primary">*</span></label>
              <select 
                name="service" 
                value={formData.service} 
                onChange={handleChange}
                className="w-full bg-qx-background border border-qx-border rounded-lg px-4 py-2.5 text-qx-text focus:outline-none focus:border-qx-primary transition-colors appearance-none"
              >
                <option value="IT & Software">IT & Software</option>
                <option value="Workforce Solutions">Workforce Solutions</option>
                <option value="Branding & Creative Design">Branding & Creative Design</option>
                <option value="Civil & Infrastructure">Civil & Infrastructure</option>
              </select>
            </div>
            
            {(formData.service === 'IT & Software' || formData.service === 'Workforce Solutions' || formData.service === 'Branding & Creative Design' || formData.service === 'Civil & Infrastructure') && (
              <div>
                <label className="block text-sm font-medium text-qx-textSecondary mb-2">
                  {formData.service === 'IT & Software' ? 'IT Sub-Service' : 
                   formData.service === 'Workforce Solutions' ? 'Workforce Sub-Service' : 
                   formData.service === 'Branding & Creative Design' ? 'Branding Sub-Service' :
                   'Civil Sub-Service'}
                </label>
                <select 
                  name="subService" 
                  value={formData.subService || ''} 
                  onChange={handleChange}
                  className="w-full bg-qx-background border border-qx-border rounded-lg px-4 py-2.5 text-qx-text focus:outline-none focus:border-qx-primary transition-colors appearance-none"
                >
                  <option value="" disabled>Select a sub-service</option>
                  {formData.service === 'IT & Software' && (
                    <>
                      <option value="Website Development">Website Development</option>
                      <option value="Web Application">Web Application</option>
                      <option value="Mobile App Development">Mobile App Development</option>
                      <option value="Software Development">Software Development</option>
                      <option value="UI/UX Design">UI/UX Design</option>
                      <option value="API & Backend Development">API & Backend Development</option>
                      <option value="Cloud & Deployment">Cloud & Deployment</option>
                      <option value="Maintenance & Support">Maintenance & Support</option>
                      <option value="IT Consulting">IT Consulting</option>
                    </>
                  )}
                  {formData.service === 'Workforce Solutions' && (
                    <>
                      <option value="Manpower Supply">Manpower Supply</option>
                      <option value="Skilled Workforce">Skilled Workforce</option>
                      <option value="Unskilled Workforce">Unskilled Workforce</option>
                      <option value="Contract Staffing">Contract Staffing</option>
                      <option value="Temporary Staffing">Temporary Staffing</option>
                      <option value="Labour Supply">Labour Supply</option>
                      <option value="Recruitment & Staffing">Recruitment & Staffing</option>
                      <option value="Workforce Management">Workforce Management</option>
                    </>
                  )}
                  {formData.service === 'Branding & Creative Design' && (
                    <>
                      <option value="Logo Design">Logo Design</option>
                      <option value="Brand Identity">Brand Identity</option>
                      <option value="Brand Guidelines">Brand Guidelines</option>
                      <option value="Business Card & Stationery">Business Card & Stationery</option>
                      <option value="Social Media Design">Social Media Design</option>
                      <option value="Poster & Banner Design">Poster & Banner Design</option>
                      <option value="Brochure & Flyer Design">Brochure & Flyer Design</option>
                      <option value="Packaging Design">Packaging Design</option>
                      <option value="UI/UX Design">UI/UX Design</option>
                      <option value="Presentation Design">Presentation Design</option>
                      <option value="Advertising Creatives">Advertising Creatives</option>
                      <option value="Creative Design & Other">Creative Design & Other</option>
                    </>
                  )}
                  {formData.service === 'Civil & Infrastructure' && (
                    <>
                      <option value="Building Construction">Building Construction</option>
                      <option value="Civil Works">Civil Works</option>
                      <option value="Road & Infrastructure Works">Road & Infrastructure Works</option>
                      <option value="Renovation & Repair">Renovation & Repair</option>
                      <option value="BOQ & Estimation">BOQ & Estimation</option>
                      <option value="Project Management">Project Management</option>
                      <option value="Site Development">Site Development</option>
                      <option value="Structural Works">Structural Works</option>
                      <option value="Interior & Finishing Works">Interior & Finishing Works</option>
                      <option value="Civil Consulting">Civil Consulting</option>
                      <option value="Civil & Infrastructure Other">Civil & Infrastructure Other</option>
                    </>
                  )}
                </select>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-qx-textSecondary mb-2">Lead Status <span className="text-qx-primary">*</span></label>
              <select 
                name="status" 
                value={formData.status} 
                onChange={handleChange}
                className="w-full bg-qx-background border border-qx-border rounded-lg px-4 py-2.5 text-qx-text focus:outline-none focus:border-qx-primary transition-colors appearance-none"
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Discussion">Discussion</option>
                <option value="Proposal Sent">Proposal Sent</option>
                <option value="Quotation Sent">Quotation Sent</option>
                <option value="Negotiation">Negotiation</option>
                <option value="Won">Won</option>
                <option value="Lost">Lost</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-qx-textSecondary mb-2">Follow-up Date</label>
              <input 
                type="date" 
                name="followUpDate" 
                value={formData.followUpDate} 
                onChange={handleChange}
                className="w-full bg-qx-background border border-qx-border rounded-lg px-4 py-2.5 text-qx-text focus:outline-none focus:border-qx-primary transition-colors" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-qx-textSecondary mb-2">Follow-up Status</label>
              <select 
                name="followUpStatus" 
                value={formData.followUpStatus} 
                onChange={handleChange}
                className="w-full bg-qx-background border border-qx-border rounded-lg px-4 py-2.5 text-qx-text focus:outline-none focus:border-qx-primary transition-colors appearance-none"
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-qx-textSecondary mb-2">Quotation Amount (₹)</label>
              <input 
                type="number" 
                name="quotationAmount" 
                value={formData.quotationAmount} 
                onChange={handleChange}
                placeholder="e.g. 50000"
                className="w-full bg-qx-background border border-qx-border rounded-lg px-4 py-2.5 text-qx-text focus:outline-none focus:border-qx-primary transition-colors" 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-qx-textSecondary mb-2">Requirement</label>
              <textarea 
                name="requirement" 
                rows="4"
                value={formData.requirement} 
                onChange={handleChange}
                className="w-full bg-qx-background border border-qx-border rounded-lg px-4 py-2.5 text-qx-text focus:outline-none focus:border-qx-primary transition-colors resize-none" 
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-qx-textSecondary mb-2">Notes</label>
              <textarea 
                name="notes" 
                rows="4"
                value={formData.notes} 
                onChange={handleChange}
                className="w-full bg-qx-background border border-qx-border rounded-lg px-4 py-2.5 text-qx-text focus:outline-none focus:border-qx-primary transition-colors resize-none" 
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-qx-textSecondary mb-2">Follow-up Note</label>
              <textarea 
                name="followUpNote" 
                rows="4"
                value={formData.followUpNote} 
                onChange={handleChange}
                className="w-full bg-qx-background border border-qx-border rounded-lg px-4 py-2.5 text-qx-text focus:outline-none focus:border-qx-primary transition-colors resize-none" 
              ></textarea>
            </div>
          </div>
          
          <div className="flex justify-end gap-4 pt-4 border-t border-qx-border">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save Lead</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
