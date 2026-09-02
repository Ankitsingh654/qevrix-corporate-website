import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Users, Calendar, FileText, Download, Settings as SettingsIcon, Database, Save, Upload } from 'lucide-react';
import { Button } from '../components/ui/Button';
import CompanyLogo from '../components/ui/CompanyLogo';
import { createManualBackup, downloadBackup, restoreBackup, getLastBackupTime } from '../services/crmDataService';

export default function CrmSettingsPage() {
  const [lastBackup, setLastBackup] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    updateLastBackupTime();
  }, []);

  const updateLastBackupTime = () => {
    const time = getLastBackupTime();
    setLastBackup(time ? new Date(time).toLocaleString() : 'Never');
  };

  const showMessage = (msg, error = false) => {
    setStatusMessage(msg);
    setIsError(error);
    setTimeout(() => {
      setStatusMessage('');
    }, 5000);
  };

  const handleBackupNow = () => {
    try {
      createManualBackup();
      updateLastBackupTime();
      showMessage('Backup created successfully.');
    } catch (err) {
      showMessage('Failed to create backup.', true);
    }
  };

  const handleDownloadBackup = () => {
    try {
      downloadBackup();
      showMessage('Backup downloaded successfully.');
    } catch (err) {
      showMessage('Failed to download backup.', true);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/json" && !file.name.endsWith('.json')) {
      showMessage('Please select a valid JSON backup file.', true);
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const confirmRestore = window.confirm(
          "WARNING: This will replace all current CRM data with the backup data.\nA safety backup will be created automatically before proceeding.\n\nAre you sure you want to restore?"
        );
        
        if (confirmRestore) {
          restoreBackup(event.target.result);
          showMessage('Restore successful. Refreshing CRM data...', false);
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      } catch (err) {
        showMessage(err.message || 'Failed to restore from this file.', true);
      }
    };
    reader.onerror = () => {
      showMessage('Failed to read the file.', true);
    };
    reader.readAsText(file);
    e.target.value = ''; // Reset input
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
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
            <Link to="/crm/quotations" className="flex items-center gap-3 px-4 py-3 text-qx-textSecondary hover:text-white hover:bg-white/5 rounded-xl font-semibold transition-colors">
               <FileText size={20} /> Quotations
            </Link>
          </nav>
        </div>

        <div className="px-4 py-2 mt-auto pb-6">
          <div className="text-xs font-bold text-qx-textSecondary uppercase tracking-wider mb-4 px-2">System</div>
          <nav className="flex flex-col gap-2">
            <Link to="/crm/settings" className="flex items-center gap-3 px-4 py-3 bg-qx-primary/15 text-qx-primary rounded-xl font-semibold border border-qx-primary/30 shadow-[0_0_15px_rgba(255,90,0,0.1)]">
               <SettingsIcon size={20} /> Data Management
            </Link>
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

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-[#0A0F1E]">
        {/* Header */}
        <header className="h-20 bg-qx-background/80 backdrop-blur-xl border-b border-white/10 flex flex-col justify-center px-8 flex-shrink-0 z-20">
          <h1 className="text-2xl font-bold text-white">Data Management</h1>
          <p className="text-sm text-qx-textSecondary mt-1">Manage CRM data backups and persistence</p>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
          {statusMessage && (
            <div className={`p-4 mb-6 rounded-xl border font-semibold ${isError ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-green-500/10 border-green-500/30 text-green-400'}`}>
              {statusMessage}
            </div>
          )}

          <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Backup Status Card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl">
                  <Database size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Backup Status</h3>
                  <p className="text-sm text-qx-textSecondary">Local storage state</p>
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <div className="text-sm text-qx-textSecondary mb-1">Last Auto/Manual Backup:</div>
                  <div className="text-lg font-semibold text-white">{lastBackup || 'Loading...'}</div>
                </div>
                <div>
                  <div className="text-sm text-qx-textSecondary mb-1">Storage Location:</div>
                  <div className="text-base text-white">Browser Local Storage</div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/10">
                <button
                  onClick={handleBackupNow}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-qx-primary text-white font-bold rounded-xl hover:bg-orange-600 transition-colors shadow-[0_0_15px_rgba(255,90,0,0.2)]"
                >
                  <Save size={18} /> Backup Now
                </button>
              </div>
            </div>

            {/* Export/Import Card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-purple-500/20 text-purple-400 rounded-xl">
                  <Upload size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Export & Import</h3>
                  <p className="text-sm text-qx-textSecondary">Manage JSON backups</p>
                </div>
              </div>
              <div className="flex-1 text-sm text-qx-textSecondary space-y-4">
                <p>
                  Download a complete backup of your CRM data including all leads, follow-ups, and quotations.
                </p>
                <p>
                  You can restore this data later on any device. A safety backup is automatically created before restoring.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                <button
                  onClick={handleDownloadBackup}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors"
                >
                  <Download size={18} /> Download Backup (JSON)
                </button>
                <input 
                  type="file"
                  accept=".json"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                <button
                  onClick={triggerFileInput}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 hover:border-white/20 transition-colors"
                >
                  <Upload size={18} /> Restore from File
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
