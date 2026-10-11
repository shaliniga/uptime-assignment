import React from 'react';
import RepositoryCard from './RepositoryCard';

export default function RepositoryGrid({ repositories = [], isLoading = false }) {
  const displayRepos = repositories.slice(0, 6);

  return (
    <section className="popular-repos-section" aria-labelledby="popular-repos-heading">
      <div className="section-header">
        <h2 id="popular-repos-heading" className="section-title">
          Popular repositories
        </h2>
        <a href="#customize" className="section-sublink">
          Customize your pins
        </a>
      </div>

      {isLoading ? (
        <div className="repo-grid">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="repo-card skeleton" style={{ height: '120px' }} />
          ))}
        </div>
      ) : (
        <div className="repo-grid">
          {displayRepos.map((repo) => (
            <RepositoryCard key={repo.id || repo.name} repo={repo} />
          ))}
        </div>
      )}
    </section>
  );
}
