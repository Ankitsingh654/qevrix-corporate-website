import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import logoImg from '../assets/qevrix-logo.png';

export const generateQuotation = async (lead) => {
  const doc = new jsPDF();
  
  // Try to load logo image
  let logoBase64 = null;
  try {
    const img = new Image();
    img.src = logoImg;
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });
    
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    logoBase64 = canvas.toDataURL('image/png');
  } catch (err) {
    console.error("Could not load logo for PDF", err);
  }
  
  // Colors
  const primaryColor = [255, 90, 0]; // QEVRIX Orange
  const navyColor = [8, 13, 28]; // QEVRIX Navy
  const grayColor = [100, 100, 100];
  const lightGray = [245, 245, 245];
  
  // ----------------------------------------------------
  // 1. Header Section
  // ----------------------------------------------------
  doc.setFillColor(...navyColor);
  doc.rect(0, 0, 210, 40, 'F');
  
  // QEVRIX Logo / Name
  if (logoBase64) {
    doc.addImage(logoBase64, 'PNG', 14, 10, 45, 20); // prominent, well-padded logo
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'italic');
    doc.text('Building Innovation', 16, 33);
  } else {
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(26);
    doc.setFont('helvetica', 'bold');
    doc.text('QEVRIX', 14, 26);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.text('Building Innovation', 14, 32);
  }
  
  // Company Info (Right aligned in header)
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Email: contact@qevrix.in', 196, 15, { align: 'right' });
  doc.text('Website: www.qevrix.in', 196, 20, { align: 'right' });
  doc.text('Contact: +91 7903682921', 196, 25, { align: 'right' });
  doc.text('Address: Noida, Uttar Pradesh, India', 196, 30, { align: 'right' });
  doc.text('CIN: U62011UP2026PTC257375', 196, 35, { align: 'right' });
  
  // ----------------------------------------------------
  // 2. Quotation Info (Two Columns)
  // ----------------------------------------------------
  // Title
  doc.setTextColor(...navyColor);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('QUOTATION', 14, 55);
  
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(1);
  doc.line(14, 60, 50, 60);

  // Column 1: Billed To
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Billed To:', 14, 70);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(`Company: ${lead.company || '-'}`, 14, 76);
  doc.text(`Client Name: ${lead.name || '-'}`, 14, 82);
  doc.text(`Email: ${lead.email || '-'}`, 14, 88);
  doc.text(`Phone: ${lead.phone || '-'}`, 14, 94);
  
  // Column 2: Quotation Meta
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Quotation Details:', 120, 70);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  
  const formatDateStr = (dateString) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };
  
  const qtnNumber = lead.quotationNumber || `QEVRIX-QTN-${new Date().getFullYear()}-${Math.floor(Math.random() * 900) + 100}`;
  doc.text(`Quotation No: ${qtnNumber}`, 120, 76);
  
  const formattedDate = formatDateStr(lead.quotationDate || new Date());
  doc.text(`Date: ${formattedDate}`, 120, 82);
  
  let validUntilFormatted = '15 Days';
  if (lead.quotationValidUntil) {
    validUntilFormatted = formatDateStr(lead.quotationValidUntil);
  } else {
    const d = new Date(lead.quotationDate || new Date());
    d.setDate(d.getDate() + 15);
    validUntilFormatted = formatDateStr(d);
  }
  
  doc.text(`Valid Until: ${validUntilFormatted}`, 120, 88);
  
  // ----------------------------------------------------
  // 3. Service / Pricing Table
  // ----------------------------------------------------
  
  let tableBody = [];
  let globalSubtotal = 0;
  let globalDiscount = 0;
  let globalTax = 0;
  let globalTotal = 0;
  
  // Base tax for header rendering (we'll just use 18% as the label, but it could vary per line item in Workforce)
  let headerTaxLabel = '18%';

  if (lead.quotationService === 'Workforce Solutions' && lead.workforceLineItems && Array.isArray(lead.workforceLineItems)) {
    headerTaxLabel = 'Tax'; // Generic label since tax can vary per line
    
    lead.workforceLineItems.forEach((item, index) => {
      const description = `${item.skillLevel} ${item.jobRole}\nLocation: ${item.deploymentLocation || '-'}\nShift: ${item.shift || '-'} | Duration: ${item.contractDuration || '-'}`;
      const qty = parseFloat(item.quantity) || 1;
      const unit = item.unit || '-';
      const rate = parseFloat(item.rate) || 0;
      const subtotal = qty * rate;
      const discountAmount = parseFloat(item.discount) || 0;
      const taxPercent = parseFloat(item.tax) || 0;
      const taxAmount = (subtotal - discountAmount) * (taxPercent / 100);
      
      globalSubtotal += subtotal;
      globalDiscount += discountAmount;
      globalTax += taxAmount;
      
      tableBody.push([
        (index + 1).toString(),
        description,
        qty,
        unit,
        rate.toLocaleString('en-IN', {minimumFractionDigits: 2}),
        discountAmount > 0 ? `-${discountAmount.toLocaleString('en-IN', {minimumFractionDigits: 2})}` : '-',
        taxAmount > 0 ? taxAmount.toLocaleString('en-IN', {minimumFractionDigits: 2}) + ` (${taxPercent}%)` : '-',
        (subtotal - discountAmount).toLocaleString('en-IN', {minimumFractionDigits: 2})
      ]);
    });
    
    globalTotal = (globalSubtotal - globalDiscount) + globalTax;
    
  } else {
    const serviceText = lead.quotationService || lead.service || 'Service';
    const subServiceText = lead.quotationSubService || lead.subService || '';
    const description = subServiceText ? `${serviceText} - ${subServiceText}` : serviceText;
    
    const qty = parseFloat(lead.quotationQuantity) || 1;
    const unit = lead.quotationUnit || '-';
    
    let rate = parseFloat(lead.quotationRate) || 0;
    let subtotal = qty * rate;
    
    // If rate is 0 but amount is entered, infer the rate so it doesn't show 0.00
    if (rate === 0 && parseFloat(lead.quotationAmount) > 0) {
      rate = parseFloat(lead.quotationAmount) / qty;
      subtotal = rate * qty;
    }
    
    const discountAmount = parseFloat(lead.quotationDiscount) || 0;
    
    // Parse tax, default to 18 if not defined on the lead
    const taxPercent = lead.quotationTax !== undefined && lead.quotationTax !== null && lead.quotationTax !== '' 
        ? parseFloat(lead.quotationTax) 
        : 18;
    
    headerTaxLabel = `${taxPercent}%`;
    const taxAmount = (subtotal - discountAmount) * (taxPercent / 100);
    
    globalSubtotal = subtotal;
    globalDiscount = discountAmount;
    globalTax = taxAmount;
    
    // Always use calculated total unless an explicitly different quotationAmount was entered
    globalTotal = (subtotal - discountAmount) + taxAmount;
    if (lead.quotationAmount && Math.abs(parseFloat(lead.quotationAmount) - globalTotal) > 1) {
      globalTotal = parseFloat(lead.quotationAmount);
    }
    
    tableBody.push([
      '1', 
      description, 
      qty, 
      unit, 
      rate.toLocaleString('en-IN', {minimumFractionDigits: 2}), 
      discountAmount > 0 ? `-${discountAmount.toLocaleString('en-IN', {minimumFractionDigits: 2})}` : '-', 
      taxAmount > 0 ? taxAmount.toLocaleString('en-IN', {minimumFractionDigits: 2}) : '-', 
      (subtotal - discountAmount).toLocaleString('en-IN', {minimumFractionDigits: 2})
    ]);
  }
  
  autoTable(doc, {
    startY: 105,
    headStyles: { fillColor: navyColor, textColor: [255,255,255], fontStyle: 'bold' },
    head: [['Sr No', 'Description / Service', 'Qty', 'Unit', 'Rate (INR)', 'Discount', `Tax (${headerTaxLabel})`, 'Amount (INR)']],
    body: tableBody,
    theme: 'grid',
    styles: { fontSize: 9, cellPadding: 3 },
    columnStyles: {
      0: { cellWidth: 14, halign: 'center' },
      1: { cellWidth: 'auto' },
      2: { halign: 'center', cellWidth: 12 },
      3: { halign: 'center', cellWidth: 18 },
      4: { halign: 'right', cellWidth: 26 },
      5: { halign: 'right', cellWidth: 22 },
      6: { halign: 'right', cellWidth: 24 },
      7: { halign: 'right', fontStyle: 'bold', cellWidth: 32 }
    }
  });
  
  let finalY = doc.lastAutoTable.finalY;
  
  // ----------------------------------------------------
  // 4. Highlighted Summary Table
  // ----------------------------------------------------
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.5);
  doc.line(120, finalY + 5, 196, finalY + 5);

  autoTable(doc, {
    startY: finalY + 10,
    theme: 'plain',
    styles: { fontSize: 10, cellPadding: 3 },
    body: [
      ['Subtotal', `Rs. ${globalSubtotal.toLocaleString('en-IN', {minimumFractionDigits: 2})}`],
      ['Discount', globalDiscount > 0 ? `- Rs. ${globalDiscount.toLocaleString('en-IN', {minimumFractionDigits: 2})}` : '-'],
      [`GST / Tax`, `+ Rs. ${globalTax.toLocaleString('en-IN', {minimumFractionDigits: 2})}`],
    ],
    columnStyles: {
      0: { halign: 'right', fontStyle: 'normal' },
      1: { halign: 'right', cellWidth: 40 }
    },
    margin: { left: 100 }
  });
  
  finalY = doc.lastAutoTable.finalY;
  
  // Grand Total Highlight
  doc.setFillColor(...primaryColor);
  doc.rect(115, finalY + 2, 81, 10, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Grand Total:', 120, finalY + 9);
  doc.text(`Rs. ${globalTotal.toLocaleString('en-IN', {minimumFractionDigits: 2})}`, 194, finalY + 9, { align: 'right' });
  
  finalY = finalY + 25;
  
  // Helper to add new page if needed
  const checkPageBreak = (neededHeight) => {
    if (finalY + neededHeight > 260) {
      doc.addPage();
      finalY = 20;
    }
  };
  
  // ----------------------------------------------------
  // 5. Requirement / Scope
  // ----------------------------------------------------
  doc.setTextColor(...navyColor);
  if (lead.quotationRequirement || lead.requirement) {
    checkPageBreak(30);
    
    doc.setFillColor(...lightGray);
    doc.rect(14, finalY, 182, 8, 'F');
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Requirement / Scope:', 16, finalY + 6);
    
    finalY += 14;
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);
    const reqText = doc.splitTextToSize(lead.quotationRequirement || lead.requirement, 178);
    doc.text(reqText, 16, finalY);
    finalY += (reqText.length * 4) + 10;
  }
  
  // ----------------------------------------------------
  // 6. Terms & Conditions
  // ----------------------------------------------------
  checkPageBreak(50);
  doc.setTextColor(...navyColor);
  doc.setFillColor(...lightGray);
  doc.rect(14, finalY, 182, 8, 'F');
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Commercial Terms & Conditions:', 16, finalY + 6);
  
  finalY += 14;
  
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...grayColor);
  
  const service = lead.quotationService || lead.service;
  
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

  const defaultTerms = `${paymentTerms}

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
  
  const termsText = lead.quotationTerms || defaultTerms;
  const splitTerms = doc.splitTextToSize(termsText, 178);
  doc.text(splitTerms, 16, finalY);
  finalY += (splitTerms.length * 3.5) + 15;
  
  // ----------------------------------------------------
  // 7. Signatures
  // ----------------------------------------------------
  doc.setTextColor(0,0,0);
  checkPageBreak(50);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('For QEVRIX PRIVATE LIMITED', 14, finalY);
  doc.text(`For ${lead.company || 'Client'}`, 120, finalY);
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...grayColor);
  
  // Qevrix Auth
  doc.text('Authorized Signatory', 14, finalY + 15);
  doc.text('Name:', 14, finalY + 22);
  doc.text('Designation:', 14, finalY + 29);
  doc.text('Signature:', 14, finalY + 36);
  doc.text('Date:', 14, finalY + 43);
  
  // Client Auth
  doc.text('Authorized Signatory', 120, finalY + 15);
  doc.text('Name:', 120, finalY + 22);
  doc.text('Designation:', 120, finalY + 29);
  doc.text('Signature:', 120, finalY + 36);
  doc.text('Date:', 120, finalY + 43);
  
  // ----------------------------------------------------
  // 8. Footer 
  // ----------------------------------------------------
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFillColor(...navyColor);
    doc.rect(0, 275, 210, 22, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('QEVRIX PRIVATE LIMITED | www.qevrix.in | contact@qevrix.in', 105, 283, { align: 'center' });
    
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(150, 150, 150);
    doc.text('Confidential Commercial Document', 105, 288, { align: 'center' });
    
    // Page number
    doc.setFont('helvetica', 'normal');
    doc.text(`Page ${i} of ${pageCount}`, 196, 288, { align: 'right' });
  }
  
  // Format safe filename
  const safeClientName = (lead.company || lead.name || 'Client').replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  doc.save(`QEVRIX-Quotation-${qtnNumber}-${safeClientName}.pdf`);
};
