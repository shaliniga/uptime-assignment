import React, { useState } from 'react';
import { mockActivityOverview } from '../data/mockActivity';

export default function ActivityOverview({ data = mockActivityOverview }) {
  const [hoveredSlice, setHoveredSlice] = useState(null);

  // SVG Donut calculation
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  let cumulativePercent = 0;

  return (
    <section className="activity-overview-card" aria-labelledby="activity-overview-heading">
      <div className="section-header">
        <h3 id="activity-overview-heading" className="section-title">
          Activity overview
        </h3>
      </div>

      <div className="activity-overview-content">
        {/* Left: Progress bar list & summary */}
        <div className="activity-breakdown-list">
          <p style={{ fontSize: '13px', color: 'var(--color-fg-muted)', marginBottom: '8px' }}>
            {data.summaryText}
          </p>

          {data.stats.map((stat) => (
            <div
              key={stat.label}
              className="activity-stat-row"
              onMouseEnter={() => setHoveredSlice(stat)}
              onMouseLeave={() => setHoveredSlice(null)}
              style={{
                cursor: 'pointer',
                opacity: hoveredSlice && hoveredSlice.label !== stat.label ? 0.6 : 1,
                transition: 'opacity 0.2s ease'
              }}
            >
              <div className="activity-stat-info">
                <span className="activity-stat-label">
                  <span
                    className="activity-stat-dot"
                    style={{ backgroundColor: stat.color }}
                  />
                  {stat.label}
                </span>
                <span style={{ color: 'var(--color-fg-muted)', fontSize: '12px' }}>
                  {stat.percentage}% ({stat.count})
                </span>
              </div>
              <div className="activity-progress-bar-bg">
                <div
                  className="activity-progress-bar-fill"
                  style={{
                    width: `${stat.percentage}%`,
                    backgroundColor: stat.color
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Right: SVG Donut Chart with interactive slices and center text */}
        <div className="activity-chart-container">
          <div style={{ position: 'relative', width: '130px', height: '130px' }}>
            <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ transform: 'rotate(-90deg)' }}>
              {/* Background ring */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="transparent"
                stroke="var(--color-canvas-subtle)"
                strokeWidth="12"
              />

              {/* Data segments */}
              {data.stats.map((stat) => {
                const strokeDasharray = `${(stat.percentage / 100) * circumference} ${circumference}`;
                const strokeDashoffset = -((cumulativePercent / 100) * circumference);
                cumulativePercent += stat.percentage;

                const isHovered = hoveredSlice?.label === stat.label;

                return (
                  <circle
                    key={stat.label}
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="transparent"
                    stroke={stat.color}
                    strokeWidth={isHovered ? 15 : 12}
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    style={{
                      transition: 'stroke-width 0.2s ease, opacity 0.2s ease',
                      cursor: 'pointer',
                      opacity: hoveredSlice && !isHovered ? 0.6 : 1
                    }}
                    onMouseEnter={() => setHoveredSlice(stat)}
                    onMouseLeave={() => setHoveredSlice(null)}
                  />
                );
              })}
            </svg>

            {/* Center label */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
                textAlign: 'center'
              }}
            >
              {hoveredSlice ? (
                <>
                  <span style={{ fontSize: '15px', fontWeight: 700, color: hoveredSlice.color }}>
                    {hoveredSlice.percentage}%
                  </span>
                  <span style={{ fontSize: '10px', color: 'var(--color-fg-muted)', maxWidth: '60px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {hoveredSlice.label}
                  </span>
                </>
              ) : (
                <>
                  <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-fg-default)' }}>
                    100%
                  </span>
                  <span style={{ fontSize: '10px', color: 'var(--color-fg-muted)' }}>
                    Activity
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="activity-chart-title">Contribution Breakdown</div>
        </div>
      </div>
    </section>
  );
}
