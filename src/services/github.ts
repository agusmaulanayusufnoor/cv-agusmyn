export interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
}

interface CacheState {
  data: GitHubRepo[];
  timestamp: number;
}

// In-memory cache state
let cache: CacheState | null = null;
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 menit
const GITHUB_USERNAME = 'agusmaulanayusufnoor';

/**
 * Mengambil daftar repository dari GitHub API dengan sistem in-memory caching.
 * Mencegah terkena rate limit GitHub (maks 60 request/jam untuk unauthenticated).
 */
export async function getGitHubRepos(): Promise<{ repos: GitHubRepo[]; fromCache: boolean; lastFetched: string }> {
  const now = Date.now();

  // Kembalikan dari in-memory cache jika masih dalam batas TTL
  if (cache && now - cache.timestamp < CACHE_TTL_MS) {
    return {
      repos: cache.data,
      fromCache: true,
      lastFetched: new Date(cache.timestamp).toISOString(),
    };
  }

  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`, {
      headers: {
        'User-Agent': 'Bun-Hono-CV-App',
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      console.warn(`GitHub API warning: ${response.status} ${response.statusText}`);
      // Jika terjadi error (misal rate limit), gunakan cache lama jika tersedia
      if (cache) {
        return {
          repos: cache.data,
          fromCache: true,
          lastFetched: new Date(cache.timestamp).toISOString(),
        };
      }
      return { repos: [], fromCache: false, lastFetched: new Date().toISOString() };
    }

    const rawRepos = (await response.json()) as GitHubRepo[];

    // Filter hanya repo publik milik sendiri (bukan hasil fork), urutkan berdasarkan update terbaru
    const filteredRepos: GitHubRepo[] = (Array.isArray(rawRepos) ? rawRepos : [])
      .filter((repo) => !repo.fork)
      .map((repo) => ({
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        language: repo.language,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        updated_at: repo.updated_at,
        fork: repo.fork,
      }))
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

    // Simpan ke in-memory cache
    cache = {
      data: filteredRepos,
      timestamp: now,
    };

    return {
      repos: filteredRepos,
      fromCache: false,
      lastFetched: new Date(now).toISOString(),
    };
  } catch (err) {
    console.error('Error fetching GitHub repos:', err);
    if (cache) {
      return {
        repos: cache.data,
        fromCache: true,
        lastFetched: new Date(cache.timestamp).toISOString(),
      };
    }
    return { repos: [], fromCache: false, lastFetched: new Date().toISOString() };
  }
}
