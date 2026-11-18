import { generateAtsResumePdf } from '../src/services/pdf-generator';
import { writeFileSync } from 'fs';

async function buildStaticPdfs() {
  console.log('Building static ATS Resume PDFs with pdf-lib...');
  const enPdf = await generateAtsResumePdf('en');
  writeFileSync('public/resume.pdf', enPdf);
  console.log('✓ Generated public/resume.pdf (English)');

  const idPdf = await generateAtsResumePdf('id');
  writeFileSync('public/resume-id.pdf', idPdf);
  console.log('✓ Generated public/resume-id.pdf (Indonesian)');
}

buildStaticPdfs().catch(console.error);
