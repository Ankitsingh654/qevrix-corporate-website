import React, { createContext, useState, useEffect } from 'react';
import { getLeads, saveLeads, getQuotations, saveQuotations } from '../services/crmDataService';

export const LeadContext = createContext();

export const LeadProvider = ({ children }) => {
  const [leads, setLeads] = useState([]);
  const [quotations, setQuotations] = useState([]);

  useEffect(() => {
    setLeads(getLeads());
    setQuotations(getQuotations());
  }, []);

  const addLead = (leadData) => {
    const newLeads = [...leads, { ...leadData, id: Date.now() }];
    setLeads(newLeads);
    saveLeads(newLeads);
  };

  const updateLead = (leadData) => {
    const newLeads = leads.map(l => l.id === leadData.id ? leadData : l);
    setLeads(newLeads);
    saveLeads(newLeads);
  };

  const deleteLead = (id) => {
    const newLeads = leads.filter(l => l.id !== id);
    setLeads(newLeads);
    saveLeads(newLeads);
  };

  const addQuotation = (quotationData) => {
    const newQuotations = [...quotations, { ...quotationData, id: Date.now() }];
    setQuotations(newQuotations);
    saveQuotations(newQuotations);
  };

  const updateQuotation = (quotationData) => {
    const newQuotations = quotations.map(q => q.id === quotationData.id ? quotationData : q);
    setQuotations(newQuotations);
    saveQuotations(newQuotations);
  };

  const deleteQuotation = (id) => {
    const newQuotations = quotations.filter(q => q.id !== id);
    setQuotations(newQuotations);
    saveQuotations(newQuotations);
  };

  return (
    <LeadContext.Provider value={{ 
      leads, addLead, updateLead, deleteLead,
      quotations, addQuotation, updateQuotation, deleteQuotation
    }}>
      {children}
    </LeadContext.Provider>
  );
};
