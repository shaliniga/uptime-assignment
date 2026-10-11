import React, { useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const WEEKDAYS = [
  { index: 1, label: 'Mon' },
  { index: 3, label: 'Wed' },
  { index: 5, label: 'Fri' }
];

const LEVEL_COLORS = [
  'var(--contrib-level-0)',
  'var(--contrib-level-1)',
  'var(--contrib-level-2)',
  'var(--contrib-level-3)',
  'var(--contrib-level-4)'
];

export default function ContributionHeatmap({
  data = [],
  totalContributions = 0,
  selectedYear = 2026,
  onSelectYear,
  availableYears = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019],
  isLoading = false
}) {
  const [tooltip, setTooltip] = useState(null);

  // Group daily contributions into 7-day columns (Sunday = 0 to Saturday = 6)
  const { weeks, monthLabels } = useMemo(() => {
    if (!data || data.length === 0) {
      return { weeks: [], monthLabels: [] };
    }

    const calculatedWeeks = [];
    let currentWeek = [];
    const labels = [];
    let lastMonth = -1;

    // Fill initial padding for first week if first date does not start on Sunday
    const firstDate = new Date(data[0].date);
    const startDayOfWeek = firstDate.getDay(); // 0 is Sunday

    for (let p = 0; p < startDayOfWeek; p++) {
      currentWeek.push(null);
    }

    data.forEach((item) => {
      const d = new Date(item.date);
      const currentMonth = d.getMonth();

      // Check for month label change
      if (currentMonth !== lastMonth) {
        labels.push({
          month: MONTH_NAMES[currentMonth],
          weekIndex: calculatedWeeks.length
        });
        lastMonth = currentMonth;
      }

      currentWeek.push(item);

      if (currentWeek.length === 7) {
        calculatedWeeks.push(currentWeek);
        currentWeek = [];
      }
    });

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      calculatedWeeks.push(currentWeek);
    }

    return { weeks: calculatedWeeks, monthLabels: labels };
  }, [data]);

  const handleMouseEnter = (item, e) => {
    if (!item) return;
    const rect = e.target.getBoundingClientRect();
    const dateObj = new Date(item.date);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    const countText =
      item.count === 0
        ? 'No contributions'
        : `${item.count} contribution${item.count > 1 ? 's' : ''}`;

    setTooltip({
      text: `${countText} on ${formattedDate}`,
      x: rect.left + rect.width / 2,
      y: rect.top - 8
    });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  return (
    <section className="contribution-section" aria-labelledby="contribution-heading">
      {/* Header bar */}
      <div className="contribution-header-bar">
        <h2 id="contribution-heading" className="contribution-count-heading">
          {isLoading
            ? 'Loading contributions...'
            : `${totalContributions.toLocaleString()} contributions in ${selectedYear}`}
        </h2>

        <button className="contribution-settings-btn" type="button">
          <span>Contribution settings</span>
          <ChevronDown size={14} />
        </button>
      </div>

      <div className="heatmap-layout-wrapper">
        {/* Heatmap Matrix with horizontal scroll */}
        <div className="heatmap-scroll-container">
          <div className="heatmap-table-container">
            {/* Months row */}
            <div className="heatmap-months-row">
              {monthLabels.map((lbl, idx) => (
                <span
                  key={`${lbl.month}-${idx}`}
                  className="heatmap-month-label"
                  style={{ left: `${lbl.weekIndex * 14}px` }}
                >
                  {lbl.month}
                </span>
              ))}
            </div>

            {/* Matrix grid */}
            <div className="heatmap-grid-body">
              {/* Weekday indicators column */}
              <div className="heatmap-weekdays-column">
                <div className="heatmap-weekday-slot" />
                <div className="heatmap-weekday-slot">Mon</div>
                <div className="heatmap-weekday-slot" />
                <div className="heatmap-weekday-slot">Wed</div>
                <div className="heatmap-weekday-slot" />
                <div className="heatmap-weekday-slot">Fri</div>
                <div className="heatmap-weekday-slot" />
              </div>

              {/* Weeks columns */}
              <div className="heatmap-weeks-container">
                {weeks.map((week, wIdx) => (
                  <div key={wIdx} className="heatmap-week-col">
                    {week.map((day, dIdx) => {
                      if (!day) {
                        return (
                          <div
                            key={dIdx}
                            className="heatmap-cell"
                            style={{ opacity: 0, pointerEvents: 'none' }}
                          />
                        );
                      }

                      const level = day.level ?? 0;
                      const cellColor = LEVEL_COLORS[level] || LEVEL_COLORS[0];

                      return (
                        <div
                          key={day.date || dIdx}
                          className="heatmap-cell"
                          style={{ backgroundColor: cellColor }}
                          onMouseEnter={(e) => handleMouseEnter(day, e)}
                          onMouseLeave={handleMouseLeave}
                          aria-label={`${day.count} contributions on ${day.date}`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Legend and Info */}
            <div className="heatmap-footer-row">
              <a
                href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile"
                target="_blank"
                rel="noreferrer"
                className="section-sublink"
              >
                Learn how we count contributions
              </a>

              <div className="heatmap-legend">
                <span>Less</span>
                {LEVEL_COLORS.map((color, i) => (
                  <div
                    key={i}
                    className="heatmap-legend-cell"
                    style={{ backgroundColor: color }}
                  />
                ))}
                <span>More</span>
              </div>
            </div>
          </div>
        </div>

        {/* Year Selector on the right */}
        <aside className="year-selector-list" aria-label="Contribution year selection">
          {availableYears.map((year) => (
            <button
              key={year}
              className={`year-btn ${selectedYear === year ? 'active' : ''}`}
              onClick={() => onSelectYear(year)}
              type="button"
            >
              {year}
            </button>
          ))}
        </aside>
      </div>

      {/* Floating Tooltip */}
      {tooltip && (
        <div
          className="custom-tooltip"
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform: 'translate(-50%, -100%)'
          }}
        >
          {tooltip.text}
        </div>
      )}
    </section>
  );
}
