import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Users, Download, FileText, Edit, Trash2, Filter, Eye, Calendar, Settings as SettingsIcon, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import CompanyLogo from '../components/ui/CompanyLogo';
import LeadModal from '../components/crm/LeadModal';
import ViewLeadModal from '../components/crm/ViewLeadModal';
import DeleteConfirmModal from '../components/crm/DeleteConfirmModal';
import { LeadContext } from '../context/LeadContext';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function FollowUpsPage() {
  const { leads, quotations, addLead, updateLead, deleteLead } = useContext(LeadContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [viewingLead, setViewingLead] = useState(null);
  const [deletingLeadId, setDeletingLeadId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('All');

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

  const handleSaveLead = (leadData) => {
    if (editingLead) {
      updateLead({ ...leadData, id: editingLead.id });
    } else {
      addLead(leadData);
    }
    setIsModalOpen(false);
  };

  const markFollowUpCompleted = (lead) => {
    updateLead({ ...lead, followUpStatus: 'Completed' });
  };

  const filteredLeads = leads.filter(lead => {
    if (!lead.followUpDate) return false;

    const term = searchTerm.toLowerCase();
    const matchesSearch = lead.name.toLowerCase().includes(term) || 
                          lead.company.toLowerCase().includes(term);
    
    let matchesDate = true;
    const today = new Date().toISOString().split('T')[0];
    
    if (dateFilter === 'Today') {
      matchesDate = lead.followUpDate === today && lead.followUpStatus !== 'Completed';
    } else if (dateFilter === 'Upcoming') {
      matchesDate = lead.followUpDate > today && lead.followUpStatus !== 'Completed';
    } else if (dateFilter === 'Overdue') {
      matchesDate = lead.followUpDate < today && lead.followUpStatus !== 'Completed';
    } else if (dateFilter === 'Completed') {
      matchesDate = lead.followUpStatus === 'Completed';
    }

    return matchesSearch && matchesDate;
  }).sort((a, b) => new Date(a.followUpDate) - new Date(b.followUpDate));

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
    link.setAttribute('download', `qevrix_followups_${new Date().toISOString().split('T')[0]}.csv`);
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
            <Link to="/crm" className="flex items-center gap-3 px-4 py-3 text-qx-textSecondary hover:text-white hover:bg-white/5 rounded-xl font-semibold transition-colors">
               <Users size={20} /> Leads
            </Link>
            <Link to="/crm/follow-ups" className="flex items-center gap-3 px-4 py-3 bg-qx-primary/15 text-qx-primary rounded-xl font-semibold border border-qx-primary/30 shadow-[0_0_15px_rgba(255,90,0,0.1)]">
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
             <h1 className="text-2xl font-bold text-qx-text tracking-wide">Follow-ups</h1>
             <p className="text-sm text-qx-textSecondary font-medium">Track your scheduled interactions and tasks</p>
           </div>
           
           <div className="flex items-center gap-4">
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
                  placeholder="Search by name or company..."
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
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="bg-qx-background border border-qx-border rounded-xl pl-10 pr-10 py-2.5 text-sm text-qx-text focus:outline-none focus:border-qx-primary transition-colors appearance-none shadow-sm cursor-pointer"
                >
                  <option value="All">All Follow-ups</option>
                  <option value="Today">Today</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Overdue">Overdue</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              {(searchTerm || dateFilter !== 'All') && (
                <button 
                  onClick={() => { setSearchTerm(''); setDateFilter('All'); }}
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
                      <th className="px-6 py-4">Service</th>
                      <th className="px-6 py-4">Follow-up Date</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Notes</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="px-6 py-12 text-center text-qx-textSecondary">
                          No follow-ups found matching your criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead) => {
                        const today = new Date().toISOString().split('T')[0];
                        const isOverdue = lead.followUpDate < today && lead.followUpStatus !== 'Completed';
                        const isToday = lead.followUpDate === today && lead.followUpStatus !== 'Completed';
                        
                        return (
                          <tr key={lead.id} className="border-b border-qx-border/50 hover:bg-white/[0.02] transition-colors group">
                            <td className="px-6 py-4 text-sm font-medium text-qx-textSecondary">
                              QX-{lead.id}
                            </td>
                            <td className="px-6 py-4">
                              <div className="font-bold text-qx-text">{lead.name}</div>
                              <div className="text-sm text-qx-textSecondary mt-1">{lead.company}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-white/90 font-medium">{lead.service}</div>
                              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border mt-2 ${getStatusColor(lead.status)}`}>
                                {lead.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className={`text-sm font-bold ${isOverdue ? 'text-red-500' : isToday ? 'text-yellow-500' : 'text-qx-text'}`}>
                                {new Date(lead.followUpDate).toLocaleDateString()}
                                {isOverdue && <span className="ml-2 text-xs font-semibold px-2 py-0.5 bg-red-500/10 rounded-md">Overdue</span>}
                                {isToday && <span className="ml-2 text-xs font-semibold px-2 py-0.5 bg-yellow-500/10 rounded-md">Today</span>}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${lead.followUpStatus === 'Completed' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'}`}>
                                {lead.followUpStatus || 'Pending'}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-qx-textSecondary truncate max-w-[200px]">
                                {lead.followUpNote || lead.notes || '-'}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-end gap-2">
                                {lead.followUpStatus !== 'Completed' && (
                                  <button 
                                    onClick={() => markFollowUpCompleted(lead)}
                                    className="p-2 text-qx-textSecondary hover:text-green-400 hover:bg-green-400/10 rounded-lg transition-all"
                                    title="Mark Completed"
                                  >
                                    <CheckCircle size={18} />
                                  </button>
                                )}
                                <button 
                                  onClick={() => setViewingLead(lead)}
                                  className="p-2 text-qx-textSecondary hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all"
                                  title="View Lead"
                                >
                                  <Eye size={18} />
                                </button>
                                <button 
                                  onClick={() => handleEditLead(lead)}
                                  className="p-2 text-qx-textSecondary hover:text-qx-primary hover:bg-qx-primary/10 rounded-lg transition-all"
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
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
         </div>
      </main>

      {/* Modals */}
      <LeadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveLead}
        lead={editingLead}
      />
      
      <ViewLeadModal 
        isOpen={!!viewingLead} 
        onClose={() => setViewingLead(null)} 
        lead={viewingLead}
      />

      <DeleteConfirmModal 
        isOpen={!!deletingLeadId} 
        onClose={() => setDeletingLeadId(null)} 
        onConfirm={confirmDeleteLead}
      />
    </div>
  );
}
