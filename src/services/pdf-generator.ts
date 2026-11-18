import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { cvDataByLang, type Language } from '../data/cv';

// Helper to wrap text into lines based on maximum width
function wrapText(text: string, font: any, fontSize: number, maxWidth: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const width = font.widthOfTextAtSize(testLine, fontSize);
    if (width <= maxWidth) {
      currentLine = testLine;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

export async function generateAtsResumePdf(lang: Language = 'en'): Promise<Uint8Array> {
  const data = cvDataByLang[lang] || cvDataByLang.en;
  const { profile, experience, skills, projects, education, certifications, languages } = data;
  const isId = lang === 'id';

  const pdfDoc = await PDFDocument.create();
  
  // Set PDF Metadata for ATS & Recruiter Readers
  pdfDoc.setTitle(`${profile.name} — Resume & CV`);
  pdfDoc.setAuthor(profile.name);
  pdfDoc.setSubject(`Resume / Curriculum Vitae for ${profile.name} - ${profile.title}`);
  pdfDoc.setKeywords(['Resume', 'CV', 'ATS', 'Head of IT', 'Backend Engineer', 'AWS Cloud', 'Google Cloud', 'GCP', 'Golang', 'Python', 'AI Vibe Coding', 'Linux']);
  pdfDoc.setCreator('Agus Maulana CV Platform (pdf-lib)');
  pdfDoc.setProducer('pdf-lib');

  // Load Standard ATS Fonts
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const helveticaOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // A4 Page Size: 595.28 x 841.89 pt
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const marginX = 40;
  const marginTop = 42;
  const marginBottom = 40;
  const contentWidth = pageWidth - marginX * 2; // 515.28 pt

  // Colors (Corporate High-Contrast ATS Colors)
  const colorPrimary = rgb(0.1, 0.12, 0.18); // #1a1f2e dark navy
  const colorText = rgb(0.12, 0.14, 0.17);    // #1f242b almost black
  const colorMuted = rgb(0.35, 0.4, 0.48);   // #59667a dark slate
  const colorLine = rgb(0.78, 0.82, 0.88);    // #c7d1e0 subtle border

  let currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - marginTop;

  const checkPageBreak = (neededHeight: number) => {
    if (y - neededHeight < marginBottom) {
      currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - marginTop;
      return true;
    }
    return false;
  };

  const drawSectionHeader = (title: string) => {
    checkPageBreak(30);
    y -= 12;
    currentPage.drawText(title.toUpperCase(), {
      x: marginX,
      y,
      size: 10.5,
      font: helveticaBold,
      color: colorPrimary,
    });
    y -= 4;
    currentPage.drawLine({
      start: { x: marginX, y },
      end: { x: pageWidth - marginX, y },
      thickness: 1,
      color: colorLine,
    });
    y -= 10;
  };

  // ================= 1. HEADER (CANDIDATE INFO) =================
  // Full Name
  currentPage.drawText(profile.name.toUpperCase(), {
    x: marginX,
    y,
    size: 19,
    font: helveticaBold,
    color: colorPrimary,
  });
  y -= 16;

  // Professional Title
  currentPage.drawText(profile.title, {
    x: marginX,
    y,
    size: 9.5,
    font: helveticaBold,
    color: colorMuted,
  });
  y -= 14;

  // Contact Details Line 1
  const contactLine1 = `${profile.location}  |  ${profile.email}  |  ${profile.whatsapp}`;
  currentPage.drawText(contactLine1, {
    x: marginX,
    y,
    size: 8.5,
    font: helvetica,
    color: colorText,
  });
  y -= 11;

  // Contact Details Line 2
  const contactLine2 = `LinkedIn: linkedin.com/in/agus-maulana-yusuf-noor  |  GitHub: github.com/agusmaulanayusufnoor  |  Portfolio: https://agusmyn.my.id`;
  currentPage.drawText(contactLine2, {
    x: marginX,
    y,
    size: 8.5,
    font: helvetica,
    color: colorText,
  });
  y -= 10;

  // Header Divider
  currentPage.drawLine({
    start: { x: marginX, y },
    end: { x: pageWidth - marginX, y },
    thickness: 1.5,
    color: colorPrimary,
  });
  y -= 6;

  // ================= 2. PROFESSIONAL SUMMARY =================
  drawSectionHeader(isId ? 'Ringkasan Profesional' : 'Professional Summary');
  const summaryLines = wrapText(profile.summary, helvetica, 9, contentWidth);
  for (const line of summaryLines) {
    checkPageBreak(12);
    currentPage.drawText(line, {
      x: marginX,
      y,
      size: 9,
      font: helvetica,
      color: colorText,
      lineHeight: 12.5,
    });
    y -= 12.5;
  }

  // ================= 3. CORE TECHNICAL SKILLS =================
  drawSectionHeader(isId ? 'Keahlian Teknis & Domain' : 'Core Technical Expertise');
  for (const [category, items] of Object.entries(skills)) {
    const skillText = `${category}: ${items.join(', ')}`;
    const skillLines = wrapText(skillText, helvetica, 8.5, contentWidth - 10);
    
    checkPageBreak(skillLines.length * 11.5 + 4);
    
    // Draw bullet
    currentPage.drawText('•', {
      x: marginX,
      y,
      size: 9,
      font: helveticaBold,
      color: colorPrimary,
    });

    for (let i = 0; i < skillLines.length; i++) {
      if (i > 0) checkPageBreak(11.5);
      
      if (i === 0) {
        // Highlight category in bold
        const catLabel = `${category}: `;
        const catWidth = helveticaBold.widthOfTextAtSize(catLabel, 8.5);
        currentPage.drawText(catLabel, {
          x: marginX + 10,
          y,
          size: 8.5,
          font: helveticaBold,
          color: colorPrimary,
        });

        // Remainder of line
        const restOfFirstLine = skillLines[0].substring(catLabel.length);
        currentPage.drawText(restOfFirstLine, {
          x: marginX + 10 + catWidth,
          y,
          size: 8.5,
          font: helvetica,
          color: colorText,
        });
      } else {
        currentPage.drawText(skillLines[i], {
          x: marginX + 10,
          y,
          size: 8.5,
          font: helvetica,
          color: colorText,
        });
      }
      y -= 11.5;
    }
    y -= 1.5;
  }

  // ================= 4. WORK EXPERIENCE =================
  drawSectionHeader(isId ? 'Pengalaman Kerja' : 'Professional Work Experience');
  for (const exp of experience) {
    checkPageBreak(40);
    
    // Role Title & Period
    currentPage.drawText(exp.role, {
      x: marginX,
      y,
      size: 10,
      font: helveticaBold,
      color: colorPrimary,
    });

    const periodWidth = helveticaBold.widthOfTextAtSize(exp.period, 9);
    currentPage.drawText(exp.period, {
      x: pageWidth - marginX - periodWidth,
      y,
      size: 9,
      font: helveticaBold,
      color: colorMuted,
    });
    y -= 12;

    // Company Name
    currentPage.drawText(exp.company, {
      x: marginX,
      y,
      size: 9,
      font: helveticaOblique,
      color: colorMuted,
    });
    y -= 11;

    // Bullets
    for (const highlight of exp.highlights) {
      const bulletLines = wrapText(highlight, helvetica, 8.5, contentWidth - 14);
      checkPageBreak(bulletLines.length * 11.5 + 4);

      currentPage.drawText('•', {
        x: marginX + 4,
        y,
        size: 9,
        font: helveticaBold,
        color: colorPrimary,
      });

      for (let i = 0; i < bulletLines.length; i++) {
        if (i > 0) checkPageBreak(11.5);
        currentPage.drawText(bulletLines[i], {
          x: marginX + 14,
          y,
          size: 8.5,
          font: helvetica,
          color: colorText,
          lineHeight: 11.5,
        });
        y -= 11.5;
      }
      y -= 2;
    }
    y -= 4;
  }

  // ================= 5. KEY ENTERPRISE PLATFORMS & PROJECTS =================
  drawSectionHeader(isId ? 'Proyek & Arsitektur Sistem Kritis' : 'Key Enterprise Platforms & Architectures');
  for (const proj of projects) {
    checkPageBreak(28);

    const titleText = `${proj.name} (${proj.year || '2024'}) — ${proj.tech}`;
    currentPage.drawText('•', {
      x: marginX + 4,
      y,
      size: 9,
      font: helveticaBold,
      color: colorPrimary,
    });

    const projTitleLines = wrapText(titleText, helveticaBold, 8.5, contentWidth - 14);
    for (let i = 0; i < projTitleLines.length; i++) {
      if (i > 0) checkPageBreak(11.5);
      currentPage.drawText(projTitleLines[i], {
        x: marginX + 14,
        y,
        size: 8.5,
        font: helveticaBold,
        color: colorPrimary,
      });
      y -= 11;
    }

    const descLines = wrapText(proj.description, helvetica, 8.5, contentWidth - 14);
    for (const dLine of descLines) {
      checkPageBreak(11);
      currentPage.drawText(dLine, {
        x: marginX + 14,
        y,
        size: 8.5,
        font: helvetica,
        color: colorText,
      });
      y -= 11;
    }
    y -= 3;
  }

  // ================= 6. EDUCATION & CREDENTIALS =================
  drawSectionHeader(isId ? 'Pendidikan & Sertifikasi' : 'Education, Certifications & Languages');
  
  // Education
  checkPageBreak(30);
  currentPage.drawText('•', {
    x: marginX + 4,
    y,
    size: 9,
    font: helveticaBold,
    color: colorPrimary,
  });
  currentPage.drawText(`${education.degree} — ${education.institution} (${education.year})`, {
    x: marginX + 14,
    y,
    size: 8.5,
    font: helveticaBold,
    color: colorPrimary,
  });
  y -= 12;

  // Certifications
  checkPageBreak(15);
  currentPage.drawText('•', {
    x: marginX + 4,
    y,
    size: 9,
    font: helveticaBold,
    color: colorPrimary,
  });
  currentPage.drawText(`Certifications: ${certifications.join('  |  ')}`, {
    x: marginX + 14,
    y,
    size: 8.5,
    font: helvetica,
    color: colorText,
  });
  y -= 12;

  // Languages
  checkPageBreak(15);
  currentPage.drawText('•', {
    x: marginX + 4,
    y,
    size: 9,
    font: helveticaBold,
    color: colorPrimary,
  });
  currentPage.drawText(`Languages: ${languages.join('  |  ')}`, {
    x: marginX + 14,
    y,
    size: 8.5,
    font: helvetica,
    color: colorText,
  });
  y -= 14;

  // Add subtle page numbers at bottom of each page
  const pages = pdfDoc.getPages();
  for (let idx = 0; idx < pages.length; idx++) {
    const page = pages[idx];
    const pageNumText = `${profile.name} — Resume  |  Page ${idx + 1} of ${pages.length}`;
    const numWidth = helvetica.widthOfTextAtSize(pageNumText, 7.5);
    page.drawText(pageNumText, {
      x: (pageWidth - numWidth) / 2,
      y: 18,
      size: 7.5,
      font: helvetica,
      color: colorMuted,
    });
  }

  return await pdfDoc.save();
}
