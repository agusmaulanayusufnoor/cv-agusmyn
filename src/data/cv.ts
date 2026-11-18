export type Language = 'en' | 'id';

export interface CvProfile {
  name: string;
  firstName: string;
  lastName: string;
  title: string;
  category: string;
  location: string;
  email: string;
  whatsapp: string;
  github: string;
  linkedin: string;
  website: string;
  bioShort: string;
  summary: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface MetaItem {
  label: string;
  value: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  highlights: string[];
}

export interface ProjectItem {
  name: string;
  tech: string;
  url: string;
  year?: string;
  description: string;
  category?: 'enterprise' | 'opensource';
}

export interface EducationInfo {
  degree: string;
  institution: string;
  year: string;
}

export interface CvContent {
  profile: CvProfile;
  stats: StatItem[];
  meta: MetaItem[];
  skills: Record<string, string[]>;
  experience: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationInfo;
  certifications: string[];
  languages: string[];
}

export const cvDataByLang: Record<Language, CvContent> = {
  en: {
    profile: {
      name: "Agus Maulana Yusuf Noor",
      firstName: "AGUS",
      lastName: "MAULANA",
      title: "IT Department Head | Backend & Full-Stack Engineer | AI & Vibe Coding | Linux SysAdmin & DBA",
      category: "HEAD OF IT & LEAD ENGINEER",
      location: "Subang & Bandung, West Java",
      email: "agusmaulanayusufnoor@gmail.com",
      whatsapp: "+62 857-5931-6259",
      github: "https://github.com/agusmaulanayusufnoor",
      linkedin: "https://www.linkedin.com/in/agus-maulana-yusuf-noor/",
      website: "https://www.bprjabar.com",
      bioShort:
        "IT Leader, Full-Stack Engineer & AI Vibe Coding practitioner based in West Java. Passionate about resilient banking architectures, Linux systems, and modern AI-accelerated engineering.",
      summary:
        "IT Leader and Full-Stack / Backend Engineer with 15+ years of experience in the banking & financial sector (PT BPR Jabar Perseroda) and active practitioner of modern AI & Vibe Coding paradigms. Proven track record in building enterprise web applications, accelerating software delivery 5x–10x via AI-assisted workflows, managing high-availability Linux servers (Ubuntu/CentOS), MikroTik network infrastructure, and mission-critical MySQL databases with zero critical downtime. Adept at bridging executive technical strategy with hands-on full-stack development.",
    },
    stats: [
      { value: "15+", label: "Years Experience" },
      { value: "100%", label: "Core Uptime" },
      { value: "20+", label: "Enterprise Systems" },
      { value: "0", label: "Critical Downtime" },
    ],
    meta: [
      { label: "Based in", value: "Subang & Bandung" },
      { label: "Experience", value: "15+ Years" },
      { label: "Specialty", value: "Backend, AI & SysAdmin" },
      { label: "Availability", value: "Open to Remote" },
    ],
    skills: {
      "AI & Vibe Coding": ["AI-Assisted Engineering (Vibe Coding)", "Agentic Workflows & Multi-Agent", "LLM Integration (Gemini, Claude, OpenAI)", "Prompt Engineering & Cursor/Antigravity", "AI Code Refactoring & Automations"],
      "Backend & Languages": ["Golang", "Python", "PHP (Laravel)", "TypeScript / Bun / Hono", "Delphi"],
      "Frontend & UI": ["Vue.js", "Next.js", "Inertia.js", "Vuetify", "Tailwind CSS"],
      "Database & Storage": ["MySQL (Optimization, Replication, Disaster Recovery)", "Redis"],
      "SysAdmin & Infrastructure": ["Linux Server (Ubuntu, CentOS)", "MikroTik RouterOS", "Server Hardening", "CI/CD & Docker"],
    },
    experience: [
      {
        role: "Head of IT Department",
        company: "PT BPR Jabar Perseroda",
        period: "Jan 2024 – Present",
        highlights: [
          "Direct technology roadmap, infrastructure modernization, and internal engineering teams supporting 300+ enterprise users and over $30M in assets under management.",
          "Maintained 99.99% high-availability uptime and 0 critical security incidents across 20+ production Linux servers (Ubuntu/CentOS) and core banking databases.",
          "Enforce strict regulatory IT compliance (OJK & Bank Indonesia standards), securing MikroTik network architecture, site-to-site VPN tunnels, and disaster recovery replication across 15+ branch offices.",
        ],
      },
      {
        role: "IT Staff (Full-Stack Developer & SysAdmin)",
        company: "PT BPR Jabar Perseroda",
        period: "Jan 2011 – Jan 2024",
        highlights: [
          "Architected and delivered 4 enterprise web platforms (ESDMKU HRIS, E-Monitoring, E-Box Archive, Notifku Gateway), reducing document retrieval times by 75% and cutting manual operational overhead by 40%.",
          "Administered high-throughput MySQL database clusters with automated master-slave replication and nightly backup pipelines, achieving 100% data integrity with zero data loss over 13 consecutive years.",
          "Engineered high-performance RESTful APIs (Golang, Laravel, Python) to replace legacy desktop modules, reducing inter-system data synchronization latency by 60%.",
        ],
      },
    ],
    projects: [
      {
        name: "Corporate Portal PT BPR Jabar Perseroda",
        tech: "Web Architecture & Production Deployment",
        url: "https://www.bprjabar.com",
        year: "2024",
        category: "enterprise",
        description: "Engineered official corporate portal with cloud CDN optimization, achieving 98+ Google Lighthouse performance score and serving 25,000+ monthly visitor sessions.",
      },
      {
        name: "ESDMKU (Enterprise HRIS)",
        tech: "Laravel 10, Vue 3, Inertia.js, MySQL",
        url: "https://github.com/agusmaulanayusufnoor/esdmku",
        year: "2023",
        category: "enterprise",
        description: "Centralized Human Resource platform automating attendance monitoring, employee profiling, and multi-tier approval workflows for 300+ staff members, eliminating 90% of paper-based administrative requests.",
      },
      {
        name: "E-Boxku (Digital Archiving System)",
        tech: "Laravel 8, Vuetify 2.6, MySQL",
        url: "https://github.com/agusmaulanayusufnoor/eboxku-v1.0.0.2",
        year: "2022",
        category: "enterprise",
        description: "Secure digital archiving and document management system handling 100,000+ digitized banking records with granular role-based access control (RBAC), fully compliant with banking audit standards.",
      },
      {
        name: "Notifku (WhatsApp Notification Gateway)",
        tech: "PHP, Fonnte API, Background Queue",
        url: "https://github.com/agusmaulanayusufnoor/notifku",
        year: "2024",
        category: "enterprise",
        description: "Asynchronous notification dispatch engine processing 10,000+ automated monthly WhatsApp alerts, server health monitors, and transaction notifications with 99.8% delivery success rate.",
      },
    ],
    education: {
      degree: "Bachelor's Degree in Computer Science / Informatics",
      institution: "Universitas Komputer Indonesia (UNIKOM)",
      year: "Graduated 2011",
    },
    certifications: [
      "Linux Server Administrator",
      "CompTIA A+",
      "MikroTik Certified Network Associate (MTCNA Curriculum)",
    ],
    languages: [
      "Indonesian (Native / Mother Tongue)",
      "English (Professional Working Proficiency)",
      "Arabic (Textual Reading & Comprehension)",
    ],
  },
  id: {
    profile: {
      name: "Agus Maulana Yusuf Noor",
      firstName: "AGUS",
      lastName: "MAULANA",
      title: "Kepala Bagian IT | Backend & Full-Stack Engineer | AI & Vibe Coding | Linux SysAdmin & DBA",
      category: "KEPALA BAGIAN IT & LEAD ENGINEER",
      location: "Subang & Bandung, Jawa Barat",
      email: "agusmaulanayusufnoor@gmail.com",
      whatsapp: "+62 857-5931-6259",
      github: "https://github.com/agusmaulanayusufnoor",
      linkedin: "https://www.linkedin.com/in/agus-maulana-yusuf-noor/",
      website: "https://www.bprjabar.com",
      bioShort:
        "Pemimpin IT, Full-Stack Engineer & praktisi AI Vibe Coding di Jawa Barat. Berfokus pada sistem perbankan tangguh, administrasi Linux, dan percepatan rekayasa berbantuan AI modern.",
      summary:
        "Pemimpin IT dan Full-Stack / Backend Engineer berpengalaman 15+ tahun di sektor perbankan & keuangan (PT BPR Jabar Perseroda) sekaligus praktisi aktif paradigma rekayasa modern AI & Vibe Coding. Memiliki rekam jejak teruji dalam membangun aplikasi web enterprise, melipatgandakan kecepatan deliveri software melalui alur kerja AI-assisted, mengelola server produksi Linux (Ubuntu/CentOS), infrastruktur jaringan MikroTik, serta database MySQL kritis dengan zero critical downtime. Berpengalaman menyatukan strategi teknis manajemen dengan rekayasa perangkat lunak hands-on.",
    },
    stats: [
      { value: "15+", label: "Tahun Pengalaman" },
      { value: "100%", label: "Uptime Sistem Kritis" },
      { value: "20+", label: "Sistem Enterprise" },
      { value: "0", label: "Downtime Kritis" },
    ],
    meta: [
      { label: "Domisili", value: "Subang & Bandung" },
      { label: "Pengalaman", value: "15+ Tahun" },
      { label: "Fokus Utama", value: "Backend, AI & SysAdmin" },
      { label: "Status Kerja", value: "Terbuka Remote" },
    ],
    skills: {
      "AI & Vibe Coding": ["Rekayasa Berbantuan AI (Vibe Coding)", "Workflow Multi-Agent & LLM", "Integrasi API Gemini & OpenAI", "Prompt Engineering & Tooling AI (Cursor/Antigravity)", "Otomatisasi Sistem Berbasis AI"],
      "Backend & Bahasa": ["Golang", "Python", "PHP (Laravel)", "TypeScript / Bun / Hono", "Delphi"],
      "Frontend & UI": ["Vue.js", "Next.js", "Inertia.js", "Vuetify", "Tailwind CSS"],
      "Basis Data & Storage": ["MySQL (Optimasi, Replikasi, Disaster Recovery)", "Redis"],
      "SysAdmin & Infrastruktur": ["Linux Server (Ubuntu, CentOS)", "MikroTik RouterOS", "Server Hardening", "CI/CD & Docker"],
    },
    experience: [
      {
        role: "Pemimpin Bagian IT (Head of IT)",
        company: "PT BPR Jabar Perseroda",
        period: "Jan 2024 – Sekarang",
        highlights: [
          "Memimpin arah strategi teknologi, modernisasi infrastruktur perbankan, dan membina tim rekayasa perangkat lunak yang melayani 300+ staf internal dan aset kelolaan lebih dari Rp 500 Miliar.",
          "Menjaga reliabilitas sistem dengan catatan 99.99% operational uptime serta 0 insiden keamanan kritis pada 20+ server Linux produksi (Ubuntu/CentOS) dan klaster database perbankan.",
          "Menegakkan kepatuhan regulasi tata kelola TI perbankan (Standar OJK & Bank Indonesia), mengamankan arsitektur jaringan MikroTik, site-to-site VPN, dan replikasi Disaster Recovery Center (DRC) pada 15+ kantor cabang.",
        ],
      },
      {
        role: "Staff IT (Full-Stack Developer & SysAdmin)",
        company: "PT BPR Jabar Perseroda",
        period: "Jan 2011 – Jan 2024",
        highlights: [
          "Merancang, membangun, dan merilis 4 platform enterprise inti (ESDMKU HRIS, E-Monitoring, E-Boxku Digital Archive, Notifku WhatsApp Gateway), memangkas waktu pencarian dokumen hingga 75% dan memangkas overhead operasional manual sebesar 40%.",
          "Mengadministrasikan klaster database MySQL berkapasitas tinggi dengan replikasi otomatis master-slave serta sistem backup terjadwal, mempertahankan integritas data 100% tanpa kehilangan data (zero data loss) selama 13 tahun berturut-turut.",
          "Memodernisasi sistem perbankan warisan (Delphi) menjadi layanan RESTful API modern (Golang, Laravel, Python), memangkas latensi sinkronisasi antar-sistem sebesar 60%.",
        ],
      },
    ],
    projects: [
      {
        name: "Portal Korporat PT BPR Jabar Perseroda",
        tech: "Web Architecture & Production Deployment",
        url: "https://www.bprjabar.com",
        year: "2024",
        category: "enterprise",
        description: "Website resmi korporasi dan kanal keterbukaan laporan keuangan publik yang dioptimalkan dengan CDN cloud, meraih skor performa Google Lighthouse 98+ dan melayani 25.000+ sesi kunjungan bulanan.",
      },
      {
        name: "ESDMKU (Enterprise HRIS)",
        tech: "Laravel 10, Vue 3, Inertia.js, MySQL",
        url: "https://github.com/agusmaulanayusufnoor/esdmku",
        year: "2023",
        category: "enterprise",
        description: "Sistem Informasi Manajemen SDM terpusat untuk absensi digital dan otomatisasi alur persetujuan surat dinas multi-tingkat bagi 300+ karyawan, mengeliminasi 90% proses administrasi berbasis kertas.",
      },
      {
        name: "E-Boxku (Digital Archiving System)",
        tech: "Laravel 8, Vuetify 2.6, MySQL",
        url: "https://github.com/agusmaulanayusufnoor/eboxku-v1.0.0.2",
        year: "2022",
        category: "enterprise",
        description: "Aplikasi manajemen dan pengarsipan elektronik perbankan yang mengelola 100.000+ berkas digital dengan hak akses granular (RBAC), teruji memenuhi standar audit regulasi perbankan.",
      },
      {
        name: "Notifku (WhatsApp Notification Gateway)",
        tech: "PHP, Fonnte API, Background Queue",
        url: "https://github.com/agusmaulanayusufnoor/notifku",
        year: "2024",
        category: "enterprise",
        description: "Layanan gateway pengiriman notifikasi WhatsApp otomatis berbasis antrean background yang memproses 10.000+ peringatan server internal dan notifikasi nasabah per bulan dengan tingkat keberhasilan 99.8%.",
      },
    ],
    education: {
      degree: "Sarjana Komputer (S1) / Teknik Informatika",
      institution: "Universitas Komputer Indonesia (UNIKOM)",
      year: "Lulus Tahun 2011",
    },
    certifications: [
      "Linux Server Administrator",
      "CompTIA A+",
      "MikroTik Certified Network Associate (Kurikulum MTCNA)",
    ],
    languages: [
      "Bahasa Indonesia (Penutur Asli / Native)",
      "Bahasa Inggris (Kecakapan Kerja Profesional)",
      "Bahasa Arab (Pemahaman Tekstual / Membaca)",
    ],
  },
};

export const uiLabels: Record<Language, Record<string, string>> = {
  en: {
    pageTitle: "Agus Maulana — Curriculum Vitae & Portfolio",
    navAbout: "About",
    navExperience: "Experience",
    navProjects: "Projects",
    navContact: "Contact",
    navCareer: "Career",
    navAts: "ATS Score",
    viewJson: "JSON API",
    printPdf: "Print / PDF",
    aboutMe: "About Me",
    aboutMeSubtitle: "A brief look into my background, philosophy, and professional journey.",
    myProjects: "My Projects",
    myProjectsSubtitle: "A curated collection of mission-critical banking platforms and live GitHub repositories.",
    filterAll: "All Projects",
    filterEnterprise: "Enterprise Systems",
    filterGithub: "Live GitHub Repos",
    experienceTitle: "Work Experience",
    expertiseTitle: "Technical Expertise",
    educationTitle: "Education",
    certificationsTitle: "Certifications",
    languagesTitle: "Languages",
    cachedBadge: "⚡ Bun In-Memory Cache",
    liveBadge: "🌐 Live GitHub API",
    viewOnGithub: "View on GitHub",
    updated: "Updated",
    connectPrompt: "Let's build reliable software together.",
    getInTouch: "Get in Touch",
  },
  id: {
    pageTitle: "Agus Maulana — Portofolio & Curriculum Vitae",
    navAbout: "Tentang",
    navExperience: "Pengalaman",
    navProjects: "Proyek",
    navContact: "Kontak",
    navCareer: "Karir",
    navAts: "Skor ATS",
    viewJson: "JSON API",
    printPdf: "Cetak / PDF",
    aboutMe: "Tentang Saya",
    aboutMeSubtitle: "Sekilas mengenai perjalanan karir, filosofi rekayasa perangkat lunak, dan kapabilitas saya.",
    myProjects: "Proyek Pilihan",
    myProjectsSubtitle: "Koleksi platform perbankan enterprise kritis dan repositori open-source langsung dari GitHub.",
    filterAll: "Semua Proyek",
    filterEnterprise: "Sistem Enterprise",
    filterGithub: "GitHub Repositori",
    experienceTitle: "Pengalaman Kerja",
    expertiseTitle: "Keahlian Teknis",
    educationTitle: "Pendidikan",
    certificationsTitle: "Sertifikasi",
    languagesTitle: "Bahasa",
    cachedBadge: "⚡ Cache In-Memory Bun",
    liveBadge: "🌐 GitHub API Langsung",
    viewOnGithub: "Buka di GitHub",
    updated: "Diperbarui",
    connectPrompt: "Mari membangun sistem yang tangguh bersama.",
    getInTouch: "Hubungi Saya",
  },
};

export const cvData = cvDataByLang.en;
