import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Users, Download, FileText, Edit, Trash2, Filter, Eye, Calendar, Settings as SettingsIcon } from 'lucide-react';
import { Button } from '../components/ui/Button';
import CompanyLogo from '../components/ui/CompanyLogo';
import ViewLeadModal from '../components/crm/ViewLeadModal';
import DeleteConfirmModal from '../components/crm/DeleteConfirmModal';
import QuotationModal from '../components/crm/QuotationModal';
import { LeadContext } from '../context/LeadContext';
import { generateQuotation } from '../utils/pdfGenerator';

export default function QuotationsPage() {
  const { leads, quotations, addQuotation, updateQuotation, deleteQuotation } = useContext(LeadContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuotation, setEditingQuotation] = useState(null);
  const [viewingLead, setViewingLead] = useState(null);
  const [deletingQuotationId, setDeletingQuotationId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCreateQuotation = () => {
    setEditingQuotation(null);
    setIsModalOpen(true);
  };

  const handleEditQuotation = (quotation) => {
    setEditingQuotation(quotation);
    setIsModalOpen(true);
  };

  const handleDeleteQuotation = (id) => {
    setDeletingQuotationId(id);
  };

  const confirmDeleteQuotation = () => {
    if (deletingQuotationId) {
      deleteQuotation(deletingQuotationId);
    }
    setDeletingQuotationId(null);
  };

  const handleSaveQuotation = (quotationData) => {
    if (editingQuotation) {
      updateQuotation(quotationData);
    } else {
      addQuotation(quotationData);
    }
    setIsModalOpen(false);
  };

  const mergedQuotations = (quotations || []).map(q => {
    const lead = leads.find(l => l.id === q.leadId) || {};
    return { ...lead, ...q, id: q.id, leadId: lead.id }; 
  });

  const filteredQuotations = mergedQuotations.filter(quotation => {
    const term = searchTerm.toLowerCase();
    const name = quotation.name || '';
    const company = quotation.company || '';
    const matchesSearch = name.toLowerCase().includes(term) || company.toLowerCase().includes(term);
    const matchesStatus = statusFilter === 'All' || quotation.quotationStatus === statusFilter;

    return matchesSearch && matchesStatus;
  }).sort((a, b) => new Date(b.quotationDate || b.leadDate || 0) - new Date(a.quotationDate || a.leadDate || 0));

  const exportQuotationsCSV = () => {
    if (filteredQuotations.length === 0) return;
    const headers = ['Quotation No', 'Date', 'Client Name', 'Company Name', 'Service', 'Amount (INR)', 'Status', 'Valid Until'];
    const csvContent = [
      headers.join(','),
      ...filteredQuotations.map(l => `"${l.quotationNumber || `QX-${l.id}`}","${l.quotationDate || l.leadDate || ''}","${l.name}","${l.company}","${l.quotationService || l.service}","${l.quotationAmount}","${l.quotationStatus || 'Draft'}","${l.quotationValidUntil || ''}"`)
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
      case 'Draft': return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
      case 'Sent': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Accepted': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Rejected': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'Expired': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
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
            <Link to="/crm/follow-ups" className="flex items-center gap-3 px-4 py-3 text-qx-textSecondary hover:text-white hover:bg-white/5 rounded-xl font-semibold transition-colors">
               <Calendar size={20} /> Follow-ups
            </Link>
            <Link to="/crm/quotations" className="flex items-center gap-3 px-4 py-3 bg-qx-primary/15 text-qx-primary rounded-xl font-semibold border border-qx-primary/30 shadow-[0_0_15px_rgba(255,90,0,0.1)]">
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
             <h1 className="text-2xl font-bold text-qx-text tracking-wide">Quotations</h1>
             <p className="text-sm text-qx-textSecondary font-medium">Create and manage client quotations</p>
           </div>
           
           <div className="flex items-center gap-4">
              <Button onClick={exportQuotationsCSV} variant="secondary" className="flex items-center gap-2">
                <Download size={16} /> Export
              </Button>
              <Button onClick={handleCreateQuotation} className="flex items-center gap-2 shadow-[0_0_15px_rgba(255,90,0,0.3)]">
                <Plus size={18} /> Create Quotation
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
                  placeholder="Search by client or company..."
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
                  <option value="Draft">Draft</option>
                  <option value="Sent">Sent</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Expired">Expired</option>
                </select>
              </div>

              {(searchTerm || statusFilter !== 'All') && (
                <button 
                  onClick={() => { setSearchTerm(''); setStatusFilter('All'); }}
                  className="text-sm font-medium text-qx-primary hover:text-orange-400 transition-colors px-2 py-2"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {/* Quotations Table */}
            <div className="bg-qx-background border border-qx-border rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/5 border-b border-qx-border text-sm font-semibold text-qx-textSecondary">
                      <th className="px-6 py-4">Quotation No.</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Client Details</th>
                      <th className="px-6 py-4">Service</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Valid Until</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredQuotations.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="px-6 py-12 text-center text-qx-textSecondary">
                          No quotations found matching your criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredQuotations.map((lead) => {
                        const today = new Date().toISOString().split('T')[0];
                        const isExpired = lead.quotationValidUntil && lead.quotationValidUntil < today && lead.quotationStatus !== 'Accepted';
                        const displayStatus = isExpired ? 'Expired' : (lead.quotationStatus || 'Draft');

                        return (
                          <tr key={lead.id} className="border-b border-qx-border/50 hover:bg-white/[0.02] transition-colors group">
                            <td className="px-6 py-4 text-sm font-medium text-qx-textSecondary">
                              {lead.quotationNumber || `QX-${lead.id}`}
                            </td>
                            <td className="p-4 text-qx-text">
                              {lead.quotationDate ? new Date(lead.quotationDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '-'}
                            </td>
                            <td className="px-6 py-4">
                              <div className="font-bold text-qx-text">{lead.name}</div>
                              <div className="text-sm text-qx-textSecondary mt-1">{lead.company}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-white/90 font-medium">{lead.quotationService || lead.service}</div>
                            </td>
                            <td className="px-6 py-4 text-sm text-qx-text font-bold">
                              ₹{lead.quotationAmount ? parseInt(lead.quotationAmount).toLocaleString('en-IN') : '0'}
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(displayStatus)}`}>
                                {displayStatus}
                              </span>
                            </td>
                            <td className="p-4 text-qx-textSecondary">
                              {lead.quotationValidUntil ? new Date(lead.quotationValidUntil).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '-'}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-end gap-2">
                                <button 
                                  onClick={() => setViewingLead(lead)}
                                  className="p-2 text-qx-textSecondary hover:text-green-400 hover:bg-green-400/10 rounded-lg transition-all tooltip-trigger"
                                  title="View Client Lead"
                                >
                                  <Eye size={18} />
                                </button>
                                <button 
                                  onClick={() => generateQuotation(lead)}
                                  className="p-2 text-qx-textSecondary hover:text-qx-primary hover:bg-qx-primary/10 rounded-lg transition-all tooltip-trigger"
                                  title="Download PDF"
                                >
                                  <FileText size={18} />
                                </button>
                                <button 
                                  onClick={() => handleEditQuotation(lead)}
                                  className="p-2 text-qx-textSecondary hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all tooltip-trigger"
                                  title="Edit Quotation"
                                >
                                  <Edit size={18} />
                                </button>
                                <button 
                                  onClick={() => handleDeleteQuotation(lead.id)}
                                  className="p-2 text-qx-textSecondary hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all tooltip-trigger"
                                  title="Delete Quotation"
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
      <QuotationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveQuotation}
        quotationData={editingQuotation}
      />
      
      <ViewLeadModal 
        isOpen={!!viewingLead} 
        onClose={() => setViewingLead(null)} 
        lead={viewingLead}
      />

      <DeleteConfirmModal 
        isOpen={!!deletingQuotationId} 
        onClose={() => setDeletingQuotationId(null)} 
        onConfirm={confirmDeleteQuotation}
      />
    </div>
  );
}
