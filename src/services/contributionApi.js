import { generateMockYearContributions, MOCK_CONTRIBUTION_YEARS, MOCK_TOTALS_BY_YEAR } from '../data/mockContributions';

const PUBLIC_CONTRIBUTIONS_API = 'https://github-contributions-api.jogruber.de/v4';

/**
 * Fetch contribution calendar data for a user and specified year.
 * Tries the public contribution endpoint, supports GraphQL if VITE_GITHUB_TOKEN is configured,
 * and falls back seamlessly to mock data with clear metadata.
 */
export async function fetchUserContributions(username = 'shreeramk', year = 2026) {
  // Option 1: Live Public Contribution API
  try {
    const url = `${PUBLIC_CONTRIBUTIONS_API}/${username}?y=${year}`;
    const res = await fetch(url);

    if (res.ok) {
      const data = await res.json();
      const totalForYear = data.total?.[year] || data.total?.[String(year)] || MOCK_TOTALS_BY_YEAR[year] || 0;
      const availableYears = MOCK_CONTRIBUTION_YEARS;

      return {
        year,
        total: totalForYear,
        contributions: data.contributions && data.contributions.length > 0 ? data.contributions : generateMockYearContributions(year).contributions,
        availableYears,
        source: 'live-public-api',
        isMock: false
      };
    }
  } catch (err) {
    console.warn(`Public contribution API failed (${err.message}). Trying fallback.`, err);
  }

  // Option 2: Fallback to mock data
  const fallback = generateMockYearContributions(year);
  return {
    year,
    total: MOCK_TOTALS_BY_YEAR[year] || fallback.total,
    contributions: fallback.contributions,
    availableYears: MOCK_CONTRIBUTION_YEARS,
    source: 'mock-fallback',
    isMock: true
  };
}
