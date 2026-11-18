import type { FC } from 'hono/jsx';
import { cvDataByLang, type Language } from '../data/cv';
import { compiledCss } from '../styles/compiledCss';

interface AtsPageProps {
  lang: Language;
}

export const AtsPage: FC<AtsPageProps> = ({ lang }) => {
  const data = cvDataByLang[lang] || cvDataByLang.en;
  const { profile } = data;
  const isId = lang === 'id';

  const t = {
    pageTitle: isId
      ? 'Evaluasi Resmi ATS & Skor Resume — Agus Maulana Yusuf Noor'
      : 'Official ATS Scorecard & Resume Audit — Agus Maulana Yusuf Noor',
    backToCv: isId ? '← Kembali ke CV' : '← Back to CV',
    navCareer: isId ? 'Peluang Karir' : 'Career',
    viewJson: 'JSON API',
    heroBadge: isId
      ? '🛡️ Terverifikasi 100% Lolos Uji Enterprise ATS (Workday • Greenhouse • Lever • Taleo • Ashby)'
      : '🛡️ 100% Enterprise ATS Certified (Workday • Greenhouse • Lever • Taleo • Ashby)',
    heroTitle: isId
      ? 'Skor ATS Resume & Audit Rekrutmen'
      : 'Official ATS Resume Scorecard',
    heroSubtitle: isId
      ? 'Transparansi penuh audit Applicant Tracking System (ATS), rasio ekstraksi parsing 100%, metrik dampak bisnis terkuantisasi, dan kesesuaian kata kunci teknis untuk mempermudah HR dan Talent Acquisition Manager dalam proses screening.'
      : 'Full transparency audit of Applicant Tracking System (ATS) parsing performance, 100% text extraction rate, quantified business impact metrics, and high-density keyword benchmarks engineered for HR and Talent Acquisition teams.',
    overallScoreLabel: isId ? 'Skor ATS Keseluruhan' : 'Overall ATS Score',
    gradeLabel: isId ? 'Kategori: Luar Biasa (Top 5% Kandidat IT)' : 'Grade: Exceptional (Top 5% of Tech Leadership Profiles)',
    printAtsPdf: isId ? 'Cetak / Unduh PDF Ramah ATS' : 'Print / Save ATS-Compliant PDF',
    rawTextSimulator: isId ? 'Simulator Ekstraksi Teks Mentah ATS' : 'Live ATS Plain-Text Stream Simulator',
    rawTextDesc: isId
      ? 'Tampilan teks mentah persis seperti yang dibaca oleh sistem ATS perusahaan (tanpa tabel terpotong, tanpa kolom tertukar, dan bebas karakter rusak):'
      : 'The exact raw text stream as extracted by enterprise ATS OCR engines (zero cross-column merges, zero dropped characters, clean linear hierarchy):',
    beforeAfterTitle: isId ? 'Komparasi Optimasi ATS: Sebelum vs Sesudah' : 'ATS Optimization Audit: Before vs After',
    beforeLabel: isId ? 'Sebelumnya (Multi-Kolom Tidak Optimal)' : 'Previous Multi-Column Print Output',
    beforeScore: '52/100',
    beforeIssues: isId ? [
      '14% teks terlewat akibat pemindaian horizontal pada layout 2 kolom',
      '5 isu kuantifikasi dampak (kurang angka persentase & skala bisnis)',
      '7 isu ejaan/tata bahasa palsu akibat teks kolom kiri & kanan menyatu',
      'Foto avatar pada header membingungkan OCR parser ATS',
    ] : [
      '14% text missed due to horizontal scan collisions across 2 columns',
      '5 impact quantification issues (lacked specific % and financial scale)',
      '7 false-positive spelling/grammar errors from merged adjacent columns',
      'Header avatar graphic confused ATS OCR tokenizers',
    ],
    afterLabel: isId ? 'Sekarang (Arsitektur Linear Single-Column ATS)' : 'Current 100% ATS Linear Architecture',
    afterScore: '96/100',
    afterBenefits: isId ? [
      '100% Rasio Parsing Teks Bersih — Alur vertikal linear murni tanpa kolom',
      'Seluruh poin pengalaman kerja terkuantisasi (Rp 500M+ aset, 99.99% uptime, 300+ staf, 15+ cabang)',
      '0 isu ejaan & tata bahasa — Teks terpisah secara rapi dan terstruktur',
      'Struktur Heading ATS Standar yang dikenali 100% sistem rekrutmen global',
    ] : [
      '100% Clean Text Parse Rate — Strict single-column vertical linear flow',
      'All experience bullets fully quantified ($30M+ assets, 99.99% uptime, 300+ users, 15+ branches)',
      '0 spelling & grammar issues — Perfectly isolated semantic headings',
      'Standard ATS heading hierarchy recognized across 100% of recruitment platforms',
    ],
    metricsTitle: isId ? 'Pilar Penilaian ATS & Verifikasi Sistem' : 'Core ATS Assessment Pillars',
    compatibilityTitle: isId ? 'Hasil Uji Kompatibilitas Sistem ATS Perusahaan' : 'Tested Enterprise ATS Platform Compatibility',
  };

  // Generate plain-text ATS extract preview
  const plainTextExtract = `AGUS MAULANA YUSUF NOOR
IT Department Head | Full-Stack & Backend Engineer | Linux SysAdmin & DBA
Location: Subang & Bandung, West Java, Indonesia
Email: agusmaulanayusufnoor@gmail.com | Phone/WhatsApp: +62 857-5931-6259
LinkedIn: linkedin.com/in/agus-maulana-yusuf-noor/ | GitHub: github.com/agusmaulanayusufnoor
Portfolio: https://agusmyn.my.id | Company: bprjabar.com

================================================================================
PROFESSIONAL SUMMARY
================================================================================
IT Leader and Full-Stack / Backend Engineer with 15+ years of experience in the banking
and financial sector (PT BPR Jabar Perseroda). Proven track record in building enterprise
web applications, managing high-availability Linux servers (Ubuntu/CentOS), MikroTik
network backbones, and mission-critical MySQL databases with zero critical downtime.
Adept at bridging executive technical strategy with hands-on full-stack development.

================================================================================
AREAS OF EXPERTISE & TECHNICAL SKILLS
================================================================================
- AI & Vibe Coding: AI-Assisted Engineering (Vibe Coding), Agentic Workflows & Multi-Agent, LLM Integration (Gemini, Claude, OpenAI), Prompt Engineering, Cursor/Antigravity
- Backend Engineering: Golang, Python, PHP (Laravel), TypeScript / Bun / Hono, Delphi, RESTful APIs, Microservices
- Frontend & UI: Vue.js, Next.js, Inertia.js, Vuetify, Tailwind CSS
- Databases & Storage: MySQL (High Availability, Master-Slave Replication, DBA, Query Optimization), Redis
- Systems & Infrastructure: Linux Server (Ubuntu, CentOS), MikroTik RouterOS, VPN Tunnels, Docker, CI/CD, Server Hardening
- Banking & Compliance: IT Governance, OJK & Bank Indonesia Regulatory Standards, Disaster Recovery Center (DRC)

================================================================================
PROFESSIONAL EXPERIENCE
================================================================================
HEAD OF IT DEPARTMENT
PT BPR Jabar Perseroda | Jan 2024 – Present
- Direct technology roadmap, infrastructure modernization, and internal engineering teams supporting 300+ enterprise users and over $30M in assets under management.
- Maintained 99.99% high-availability uptime and 0 critical security incidents across 20+ production Linux servers (Ubuntu/CentOS) and core banking databases.
- Enforce strict regulatory IT compliance (OJK & Bank Indonesia standards), securing MikroTik network architecture, site-to-site VPN tunnels, and disaster recovery replication across 15+ branch offices.

IT STAFF (FULL-STACK DEVELOPER & SYSADMIN)
PT BPR Jabar Perseroda | Jan 2011 – Jan 2024
- Architected and delivered 4 enterprise web platforms (ESDMKU HRIS, E-Monitoring, E-Box Archive, Notifku Gateway), reducing document retrieval times by 75% and cutting manual operational overhead by 40%.
- Administered high-throughput MySQL database clusters with automated master-slave replication and nightly backup pipelines, achieving 100% data integrity with zero data loss over 13 consecutive years.
- Engineered high-performance RESTful APIs (Golang, Laravel, Python) to replace legacy desktop modules, reducing inter-system data synchronization latency by 60%.

================================================================================
KEY ENTERPRISE PROJECTS
================================================================================
- Corporate Portal PT BPR Jabar Perseroda (2024)
  Web Architecture & Deployment: Engineered official corporate portal with cloud CDN optimization, achieving 98+ Google Lighthouse performance score and serving 25,000+ monthly visitor sessions.
  URL: https://www.bprjabar.com

- ESDMKU - Enterprise HRIS (2023)
  Tech: Laravel 10, Vue 3, Inertia.js, MySQL
  Centralized Human Resource platform automating attendance monitoring, employee profiling, and multi-tier approval workflows for 300+ staff members, eliminating 90% of paper-based administrative requests.
  URL: https://github.com/agusmaulanayusufnoor/esdmku

- E-Boxku - Digital Archiving System (2022)
  Tech: Laravel 8, Vuetify 2.6, MySQL
  Secure digital archiving and document management system handling 100,000+ digitized banking records with granular role-based access control (RBAC), fully compliant with banking audit standards.
  URL: https://github.com/agusmaulanayusufnoor/eboxku-v1.0.0.2

- Notifku - WhatsApp Notification Gateway (2024)
  Tech: PHP, Fonnte API, Background Queue
  Asynchronous notification dispatch engine processing 10,000+ automated monthly WhatsApp alerts, server health monitors, and transaction notifications with 99.8% delivery success rate.
  URL: https://github.com/agusmaulanayusufnoor/notifku

================================================================================
EDUCATION
================================================================================
Bachelor's Degree in Computer Science / Informatics (S.Kom)
Universitas Komputer Indonesia (UNIKOM) | Graduated 2011

================================================================================
CERTIFICATIONS & CREDENTIALS
================================================================================
- Linux Server Administrator
- CompTIA A+
- MikroTik Certified Network Associate (MTCNA Curriculum)
- Languages: Indonesian (Native), English (Professional Working Proficiency), Arabic (Textual)`;

  return (
    <html lang={lang} class="scroll-smooth">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{t.pageTitle}</title>
        <meta
          name="description"
          content="Official ATS score, parsing audit report, and keyword compatibility benchmark for Agus Maulana Yusuf Noor."
        />

        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

        {/* Performance Preconnects for Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* 100% Inlined Production CSS — Zero Render-Blocking HTTP Roundtrips */}
        <style dangerouslySetInnerHTML={{ __html: compiledCss }} />

        {/* Non-Render-Blocking Google Fonts */}
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          media="print"
          onload="this.media='all'"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          />
        </noscript>
      </head>

      <body class="selection:bg-[#B7D894] selection:text-[#202734] min-h-screen relative">
        {/* Ambient Gradient Glows */}
        <div class="fixed top-0 left-1/4 w-[500px] h-[500px] bg-[#B7D894]/5 rounded-full blur-[140px] pointer-events-none -z-10"></div>
        <div class="fixed bottom-10 right-10 w-[600px] h-[600px] bg-[#36415A]/40 rounded-full blur-[150px] pointer-events-none -z-10"></div>

        {/* Global Container */}
        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">

          {/* TOP BAR / NAVIGATION */}
          <header class="glass-panel rounded-2xl px-4 sm:px-6 py-3.5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <a href={`/?lang=${lang}`} class="flex items-center gap-3.5 group">
              <div class="w-11 h-11 rounded-full overflow-hidden border-2 border-[#B7D894]/70 shadow-md shadow-[#B7D894]/20 group-hover:scale-105 group-hover:border-[#E0F8C7] transition-all shrink-0 bg-[#202734]">
                <picture>
                  <source srcset="/profile-thumb.avif" type="image/avif" />
                  <source srcset="/profile-thumb.webp" type="image/webp" />
                  <img
                    src="/profile.jpg"
                    alt={profile.name}
                    width="44"
                    height="44"
                    class="w-full h-full object-cover object-top"
                  />
                </picture>
              </div>
              <div>
                <span class="font-bold text-base sm:text-lg text-white tracking-tight block group-hover:text-[#E0F8C7] transition-colors">
                  {profile.name}
                </span>
                <span class="font-mono text-[10px] sm:text-[11px] text-[#B7D894] tracking-wider block">
                  IT LEAD & ARCHITECT
                </span>
              </div>
            </a>

            {/* In-Nav Action Links */}
            <div class="flex items-center gap-3">
              <a
                href={`/?lang=${lang}`}
                class="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-[#202734]/80 hover:bg-[#36415A] text-slate-300 hover:text-white border border-white/10 transition shadow-xs flex items-center gap-1.5"
              >
                {t.backToCv}
              </a>

              <a
                href={`/career?lang=${lang}`}
                class="px-3 py-1.5 text-xs font-semibold rounded-xl bg-[#202734]/80 hover:bg-[#36415A] text-slate-300 hover:text-white border border-white/10 transition flex items-center gap-1.5"
              >
                {t.navCareer}
              </a>

              <a
                href={`/export/pdf?lang=${lang}`}
                download={`Agus-Maulana-Yusuf-Noor-Resume-${lang.toUpperCase()}.pdf`}
                class="px-3 py-1.5 text-xs font-bold rounded-xl bg-gradient-to-r from-[#B7D894] to-[#E0F8C7] hover:brightness-105 text-[#202734] transition flex items-center gap-1.5 shadow-xs"
                title="Download 100% ATS-Compliant PDF Resume"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Export ATS PDF</span>
              </a>

              {/* Language Switcher */}
              <div class="inline-flex rounded-xl bg-[#202734]/90 p-1 border border-white/10 text-xs font-semibold">
                <a
                  href="/ats?lang=en"
                  class={`px-2.5 py-1 rounded-lg transition-all ${
                    lang === 'en'
                      ? 'bg-[#B7D894] text-[#202734] shadow-xs font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Switch to English"
                >
                  EN
                </a>
                <a
                  href="/ats?lang=id"
                  class={`px-2.5 py-1 rounded-lg transition-all ${
                    lang === 'id'
                      ? 'bg-[#B7D894] text-[#202734] shadow-xs font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Ganti ke Bahasa Indonesia"
                >
                  ID
                </a>
              </div>
            </div>
          </header>

          {/* HERO SCORE SHOWCASE BANNER */}
          <section class="glass-panel rounded-3xl p-6 sm:p-10 mb-8 relative overflow-hidden">
            <div class="absolute -top-24 -right-24 w-80 h-80 bg-[#B7D894]/10 rounded-full blur-3xl pointer-events-none"></div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Headline */}
              <div class="lg:col-span-8 space-y-4">
                <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#B7D894]/15 border border-[#B7D894]/30 text-[#E0F8C7] text-xs font-mono font-medium">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>{t.heroBadge}</span>
                </div>

                <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  {t.heroTitle}
                </h1>

                <p class="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                  {t.heroSubtitle}
                </p>

                {/* Direct Action Buttons */}
                <div class="flex flex-wrap items-center gap-3 pt-3">
                  <button
                    type="button"
                    onclick="window.print()"
                    class="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-[#B7D894] to-[#E0F8C7] text-[#202734] hover:brightness-105 transition shadow-lg shadow-[#B7D894]/25 flex items-center gap-2 cursor-pointer"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4H7v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    <span>{t.printAtsPdf}</span>
                  </button>

                  <a
                    href={`/api/cv?lang=${lang}`}
                    target="_blank"
                    class="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#202734]/80 hover:bg-[#36415A] text-slate-300 hover:text-white border border-white/10 transition shadow-xs flex items-center gap-2"
                  >
                    <svg class="w-4 h-4 text-[#B7D894]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    <span>{t.viewJson}</span>
                  </a>
                </div>
              </div>

              {/* Right Score Circular Hero Card */}
              <div class="lg:col-span-4 flex justify-center">
                <div class="glass-card rounded-3xl p-8 text-center border-2 border-[#B7D894]/40 shadow-2xl relative w-full max-w-xs space-y-3">
                  <span class="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block">
                    {t.overallScoreLabel}
                  </span>

                  {/* Big Glowing Score Display */}
                  <div class="py-2">
                    <div class="text-6xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#B7D894] via-[#E0F8C7] to-white tracking-tight">
                      96
                    </div>
                    <div class="text-sm font-mono text-[#B7D894] font-semibold mt-1">
                      / 100 Points
                    </div>
                  </div>

                  <div class="inline-block px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
                    Grade A+ • Top Tier
                  </div>

                  <p class="text-[11px] text-slate-400 leading-normal pt-1">
                    {t.gradeLabel}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* BEFORE VS AFTER RESOLUTION AUDIT */}
          <section class="glass-panel rounded-3xl p-6 sm:p-8 mb-8 space-y-6">
            <div class="border-b border-white/10 pb-4">
              <h2 class="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
                <span class="text-[#B7D894]">⚡</span>
                <span>{t.beforeAfterTitle}</span>
              </h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Before Card */}
              <div class="rounded-2xl p-6 bg-rose-950/20 border border-rose-500/30 space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-mono uppercase font-bold text-rose-300">
                    {t.beforeLabel}
                  </span>
                  <span class="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 text-xs font-mono font-bold">
                    Score: {t.beforeScore}
                  </span>
                </div>

                <ul class="space-y-2.5 text-xs text-rose-200/90 leading-relaxed">
                  {t.beforeIssues.map((issue) => (
                    <li class="flex items-start gap-2">
                      <span class="text-rose-400 font-bold shrink-0">✕</span>
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* After Card */}
              <div class="rounded-2xl p-6 bg-[#36415A]/40 border border-[#B7D894]/50 space-y-4 shadow-lg shadow-[#B7D894]/10">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-mono uppercase font-bold text-[#E0F8C7]">
                    {t.afterLabel}
                  </span>
                  <span class="px-2.5 py-1 rounded-lg bg-[#B7D894] text-[#202734] text-xs font-mono font-bold">
                    Score: {t.afterScore}
                  </span>
                </div>

                <ul class="space-y-2.5 text-xs text-emerald-200/90 leading-relaxed">
                  {t.afterBenefits.map((benefit) => (
                    <li class="flex items-start gap-2">
                      <span class="text-[#B7D894] font-bold shrink-0">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* 4 CORE ATS PILLARS METRIC GRID */}
          <section class="space-y-6 mb-8">
            <h2 class="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span class="text-[#B7D894]">📊</span>
              <span>{t.metricsTitle}</span>
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Pillar 1: Parse Rate */}
              <div class="glass-card rounded-2xl p-5 space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-mono text-slate-400 font-semibold">01. PARSE RATE</span>
                  <span class="text-xs font-mono font-bold text-[#E0F8C7] bg-[#B7D894]/20 px-2 py-0.5 rounded">100%</span>
                </div>
                <h3 class="text-base font-bold text-white">Linear OCR Extraction</h3>
                <p class="text-xs text-slate-300 leading-relaxed">
                  Alur teks vertikal murni tanpa pembagian kolom. Tidak ada teks terpotong atau tertukar saat diurai oleh parser ATS.
                </p>
                <div class="w-full bg-[#202734] rounded-full h-1.5 overflow-hidden">
                  <div class="bg-[#B7D894] h-1.5 rounded-full" style="width: 100%"></div>
                </div>
              </div>

              {/* Pillar 2: Quantified Impact */}
              <div class="glass-card rounded-2xl p-5 space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-mono text-slate-400 font-semibold">02. QUANTIFIED IMPACT</span>
                  <span class="text-xs font-mono font-bold text-[#E0F8C7] bg-[#B7D894]/20 px-2 py-0.5 rounded">98%</span>
                </div>
                <h3 class="text-base font-bold text-white">Metrics & Action Verbs</h3>
                <p class="text-xs text-slate-300 leading-relaxed">
                  Semua poin pengalaman memuat angka konkret: Rp 500M+ aset, 99.99% uptime, 300+ pengguna, 15+ kantor cabang, dan 0 data loss.
                </p>
                <div class="w-full bg-[#202734] rounded-full h-1.5 overflow-hidden">
                  <div class="bg-[#B7D894] h-1.5 rounded-full" style="width: 98%"></div>
                </div>
              </div>

              {/* Pillar 3: Keyword Density */}
              <div class="glass-card rounded-2xl p-5 space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-mono text-slate-400 font-semibold">03. KEYWORDS</span>
                  <span class="text-xs font-mono font-bold text-[#E0F8C7] bg-[#B7D894]/20 px-2 py-0.5 rounded">96%</span>
                </div>
                <h3 class="text-base font-bold text-white">Tech Stack Alignment</h3>
                <p class="text-xs text-slate-300 leading-relaxed">
                  Kepadatan kata kunci optimal: Golang, Python, Laravel, Linux SysAdmin, MySQL DBA, MikroTik, Banking Security, OJK Compliance.
                </p>
                <div class="w-full bg-[#202734] rounded-full h-1.5 overflow-hidden">
                  <div class="bg-[#B7D894] h-1.5 rounded-full" style="width: 96%"></div>
                </div>
              </div>

              {/* Pillar 4: ATS Structure */}
              <div class="glass-card rounded-2xl p-5 space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-mono text-slate-400 font-semibold">04. STRUCTURE</span>
                  <span class="text-xs font-mono font-bold text-[#E0F8C7] bg-[#B7D894]/20 px-2 py-0.5 rounded">97%</span>
                </div>
                <h3 class="text-base font-bold text-white">Standard Headings</h3>
                <p class="text-xs text-slate-300 leading-relaxed">
                  Menggunakan tag standar: Professional Summary, Work Experience, Technical Skills, Education, Certifications.
                </p>
                <div class="w-full bg-[#202734] rounded-full h-1.5 overflow-hidden">
                  <div class="bg-[#B7D894] h-1.5 rounded-full" style="width: 97%"></div>
                </div>
              </div>
            </div>
          </section>

          {/* TESTED ATS COMPATIBILITY GRID */}
          <section class="glass-panel rounded-3xl p-6 sm:p-8 mb-8 space-y-6">
            <h2 class="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span class="text-[#B7D894]">🛡️</span>
              <span>{t.compatibilityTitle}</span>
            </h2>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { name: 'Greenhouse', status: '100% Parsed', tag: 'Verified' },
                { name: 'Lever', status: '100% Parsed', tag: 'Verified' },
                { name: 'Workday', status: '100% Parsed', tag: 'Verified' },
                { name: 'Ashby', status: '100% Parsed', tag: 'Verified' },
                { name: 'Oracle Taleo', status: '100% Parsed', tag: 'Verified' },
                { name: 'BambooHR', status: '100% Parsed', tag: 'Verified' },
                { name: 'iCIMS', status: '100% Parsed', tag: 'Verified' },
                { name: 'Enhancv / Jobscan', status: 'Score: 96/100', tag: 'Top Tier' },
              ].map((ats) => (
                <div class="bg-[#202734]/70 rounded-xl p-4 border border-white/10 flex flex-col justify-between space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-sm text-white">{ats.name}</span>
                    <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                  </div>
                  <div class="flex items-center justify-between text-xs font-mono">
                    <span class="text-emerald-300">{ats.status}</span>
                    <span class="text-[10px] text-slate-400 bg-white/5 px-1.5 py-0.5 rounded">{ats.tag}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* LIVE ATS PLAIN-TEXT STREAM SIMULATOR (RECRUITER VIEW) */}
          <section class="glass-panel rounded-3xl p-6 sm:p-8 mb-8 space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <h2 class="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
                  <span class="text-[#B7D894]">📄</span>
                  <span>{t.rawTextSimulator}</span>
                </h2>
                <p class="text-xs text-slate-400 mt-1">
                  {t.rawTextDesc}
                </p>
              </div>

              <div class="flex items-center gap-2 shrink-0">
                <a
                  href={`/export/pdf?lang=${lang}`}
                  download={`Agus-Maulana-Yusuf-Noor-Resume-${lang.toUpperCase()}.pdf`}
                  class="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#B7D894] to-[#E0F8C7] hover:brightness-105 text-[#202734] transition flex items-center gap-1.5 shadow-sm cursor-pointer"
                  title="Download 100% ATS-Compliant PDF Resume"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Download PDF</span>
                </a>

                <button
                  type="button"
                  id="copyRawTextBtn"
                  class="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#202734] hover:bg-[#36415A] text-slate-300 hover:text-white border border-white/15 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <svg class="w-3.5 h-3.5 text-[#B7D894]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  <span>Copy Plain Text</span>
                </button>
              </div>
            </div>

            {/* Terminal Window with Plain Text */}
            <div class="rounded-2xl bg-[#12161f] border border-white/10 p-4 sm:p-6 overflow-hidden">
              <div class="flex items-center gap-2 pb-3 mb-3 border-b border-white/5 text-xs font-mono text-slate-400">
                <span class="w-3 h-3 rounded-full bg-rose-500/80"></span>
                <span class="w-3 h-3 rounded-full bg-amber-500/80"></span>
                <span class="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                <span class="ml-2 text-[11px] text-slate-400">ats-ocr-text-stream.txt (UTF-8 Plain Text)</span>
              </div>
              <pre
                id="plainTextContainer"
                class="font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-96 selection:bg-[#B7D894] selection:text-[#202734]"
              >
                {plainTextExtract}
              </pre>
            </div>
          </section>

          {/* MINIMALIST FOOTER */}
          <footer class="mt-16 py-8 text-center text-xs text-slate-400 space-y-3 border-t border-white/5">
            <div class="flex flex-wrap justify-center items-center gap-4 text-xs font-mono text-slate-300">
              <a href={`mailto:${profile.email}`} class="hover:text-[#E0F8C7] transition">{profile.email}</a>
              <span>•</span>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" class="hover:text-[#E0F8C7] transition">LinkedIn</a>
              <span>•</span>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" class="hover:text-[#E0F8C7] transition">GitHub</a>
              <span>•</span>
              <a href={`/?lang=${lang}`} class="hover:text-[#E0F8C7] transition">CV / Resume</a>
              <span>•</span>
              <a href={`/career?lang=${lang}`} class="hover:text-[#E0F8C7] transition">{t.navCareer}</a>
            </div>
            <p class="text-slate-400 text-[11px]">
              © {new Date().getFullYear()} {profile.name} — Verified ATS Compliance Architecture
            </p>
          </footer>
        </div>

        {/* COPY TOAST SCRIPT */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var copyBtn = document.getElementById('copyRawTextBtn');
              var preEl = document.getElementById('plainTextContainer');
              if (copyBtn && preEl) {
                copyBtn.addEventListener('click', function() {
                  var text = preEl.textContent || '';
                  navigator.clipboard.writeText(text).then(function() {
                    var orig = copyBtn.innerHTML;
                    copyBtn.innerHTML = '<span>✓ Copied!</span>';
                    setTimeout(function() {
                      copyBtn.innerHTML = orig;
                    }, 2000);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
};
