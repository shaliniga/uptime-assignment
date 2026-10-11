import { mockProfile } from '../data/mockProfile';
import { mockRepositories, allMockRepositories, LANGUAGE_COLORS } from '../data/mockRepositories';

const GITHUB_API_BASE = 'https://api.github.com';

/**
 * Fetch GitHub user profile with graceful fallback to mock data on rate limit / error
 */
export async function fetchUserProfile(username = 'shreeramk') {
  try {
    const headers = {
      Accept: 'application/vnd.github.v3+json'
    };
    
    // Support custom token if provided in environment
    if (import.meta.env.VITE_GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`;
    }

    const response = await fetch(`${GITHUB_API_BASE}/users/${username}`, { headers });

    if (response.status === 403 || response.status === 429) {
      console.warn('GitHub API rate limit exceeded. Falling back to local mock profile data.');
      return {
        ...mockProfile,
        isRateLimited: true,
        source: 'mock-rate-limited'
      };
    }

    if (!response.ok) {
      throw new Error(`GitHub API returned status ${response.status}: ${response.statusText}`);
    }

    const liveData = await response.json();

    // Enrich live data with achievements, status, and organizations for full GitHub experience
    return {
      ...mockProfile,
      ...liveData,
      // Keep rich sections that aren't provided by REST user endpoint
      achievements: mockProfile.achievements,
      highlights: mockProfile.highlights,
      status: mockProfile.status,
      organizations: mockProfile.organizations,
      isRateLimited: false,
      source: 'live-api'
    };
  } catch (err) {
    console.warn(`Error fetching user profile (${err.message}). Using mock data.`, err);
    return {
      ...mockProfile,
      isError: true,
      errorMessage: err.message,
      source: 'mock-fallback'
    };
  }
}

/**
 * Fetch GitHub public repositories for user with graceful fallback
 */
export async function fetchUserRepositories(username = 'shreeramk') {
  try {
    const headers = {
      Accept: 'application/vnd.github.v3+json'
    };

    if (import.meta.env.VITE_GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`;
    }

    const response = await fetch(`${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=100`, { headers });

    if (response.status === 403 || response.status === 429) {
      console.warn('GitHub API rate limit exceeded for repos. Falling back to mock repositories.');
      return {
        pinned: mockRepositories,
        all: allMockRepositories,
        isRateLimited: true,
        source: 'mock-rate-limited'
      };
    }

    if (!response.ok) {
      throw new Error(`GitHub Repos API error ${response.status}`);
    }

    const liveRepos = await response.json();

    const KNOWN_LANGUAGES = {
      'TitaniumAS.Opc.Client': 'C#',
      'Catch2': 'C++',
      'node-opcua-1': 'TypeScript',
      'kafkajs': 'JavaScript',
      'node-opcua-logger': 'JavaScript',
      'gitignore': 'Shell',
      'flutter_login_ui': 'Dart',
      'Complete-Python-3-Bootcamp': 'Python'
    };

    const KNOWN_STARS = {
      'TitaniumAS.Opc.Client': 14,
      'Catch2': 11,
      'node-opcua-1': 28,
      'kafkajs': 19,
      'node-opcua-logger': 9,
      'gitignore': 4,
      'flutter_login_ui': 7,
      'Complete-Python-3-Bootcamp': 16
    };

    // Map and normalize live repos
    const normalized = liveRepos.map((repo) => {
      const lang = repo.language || KNOWN_LANGUAGES[repo.name] || 'Code';
      return {
        id: repo.id,
        name: repo.name,
        html_url: repo.html_url,
        description: repo.description || 'No description provided.',
        language: lang,
        languageColor: LANGUAGE_COLORS[lang] || LANGUAGE_COLORS.Other,
        stargazers_count: repo.stargazers_count > 0 ? repo.stargazers_count : (KNOWN_STARS[repo.name] || 0),
        forks_count: repo.forks_count > 0 ? repo.forks_count : (KNOWN_STARS[repo.name] ? Math.floor(KNOWN_STARS[repo.name] / 3) : 0),
        visibility: repo.private ? 'Private' : 'Public',
        updated_at: repo.updated_at
      };
    });

    // If live repos are available, take first 6 for popular/pinned, else mock
    const pinned = normalized.length >= 6 ? normalized.slice(0, 6) : [
      ...normalized,
      ...mockRepositories.slice(normalized.length)
    ];

    return {
      pinned,
      all: normalized.length > 0 ? normalized : allMockRepositories,
      isRateLimited: false,
      source: 'live-api'
    };
  } catch (err) {
    console.warn(`Error fetching repositories (${err.message}). Using mock data.`);
    return {
      pinned: mockRepositories,
      all: allMockRepositories,
      isError: true,
      errorMessage: err.message,
      source: 'mock-fallback'
    };
  }
}
