import React from 'react';
import { X, Calendar, User, Building, Phone, Mail, Globe, Briefcase, FileText, IndianRupee, MessageSquare, Target } from 'lucide-react';
import { Button } from '../ui/Button';

export default function ViewLeadModal({ isOpen, onClose, lead }) {
  if (!isOpen || !lead) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-qx-surface border border-qx-border rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-qx-border sticky top-0 bg-qx-surface z-10">
          <div>
            <h2 className="text-2xl font-bold text-qx-text">Lead Details</h2>
            <p className="text-sm text-qx-textSecondary mt-1">ID: QX-{lead.id}</p>
          </div>
          <button onClick={onClose} className="text-qx-textSecondary hover:text-qx-text transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 space-y-8">
          {/* Header Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/5 p-6 rounded-xl border border-qx-border">
            <div>
              <div className="text-sm text-qx-textSecondary font-medium flex items-center gap-2 mb-1">
                <User size={14} /> Client Name
              </div>
              <div className="text-lg font-bold text-qx-text">{lead.name}</div>
            </div>
            <div>
              <div className="text-sm text-qx-textSecondary font-medium flex items-center gap-2 mb-1">
                <Building size={14} /> Company
              </div>
              <div className="text-lg font-bold text-qx-text">{lead.company}</div>
            </div>
            <div>
              <div className="text-sm text-qx-textSecondary font-medium flex items-center gap-2 mb-1">
                <Phone size={14} /> Phone
              </div>
              <div className="text-qx-text">{lead.phone || '-'}</div>
            </div>
            <div>
              <div className="text-sm text-qx-textSecondary font-medium flex items-center gap-2 mb-1">
                <Mail size={14} /> Email
              </div>
              <div className="text-qx-text">{lead.email || '-'}</div>
            </div>
          </div>

          {/* Service & Pipeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             <div>
              <div className="text-sm text-qx-textSecondary font-medium flex items-center gap-2 mb-1">
                <Briefcase size={14} /> Service
              </div>
              <div className="font-medium text-qx-text">{lead.service}</div>
            </div>
            <div>
              <div className="text-sm text-qx-textSecondary font-medium flex items-center gap-2 mb-1">
                <Target size={14} /> Sub-Service
              </div>
              <div className="font-medium text-qx-text">{lead.subService || '-'}</div>
            </div>
            <div>
              <div className="text-sm text-qx-textSecondary font-medium flex items-center gap-2 mb-1">
                <Globe size={14} /> Lead Source
              </div>
              <div className="font-medium text-qx-text">{lead.source || '-'}</div>
            </div>
            <div>
              <div className="text-sm text-qx-textSecondary font-medium flex items-center gap-2 mb-1">
                <Calendar size={14} /> Lead Date
              </div>
              <div className="font-medium text-qx-text">{lead.leadDate ? new Date(lead.leadDate).toLocaleDateString() : '-'}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <div className="text-sm text-qx-textSecondary font-medium mb-1">Lead Status</div>
              <div className="font-bold text-qx-text">{lead.status}</div>
            </div>
            <div>
              <div className="text-sm text-qx-textSecondary font-medium mb-1">Follow-up Date</div>
              <div className="font-medium text-qx-text">{lead.followUpDate ? new Date(lead.followUpDate).toLocaleDateString() : '-'}</div>
            </div>
            <div>
              <div className="text-sm text-qx-textSecondary font-medium mb-1">Follow-up Status</div>
              <div className="font-medium text-qx-text">{lead.followUpStatus || 'Pending'}</div>
            </div>
            <div>
              <div className="text-sm text-qx-textSecondary font-medium flex items-center gap-2 mb-1">
                <IndianRupee size={14} /> Quotation Amount
              </div>
              <div className="font-bold text-qx-text">{lead.quotationAmount ? `₹${parseInt(lead.quotationAmount).toLocaleString('en-IN')}` : '-'}</div>
            </div>
          </div>

          {/* Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-qx-border/50">
             <div>
              <div className="text-sm text-qx-textSecondary font-medium flex items-center gap-2 mb-2">
                <FileText size={14} /> Requirement
              </div>
              <div className="bg-qx-background p-4 rounded-xl text-qx-text border border-qx-border min-h-[100px] whitespace-pre-wrap">
                {lead.requirement || 'No requirement provided.'}
              </div>
            </div>
            <div>
              <div className="text-sm text-qx-textSecondary font-medium flex items-center gap-2 mb-2">
                <MessageSquare size={14} /> Notes
              </div>
              <div className="bg-qx-background p-4 rounded-xl text-qx-text border border-qx-border min-h-[100px] whitespace-pre-wrap">
                {lead.notes || 'No internal notes.'}
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="text-sm text-qx-textSecondary font-medium flex items-center gap-2 mb-2">
                <MessageSquare size={14} /> Follow-up Note
              </div>
              <div className="bg-qx-background p-4 rounded-xl text-qx-text border border-qx-border min-h-[100px] whitespace-pre-wrap">
                {lead.followUpNote || 'No follow-up notes.'}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end p-6 border-t border-qx-border bg-qx-surface">
          <Button onClick={onClose}>Close Details</Button>
        </div>
      </div>
    </div>
  );
}
