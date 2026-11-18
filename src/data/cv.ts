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
      title: "IT Department Head | Full-Stack & Backend Engineer | Linux SysAdmin & DBA",
      category: "HEAD OF IT & LEAD ENGINEER",
      location: "Subang & Bandung, West Java",
      email: "agusmaulanayusufnoor@gmail.com",
      whatsapp: "+62 857-5931-6259",
      github: "https://github.com/agusmaulanayusufnoor",
      linkedin: "https://www.linkedin.com/in/agus-maulana-yusuf-noor/",
      website: "https://www.bprjabar.com",
      bioShort:
        "IT Leader & Full-Stack Engineer based in West Java. Passionate about resilient banking architectures, Linux systems, and modern web engineering.",
      summary:
        "IT Leader and Full-Stack / Backend Engineer with 15+ years of experience in the banking & financial sector (PT BPR Jabar Perseroda). Proven track record in building enterprise web applications, managing high-availability Linux servers (Ubuntu/CentOS), MikroTik network infrastructure, and mission-critical MySQL databases with zero critical downtime. Adept at bridging executive technical strategy with hands-on full-stack development.",
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
      { label: "Specialty", value: "Backend & SysAdmin" },
      { label: "Availability", value: "Open to Remote" },
    ],
    skills: {
      "Backend & Languages": ["Golang", "Python", "PHP (Laravel)", "TypeScript / Bun / Hono", "Delphi"],
      "Frontend & UI": ["Vue.js", "Next.js", "Inertia.js", "Vuetify", "Tailwind CSS"],
      "Database & Storage": ["MySQL (Optimization, Replication, Disaster Recovery)", "Redis"],
      "SysAdmin & Infrastructure": ["Linux Server (Ubuntu, CentOS)", "MikroTik RouterOS", "Server Hardening", "CI/CD & Docker"],
    },
    experience: [
      {
        role: "Head of IT Department",
        company: "PT BPR Jabar Perseroda",
        period: "2024 – Present",
        highlights: [
          "Directing technological strategy, core infrastructure modernization, and internal engineering teams.",
          "Maintained 100% operational uptime and zero critical incidents across financial production services and Linux servers.",
          "Overseeing database security, MikroTik network architecture, and strict IT banking regulatory compliance (OJK/BI).",
        ],
      },
      {
        role: "IT Staff (Full-Stack Developer & SysAdmin)",
        company: "PT BPR Jabar Perseroda",
        period: "2011 – 2024",
        highlights: [
          "Spearheaded end-to-end design and deployment of key enterprise systems: ESDMKU (HRIS), E-Monitoring, and E-Box digital archive.",
          "Managed production Ubuntu & CentOS servers, complex MySQL database administration, and multi-branch network routing.",
          "Modernized legacy desktop systems (Delphi) by developing robust web services and RESTful APIs.",
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
        description: "Official enterprise corporate website and public financial disclosure portal serving thousands of clients.",
      },
      {
        name: "ESDMKU (Enterprise HRIS)",
        tech: "Laravel 10, Vue 3, Inertia.js, MySQL",
        url: "https://github.com/agusmaulanayusufnoor/esdmku",
        year: "2023",
        category: "enterprise",
        description: "Integrated Human Resource platform managing employee records, attendance monitoring, and multi-tier approval workflows.",
      },
      {
        name: "E-Boxku (Digital Archiving System)",
        tech: "Laravel 8, Vuetify 2.6, MySQL",
        url: "https://github.com/agusmaulanayusufnoor/eboxku-v1.0.0.2",
        year: "2022",
        category: "enterprise",
        description: "Secure digital archiving and document management system tailored for bank-grade regulatory compliance.",
      },
      {
        name: "Notifku (WhatsApp Notification Gateway)",
        tech: "PHP, Fonnte API, Background Queue",
        url: "https://github.com/agusmaulanayusufnoor/notifku",
        year: "2024",
        category: "enterprise",
        description: "Automated WhatsApp dispatch gateway handling critical system alerts, transaction confirmations, and employee notices.",
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
      title: "Kepala Bagian IT | Full-Stack & Backend Engineer | Linux SysAdmin & DBA",
      category: "KEPALA BAGIAN IT & LEAD ENGINEER",
      location: "Subang & Bandung, Jawa Barat",
      email: "agusmaulanayusufnoor@gmail.com",
      whatsapp: "+62 857-5931-6259",
      github: "https://github.com/agusmaulanayusufnoor",
      linkedin: "https://www.linkedin.com/in/agus-maulana-yusuf-noor/",
      website: "https://www.bprjabar.com",
      bioShort:
        "Pemimpin IT & Full-Stack Engineer berbasis di Jawa Barat. Berfokus pada keandalan sistem perbankan, infrastruktur server Linux, dan rekayasa web modern.",
      summary:
        "Pemimpin IT dan Full-Stack / Backend Engineer berpengalaman 15+ tahun di sektor perbankan & keuangan (PT BPR Jabar Perseroda). Memiliki rekam jejak terbukti dalam membangun aplikasi web enterprise, mengelola server Linux ketersediaan tinggi (Ubuntu/CentOS), infrastruktur jaringan MikroTik, dan basis data MySQL misi-kritis tanpa downtime kritikal. Berpengalaman menyatukan strategi teknis manajemen dengan rekayasa perangkat lunak hands-on.",
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
      { label: "Fokus Utama", value: "Backend & SysAdmin" },
      { label: "Status Kerja", value: "Terbuka Remote" },
    ],
    skills: {
      "Backend & Bahasa": ["Golang", "Python", "PHP (Laravel)", "TypeScript / Bun / Hono", "Delphi"],
      "Frontend & UI": ["Vue.js", "Next.js", "Inertia.js", "Vuetify", "Tailwind CSS"],
      "Basis Data & Storage": ["MySQL (Optimasi, Replikasi, Disaster Recovery)", "Redis"],
      "SysAdmin & Infrastruktur": ["Linux Server (Ubuntu, CentOS)", "MikroTik RouterOS", "Server Hardening", "CI/CD & Docker"],
    },
    experience: [
      {
        role: "Pemimpin Bagian IT (Head of IT)",
        company: "PT BPR Jabar Perseroda",
        period: "2024 – Sekarang",
        highlights: [
          "Memimpin operasional divisi IT, arah strategi modernisasi infrastruktur, serta membina tim pengembang perangkat lunak internal.",
          "Menjaga reliabilitas sistem dengan 100% uptime dan zero incident pada seluruh layanan perbankan produksi dan server Linux.",
          "Mengawasi tata kelola keamanan database, topologi jaringan MikroTik kantor pusat & cabang, serta kepatuhan regulasi OJK & BI.",
        ],
      },
      {
        role: "Staff IT (Full-Stack Developer & SysAdmin)",
        company: "PT BPR Jabar Perseroda",
        period: "2011 – 2024",
        highlights: [
          "Merancang, membangun, dan merilis sistem internal inti: ESDMKU (HRIS), E-Monitoring, serta platform arsip dokumen digital E-Box.",
          "Mengadministrasikan server produksi Linux Ubuntu & CentOS, manajemen database MySQL kapasitas tinggi, dan routing jaringan cabang.",
          "Mengintegrasikan sistem desktop warisan (Delphi) dengan ekosistem aplikasi web dan REST API modern.",
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
        description: "Website resmi korporasi dan kanal publikasi laporan keuangan publik yang melayani ribuan nasabah dan stakeholder.",
      },
      {
        name: "ESDMKU (Enterprise HRIS)",
        tech: "Laravel 10, Vue 3, Inertia.js, MySQL",
        url: "https://github.com/agusmaulanayusufnoor/esdmku",
        year: "2023",
        category: "enterprise",
        description: "Sistem Informasi Manajemen SDM terpadu untuk absensi digital, data pegawai, dan otomatisasi alur persetujuan surat dinas.",
      },
      {
        name: "E-Boxku (Digital Archiving System)",
        tech: "Laravel 8, Vuetify 2.6, MySQL",
        url: "https://github.com/agusmaulanayusufnoor/eboxku-v1.0.0.2",
        year: "2022",
        category: "enterprise",
        description: "Aplikasi arsip elektronik dan pelacakan berkas hukum perbankan yang aman dan terstruktur sesuai standar audit.",
      },
      {
        name: "Notifku (WhatsApp Notification Gateway)",
        tech: "PHP, Fonnte API, Background Queue",
        url: "https://github.com/agusmaulanayusufnoor/notifku",
        year: "2024",
        category: "enterprise",
        description: "Layanan gateway pengiriman notifikasi WhatsApp otomatis untuk peringatan server internal dan informasi nasabah.",
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
