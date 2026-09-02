import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Search, Users, Download, FileText, Edit, Trash2, Filter, Eye, Calendar, Settings as SettingsIcon, LogOut } from 'lucide-react';
import { Button } from '../components/ui/Button';
import CompanyLogo from '../components/ui/CompanyLogo';
import LeadModal from '../components/crm/LeadModal';
import ViewLeadModal from '../components/crm/ViewLeadModal';
import DeleteConfirmModal from '../components/crm/DeleteConfirmModal';
import { LeadContext } from '../context/LeadContext';
import { generateQuotation } from '../utils/pdfGenerator';

export default function CrmPage() {
  const { leads, quotations, addLead, updateLead, deleteLead } = useContext(LeadContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [viewingLead, setViewingLead] = useState(null);
  const [deletingLeadId, setDeletingLeadId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [serviceFilter, setServiceFilter] = useState('All');
  const [sourceFilter, setSourceFilter] = useState('All');
  const [followUpFilter, setFollowUpFilter] = useState('All');
  
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddLead = () => {
    setEditingLead(null);
    setIsModalOpen(true);
  };

  const handleEditLead = (lead) => {
    setEditingLead(lead);
    setIsModalOpen(true);
  };

  const handleDeleteLead = (id) => {
    setDeletingLeadId(id);
  };

  const confirmDeleteLead = () => {
    deleteLead(deletingLeadId);
    setDeletingLeadId(null);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setServiceFilter('All');
    setSourceFilter('All');
    setFollowUpFilter('All');
  };

  const handleSaveLead = (leadData) => {
    if (editingLead) {
      updateLead({ ...leadData, id: editingLead.id });
    } else {
      addLead(leadData);
    }
    setIsModalOpen(false);
  };

  const filteredLeads = leads.filter(lead => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = lead.name.toLowerCase().includes(term) || 
                          lead.company.toLowerCase().includes(term) ||
                          (lead.email && lead.email.toLowerCase().includes(term)) ||
                          (lead.phone && lead.phone.toLowerCase().includes(term));
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    const matchesService = serviceFilter === 'All' || lead.service === serviceFilter;
    const matchesSource = sourceFilter === 'All' || lead.source === sourceFilter;
    
    let matchesFollowUp = true;
    if (followUpFilter === 'Follow-up Due') matchesFollowUp = lead.followUpStatus === 'Pending' || !lead.followUpStatus;
    if (followUpFilter === 'Follow-up Completed') matchesFollowUp = lead.followUpStatus === 'Completed';

    return matchesSearch && matchesStatus && matchesService && matchesSource && matchesFollowUp;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'New': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Contacted': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'Discussion': return 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20';
      case 'Proposal Sent': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'Quotation Sent': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'Negotiation': return 'bg-pink-500/10 text-pink-500 border-pink-500/20';
      case 'Won': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Lost': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const getLatestQuotation = (leadId) => {
    const leadQuotations = (quotations || []).filter(q => q.leadId === leadId).sort((a,b) => new Date(b.quotationDate || 0) - new Date(a.quotationDate || 0));
    return leadQuotations.length > 0 ? leadQuotations[0] : null;
  };

  const exportCSV = () => {
    if (leads.length === 0) return;
    const headers = ['Lead ID', 'Lead Date', 'Lead Source', 'Client Name', 'Company Name', 'Email', 'Phone Number', 'Service', 'Sub-Service', 'Lead Status', 'Follow-up Date', 'Follow-up Status', 'Follow-up Note', 'Quotation Amount', 'Requirement', 'Notes'];
    const csvContent = [
      headers.join(','),
      ...leads.map(l => {
        const latestQ = getLatestQuotation(l.id);
        const qAmount = latestQ ? latestQ.quotationAmount : '';
        return `"QX-${l.id}","${l.leadDate || ''}","${l.source || ''}","${l.name}","${l.company}","${l.email || ''}","${l.phone || ''}","${l.service}","${l.subService || ''}","${l.status}","${l.followUpDate}","${l.followUpStatus || 'Pending'}","${(l.followUpNote || '').replace(/"/g, '""')}","${qAmount}","${(l.requirement || '').replace(/"/g, '""')}","${(l.notes || '').replace(/"/g, '""')}"`;
      })
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `qevrix_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportQuotationsCSV = () => {
    if (!quotations || quotations.length === 0) {
      alert("No quotations available to export.");
      return;
    }
    const headers = ['Quotation No', 'Date', 'Client Name', 'Company Name', 'Service', 'Amount (INR)'];
    const csvContent = [
      headers.join(','),
      ...quotations.map(q => {
        const lead = leads.find(l => l.id === q.leadId) || {};
        return `"${q.quotationNumber || `QX-${q.id}`}","${q.quotationDate || ''}","${lead.name || ''}","${lead.company || ''}","${q.quotationService || lead.service || ''}","${q.quotationAmount || ''}"`;
      })
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `qevrix_quotations_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('crm_authenticated');
    navigate('/crm/login', { replace: true });
  };



  return (
    <div className="flex h-screen overflow-hidden bg-qx-background text-qx-text selection:bg-qx-primary/30">
      {/* Navy Sidebar */}
      <aside className="w-64 bg-[#080D1C] border-r border-white/10 flex flex-col flex-shrink-0 z-10 shadow-2xl relative">
        <div className="p-6 border-b border-white/10 flex justify-center">
          <CompanyLogo size="md" />
        </div>
        
        <div className="px-4 py-6">
          <div className="text-xs font-bold text-qx-textSecondary uppercase tracking-wider mb-4 px-2">CRM Modules</div>
          <nav className="flex flex-col gap-2">
            <Link to="/crm" className="flex items-center gap-3 px-4 py-3 bg-qx-primary/15 text-qx-primary rounded-xl font-semibold border border-qx-primary/30 shadow-[0_0_15px_rgba(255,90,0,0.1)]">
               <Users size={20} /> Leads
            </Link>
            <Link to="/crm/follow-ups" className="flex items-center gap-3 px-4 py-3 text-qx-textSecondary hover:text-white hover:bg-white/5 rounded-xl font-semibold transition-colors">
               <Calendar size={20} /> Follow-ups
            </Link>
            <Link to="/crm/quotations" className="flex items-center gap-3 px-4 py-3 text-qx-textSecondary hover:text-white hover:bg-white/5 rounded-xl font-semibold transition-colors">
               <FileText size={20} /> Quotations
            </Link>
          </nav>
        </div>

        <div className="px-4 py-2 mt-auto pb-6">
          <div className="text-xs font-bold text-qx-textSecondary uppercase tracking-wider mb-4 px-2">System</div>
          <nav className="flex flex-col gap-2">
            <Link to="/crm/settings" className="flex items-center gap-3 px-4 py-3 text-qx-textSecondary hover:text-white hover:bg-white/5 rounded-xl font-semibold transition-colors">
               <SettingsIcon size={20} /> Data Management
            </Link>
          </nav>
        </div>

        <div className="px-4 py-2">
          <div className="text-xs font-bold text-qx-textSecondary uppercase tracking-wider mb-4 px-2">Reports</div>
          <nav className="flex flex-col gap-2">
            <button onClick={exportCSV} className="w-full flex items-center gap-3 px-4 py-3 text-qx-textSecondary hover:text-white hover:bg-white/5 rounded-xl font-semibold transition-colors text-left">
               <Download size={20} /> Export Leads
            </button>
            <button onClick={exportQuotationsCSV} className="w-full flex items-center gap-3 px-4 py-3 text-qx-textSecondary hover:text-white hover:bg-white/5 rounded-xl font-semibold transition-colors text-left">
               <Download size={20} /> Export Quotations
            </button>
          </nav>
        </div>
        
        <div className="mt-auto p-6 border-t border-white/10">
           <button 
              onClick={() => {
                sessionStorage.removeItem('crm_authenticated');
                window.location.replace('/crm/login');
              }}
              className="w-full mb-3 flex justify-center py-2 px-4 border border-red-500/30 rounded-xl text-sm font-bold text-red-500 hover:bg-red-500/10 transition-colors"
           >
              Logout CRM
           </button>
           <Button variant="secondary" className="w-full text-sm" onClick={() => window.location.href = '/'}>
              Exit to Website
           </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-qx-surface relative z-0">
         {/* Top Header */}
         <header className="h-20 border-b border-qx-border bg-qx-background/80 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-10 shadow-sm">
           <div>
             <h1 className="text-2xl font-bold text-qx-text tracking-wide">Leads</h1>
             <p className="text-sm text-qx-textSecondary font-medium">Manage and track your potential clients</p>
           </div>
           
           <div className="flex items-center gap-4">
              <Button onClick={exportCSV} variant="secondary" className="flex items-center gap-2">
                <Download size={16} /> Export Leads
              </Button>
              <Button onClick={exportQuotationsCSV} variant="secondary" className="flex items-center gap-2">
                <Download size={16} /> Export Quotations
              </Button>
              <Button onClick={handleAddLead} className="flex items-center gap-2 shadow-[0_0_15px_rgba(255,90,0,0.3)]">
                <Plus size={18} /> Add Lead
              </Button>
           </div>
         </header>

         {/* Body Content */}
         <div className="flex-1 overflow-y-auto p-8">
            {/* Toolbar (Search & Filter) */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="relative flex-1 min-w-[250px] max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-qx-textSecondary" />
                </div>
                <input
                  type="text"
                  placeholder="Search by name, company, phone, email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-qx-background border border-qx-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-qx-text focus:outline-none focus:border-qx-primary transition-colors shadow-sm"
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter size={18} className="text-qx-textSecondary" />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-qx-background border border-qx-border rounded-xl pl-10 pr-10 py-2.5 text-sm text-qx-text focus:outline-none focus:border-qx-primary transition-colors appearance-none shadow-sm cursor-pointer"
                >
                  <option value="All">All Statuses</option>
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

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter size={18} className="text-qx-textSecondary" />
                </div>
                <select
                  value={serviceFilter}
                  onChange={(e) => setServiceFilter(e.target.value)}
                  className="bg-qx-background border border-qx-border rounded-xl pl-10 pr-10 py-2.5 text-sm text-qx-text focus:outline-none focus:border-qx-primary transition-colors appearance-none shadow-sm cursor-pointer"
                >
                  <option value="All">All Services</option>
                  <option value="IT & Software">IT & Software</option>
                  <option value="Workforce Solutions">Workforce Solutions</option>
                  <option value="Branding & Creative Design">Branding & Creative Design</option>
                  <option value="Civil & Infrastructure">Civil & Infrastructure</option>
                </select>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter size={18} className="text-qx-textSecondary" />
                </div>
                <select
                  value={sourceFilter}
                  onChange={(e) => setSourceFilter(e.target.value)}
                  className="bg-qx-background border border-qx-border rounded-xl pl-10 pr-10 py-2.5 text-sm text-qx-text focus:outline-none focus:border-qx-primary transition-colors appearance-none shadow-sm cursor-pointer"
                >
                  <option value="All">All Sources</option>
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

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter size={18} className="text-qx-textSecondary" />
                </div>
                <select
                  value={followUpFilter}
                  onChange={(e) => setFollowUpFilter(e.target.value)}
                  className="bg-qx-background border border-qx-border rounded-xl pl-10 pr-10 py-2.5 text-sm text-qx-text focus:outline-none focus:border-qx-primary transition-colors appearance-none shadow-sm cursor-pointer"
                >
                  <option value="All">All Follow-ups</option>
                  <option value="Follow-up Due">Follow-up Due</option>
                  <option value="Follow-up Completed">Follow-up Completed</option>
                </select>
              </div>

              {(searchTerm || statusFilter !== 'All' || serviceFilter !== 'All' || sourceFilter !== 'All' || followUpFilter !== 'All') && (
                <button 
                  onClick={handleClearFilters}
                  className="text-sm font-medium text-qx-primary hover:text-orange-400 transition-colors px-2 py-2"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {/* Leads Table */}
            <div className="bg-qx-background border border-qx-border rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/5 border-b border-qx-border text-sm font-semibold text-qx-textSecondary">
                      <th className="px-6 py-4">Lead ID</th>
                      <th className="px-6 py-4">Client</th>
                      <th className="px-6 py-4">Source</th>
                      <th className="px-6 py-4">Service</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Follow-up</th>
                      <th className="px-6 py-4">Quotation Amount</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-12 text-center text-qx-textSecondary">
                          No leads found matching your criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead) => (
                        <tr key={lead.id} className="border-b border-qx-border/50 hover:bg-white/[0.02] transition-colors group">
                          <td className="px-6 py-4 text-sm font-medium text-qx-textSecondary">
                            QX-{lead.id}
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-bold text-qx-text">{lead.name}</div>
                            <div className="text-sm text-qx-textSecondary mt-1">{lead.company}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-white/5 border border-qx-border text-xs text-qx-textSecondary font-medium">
                              {lead.source || '-'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-white/90 font-medium">{lead.service}</div>
                            <div className="text-xs text-qx-textSecondary mt-1 truncate max-w-[200px]">{lead.requirement}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(lead.status)}`}>
                              {lead.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-qx-textSecondary font-medium">
                              {lead.followUpDate ? new Date(lead.followUpDate).toLocaleDateString() : '-'}
                            </div>
                            {lead.followUpDate && (
                              <div className={`text-xs mt-1 font-bold ${lead.followUpStatus === 'Completed' ? 'text-green-500' : 'text-yellow-500'}`}>
                                {lead.followUpStatus || 'Pending'}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-qx-text font-bold">
                            {getLatestQuotation(lead.id) && getLatestQuotation(lead.id).quotationAmount ? `₹${parseInt(getLatestQuotation(lead.id).quotationAmount).toLocaleString('en-IN')}` : '-'}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <button 
                                onClick={() => setViewingLead(lead)}
                                className="p-2 text-qx-textSecondary hover:text-green-400 hover:bg-green-400/10 rounded-lg transition-all"
                                title="View Lead"
                              >
                                <Eye size={18} />
                              </button>
                              <button 
                                onClick={() => {
                                  const latestQ = getLatestQuotation(lead.id);
                                  if (latestQ) {
                                    generateQuotation({ ...lead, ...latestQ });
                                  } else {
                                    alert("No quotation available for this lead.");
                                  }
                                }}
                                className="p-2 text-qx-textSecondary hover:text-orange-400 hover:bg-orange-400/10 rounded-lg transition-all tooltip-trigger"
                                title="Generate PDF Quotation"
                              >
                                <FileText size={18} />
                              </button>
                              <button 
                                onClick={() => handleEditLead(lead)}
                                className="p-2 text-qx-textSecondary hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all"
                                title="Edit Lead"
                              >
                                <Edit size={18} />
                              </button>
                              <button 
                                onClick={() => handleDeleteLead(lead.id)}
                                className="p-2 text-qx-textSecondary hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                                title="Delete Lead"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
         </div>
      </main>

      {/* Lead Form Modal */}
      <LeadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveLead}
        lead={editingLead}
      />
      
      {/* View Lead Modal */}
      <ViewLeadModal 
        isOpen={!!viewingLead} 
        onClose={() => setViewingLead(null)} 
        lead={viewingLead}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal 
        isOpen={!!deletingLeadId} 
        onClose={() => setDeletingLeadId(null)} 
        onConfirm={confirmDeleteLead}
      />
    </div>
  );
}
