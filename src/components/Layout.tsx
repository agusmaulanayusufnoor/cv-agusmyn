import type { FC } from 'hono/jsx';
import { cvDataByLang, uiLabels, type Language } from '../data/cv';
import type { GitHubRepo } from '../services/github';

interface CvPageProps {
  lang: Language;
  repos?: GitHubRepo[];
  fromCache?: boolean;
  lastFetched?: string;
}

// Color Palette from Color Hunt: #202734 (Navy Dark), #36415A (Slate Blue), #B7D894 (Sage Mint), #E0F8C7 (Pale Mint)
const getLanguageBadgeColor = (language: string | null) => {
  switch (language?.toLowerCase()) {
    case 'typescript':
      return 'bg-[#B7D894]/15 text-[#E0F8C7] border-[#B7D894]/30';
    case 'vue':
      return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
    case 'php':
      return 'bg-[#36415A]/70 text-[#E0F8C7] border-[#B7D894]/25';
    case 'python':
      return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
    case 'blade':
      return 'bg-rose-500/15 text-rose-300 border-rose-500/30';
    case 'go':
    case 'golang':
      return 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30';
    default:
      return 'bg-[#36415A]/40 text-slate-300 border-white/10';
  }
};

export const CvPage: FC<CvPageProps> = ({ lang, repos = [], fromCache = false, lastFetched }) => {
  const data = cvDataByLang[lang] || cvDataByLang.en;
  const labels = uiLabels[lang] || uiLabels.en;
  const { profile, stats, skills, experience, projects, education, certifications, languages } = data;

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', {
        year: 'numeric',
        month: 'short',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <html lang={lang} class="scroll-smooth">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{labels.pageTitle}</title>

        {/* Structured Data (Schema.org JSON-LD for ATS & AI Recruiters) */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": profile.name,
            "jobTitle": "IT Department Head & Lead Engineer",
            "worksFor": {
              "@type": "Organization",
              "name": "PT BPR Jabar Perseroda",
              "url": profile.website
            },
            "alumniOf": {
              "@type": "CollegeOrUniversity",
              "name": education.institution
            },
            "description": profile.summary,
            "email": `mailto:${profile.email}`,
            "telephone": profile.whatsapp,
            "url": profile.website,
            "sameAs": [
              profile.github,
              profile.linkedin,
              profile.website
            ],
            "knowsAbout": Object.values(skills).flat(),
            "hasCredential": certifications.map(c => ({
              "@type": "EducationalOccupationalCredential",
              "name": c
            }))
          })
        }} />

        {/* Google Fonts: Plus Jakarta Sans (Clean Modern UI) & JetBrains Mono (Tech Accents) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />

        {/* Tailwind CSS CDN */}
        <script src="https://cdn.tailwindcss.com"></script>
        <script>{`
          tailwind.config = {
            theme: {
              extend: {
                fontFamily: {
                  sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
                  mono: ['"JetBrains Mono"', 'monospace'],
                },
                colors: {
                  palette: {
                    dark: '#202734',
                    slate: '#36415A',
                    sage: '#B7D894',
                    pale: '#E0F8C7',
                  }
                }
              }
            }
          }
        `}</script>

        <style>{`
          /* Spatial Depth & Glassmorphism Utilities with Palette (#202734, #36415A, #B7D894, #E0F8C7) */
          .glass-panel {
            background: rgba(54, 65, 90, 0.45);
            backdrop-filter: blur(18px);
            -webkit-backdrop-filter: blur(18px);
            border: 1px solid rgba(183, 216, 148, 0.16);
            box-shadow: 0 20px 50px -10px rgba(18, 22, 30, 0.75), inset 0 1px 0 0 rgba(224, 248, 199, 0.08);
          }

          .glass-card {
            background: rgba(32, 39, 52, 0.7);
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0 10px 30px -10px rgba(18, 22, 30, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .glass-card:hover {
            background: rgba(54, 65, 90, 0.65);
            border-color: rgba(183, 216, 148, 0.45);
            transform: translateY(-3px);
            box-shadow: 0 20px 40px -12px rgba(183, 216, 148, 0.18), inset 0 1px 0 0 rgba(224, 248, 199, 0.15);
          }

          /* Interactive Spotlight Overlay */
          .spotlight-card {
            position: relative;
            overflow: hidden;
          }
          .spotlight-card::before {
            content: '';
            position: absolute;
            top: var(--mouse-y, -100px);
            left: var(--mouse-x, -100px);
            width: 250px;
            height: 250px;
            background: radial-gradient(circle, rgba(183, 216, 148, 0.18) 0%, transparent 70%);
            transform: translate(-50%, -50%);
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          .spotlight-card:hover::before {
            opacity: 1;
          }

          /* Subtle Ambient Floating */
          @keyframes ambientFloat {
            0%, 100% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-12px) scale(1.02); }
          }
          .animate-ambient {
            animation: ambientFloat 10s ease-in-out infinite;
          }

          /* 3D Tilt Container */
          .perspective-container {
            perspective: 1200px;
          }
          .tilt-card {
            transform-style: preserve-3d;
            transition: transform 0.15s ease-out;
          }

          /* Print / PDF Corporate Styles for 100% ATS & Recruiter Compliance */
          @page {
            size: A4;
            margin: 12mm 15mm;
          }
          @media print {
            .no-print { display: none !important; }
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            body {
              background: #ffffff !important;
              color: #111827 !important;
              padding: 0 !important;
              font-size: 11pt !important;
              line-height: 1.5 !important;
            }
            .glass-panel, .glass-card {
              background: #ffffff !important;
              color: #111827 !important;
              border: 1px solid #E5E7EB !important;
              box-shadow: none !important;
              backdrop-filter: none !important;
              break-inside: avoid !important;
              page-break-inside: avoid !important;
            }
            h1, h2, h3, h4 {
              color: #111827 !important;
              break-after: avoid !important;
              page-break-after: avoid !important;
            }
            .text-slate-400, .text-slate-300, .text-slate-500 { color: #374151 !important; }
            .text-white { color: #111827 !important; }
            .text-blue-400, .text-indigo-400, .text-cyan-400 { color: #15803d !important; font-weight: 600 !important; }
            .bg-dark-950, .bg-dark-900, .bg-dark-850 { background: #ffffff !important; }
            .border-white\\/10, .border-white\\/5 { border-color: #E5E7EB !important; }
            .tilt-card { transform: none !important; }
            .perspective-container { perspective: none !important; }
            a { text-decoration: none !important; color: #15803d !important; }
          }
        `}</style>
      </head>

      <body class="bg-[#202734] text-slate-200 font-sans antialiased selection:bg-[#B7D894] selection:text-[#202734] min-h-screen relative overflow-x-hidden">
        {/* Spatial Ambient Glows (Using Palette: #B7D894, #36415A, #E0F8C7) */}
        <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden no-print" aria-hidden="true">
          {/* Top Radial Spotlight */}
          <div class="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-b from-[#B7D894]/15 via-[#36415A]/25 to-transparent blur-[130px] rounded-full"></div>
          {/* Subtle Side Glows */}
          <div class="absolute top-96 -left-48 w-96 h-96 bg-[#B7D894]/10 blur-[140px] rounded-full animate-ambient"></div>
          <div class="absolute top-[800px] -right-48 w-96 h-96 bg-[#E0F8C7]/10 blur-[150px] rounded-full animate-ambient" style="animation-delay: -5s;"></div>
        </div>

        {/* Global Content Container */}
        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">

          {/* Top Minimalist Navigation & Language Switcher */}
          <header class="no-print glass-panel rounded-2xl px-4 sm:px-6 py-3.5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Logo / Avatar & Name */}
            <a href="/" class="flex items-center gap-3.5 group">
              <div class="w-11 h-11 rounded-full overflow-hidden border-2 border-[#B7D894]/70 shadow-md shadow-[#B7D894]/20 group-hover:scale-105 group-hover:border-[#E0F8C7] transition-all shrink-0 bg-[#202734]">
                <img
                  src="/profile.jpg"
                  alt="Agus Maulana Yusuf Noor"
                  class="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <span class="font-bold text-base sm:text-lg text-white tracking-tight block group-hover:text-[#E0F8C7] transition-colors">
                  Agus Maulana Yusuf Noor
                </span>
                <span class="font-mono text-[10px] sm:text-[11px] text-[#B7D894] tracking-wider block">
                  IT LEAD & ARCHITECT
                </span>
              </div>
            </a>

            {/* In-Page Navigation Links (Font Diperbesar) */}
            <nav class="hidden md:flex items-center gap-7 text-sm sm:text-base font-semibold text-slate-300">
              <a href="#about" class="hover:text-[#E0F8C7] transition-colors">{labels.navAbout}</a>
              <a href="#experience" class="hover:text-[#E0F8C7] transition-colors">{labels.navExperience}</a>
              <a href="#projects" class="hover:text-[#E0F8C7] transition-colors">{labels.navProjects}</a>
              <a href="#contact" class="hover:text-[#E0F8C7] transition-colors">{labels.navContact}</a>
              <a
                href={`/career?lang=${lang}`}
                class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#B7D894]/15 border border-[#B7D894]/35 text-[#E0F8C7] hover:bg-[#B7D894]/25 hover:border-[#B7D894]/60 transition-all text-sm font-bold shadow-xs"
              >
                <span>{labels.navCareer || 'Career'}</span>
                <span class="w-2 h-2 rounded-full bg-[#B7D894] animate-pulse"></span>
              </a>
            </nav>

            {/* Actions: Language Toggle & Quick Buttons */}
            <div class="flex items-center gap-2.5">
              {/* Language Switcher */}
              <div class="inline-flex rounded-xl bg-[#202734]/90 p-1 border border-white/10 text-xs font-semibold">
                <a
                  href="/?lang=en"
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
                  href="/?lang=id"
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

              {/* View JSON API */}
              <a
                href={`/api/cv?lang=${lang}`}
                target="_blank"
                class="px-3 py-1.5 text-xs font-medium rounded-xl border border-white/10 bg-[#202734]/80 hover:bg-[#36415A] text-slate-300 hover:text-white transition shadow-xs"
              >
                {labels.viewJson}
              </a>

              {/* Print / Save PDF Button */}
              <button
                onclick="window.print()"
                class="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-gradient-to-r from-[#B7D894] to-[#E0F8C7] hover:brightness-105 text-[#202734] transition shadow-md shadow-[#B7D894]/20 cursor-pointer flex items-center gap-1.5"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4H7v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                {labels.printPdf}
              </button>
            </div>
          </header>

          {/* HERO SECTION: SPATIAL 3D ARCHITECTURAL CARD */}
          <main class="space-y-8">
            <section class="glass-panel rounded-3xl p-6 sm:p-10 md:p-12 relative overflow-hidden">
              {/* Subtle ambient gradient flare */}
              <div class="absolute -top-24 -right-24 w-80 h-80 bg-[#B7D894]/10 rounded-full blur-3xl pointer-events-none"></div>

              <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                {/* Left/Main Column: Headline & Value Proposition */}
                <div class="lg:col-span-8 space-y-5">
                  {/* Status Pill */}
                  <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#B7D894]/15 border border-[#B7D894]/30 text-[#E0F8C7] text-xs font-mono font-medium">
                    <span class="w-2 h-2 rounded-full bg-[#B7D894] animate-pulse"></span>
                    <span>15+ Years Enterprise Banking • Open to Remote</span>
                  </div>

                  {/* Name & Title */}
                  <div>
                    <h1 class="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-extrabold text-white tracking-tight leading-tight">
                      {profile.name}
                    </h1>
                    <p class="text-base sm:text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#B7D894] via-[#E0F8C7] to-white mt-2">
                      {profile.title}
                    </p>
                  </div>

                  {/* Bio Pitch */}
                  <p class="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
                    {profile.summary}
                  </p>

                  {/* Contact Badges */}
                  <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400 pt-1 font-mono">
                    <span class="inline-flex items-center gap-1.5">
                      <span class="text-[#B7D894]">📍</span> {profile.location}
                    </span>
                    <span class="inline-flex items-center gap-1.5">
                      <span class="text-[#B7D894]">✉️</span>
                      <a href={`mailto:${profile.email}`} class="hover:text-[#E0F8C7] hover:underline transition">
                        {profile.email}
                      </a>
                    </span>
                    <span class="inline-flex items-center gap-1.5">
                      <span class="text-[#B7D894]">📱</span>
                      <a href={`https://wa.me/${profile.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" class="hover:text-[#E0F8C7] hover:underline transition">
                        {profile.whatsapp}
                      </a>
                    </span>
                  </div>

                  {/* Social Action Pills */}
                  <div class="flex flex-wrap items-center gap-2.5 pt-2">
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="px-3.5 py-2 rounded-xl bg-[#202734]/80 hover:bg-[#36415A] border border-white/10 hover:border-[#B7D894]/40 text-xs font-semibold text-slate-200 hover:text-white transition flex items-center gap-2 group shadow-sm"
                    >
                      <svg class="w-4 h-4 fill-current text-[#B7D894] group-hover:text-[#E0F8C7] transition" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      GitHub
                    </a>

                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="px-3.5 py-2 rounded-xl bg-[#202734]/80 hover:bg-[#36415A] border border-white/10 hover:border-[#B7D894]/40 text-xs font-semibold text-slate-200 hover:text-white transition flex items-center gap-2 group shadow-sm"
                    >
                      <svg class="w-4 h-4 fill-current text-[#B7D894] group-hover:text-[#E0F8C7] transition" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                      </svg>
                      LinkedIn
                    </a>

                    <a
                      href={profile.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="px-3.5 py-2 rounded-xl bg-[#202734]/80 hover:bg-[#36415A] border border-white/10 hover:border-[#B7D894]/40 text-xs font-semibold text-slate-200 hover:text-white transition flex items-center gap-2 group shadow-sm"
                    >
                      <span class="text-[#B7D894]">🌐</span>
                      bprjabar.com ↗
                    </a>
                  </div>
                </div>

                {/* Right Column: Spatial 3D Tilt Portrait Card */}
                <div class="lg:col-span-4 flex justify-center lg:justify-end perspective-container">
                  <div
                    id="profileTiltCard"
                    class="tilt-card relative w-64 sm:w-72 lg:w-80 group cursor-pointer"
                  >
                    {/* Glowing Back-Rim Light (Using Palette: #B7D894, #36415A, #E0F8C7) */}
                    <div class="absolute -inset-1 bg-gradient-to-r from-[#B7D894] via-[#36415A] to-[#E0F8C7] rounded-3xl blur-xl opacity-35 group-hover:opacity-75 transition duration-500"></div>

                    {/* Image Surface Frame */}
                    <div class="relative rounded-2xl overflow-hidden border border-white/15 bg-[#202734] shadow-2xl">
                      <img
                        src="/profile.jpg"
                        alt={profile.name}
                        class="w-full h-88 sm:h-96 object-cover object-top transition duration-700 ease-out group-hover:scale-105"
                      />

                      {/* Glass Info Badges Overlaid on Photo */}
                      <div class="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#202734]/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#E0F8C7] font-medium">
                        ✦ Head of IT
                      </div>

                      <div class="absolute bottom-3 inset-x-3 p-3 rounded-xl bg-[#202734]/85 backdrop-blur-md border border-white/10 flex items-center justify-between">
                        <div>
                          <p class="text-xs font-bold text-white leading-tight">Agus Maulana Y.N.</p>
                          <p class="text-[10px] text-slate-400 font-mono mt-0.5">PT BPR Jabar Perseroda</p>
                        </div>
                        <span class="w-2.5 h-2.5 rounded-full bg-[#B7D894] animate-pulse" title="System Operational"></span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* 4 Core Impact Metrics */}
              <div class="mt-10 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((st) => (
                  <div class="glass-card spotlight-card p-4 rounded-2xl text-center sm:text-left">
                    <p class="font-mono text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E0F8C7] to-[#B7D894]">
                      {st.value}
                    </p>
                    <p class="text-xs text-slate-400 font-medium mt-1">
                      {st.label}
                    </p>
                  </div>
                ))}
              </div>
            </section>


            {/* WORK EXPERIENCE & TECHNICAL CAPABILITIES (BENTO GRID - ZERO VOID) */}
            <div id="experience" class="space-y-6">

              {/* Top Row: Work Experience & Technical Expertise Side-by-Side */}
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

                {/* Left Card: Work Experience Timeline */}
                <div class="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div class="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                      <div class="flex items-center gap-2.5">
                        <span class="w-2.5 h-2.5 rounded-full bg-[#B7D894]"></span>
                        <h2 class="text-xl font-bold text-white tracking-tight">{labels.experienceTitle}</h2>
                      </div>
                      <span class="text-xs font-mono text-[#202734] bg-[#B7D894] font-bold px-2.5 py-1 rounded-full shadow-xs">
                        2011 — Present
                      </span>
                    </div>

                    <div class="space-y-7 relative before:absolute before:inset-0 before:left-3 before:w-px before:bg-white/10">
                      {experience.map((exp) => (
                        <div class="relative pl-8 group">
                          {/* Timeline Node */}
                          <div class="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-[#202734] border-2 border-[#B7D894] group-hover:scale-125 group-hover:border-[#E0F8C7] transition-all"></div>

                          <div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                            <h3 class="text-base font-bold text-white group-hover:text-[#E0F8C7] transition-colors">
                              {exp.role}
                            </h3>
                            <span class="text-xs font-mono text-slate-400">
                              {exp.period}
                            </span>
                          </div>
                          <p class="text-xs font-semibold text-[#B7D894] mt-0.5">{exp.company}</p>

                          <ul class="mt-3 space-y-2 text-xs text-slate-300 leading-relaxed">
                            {exp.highlights.map((h) => (
                              <li class="flex items-start gap-2">
                                <span class="text-[#B7D894] mt-1 shrink-0">▸</span>
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Card: Technical Expertise Matrix */}
                <div class="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div class="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                      <div class="flex items-center gap-2.5">
                        <span class="w-2.5 h-2.5 rounded-full bg-[#E0F8C7]"></span>
                        <h2 class="text-xl font-bold text-white tracking-tight">{labels.expertiseTitle}</h2>
                      </div>
                      <span class="text-xs font-mono text-[#B7D894] bg-[#36415A] px-2.5 py-1 rounded-full border border-[#B7D894]/20 font-semibold">
                        Core Tech Stack
                      </span>
                    </div>

                    <div class="grid grid-cols-1 gap-3.5">
                      {Object.entries(skills).map(([category, items]) => (
                        <div class="glass-card spotlight-card p-3.5 sm:p-4 rounded-xl">
                          <h4 class="text-xs font-mono font-semibold text-[#B7D894] uppercase tracking-wider mb-2">
                            {category}
                          </h4>
                          <div class="flex flex-wrap gap-1.5">
                            {items.map((skill) => (
                              <span class="px-2.5 py-1 text-xs bg-[#202734]/80 border border-white/10 rounded-lg text-slate-200 font-medium hover:border-[#B7D894]/50 transition">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Row: Education, Certifications & Languages (Balanced 3-Column Bento) */}
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* 1. Education Card */}
                <div class="glass-panel rounded-3xl p-6 flex flex-col justify-between">
                  <div>
                    <div class="flex items-center gap-2 border-b border-white/10 pb-3 mb-4">
                      <span class="text-base">🎓</span>
                      <h3 class="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">{labels.educationTitle}</h3>
                    </div>
                    <p class="font-bold text-base text-white">{education.institution}</p>
                    <p class="text-xs text-slate-300 mt-1 leading-relaxed">{education.degree}</p>
                  </div>
                  <div class="mt-4 pt-3 border-t border-white/5">
                    <span class="inline-block px-2.5 py-1 rounded-md bg-[#B7D894]/15 border border-[#B7D894]/30 text-[11px] font-mono text-[#E0F8C7]">
                      {education.year}
                    </span>
                  </div>
                </div>

                {/* 2. Certifications Card */}
                <div class="glass-panel rounded-3xl p-6 flex flex-col justify-between">
                  <div>
                    <div class="flex items-center gap-2 border-b border-white/10 pb-3 mb-4">
                      <span class="text-base">📜</span>
                      <h3 class="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">{labels.certificationsTitle}</h3>
                    </div>
                    <ul class="text-xs text-slate-300 space-y-2.5">
                      {certifications.map((c) => (
                        <li class="flex items-start gap-2">
                          <span class="text-[#B7D894] text-xs mt-0.5 shrink-0">✓</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div class="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-[#B7D894]">
                    Verified Credentials
                  </div>
                </div>

                {/* 3. Languages Card */}
                <div class="glass-panel rounded-3xl p-6 flex flex-col justify-between">
                  <div>
                    <div class="flex items-center gap-2 border-b border-white/10 pb-3 mb-4">
                      <span class="text-base">🌐</span>
                      <h3 class="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">{labels.languagesTitle}</h3>
                    </div>
                    <ul class="text-xs text-slate-300 space-y-2.5">
                      {languages.map((l) => (
                        <li class="flex items-start gap-2">
                          <span class="text-[#E0F8C7] text-xs mt-0.5 shrink-0">●</span>
                          <span>{l}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div class="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-[#E0F8C7]">
                    Trilingual Proficiency
                  </div>
                </div>

              </div>

            </div>


            {/* PROJECT ARCHITECTURE & LIVE GITHUB REPOSITORIES */}
            <section id="projects" class="glass-panel rounded-3xl p-6 sm:p-10 space-y-8">
              <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <div class="flex items-center gap-2 mb-1.5">
                    <span class="w-2.5 h-2.5 rounded-full bg-[#B7D894] animate-pulse"></span>
                    <span class="text-xs font-mono text-[#E0F8C7] uppercase tracking-wider">PORTFOLIO & OPEN SOURCE</span>
                  </div>
                  <h2 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {labels.myProjects}
                  </h2>
                  <p class="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                    {labels.myProjectsSubtitle}
                  </p>
                </div>

                {/* Filter Switcher Tabs */}
                <div class="flex flex-wrap items-center gap-2">
                  <div class="inline-flex rounded-xl bg-[#202734] p-1 border border-white/10 text-xs font-semibold">
                    <button
                      onclick="filterProjects('all')"
                      id="tab-all"
                      class="filter-tab px-3 py-1.5 rounded-lg bg-[#B7D894] text-[#202734] font-bold shadow-xs transition"
                    >
                      {labels.filterAll}
                    </button>
                    <button
                      onclick="filterProjects('enterprise')"
                      id="tab-enterprise"
                      class="filter-tab px-3 py-1.5 rounded-lg text-slate-400 hover:text-white transition"
                    >
                      {labels.filterEnterprise}
                    </button>
                    <button
                      onclick="filterProjects('github')"
                      id="tab-github"
                      class="filter-tab px-3 py-1.5 rounded-lg text-slate-400 hover:text-white transition"
                    >
                      {labels.filterGithub}
                    </button>
                  </div>

                  <span class={`text-[11px] font-mono px-2.5 py-1 rounded-full border ${fromCache ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-[#B7D894]/15 text-[#E0F8C7] border-[#B7D894]/30'}`}>
                    {fromCache ? labels.cachedBadge : labels.liveBadge}
                  </span>
                </div>
              </div>

              {/* Projects Grid Container */}
              <div class="space-y-8">
                {/* 1. Core Enterprise Platforms */}
                <div id="section-enterprise">
                  <div class="flex items-center justify-between mb-4">
                    <h3 class="text-xs font-mono uppercase tracking-widest text-slate-400">
                      ✦ {labels.filterEnterprise}
                    </h3>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projects.map((proj) => (
                      <a
                        href={proj.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="glass-card spotlight-card p-6 rounded-2xl flex flex-col justify-between group"
                      >
                        <div>
                          <div class="flex items-start justify-between gap-2">
                            <h4 class="text-lg font-bold text-white group-hover:text-[#E0F8C7] transition-colors">
                              {proj.name}
                            </h4>
                            <span class="text-xs font-mono text-slate-400 group-hover:text-[#B7D894] transition-colors">
                              {proj.year || '2024'} ↗
                            </span>
                          </div>
                          <p class="text-xs font-mono text-[#B7D894] mt-1 font-medium">
                            {proj.tech}
                          </p>
                          <p class="text-xs text-slate-300 mt-2.5 leading-relaxed">
                            {proj.description}
                          </p>
                        </div>

                        <div class="mt-5 pt-3.5 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                          <span class="font-mono text-[11px] text-[#B7D894]">
                            Enterprise Banking Platform
                          </span>
                          <span class="group-hover:translate-x-1 transition-transform text-white font-medium flex items-center gap-1">
                            {labels.viewOnGithub} →
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* 2. Live GitHub Repositories (Auto-synced via GitHub API) */}
                {repos.length > 0 && (
                  <div id="section-github">
                    <div class="flex items-center justify-between mb-4">
                      <h3 class="text-xs font-mono uppercase tracking-widest text-slate-400">
                        ✦ {labels.filterGithub} ({repos.length})
                      </h3>
                      {lastFetched && (
                        <span class="text-[10px] font-mono text-slate-500">
                          {labels.updated}: {formatDate(lastFetched)}
                        </span>
                      )}
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                      {repos.slice(0, 9).map((repo) => (
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          class="glass-card spotlight-card p-4 rounded-xl flex flex-col justify-between group"
                        >
                          <div>
                            <div class="flex items-center justify-between gap-2">
                              <span class="font-bold text-sm text-white group-hover:text-[#E0F8C7] transition-colors truncate" title={repo.name}>
                                {repo.name}
                              </span>
                              <span class="text-xs text-slate-500 group-hover:text-[#B7D894] transition-colors">↗</span>
                            </div>
                            <p class="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                              {repo.description || (lang === 'id' ? 'Repositori publik aktif' : 'Active public repository')}
                            </p>
                          </div>

                          <div class="flex items-center justify-between text-[11px] text-slate-400 mt-3 pt-2.5 border-t border-white/5 font-mono">
                            {repo.language ? (
                              <span class={`px-2 py-0.5 rounded border ${getLanguageBadgeColor(repo.language)}`}>
                                {repo.language}
                              </span>
                            ) : (
                              <span class="text-slate-500">-</span>
                            )}
                            <span class="text-slate-500 text-[10px]">
                              {formatDate(repo.updated_at)}
                            </span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>

          </main>

          {/* MINIMALIST FOOTER */}
          <footer id="contact" class="no-print mt-12 py-8 text-center text-xs text-slate-500 space-y-3">
            <div class="flex flex-wrap justify-center items-center gap-4 text-xs font-mono text-slate-400">
              <a href={`mailto:${profile.email}`} class="hover:text-[#E0F8C7] transition">{profile.email}</a>
              <span>•</span>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" class="hover:text-[#E0F8C7] transition">LinkedIn</a>
              <span>•</span>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" class="hover:text-[#E0F8C7] transition">GitHub</a>
              <span>•</span>
              <a href={profile.website} target="_blank" rel="noopener noreferrer" class="hover:text-[#E0F8C7] transition">bprjabar.com</a>
            </div>
            <p class="text-slate-500 text-[11px]">
              © {new Date().getFullYear()} {profile.name}
            </p>
          </footer>

        </div>

        {/* CLIENT-SIDE INTERACTIVITY SCRIPT (Zero Dependencies, Ultra Fast) */}
        <script>{`
          // 1. Interactive 3D Perspective Tilt for Profile Card
          const card = document.getElementById('profileTiltCard');
          if (card) {
            card.addEventListener('mousemove', (e) => {
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left - rect.width / 2;
              const y = e.clientY - rect.top - rect.height / 2;
              const rotateX = -(y / rect.height) * 14;
              const rotateY = (x / rect.width) * 14;
              card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale3d(1.02, 1.02, 1.02)';
            });

            card.addEventListener('mouseleave', () => {
              card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            });
          }

          // 2. Spotlight Cursor Tracker on Cards
          document.querySelectorAll('.spotlight-card').forEach((cardEl) => {
            cardEl.addEventListener('mousemove', (e) => {
              const rect = cardEl.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              cardEl.style.setProperty('--mouse-x', x + 'px');
              cardEl.style.setProperty('--mouse-y', y + 'px');
            });
          });

          // 3. Project Filter Tabs
          window.filterProjects = function(type) {
            const secEnterprise = document.getElementById('section-enterprise');
            const secGithub = document.getElementById('section-github');
            const tabs = document.querySelectorAll('.filter-tab');

            tabs.forEach(t => {
              t.classList.remove('bg-[#B7D894]', 'text-[#202734]', 'font-bold');
              t.classList.add('text-slate-400');
            });

            const activeTab = document.getElementById('tab-' + type);
            if (activeTab) {
              activeTab.classList.remove('text-slate-400');
              activeTab.classList.add('bg-[#B7D894]', 'text-[#202734]', 'font-bold');
            }

            if (type === 'all') {
              if (secEnterprise) secEnterprise.style.display = 'block';
              if (secGithub) secGithub.style.display = 'block';
            } else if (type === 'enterprise') {
              if (secEnterprise) secEnterprise.style.display = 'block';
              if (secGithub) secGithub.style.display = 'none';
            } else if (type === 'github') {
              if (secEnterprise) secEnterprise.style.display = 'none';
              if (secGithub) secGithub.style.display = 'block';
            }
          };
        `}</script>
      </body>
    </html>
  );
};
