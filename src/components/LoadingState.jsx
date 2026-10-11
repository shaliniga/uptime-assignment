import React from 'react';

export default function LoadingState() {
  return (
    <div className="main-layout" aria-busy="true" aria-label="Loading profile content">
      {/* Sidebar Skeleton */}
      <aside className="profile-sidebar">
        <div
          className="skeleton"
          style={{ width: '100%', aspectRatio: '1/1', borderRadius: '50%' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div className="skeleton" style={{ height: '28px', width: '70%' }} />
          <div className="skeleton" style={{ height: '20px', width: '45%' }} />
        </div>
        <div className="skeleton" style={{ height: '60px', width: '100%' }} />
        <div className="skeleton" style={{ height: '32px', width: '100%' }} />
      </aside>

      {/* Main Dashboard Skeleton */}
      <div className="main-dashboard">
        <div className="skeleton" style={{ height: '24px', width: '160px', marginBottom: '12px' }} />
        <div className="repo-grid">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="repo-card skeleton" style={{ height: '110px' }} />
          ))}
        </div>
        <div className="skeleton" style={{ height: '180px', width: '100%', marginTop: '24px' }} />
      </div>
    </div>
  );
}
