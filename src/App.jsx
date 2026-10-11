import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Header from './components/Header';
import ProfileTabs from './components/ProfileTabs';
import ProfileSidebar from './components/ProfileSidebar';
import RepositoryGrid from './components/RepositoryGrid';
import ContributionHeatmap from './components/ContributionHeatmap';
import ActivityOverview from './components/ActivityOverview';
import ContributionTimeline from './components/ContributionTimeline';
import Footer from './components/Footer';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';

import { fetchUserProfile, fetchUserRepositories } from './services/githubApi';
import { fetchUserContributions } from './services/contributionApi';
import { Table2, Package, Star, Search, RefreshCw, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';
import './styles.css';

const TARGET_USERNAME = 'shreeramk';

export default function App() {
  const [profile, setProfile] = useState(null);
  const [repositories, setRepositories] = useState({ pinned: [], all: [] });
  const [contributionsData, setContributionsData] = useState([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [selectedYear, setSelectedYear] = useState(2026);
  const [availableYears, setAvailableYears] = useState([2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019]);

  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [isContribLoading, setIsContribLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dataSourceNotice, setDataSourceNotice] = useState(null);

  // Repos tab filters
  const [repoSearch, setRepoSearch] = useState('');
  const [repoLangFilter, setRepoLangFilter] = useState('All');
  const [repoSort, setRepoSort] = useState('updated');

  // Edit profile form state
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: '',
    bio: '',
    company: '',
    location: '',
    blog: ''
  });

  // Load initial profile & repository data
  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [userProfile, userRepos] = await Promise.all([
        fetchUserProfile(TARGET_USERNAME),
        fetchUserRepositories(TARGET_USERNAME)
      ]);

      setProfile(userProfile);
      setRepositories(userRepos);
      setEditFormData({
        name: userProfile.name || '',
        bio: userProfile.bio || '',
        company: userProfile.company || '',
        location: userProfile.location || '',
        blog: userProfile.blog || ''
      });

      if (userProfile.isRateLimited) {
        setDataSourceNotice('GitHub REST API rate limit reached. Displaying comprehensive fallback data.');
      } else {
        setDataSourceNotice('Live profile data connected from GitHub API.');
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to initialize profile');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load contribution data for the selected year
  const loadContributions = useCallback(async (year) => {
    setIsContribLoading(true);
    try {
      const res = await fetchUserContributions(TARGET_USERNAME, year);
      setContributionsData(res.contributions);
      setTotalContributions(res.total);
      if (res.availableYears && res.availableYears.length > 0) {
        setAvailableYears(res.availableYears);
      }
    } catch (err) {
      console.warn('Could not load contributions for year', year, err);
    } finally {
      setIsContribLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    loadContributions(selectedYear);
  }, [selectedYear, loadContributions]);

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfile((prev) => ({
      ...prev,
      ...editFormData
    }));
    setIsEditing(false);
  };

  // Filtered repositories for the Repositories tab
  const filteredRepos = useMemo(() => {
    let list = [...(repositories.all || [])];

    if (repoSearch.trim()) {
      const q = repoSearch.toLowerCase();
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          (r.description && r.description.toLowerCase().includes(q))
      );
    }

    if (repoLangFilter !== 'All') {
      list = list.filter((r) => r.language === repoLangFilter);
    }

    if (repoSort === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (repoSort === 'stars') {
      list.sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0));
    } else {
      list.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    }

    return list;
  }, [repositories.all, repoSearch, repoLangFilter, repoSort]);

  // Unique languages for dropdown filter
  const availableLanguages = useMemo(() => {
    const set = new Set();
    repositories.all?.forEach((r) => {
      if (r.language) set.add(r.language);
    });
    return ['All', ...Array.from(set)];
  }, [repositories.all]);

  return (
    <div className="github-profile-page">
      {/* Top Header */}
      <Header profile={profile} />

      {/* Optional Data Source Alert Banner */}
      {dataSourceNotice && (
        <div className="api-banner" role="status">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={16} />
            <span>{dataSourceNotice}</span>
          </div>
          <span className="api-banner-badge">User: @{TARGET_USERNAME}</span>
        </div>
      )}

      {/* Profile Navigation Tabs */}
      <ProfileTabs
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        repoCount={profile?.public_repos || repositories.all?.length || 8}
      />

      {/* Main Container */}
      {isLoading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} onRetry={loadData} />
      ) : (
        <div className="main-layout">
          {/* Profile Sidebar */}
          <div className="sidebar-col">
            <ProfileSidebar
              profile={profile}
              isEditing={isEditing}
              onToggleEdit={() => setIsEditing(!isEditing)}
            />

            {/* Inline Profile Editing Form when Edit is active */}
            {isEditing && (
              <form onSubmit={handleSaveProfile} style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px', background: 'var(--color-canvas-subtle)', padding: '12px', borderRadius: '6px', border: '1px solid var(--color-border-default)' }}>
                <div style={{ fontWeight: 600, fontSize: '13px' }}>Edit Profile Information</div>
                <label style={{ fontSize: '12px', color: 'var(--color-fg-muted)' }}>
                  Name:
                  <input
                    type="text"
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                    className="repos-search-input"
                    style={{ width: '100%', marginTop: '4px' }}
                  />
                </label>
                <label style={{ fontSize: '12px', color: 'var(--color-fg-muted)' }}>
                  Bio:
                  <textarea
                    rows={3}
                    value={editFormData.bio}
                    onChange={(e) => setEditFormData({ ...editFormData, bio: e.target.value })}
                    className="repos-search-input"
                    style={{ width: '100%', marginTop: '4px', resize: 'vertical' }}
                  />
                </label>
                <label style={{ fontSize: '12px', color: 'var(--color-fg-muted)' }}>
                  Company:
                  <input
                    type="text"
                    value={editFormData.company}
                    onChange={(e) => setEditFormData({ ...editFormData, company: e.target.value })}
                    className="repos-search-input"
                    style={{ width: '100%', marginTop: '4px' }}
                  />
                </label>
                <label style={{ fontSize: '12px', color: 'var(--color-fg-muted)' }}>
                  Location:
                  <input
                    type="text"
                    value={editFormData.location}
                    onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })}
                    className="repos-search-input"
                    style={{ width: '100%', marginTop: '4px' }}
                  />
                </label>
                <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                  <button
                    type="submit"
                    className="btn-edit-profile"
                    style={{ backgroundColor: '#1f883d', color: '#fff', borderColor: '#1a7f37', fontWeight: 600 }}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn-edit-profile"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Main Content Area based on Selected Tab */}
          <main className="main-dashboard" role="region" aria-label="Tab Content">
            {activeTab === 'overview' && (
              <>
                {/* 1. Popular Repositories Grid */}
                <RepositoryGrid
                  repositories={repositories.pinned}
                  isLoading={isLoading}
                />

                {/* 2. Contribution Heatmap */}
                <ContributionHeatmap
                  data={contributionsData}
                  totalContributions={totalContributions}
                  selectedYear={selectedYear}
                  onSelectYear={handleYearChange}
                  availableYears={availableYears}
                  isLoading={isContribLoading}
                />

                {/* 3. Activity Overview */}
                <ActivityOverview />

                {/* 4. Contribution Activity Timeline */}
                <ContributionTimeline />
              </>
            )}

            {activeTab === 'repositories' && (
              <div className="repos-tab-view">
                {/* Repositories filter bar */}
                <div className="repos-tab-header">
                  <input
                    type="text"
                    placeholder="Find a repository..."
                    value={repoSearch}
                    onChange={(e) => setRepoSearch(e.target.value)}
                    className="repos-search-input"
                    aria-label="Find a repository"
                  />

                  <select
                    value={repoLangFilter}
                    onChange={(e) => setRepoLangFilter(e.target.value)}
                    className="repo-filter-select"
                    aria-label="Filter by language"
                  >
                    {availableLanguages.map((l) => (
                      <option key={l} value={l}>
                        Language: {l}
                      </option>
                    ))}
                  </select>

                  <select
                    value={repoSort}
                    onChange={(e) => setRepoSort(e.target.value)}
                    className="repo-filter-select"
                    aria-label="Sort repositories"
                  >
                    <option value="updated">Sort: Last updated</option>
                    <option value="name">Sort: Name</option>
                    <option value="stars">Sort: Stars</option>
                  </select>
                </div>

                {/* Repositories list */}
                {filteredRepos.length === 0 ? (
                  <div className="empty-tab-state">
                    <p className="empty-tab-title">No repositories match your filter.</p>
                  </div>
                ) : (
                  <div className="all-repos-list">
                    {filteredRepos.map((repo) => (
                      <div key={repo.id || repo.name} className="all-repos-item">
                        <div className="repo-title-row">
                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noreferrer"
                            className="repo-name-link"
                            style={{ fontSize: '20px' }}
                          >
                            {repo.name}
                          </a>
                          <span className="repo-badge">{repo.visibility}</span>
                        </div>
                        <p className="repo-description" style={{ minHeight: 'auto' }}>
                          {repo.description}
                        </p>
                        <div className="repo-meta-row">
                          {repo.language && (
                            <span className="repo-lang">
                              <span
                                className="repo-lang-dot"
                                style={{ backgroundColor: repo.languageColor }}
                              />
                              {repo.language}
                            </span>
                          )}
                          <span>
                            Updated on {new Date(repo.updated_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="empty-tab-state">
                <Table2 className="empty-tab-icon" />
                <h3 className="empty-tab-title">No public projects</h3>
                <p className="empty-tab-description">
                  {profile?.name || 'shreeramk'} has not created any public projects or Kanban boards yet.
                </p>
                <a
                  href="https://docs.github.com/en/issues/planning-and-tracking-with-projects"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-edit-profile"
                  style={{ width: 'auto', padding: '8px 16px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <span>Learn about GitHub Projects</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            )}

            {activeTab === 'packages' && (
              <div className="empty-tab-state">
                <Package className="empty-tab-icon" />
                <h3 className="empty-tab-title">Get started with GitHub Packages</h3>
                <p className="empty-tab-description">
                  Safely publish and manage packages alongside your code. Currently no published packages are available under @{profile?.login || 'shreeramk'}.
                </p>
                <a
                  href="https://docs.github.com/en/packages"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-edit-profile"
                  style={{ width: 'auto', padding: '8px 16px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <span>Explore package registries</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            )}

            {activeTab === 'stars' && (
              <div className="empty-tab-state">
                <Star className="empty-tab-icon" />
                <h3 className="empty-tab-title">Starred Repositories</h3>
                <p className="empty-tab-description">
                  Repositories curated and starred by {profile?.name || 'shreeramk'}.
                </p>
                <div className="repo-grid" style={{ width: '100%', marginTop: '16px' }}>
                  {repositories.pinned.slice(0, 4).map((r) => (
                    <div key={r.id} className="repo-card">
                      <div className="repo-title-row">
                        <a href={r.html_url} target="_blank" rel="noreferrer" className="repo-name-link">
                          {r.name}
                        </a>
                        <span className="repo-badge">Starred</span>
                      </div>
                      <p className="repo-description">{r.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      )}

      {/* GitHub Footer */}
      <Footer />
    </div>
  );
}
