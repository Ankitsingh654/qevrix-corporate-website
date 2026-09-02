import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Button } from '../ui/Button';

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-qx-surface border border-qx-border rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-qx-border bg-qx-surface">
          <h2 className="text-xl font-bold text-qx-text flex items-center gap-2">
            <AlertTriangle className="text-red-500" size={24} />
            Confirm Deletion
          </h2>
          <button onClick={onClose} className="text-qx-textSecondary hover:text-qx-text transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <p className="text-qx-textSecondary text-base">
            Are you sure you want to delete this lead?
          </p>
        </div>
        
        <div className="flex justify-end gap-4 p-6 border-t border-qx-border bg-qx-background/50">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <button 
            className="px-6 py-2.5 rounded-lg font-medium transition-all duration-300 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 hover:border-red-500"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
