// src/utils/generatePDF.js
import jsPDF from 'jspdf';

export const generatePDF = (formData, activeTemplate = 'template1') => {
  const doc = new jsPDF('p', 'pt', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 60;
  const margin = 55;

  const { personalInfo, education = [], experience = [], skills = [], projects = [] } = formData;

  // ==================== MODERN CLEAN TEMPLATE ====================
  if (activeTemplate === 'template2') {
    // Header
    doc.setFontSize(34);
    doc.setFont("helvetica", "bold");
    doc.text(personalInfo.fullName || "Your Name", pageWidth / 2, y, { align: 'center' });

    y += 28;
    doc.setFontSize(17);
    doc.text(personalInfo.title || "", pageWidth / 2, y, { align: 'center' });

    y += 35;
    doc.setFontSize(11.5);
    const contact = [personalInfo.email, personalInfo.phone, personalInfo.location]
      .filter(Boolean).join(" • ");
    doc.text(contact, pageWidth / 2, y, { align: 'center' });

    y += 55;

    // Summary
    if (personalInfo.summary) {
      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.text("PROFESSIONAL SUMMARY", margin, y);
      y += 18;
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      const lines = doc.splitTextToSize(personalInfo.summary, pageWidth - margin*2);
      doc.text(lines, margin, y);
      y += lines.length * 16 + 35;
    }

    // Experience
    if (experience.length > 0) {
      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.text("EXPERIENCE", margin, y);
      y += 22;

      experience.forEach(exp => {
        if (y > 750) { doc.addPage(); y = 60; }
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text(exp.jobTitle || "", margin, y);
        y += 16;

        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        doc.text(exp.company || "", margin, y);
        y += 16;

        const date = `${exp.startDate || ''} — ${exp.endDate || 'Present'}`;
        doc.text(date, pageWidth - margin, y - 8, { align: 'right' });

        if (exp.description) {
          doc.setFontSize(10.8);
          const descLines = doc.splitTextToSize(exp.description, pageWidth - margin*2);
          doc.text(descLines, margin, y);
          y += descLines.length * 14.5 + 25;
        }
      });
      y += 25;
    }

    // Education
    if (education.length > 0) {
      if (y > 680) { doc.addPage(); y = 60; }
      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.text("EDUCATION", margin, y);
      y += 20;

      education.forEach(edu => {
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text(edu.degree || "", margin, y);
        y += 16;

        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        doc.text(edu.institution || "", margin, y);
        y += 16;

        const date = `${edu.startDate || ''} — ${edu.endDate || ''}`;
        doc.text(date, pageWidth - margin, y - 8, { align: 'right' });
        y += 40;
      });
    }

    // Skills
    if (skills.length > 0) {
      if (y > 680) { doc.addPage(); y = 60; }
      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.text("SKILLS", margin, y);
      y += 18;

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      const skillsText = skills.join(" • ");
      const skillLines = doc.splitTextToSize(skillsText, pageWidth - margin*2);
      doc.text(skillLines, margin, y);
      y += skillLines.length * 16 + 35;
    }

    // Projects
    if (projects.length > 0) {
      if (y > 650) { doc.addPage(); y = 60; }
      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.text("PROJECTS", margin, y);
      y += 20;

      projects.forEach(proj => {
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text(proj.name || "", margin, y);
        y += 16;

        doc.setFontSize(10.8);
        const pLines = doc.splitTextToSize(proj.description || "", pageWidth - margin*2);
        doc.text(pLines, margin, y);
        y += pLines.length * 14.5 + 25;
      });
    }

    const fileName = `${(personalInfo.fullName || "Resume").replace(/\s+/g, "_")}_Modern.pdf`;
    doc.save(fileName);
    return;
  }

  // ==================== ATS TWO-COLUMN TEMPLATE ====================
  // Dark Header
  doc.setFillColor(17, 24, 39);
  doc.rect(0, 0, pageWidth, 110, 'F');

  doc.setTextColor(255);
  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");
  doc.text(personalInfo.fullName || "Your Name", pageWidth / 2, 55, { align: 'center' });

  doc.setFontSize(15);
  doc.text(personalInfo.title || "", pageWidth / 2, 78, { align: 'center' });

  doc.setFontSize(11);
  const contactLine = [personalInfo.email, personalInfo.phone, personalInfo.location]
    .filter(Boolean).join(" • ");
  doc.text(contactLine, pageWidth / 2, 98, { align: 'center' });

  y = 135;
  const midPoint = pageWidth / 2 + 8;

  // Vertical Line
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.8);
  doc.line(midPoint - 10, y - 15, midPoint - 10, 780);

  let leftY = y;
  let rightY = y;

  // Left Column
  if (personalInfo.summary) {
    doc.setTextColor(0);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("PROFESSIONAL SUMMARY", margin, leftY);
    leftY += 18;
    doc.setFontSize(10.6);
    const summaryLines = doc.splitTextToSize(personalInfo.summary, pageWidth/2 - margin - 30);
    doc.text(summaryLines, margin, leftY);
    leftY += summaryLines.length * 14.5 + 30;
  }

  if (skills.length > 0) {
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("SKILLS", margin, leftY);
    leftY += 18;
    doc.setFontSize(10.6);
    const skillsText = skills.join(", ");
    const skillLines = doc.splitTextToSize(skillsText, pageWidth/2 - margin - 30);
    doc.text(skillLines, margin, leftY);
  }

  // Right Column
  if (experience.length > 0) {
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("EXPERIENCE", midPoint, rightY);
    rightY += 22;

    experience.forEach(exp => {
      if (rightY > 760) { doc.addPage(); rightY = 60; }
      doc.setFontSize(11.5);
      doc.setFont("helvetica", "bold");
      doc.text(exp.jobTitle || "", midPoint, rightY);
      rightY += 16;

      doc.setFontSize(10.8);
      doc.setFont("helvetica", "normal");
      doc.text(exp.company || "", midPoint, rightY);
      rightY += 16;

      const date = `${exp.startDate || ''} — ${exp.endDate || 'Present'}`;
      doc.text(date, pageWidth - margin, rightY - 8, { align: 'right' });

      if (exp.description) {
        const descLines = doc.splitTextToSize(exp.description, pageWidth - midPoint - margin);
        doc.text(descLines, midPoint, rightY);
        rightY += descLines.length * 14 + 18;
      }
    });
  }

  // Education
  if (education.length > 0) {
    if (rightY > 680) { doc.addPage(); rightY = 60; }
    rightY += 25;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("EDUCATION", midPoint, rightY);
    rightY += 18;

    education.forEach(edu => {
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text(edu.degree || "", midPoint, rightY);
      rightY += 16;

      doc.setFontSize(10.6);
      doc.setFont("helvetica", "normal");
      doc.text(edu.institution || "", midPoint, rightY);
      rightY += 16;

      const dateStr = `${edu.startDate || ''} — ${edu.endDate || ''}`;
      doc.text(dateStr, pageWidth - margin, rightY - 8, { align: 'right' });
      rightY += 40;
    });
  }

  // Projects
  if (projects.length > 0) {
    if (rightY > 650) { doc.addPage(); rightY = 60; }
    rightY += 25;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("PROJECTS", midPoint, rightY);
    rightY += 18;

    projects.forEach(proj => {
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text(proj.name || "", midPoint, rightY);
      rightY += 16;

      doc.setFontSize(10.5);
      const pLines = doc.splitTextToSize(proj.description || "", pageWidth - midPoint - margin);
      doc.text(pLines, midPoint, rightY);
      rightY += pLines.length * 14 + 25;
    });
  }

  const fileName = `${(personalInfo.fullName || "Resume").replace(/\s+/g, "_")}_ATS.pdf`;
  doc.save(fileName);
};