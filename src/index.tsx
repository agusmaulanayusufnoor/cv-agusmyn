import { Hono } from 'hono';
import { CvPage } from './components/Layout';
import { CareerPage } from './components/CareerPage';
import { AtsPage } from './components/AtsPage';
import { cvDataByLang, type Language } from './data/cv';
import { getGitHubRepos } from './services/github';
import { getVerifiedCareerJobs } from './services/career';

const app = new Hono();

// Helper untuk membaca parameter bahasa dari query (?lang=id atau ?lang=en)
const resolveLang = (queryLang?: string): Language => {
  return queryLang?.toLowerCase() === 'id' ? 'id' : 'en';
};

// Route file statis foto profil & style.css (fallback aman untuk Bun lokal; di Cloudflare dilayani otomatis oleh assets)
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

// Route Utama: Render halaman CV & Portofolio editorial estetik
app.get('/', async (c) => {
  const lang = resolveLang(c.req.query('lang'));
  const { repos, fromCache, lastFetched } = await getGitHubRepos();

  return c.html(
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

  return c.html(
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
  return c.html(<AtsPage lang={lang} />);
});

app.get('/ats-score', (c) => {
  const lang = resolveLang(c.req.query('lang'));
  return c.html(<AtsPage lang={lang} />);
});

export default app;
