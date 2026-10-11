import React from 'react';
import { Search, Bell, GitPullRequest, CircleDot, PlayCircle, Plus, ChevronDown } from 'lucide-react';

export default function Header({ profile }) {
  return (
    <header className="github-header" role="banner">
      <div className="header-container">
        {/* Left: Octocat Logo & Username */}
        <div className="header-left">
          <a href="https://github.com" className="header-logo-link" aria-label="GitHub homepage">
            <svg
              className="header-logo-svg"
              height="32"
              aria-hidden="true"
              viewBox="0 0 16 16"
              version="1.1"
              width="32"
            >
              <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
            </svg>
          </a>
          <span className="header-username-badge" title="Active user profile">
            {profile?.login || 'shreeramk'}
          </span>
        </div>

        {/* Center: Search input */}
        <div className="header-center">
          <div className="header-search-box">
            <Search size={16} color="var(--color-fg-muted)" />
            <input
              type="text"
              placeholder="Type / to search"
              className="header-search-input"
              aria-label="Search or jump to..."
            />
            <kbd className="header-search-kbd">/</kbd>
          </div>
        </div>

        {/* Right: Quick actions & profile icon */}
        <div className="header-right">
          <button className="header-icon-btn" title="Create new..." aria-label="Create new">
            <Plus size={16} />
          </button>
          <button className="header-icon-btn" title="Pull requests" aria-label="Pull requests">
            <GitPullRequest size={16} />
          </button>
          <button className="header-icon-btn" title="Issues" aria-label="Issues">
            <CircleDot size={16} />
          </button>
          <button className="header-icon-btn" title="Codespaces" aria-label="Codespaces">
            <PlayCircle size={16} />
          </button>
          <button className="header-icon-btn" title="Notifications" aria-label="Notifications">
            <Bell size={16} />
            <span className="badge-dot" />
          </button>

          <button className="header-profile-menu" title="User menu" aria-label="Open user navigation">
            <img
              src={profile?.avatar_url || 'https://avatars.githubusercontent.com/u/5489153?v=4'}
              alt={profile?.name || 'User profile'}
              className="header-avatar-img"
            />
            <ChevronDown size={12} className="header-caret" />
          </button>
        </div>
      </div>
    </header>
  );
}
