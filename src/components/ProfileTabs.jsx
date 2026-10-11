import React from 'react';
import { BookOpen, BookMarked, Table2, Package, Star } from 'lucide-react';

export default function ProfileTabs({ activeTab, onSelectTab, repoCount = 8 }) {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen, count: null },
    { id: 'repositories', label: 'Repositories', icon: BookMarked, count: repoCount },
    { id: 'projects', label: 'Projects', icon: Table2, count: 0 },
    { id: 'packages', label: 'Packages', icon: Package, count: 0 },
    { id: 'stars', label: 'Stars', icon: Star, count: 5 }
  ];

  return (
    <nav className="profile-tabs-nav" aria-label="Profile navigation">
      <div className="tabs-container">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              className={`tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => onSelectTab(tab.id)}
              type="button"
              role="tab"
              aria-selected={isActive}
            >
              <Icon size={16} color={isActive ? 'var(--color-fg-default)' : 'var(--color-fg-muted)'} />
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className="tab-count">{tab.count}</span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
