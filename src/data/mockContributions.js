// Generate realistic calendar year contribution data
export const generateMockYearContributions = (year = 2026) => {
  const contributions = [];
  const startDate = new Date(year, 0, 1);
  const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const daysInYear = isLeap ? 366 : 365;

  let total = 0;
  // Seed-based pseudo-random generator for consistent display
  let seed = year * 1000 + 42;
  const random = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  for (let i = 0; i < daysInYear; i++) {
    const d = new Date(year, 0, 1 + i);
    const dayOfWeek = d.getDay(); // 0 is Sunday, 6 is Saturday
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    const r = random();
    let count = 0;
    let level = 0;

    if (isWeekend) {
      if (r > 0.65) {
        count = Math.floor(r * 5);
      }
    } else {
      // Weekdays
      if (r > 0.15) {
        if (r > 0.88) {
          count = 10 + Math.floor(r * 12); // High burst
        } else if (r > 0.60) {
          count = 5 + Math.floor(r * 5); // Moderate
        } else {
          count = 1 + Math.floor(r * 4); // Low
        }
      }
    }

    if (count > 0) {
      if (count >= 10) level = 4;
      else if (count >= 6) level = 3;
      else if (count >= 3) level = 2;
      else level = 1;
    }

    total += count;

    const yearStr = d.getFullYear();
    const monthStr = String(d.getMonth() + 1).padStart(2, "0");
    const dateStr = String(d.getDate()).padStart(2, "0");

    contributions.push({
      date: `${yearStr}-${monthStr}-${dateStr}`,
      count,
      level
    });
  }

  return {
    year,
    total,
    contributions
  };
};

export const MOCK_CONTRIBUTION_YEARS = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019];

export const MOCK_TOTALS_BY_YEAR = {
  2026: 1617,
  2025: 1998,
  2024: 1766,
  2023: 4014,
  2022: 1859,
  2021: 3360,
  2020: 2615,
  2019: 1186
};
