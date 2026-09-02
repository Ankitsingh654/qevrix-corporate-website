// crmDataService.js
// Handles all persistence for QEVRIX CRM

const KEYS = {
  LEADS: 'qevrix_crm_leads',
  QUOTATIONS: 'qevrix_crm_quotations',
  BACKUP_HISTORY: 'qevrix_crm_backup_history', // Stores metadata of backups
};

const MAX_BACKUPS = 3;

// --- Core Data Methods ---

export const getLeads = () => {
  try {
    const data = localStorage.getItem(KEYS.LEADS);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Error loading leads from local storage:", err);
    return [];
  }
};

export const saveLeads = (leads) => {
  try {
    localStorage.setItem(KEYS.LEADS, JSON.stringify(leads));
    triggerAutoBackup();
  } catch (err) {
    console.error("Error saving leads to local storage:", err);
    alert("Failed to save data. Local storage might be full.");
  }
};

export const getQuotations = () => {
  try {
    const data = localStorage.getItem(KEYS.QUOTATIONS);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Error loading quotations from local storage:", err);
    return [];
  }
};

export const saveQuotations = (quotations) => {
  try {
    localStorage.setItem(KEYS.QUOTATIONS, JSON.stringify(quotations));
    triggerAutoBackup();
  } catch (err) {
    console.error("Error saving quotations to local storage:", err);
    alert("Failed to save data. Local storage might be full.");
  }
};

// --- Backup & Restore Methods ---

const createBackupSnapshot = (type = 'auto') => {
  const backup = {
    app: "QEVRIX CRM",
    schemaVersion: 1,
    backupDate: new Date().toISOString(),
    type,
    data: {
      leads: getLeads(),
      quotations: getQuotations()
    }
  };
  return backup;
};

export const createManualBackup = () => {
  try {
    const backup = createBackupSnapshot('manual');
    storeBackupInHistory(backup);
    return backup;
  } catch (err) {
    console.error("Manual backup failed:", err);
    throw err;
  }
};

export const downloadBackup = () => {
  const backup = createBackupSnapshot('download');
  const jsonString = JSON.stringify(backup, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const dateStr = new Date().toISOString().replace(/T/, '_').replace(/:/g, '-').slice(0, 16);
  const fileName = `QEVRIX_CRM_Backup_${dateStr}.json`;

  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const restoreBackup = (backupJson) => {
  try {
    const backup = JSON.parse(backupJson);
    
    // Validate
    if (backup.app !== "QEVRIX CRM" || !backup.schemaVersion || !backup.data) {
      throw new Error("Invalid backup file format.");
    }
    
    // Create safety backup
    const safetyBackup = createBackupSnapshot('safety_pre_restore');
    localStorage.setItem('qevrix_crm_safety_backup', JSON.stringify(safetyBackup));

    // Restore data
    if (backup.data.leads) {
      localStorage.setItem(KEYS.LEADS, JSON.stringify(backup.data.leads));
    }
    if (backup.data.quotations) {
      localStorage.setItem(KEYS.QUOTATIONS, JSON.stringify(backup.data.quotations));
    }
    
    return true;
  } catch (err) {
    console.error("Restore failed:", err);
    throw err;
  }
};

export const getLastBackupTime = () => {
  try {
    const historyData = localStorage.getItem(KEYS.BACKUP_HISTORY);
    if (!historyData) return null;
    const history = JSON.parse(historyData);
    return history.length > 0 ? history[0].backupDate : null;
  } catch (err) {
    return null;
  }
};

const storeBackupInHistory = (backup) => {
  try {
    let history = [];
    const historyData = localStorage.getItem(KEYS.BACKUP_HISTORY);
    if (historyData) {
      history = JSON.parse(historyData);
    }
    
    // Generate a unique key for this backup
    const backupKey = `qevrix_crm_backup_${Date.now()}`;
    localStorage.setItem(backupKey, JSON.stringify(backup));
    
    // Add to history (metadata only)
    history.unshift({
      key: backupKey,
      backupDate: backup.backupDate,
      type: backup.type
    });
    
    // Trim history
    while (history.length > MAX_BACKUPS) {
      const removed = history.pop();
      localStorage.removeItem(removed.key);
    }
    
    localStorage.setItem(KEYS.BACKUP_HISTORY, JSON.stringify(history));
  } catch (err) {
    console.error("Failed to store backup in history:", err);
    // Ignore quota errors for backups so we don't crash the main app
  }
};

// Auto backup debouncer
let autoBackupTimeout = null;
const triggerAutoBackup = () => {
  if (autoBackupTimeout) clearTimeout(autoBackupTimeout);
  autoBackupTimeout = setTimeout(() => {
    try {
      const backup = createBackupSnapshot('auto');
      storeBackupInHistory(backup);
    } catch (err) {
      console.error("Auto backup failed:", err);
    }
  }, 5000); // Debounce for 5 seconds after last change
};
