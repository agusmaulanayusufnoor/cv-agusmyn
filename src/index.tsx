import { Hono } from 'hono';
import { CvPage } from './components/Layout';
import { CareerPage } from './components/CareerPage';
import { AtsPage } from './components/AtsPage';
import { cvDataByLang, type Language } from './data/cv';
import { getGitHubRepos } from './services/github';
import { getVerifiedCareerJobs } from './services/career';
import { generateAtsResumePdf } from './services/pdf-generator';

const app = new Hono();

// Helper untuk membaca parameter bahasa dari query (?lang=id atau ?lang=en)
const resolveLang = (queryLang?: string): Language => {
  return queryLang?.toLowerCase() === 'id' ? 'id' : 'en';
};

// Route file statis favicon, foto profil & style.css
app.get('/favicon.svg', (c) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#202734"/><path d="M16 6L8 24h4l1.6-4h4.8l1.6 4h4L16 6zm-1.2 11L16 11.5 17.2 17h-2.4z" fill="#B7D894"/></svg>`;
  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
});

app.get('/favicon.ico', (c) => {
  return c.redirect('/favicon.svg', 301);
});

// Route file statis foto profil & style.css (fallback aman untuk Bun lokal; di Cloudflare dilayani otomatis oleh assets)
app.get('/profile.webp', (c) => {
  if (typeof Bun !== 'undefined' && typeof Bun.file === 'function') {
    const file = Bun.file('public/profile.webp');
    return new Response(file, {
      headers: {
        'Content-Type': 'image/webp',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  }
  return c.notFound();
});

app.get('/profile-thumb.webp', (c) => {
  if (typeof Bun !== 'undefined' && typeof Bun.file === 'function') {
    const file = Bun.file('public/profile-thumb.webp');
    return new Response(file, {
      headers: {
        'Content-Type': 'image/webp',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  }
  return c.notFound();
});

app.get('/profile.jpg', (c) => {
  if (typeof Bun !== 'undefined' && typeof Bun.file === 'function') {
    const file = Bun.file('public/profile.jpg');
    return new Response(file, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=604800, stale-while-revalidate=86400',
      },
    });
  }
  return c.notFound();
});

app.get('/css/style.css', (c) => {
  if (typeof Bun !== 'undefined' && typeof Bun.file === 'function') {
    const file = Bun.file('public/css/style.css');
    return new Response(file, {
      headers: {
        'Content-Type': 'text/css; charset=utf-8',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  }
  return c.notFound();
});

// Helper untuk merender response HTML dengan deklarasi <!DOCTYPE html> standar W3C (mencegah quirks-mode)
const renderHtml = (c: any, jsxNode: any) => {
  return c.html('<!DOCTYPE html>' + jsxNode);
};

// Route SEO: robots.txt & sitemap.xml
app.get('/robots.txt', (c) => {
  const content = `User-agent: *\nAllow: /\nSitemap: https://agusmyn.my.id/sitemap.xml\n`;
  c.header('Content-Type', 'text/plain; charset=utf-8');
  c.header('Cache-Control', 'public, max-age=86400');
  return c.text(content);
});

app.get('/sitemap.xml', (c) => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://agusmyn.my.id/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://agusmyn.my.id/career</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://agusmyn.my.id/ats</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;
  c.header('Content-Type', 'application/xml; charset=utf-8');
  c.header('Cache-Control', 'public, max-age=86400');
  return c.body(xml);
});

// Route Utama: Render halaman CV & Portofolio editorial estetik
app.get('/', async (c) => {
  const lang = resolveLang(c.req.query('lang'));
  const { repos, fromCache, lastFetched } = await getGitHubRepos();

  return renderHtml(
    c,
    <CvPage
      lang={lang}
      repos={repos}
      fromCache={fromCache}
      lastFetched={lastFetched}
    />
  );
});

// Route API: Mengembalikan data CV & GitHub dalam format JSON
app.get('/api/cv', async (c) => {
  const queryLang = c.req.query('lang');
  const lang = resolveLang(queryLang);
  const { repos, fromCache, lastFetched } = await getGitHubRepos();

  return c.json({
    activeLanguage: lang,
    availableLanguages: ['en', 'id'],
    ...cvDataByLang[lang],
    githubSync: {
      totalRepos: repos.length,
      fromCache,
      lastFetched,
      repositories: repos,
    },
  });
});

// Route API Khusus GitHub Repositories
app.get('/api/github/repos', async (c) => {
  const result = await getGitHubRepos();
  return c.json(result);
});

// Route Career: Render halaman Peluang Karir Terverifikasi & Anti-Penipuan (≤ 14 Hari)
app.get('/career', async (c) => {
  const lang = resolveLang(c.req.query('lang'));
  const forceRefresh = c.req.query('refresh') === 'true';
  const { jobs, totalVerified, fromCache, lastUpdated } = await getVerifiedCareerJobs(forceRefresh);

  return renderHtml(
    c,
    <CareerPage
      lang={lang}
      jobs={jobs}
      totalVerified={totalVerified}
      fromCache={fromCache}
      lastUpdated={lastUpdated}
    />
  );
});

// Route API Career: Mengembalikan data lowongan terverifikasi (JSON)
app.get('/api/career/jobs', async (c) => {
  const forceRefresh = c.req.query('refresh') === 'true';
  const result = await getVerifiedCareerJobs(forceRefresh);
  return c.json(result);
});

// Route ATS Scorecard & Verification Report (Terbuka untuk HR & Recruiters)
app.get('/ats', (c) => {
  const lang = resolveLang(c.req.query('lang'));
  return renderHtml(c, <AtsPage lang={lang} />);
});

app.get('/ats-score', (c) => {
  const lang = resolveLang(c.req.query('lang'));
  return renderHtml(c, <AtsPage lang={lang} />);
});

// Route Export PDF: Menghasilkan resume PDF berstandar ATS murni (vektor, 100% parseable, bukan print html)
app.get('/export/pdf', async (c) => {
  const lang = resolveLang(c.req.query('lang'));
  const pdfBytes = await generateAtsResumePdf(lang);
  const filename = `Agus-Maulana-Yusuf-Noor-Resume-${lang.toUpperCase()}.pdf`;
  c.header('Content-Type', 'application/pdf');
  c.header('Content-Disposition', `attachment; filename="${filename}"`);
  c.header('Cache-Control', 'public, max-age=86400');
  return c.body(pdfBytes.buffer as ArrayBuffer);
});

app.get('/resume.pdf', async (c) => {
  const lang = resolveLang(c.req.query('lang'));
  const pdfBytes = await generateAtsResumePdf(lang);
  c.header('Content-Type', 'application/pdf');
  c.header('Content-Disposition', 'inline; filename="Agus-Maulana-Yusuf-Noor-Resume.pdf"');
  c.header('Cache-Control', 'public, max-age=86400');
  return c.body(pdfBytes.buffer as ArrayBuffer);
});

export default app;
