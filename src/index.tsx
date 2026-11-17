import { Hono } from 'hono';
import { CvPage } from './components/Layout';
import { cvDataByLang, type Language } from './data/cv';
import { getGitHubRepos } from './services/github';

const app = new Hono();

// Helper untuk membaca parameter bahasa dari query (?lang=id atau ?lang=en)
const resolveLang = (queryLang?: string): Language => {
  return queryLang?.toLowerCase() === 'id' ? 'id' : 'en';
};

// Route file statis foto profil
app.get('/profile.jpg', () => {
  const file = Bun.file('public/profile.jpg');
  return new Response(file, {
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=86400',
    },
  });
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

export default {
  port: 3000,
  fetch: app.fetch,
};
