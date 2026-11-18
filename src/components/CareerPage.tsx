import type { FC } from 'hono/jsx';
import { cvDataByLang, type Language } from '../data/cv';
import type { VerifiedCareerJob } from '../services/career';

interface CareerPageProps {
  lang: Language;
  jobs: VerifiedCareerJob[];
  totalVerified: number;
  fromCache: boolean;
  lastUpdated: string;
}

export const CareerPage: FC<CareerPageProps> = ({
  lang,
  jobs,
  totalVerified,
  fromCache,
  lastUpdated,
}) => {
  const profile = cvDataByLang[lang]?.profile || cvDataByLang.en.profile;

  const isId = lang === 'id';

  const t = {
    pageTitle: isId
      ? 'Peluang Karir Terverifikasi — Agus Maulana Yusuf Noor'
      : 'Verified Career Opportunities & Direct Apply — Agus Maulana Yusuf Noor',
    backToCv: isId ? '← Kembali ke CV & Portofolio' : '← Back to CV & Portfolio',
    viewJson: 'JSON API',
    heroBadge: isId
      ? '🛡️ Proteksi Anti-Penipuan Aktif • Lowongan Bersih (≤ 14 Hari Terakhir)'
      : '🛡️ Anti-Scam Guard Active • 100% Clean Vacancies (≤ 14 Days Fresh)',
    heroTitle: isId
      ? 'Peluang Karir Terverifikasi'
      : 'Curated Career Opportunities',
    heroSubtitle: isId
      ? 'Daftar lowongan kerja teknologi global dan regional yang telah melalui filter 4 lapis anti-penipuan (bebas link phishing, shortener mencurigakan, form palsu, dan grup Telegram/WA scam). Dicocokkan langsung dengan kapabilitas IT Head, Backend (Go/Python/Laravel), dan Linux SysAdmin & DBA.'
      : 'Direct tech openings screened across 4 anti-scam layers (zero phishing links, zero opaque shorteners, zero unofficial Telegram/WhatsApp scam recruitment, and zero stale talent-pool ghost jobs). Matched directly against IT Head, Backend (Go/Python/Laravel), and Linux SysAdmin & DBA capabilities.',
    statTotal: isId ? 'Lowongan Terverifikasi' : 'Verified Openings',
    statFreshness: isId ? 'Maksimal Usia Lowongan' : 'Max Posting Age',
    statTrust: isId ? 'Indeks Keamanan' : 'Trust & Safety Index',
    statMatch: isId ? 'Skor Kecocokan CV' : 'Max Profile Match',
    searchPlaceholder: isId
      ? 'Cari berdasarkan posisi, perusahaan, atau teknologi (contoh: Golang, Laravel, Linux, Lead)...'
      : 'Search title, company, or skills (e.g. Golang, Laravel, Linux, Lead, Remote)...',
    filterRegionAll: isId ? 'Semua Wilayah' : 'All Regions',
    filterWorldwide: isId ? '🌍 Global Remote' : '🌍 Worldwide Remote',
    filterSeaId: isId ? '🇮🇩 Asia Tenggara & ID' : '🇮🇩 Southeast Asia & ID',
    filterUsCa: isId ? '🇺🇸 US & North America' : '🇺🇸 US & North America',
    filterEurope: isId ? '🇪🇺 Europe & UK' : '🇪🇺 Europe & UK',
    filterApac: isId ? '🌏 Asia-Pacific (APAC)' : '🌏 Asia-Pacific (APAC)',
    filterRoleAll: isId ? 'Semua Posisi' : 'All Roles',
    filterRoleLead: isId ? 'IT Head & Lead' : 'IT Head & Lead',
    filterRoleBackend: isId ? 'Backend Engineering' : 'Backend Engineering',
    filterRoleSysadmin: isId ? 'Linux SysAdmin & DBA' : 'Linux SysAdmin & DBA',
    filterRoleFullstack: isId ? 'Full-Stack' : 'Full-Stack',
    showingText: isId ? 'Menampilkan' : 'Showing',
    ofText: isId ? 'dari' : 'of',
    verifiedRoles: isId ? 'posisi terverifikasi' : 'verified positions',
    applyButton: isId ? 'Lamar Langsung' : 'Apply Directly',
    copyPitchButton: isId ? 'Salin Pitch Cepat' : 'Copy Quick Pitch',
    copiedTooltip: isId ? 'Tersalin ke Clipboard!' : 'Pitch Copied to Clipboard!',
    noResultsTitle: isId ? 'Tidak ada lowongan yang cocok' : 'No matching jobs found',
    noResultsSubtitle: isId
      ? 'Coba ubah kata kunci pencarian atau ganti filter wilayah/posisi.'
      : 'Try adjusting your search query or reset the region and role filters.',
    resetFilters: isId ? 'Reset Filter' : 'Reset Filters',
    antiScamPassedBadge: isId ? 'Terverifikasi Bersih' : 'Verified Clean',
    atsWhitelistedBadge: isId ? 'Portal Resmi ATS' : 'Official ATS Portal',
  };

  const formattedUpdate = new Date(lastUpdated).toLocaleDateString(isId ? 'id-ID' : 'en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <html lang={lang} class="scroll-smooth">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{t.pageTitle}</title>
        <meta
          name="description"
          content="Curated active career vacancies (≤ 14 days old) filtered through enterprise ATS whitelists and anti-scam security checks, tailored for Agus Maulana Yusuf Noor."
        />

        {/* Fonts & Styling */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>

        <style>{`
          body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: #202734;
            color: #f1f5f9;
            margin: 0;
            padding: 0;
            overflow-x: hidden;
          }

          .font-mono {
            font-family: 'JetBrains Mono', monospace;
          }

          /* Spatial Glassmorphism Elements with Color Palette (#202734, #36415A, #B7D894, #E0F8C7) */
          .glass-panel {
            background: rgba(54, 65, 90, 0.45);
            backdrop-filter: blur(18px);
            -webkit-backdrop-filter: blur(18px);
            border: 1px solid rgba(183, 216, 148, 0.16);
            box-shadow: 0 20px 50px -10px rgba(18, 22, 30, 0.75), inset 0 1px 0 0 rgba(224, 248, 199, 0.08);
          }

          .glass-card {
            background: rgba(32, 39, 52, 0.75);
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0 10px 30px -10px rgba(18, 22, 30, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
            transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .glass-card:hover {
            background: rgba(54, 65, 90, 0.65);
            border-color: rgba(183, 216, 148, 0.45);
            transform: translateY(-3px);
            box-shadow: 0 20px 40px -12px rgba(183, 216, 148, 0.18), inset 0 1px 0 0 rgba(224, 248, 199, 0.15);
          }

          /* Toast Animation */
          #toastNotification {
            transition: opacity 0.3s ease, transform 0.3s ease;
          }
        `}</style>
      </head>

      <body class="selection:bg-[#B7D894] selection:text-[#202734] min-h-screen relative">
        {/* Subtle Background Glows */}
        <div class="fixed top-0 left-1/4 w-[500px] h-[500px] bg-[#B7D894]/5 rounded-full blur-[140px] pointer-events-none -z-10"></div>
        <div class="fixed bottom-10 right-10 w-[600px] h-[600px] bg-[#36415A]/40 rounded-full blur-[150px] pointer-events-none -z-10"></div>

        {/* Global Container */}
        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">

          {/* TOP BAR / NAVIGATION */}
          <header class="glass-panel rounded-2xl px-4 sm:px-6 py-3.5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Identity & Link to Main Profile */}
            <a href={`/?lang=${lang}`} class="flex items-center gap-3.5 group">
              <div class="w-11 h-11 rounded-full overflow-hidden border-2 border-[#B7D894]/70 shadow-md shadow-[#B7D894]/20 group-hover:scale-105 group-hover:border-[#E0F8C7] transition-all shrink-0 bg-[#202734]">
                <img
                  src="/profile.jpg"
                  alt={profile.name}
                  class="w-full h-full object-cover object-top"
                />
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
              {/* Back to CV Link */}
              <a
                href={`/?lang=${lang}`}
                class="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-[#202734]/80 hover:bg-[#36415A] text-slate-300 hover:text-white border border-white/10 transition shadow-xs flex items-center gap-1.5"
              >
                {t.backToCv}
              </a>

              {/* Language Switcher */}
              <div class="inline-flex rounded-xl bg-[#202734]/90 p-1 border border-white/10 text-xs font-semibold">
                <a
                  href="/career?lang=en"
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
                  href="/career?lang=id"
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

              {/* Raw JSON API */}
              <a
                href="/api/career/jobs"
                target="_blank"
                class="hidden sm:inline-flex px-3 py-1.5 text-xs font-medium rounded-xl border border-white/10 bg-[#202734]/80 hover:bg-[#36415A] text-slate-300 hover:text-white transition shadow-xs"
              >
                {t.viewJson}
              </a>
            </div>
          </header>

          {/* HERO BANNER: 4-LAYER ANTI-SCAM & CURATED ROLES */}
          <section class="glass-panel rounded-3xl p-6 sm:p-10 mb-8 relative overflow-hidden">
            <div class="absolute -top-24 -right-24 w-80 h-80 bg-[#B7D894]/10 rounded-full blur-3xl pointer-events-none"></div>

            <div class="space-y-4 max-w-3xl">
              {/* Security Pill */}
              <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#B7D894]/15 border border-[#B7D894]/30 text-[#E0F8C7] text-xs font-mono font-medium">
                <span class="w-2 h-2 rounded-full bg-[#B7D894] animate-pulse"></span>
                <span>{t.heroBadge}</span>
              </div>

              {/* Hero Title */}
              <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {t.heroTitle}
              </h1>

              {/* Subtitle */}
              <p class="text-sm sm:text-base text-slate-300 leading-relaxed">
                {t.heroSubtitle}
              </p>
            </div>

            {/* 4 Metric Counters */}
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/10">
              <div class="bg-[#202734]/60 rounded-2xl p-4 border border-white/5">
                <span class="text-2xl sm:text-3xl font-extrabold text-[#E0F8C7] block">
                  {totalVerified}+
                </span>
                <span class="text-xs text-slate-400 font-mono mt-1 block">
                  {t.statTotal}
                </span>
              </div>

              <div class="bg-[#202734]/60 rounded-2xl p-4 border border-white/5">
                <span class="text-2xl sm:text-3xl font-extrabold text-[#B7D894] block">
                  ≤ 14 Days
                </span>
                <span class="text-xs text-slate-400 font-mono mt-1 block">
                  {t.statFreshness}
                </span>
              </div>

              <div class="bg-[#202734]/60 rounded-2xl p-4 border border-white/5">
                <span class="text-2xl sm:text-3xl font-extrabold text-emerald-300 block">
                  100% Clean
                </span>
                <span class="text-xs text-slate-400 font-mono mt-1 block">
                  {t.statTrust}
                </span>
              </div>

              <div class="bg-[#202734]/60 rounded-2xl p-4 border border-white/5">
                <span class="text-2xl sm:text-3xl font-extrabold text-cyan-300 block">
                  Up to 98%
                </span>
                <span class="text-xs text-slate-400 font-mono mt-1 block">
                  {t.statMatch}
                </span>
              </div>
            </div>
          </section>

          {/* INTERACTIVE CONTROLS TOOLBAR (Client-side Search & Multi-Filters) */}
          <section class="glass-panel rounded-2xl p-4 sm:p-6 mb-8 space-y-4">
            {/* Search Input Box */}
            <div class="relative">
              <input
                type="text"
                id="careerSearchInput"
                placeholder={t.searchPlaceholder}
                class="w-full px-4 py-3 pl-11 rounded-xl bg-[#202734]/80 border border-white/15 focus:border-[#B7D894] focus:outline-hidden text-sm sm:text-base text-white placeholder-slate-400 transition"
              />
              <svg
                class="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Region Filter Buttons */}
            <div class="flex flex-wrap items-center gap-2 pt-1">
              <span class="text-xs font-mono text-slate-400 mr-1">Region:</span>
              <button
                type="button"
                data-region="all"
                class="region-btn px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#B7D894] text-[#202734] transition cursor-pointer"
              >
                {t.filterRegionAll}
              </button>
              <button
                type="button"
                data-region="sea_id"
                class="region-btn px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#202734]/80 text-slate-300 hover:text-white border border-white/10 transition cursor-pointer"
              >
                {t.filterSeaId}
              </button>
              <button
                type="button"
                data-region="worldwide"
                class="region-btn px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#202734]/80 text-slate-300 hover:text-white border border-white/10 transition cursor-pointer"
              >
                {t.filterWorldwide}
              </button>
              <button
                type="button"
                data-region="europe_uk"
                class="region-btn px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#202734]/80 text-slate-300 hover:text-white border border-white/10 transition cursor-pointer"
              >
                {t.filterEurope}
              </button>
              <button
                type="button"
                data-region="us_ca"
                class="region-btn px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#202734]/80 text-slate-300 hover:text-white border border-white/10 transition cursor-pointer"
              >
                {t.filterUsCa}
              </button>
              <button
                type="button"
                data-region="apac"
                class="region-btn px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#202734]/80 text-slate-300 hover:text-white border border-white/10 transition cursor-pointer"
              >
                {t.filterApac}
              </button>
            </div>

            {/* Role Track Filter Buttons */}
            <div class="flex flex-wrap items-center gap-2 pt-1 border-t border-white/5">
              <span class="text-xs font-mono text-slate-400 mr-1">Role Track:</span>
              <button
                type="button"
                data-role="all"
                class="role-btn px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#36415A] text-white border border-[#B7D894]/40 transition cursor-pointer"
              >
                {t.filterRoleAll}
              </button>
              <button
                type="button"
                data-role="backend"
                class="role-btn px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#202734]/80 text-slate-300 hover:text-white border border-white/10 transition cursor-pointer"
              >
                {t.filterRoleBackend}
              </button>
              <button
                type="button"
                data-role="lead"
                class="role-btn px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#202734]/80 text-slate-300 hover:text-white border border-white/10 transition cursor-pointer"
              >
                {t.filterRoleLead}
              </button>
              <button
                type="button"
                data-role="sysadmin_dba"
                class="role-btn px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#202734]/80 text-slate-300 hover:text-white border border-white/10 transition cursor-pointer"
              >
                {t.filterRoleSysadmin}
              </button>
              <button
                type="button"
                data-role="fullstack"
                class="role-btn px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#202734]/80 text-slate-300 hover:text-white border border-white/10 transition cursor-pointer"
              >
                {t.filterRoleFullstack}
              </button>
            </div>

            {/* Results Count Bar */}
            <div class="flex items-center justify-between text-xs text-slate-400 font-mono pt-2 border-t border-white/5">
              <div>
                {t.showingText} <span id="filteredCount" class="text-[#E0F8C7] font-bold">{jobs.length}</span> {t.ofText} {totalVerified} {t.verifiedRoles}
              </div>
              <div class="text-[11px] text-slate-500">
                {fromCache ? '⚡ Fast Cached View' : '🌐 Fresh Sync'} • Updated {formattedUpdate}
              </div>
            </div>
          </section>

          {/* JOB LISTINGS GRID */}
          <main id="jobGridContainer" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <article
                key={job.id}
                class="job-card glass-card rounded-2xl p-6 flex flex-col justify-between space-y-4"
                data-region={job.region}
                data-role={job.roleCategory}
                data-search={`${job.title} ${job.company} ${job.location} ${job.matchedSkills.join(' ')} ${job.roleCategory}`.toLowerCase()}
              >
                {/* Header: Company & Badges */}
                <div class="space-y-2.5">
                  <div class="flex items-start justify-between gap-3">
                    {/* Match Score Badge */}
                    <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#B7D894]/20 border border-[#B7D894]/40 text-[#E0F8C7] text-xs font-mono font-bold">
                      <svg class="w-3.5 h-3.5 text-[#B7D894]" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                      </svg>
                      <span>{job.matchScore}% Match</span>
                    </div>

                    {/* Freshness Badge (≤ 14 Days) */}
                    <div class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#36415A]/80 border border-white/10 text-slate-300 text-xs font-mono">
                      <span>⚡</span>
                      <span>{job.ageDays === 0 ? 'Today' : `${job.ageDays}d ago`}</span>
                    </div>
                  </div>

                  {/* Job Title & Company */}
                  <div>
                    <h2 class="text-xl font-bold text-white tracking-tight group-hover:text-[#E0F8C7] transition-colors leading-snug">
                      {job.title}
                    </h2>
                    <div class="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-slate-400">
                      <span class="font-semibold text-slate-200">{job.company}</span>
                      <span>•</span>
                      <span class="text-slate-300 font-mono">{job.location}</span>
                      <span>•</span>
                      <span class="px-2 py-0.5 rounded-md bg-[#202734] border border-white/10 text-[11px] font-mono text-[#B7D894]">
                        {job.regionLabel}
                      </span>
                    </div>
                  </div>

                  {/* Summary Snippet */}
                  <p class="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                    {job.summarySnippet}
                  </p>
                </div>

                {/* Skills & Trust Verification Layer */}
                <div class="space-y-3 pt-3 border-t border-white/5">
                  {/* Matched Skills Pills */}
                  <div class="flex flex-wrap gap-1.5">
                    {job.matchedSkills.map((sk) => (
                      <span
                        key={sk}
                        class="px-2 py-0.5 rounded-md text-[11px] font-mono bg-[#36415A]/60 text-[#E0F8C7] border border-[#B7D894]/25"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>

                  {/* Trust Safety Label */}
                  <div class="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span class="inline-flex items-center gap-1.5 text-emerald-300">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      {job.atsVendor ? `${job.atsVendor} ATS Verified` : t.antiScamPassedBadge}
                    </span>
                    <span class="text-slate-500 text-[10px]">
                      Trust {job.trustScore}/100
                    </span>
                  </div>

                  {/* Action Buttons: Apply Directly + Copy Quick Pitch */}
                  <div class="flex items-center gap-2 pt-1">
                    {/* Direct Apply Button */}
                    <a
                      href={job.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="flex-1 py-2 px-4 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-[#B7D894] to-[#E0F8C7] text-[#202734] hover:brightness-105 transition shadow-md shadow-[#B7D894]/20 flex items-center justify-center gap-1.5"
                    >
                      <span>{t.applyButton}</span>
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>

                    {/* Copy Quick Pitch Button */}
                    <button
                      type="button"
                      data-job-title={job.title}
                      data-job-company={job.company}
                      class="copy-pitch-btn px-3 py-2 rounded-xl text-xs font-semibold bg-[#202734] hover:bg-[#36415A] text-slate-300 hover:text-white border border-white/10 transition flex items-center gap-1.5 cursor-pointer"
                      title={t.copyPitchButton}
                    >
                      <svg class="w-4 h-4 text-[#B7D894]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      <span class="hidden sm:inline">{t.copyPitchButton}</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </main>

          {/* EMPTY STATE (Hidden by default, shown when filters match nothing) */}
          <div
            id="emptyStateNotice"
            class="hidden glass-panel rounded-3xl p-12 text-center max-w-xl mx-auto my-12 space-y-4"
          >
            <div class="w-16 h-16 rounded-full bg-[#B7D894]/20 border border-[#B7D894]/40 flex items-center justify-center mx-auto text-2xl">
              🔍
            </div>
            <h3 class="text-xl font-bold text-white">{t.noResultsTitle}</h3>
            <p class="text-sm text-slate-400">{t.noResultsSubtitle}</p>
            <button
              type="button"
              id="resetFiltersBtn"
              class="px-4 py-2 rounded-xl text-xs font-bold bg-[#B7D894] text-[#202734] hover:brightness-105 transition cursor-pointer"
            >
              {t.resetFilters}
            </button>
          </div>

          {/* MINIMALIST FOOTER */}
          <footer class="mt-16 py-8 text-center text-xs text-slate-500 space-y-3 border-t border-white/5">
            <div class="flex flex-wrap justify-center items-center gap-4 text-xs font-mono text-slate-400">
              <a href={`mailto:${profile.email}`} class="hover:text-[#E0F8C7] transition">{profile.email}</a>
              <span>•</span>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" class="hover:text-[#E0F8C7] transition">LinkedIn</a>
              <span>•</span>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" class="hover:text-[#E0F8C7] transition">GitHub</a>
              <span>•</span>
              <a href={`/?lang=${lang}`} class="hover:text-[#E0F8C7] transition">CV / Resume</a>
            </div>
            <p class="text-slate-500 text-[11px]">
              © {new Date().getFullYear()} {profile.name} — Verified Anti-Scam Career Engine
            </p>
          </footer>
        </div>

        {/* TOAST POPUP NOTIFICATION (Quick Feedback on Pitch Copy) */}
        <div
          id="toastNotification"
          class="fixed bottom-6 right-6 z-50 transform translate-y-10 opacity-0 pointer-events-none px-4 py-3 rounded-2xl bg-[#36415A] border border-[#B7D894] text-white shadow-xl flex items-center gap-3 font-mono text-xs"
        >
          <span class="w-2.5 h-2.5 rounded-full bg-[#B7D894]"></span>
          <span id="toastMessage">{t.copiedTooltip}</span>
        </div>

        {/* CLIENT SCRIPT: REAL-TIME FILTERING & PITCH GENERATOR */}
        <script>{`
          (function() {
            let activeRegion = 'all';
            let activeRole = 'all';
            let searchQuery = '';

            const searchInput = document.getElementById('careerSearchInput');
            const regionBtns = document.querySelectorAll('.region-btn');
            const roleBtns = document.querySelectorAll('.role-btn');
            const jobCards = document.querySelectorAll('.job-card');
            const filteredCountEl = document.getElementById('filteredCount');
            const emptyState = document.getElementById('emptyStateNotice');
            const resetBtn = document.getElementById('resetFiltersBtn');
            const toast = document.getElementById('toastNotification');
            const toastMessage = document.getElementById('toastMessage');

            function applyFilters() {
              let visibleCount = 0;

              jobCards.forEach(card => {
                const cardRegion = card.getAttribute('data-region');
                const cardRole = card.getAttribute('data-role');
                const cardSearch = card.getAttribute('data-search') || '';

                const matchesRegion = (activeRegion === 'all' || cardRegion === activeRegion);
                const matchesRole = (activeRole === 'all' || cardRole === activeRole);
                const matchesSearch = !searchQuery || cardSearch.includes(searchQuery);

                if (matchesRegion && matchesRole && matchesSearch) {
                  card.style.display = 'flex';
                  visibleCount++;
                } else {
                  card.style.display = 'none';
                }
              });

              if (filteredCountEl) {
                filteredCountEl.textContent = visibleCount;
              }

              if (emptyState) {
                emptyState.style.display = (visibleCount === 0) ? 'block' : 'none';
              }
            }

            // Search input listener
            if (searchInput) {
              searchInput.addEventListener('input', (e) => {
                searchQuery = e.target.value.trim().toLowerCase();
                applyFilters();
              });
            }

            // Region filter buttons
            regionBtns.forEach(btn => {
              btn.addEventListener('click', () => {
                regionBtns.forEach(b => {
                  b.classList.remove('bg-[#B7D894]', 'text-[#202734]');
                  b.classList.add('bg-[#202734]/80', 'text-slate-300');
                });
                btn.classList.remove('bg-[#202734]/80', 'text-slate-300');
                btn.classList.add('bg-[#B7D894]', 'text-[#202734]');

                activeRegion = btn.getAttribute('data-region') || 'all';
                applyFilters();
              });
            });

            // Role filter buttons
            roleBtns.forEach(btn => {
              btn.addEventListener('click', () => {
                roleBtns.forEach(b => {
                  b.classList.remove('bg-[#36415A]', 'text-white', 'border-[#B7D894]/40');
                  b.classList.add('bg-[#202734]/80', 'text-slate-300');
                });
                btn.classList.remove('bg-[#202734]/80', 'text-slate-300');
                btn.classList.add('bg-[#36415A]', 'text-white', 'border-[#B7D894]/40');

                activeRole = btn.getAttribute('data-role') || 'all';
                applyFilters();
              });
            });

            // Reset filters
            if (resetBtn) {
              resetBtn.addEventListener('click', () => {
                if (searchInput) searchInput.value = '';
                searchQuery = '';
                activeRegion = 'all';
                activeRole = 'all';

                regionBtns.forEach((b, i) => {
                  b.classList.toggle('bg-[#B7D894]', i === 0);
                  b.classList.toggle('text-[#202734]', i === 0);
                  b.classList.toggle('bg-[#202734]/80', i !== 0);
                  b.classList.toggle('text-slate-300', i !== 0);
                });

                roleBtns.forEach((b, i) => {
                  b.classList.toggle('bg-[#36415A]', i === 0);
                  b.classList.toggle('text-white', i === 0);
                  b.classList.toggle('bg-[#202734]/80', i !== 0);
                  b.classList.toggle('text-slate-300', i !== 0);
                });

                applyFilters();
              });
            }

            // Quick Pitch Generator & Copy
            document.querySelectorAll('.copy-pitch-btn').forEach(btn => {
              btn.addEventListener('click', () => {
                const title = btn.getAttribute('data-job-title') || 'Technical Role';
                const company = btn.getAttribute('data-job-company') || 'your company';
                const pitch = "Hi! I am Agus Maulana Yusuf Noor, an IT Department Head & Backend Engineer with 15+ years of experience in enterprise banking, Linux server administration, and mission-critical database engineering (Golang, Python, Laravel, MySQL). I would love to connect regarding the " + title + " opening at " + company + "! Full Portfolio & CV: https://agusmyn.my.id";

                navigator.clipboard.writeText(pitch).then(() => {
                  showToast();
                }).catch(() => {
                  // Fallback
                  const el = document.createElement('textarea');
                  el.value = pitch;
                  document.body.appendChild(el);
                  el.select();
                  document.execCommand('copy');
                  document.body.removeChild(el);
                  showToast();
                });
              });
            });

            function showToast() {
              if (!toast) return;
              toast.classList.remove('opacity-0', 'translate-y-10', 'pointer-events-none');
              toast.classList.add('opacity-100', 'translate-y-0');
              setTimeout(() => {
                toast.classList.add('opacity-0', 'translate-y-10', 'pointer-events-none');
                toast.classList.remove('opacity-100', 'translate-y-0');
              }, 3000);
            }
          })();
        `}</script>
      </body>
    </html>
  );
};
