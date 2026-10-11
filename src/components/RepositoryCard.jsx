import React from 'react';
import { Star, GitFork } from 'lucide-react';
import { LANGUAGE_COLORS } from '../data/mockRepositories';

export default function RepositoryCard({ repo }) {
  const langColor = repo.languageColor || LANGUAGE_COLORS[repo.language] || LANGUAGE_COLORS.Other;

  return (
    <div className="repo-card">
      <div className="repo-card-top">
        <div className="repo-title-row">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="repo-name-link"
            title={repo.name}
          >
            {repo.name}
          </a>
          <span className="repo-badge">{repo.visibility || 'Public'}</span>
        </div>
        <p className="repo-description">
          {repo.description || 'No description provided for this repository.'}
        </p>
      </div>

      <div className="repo-meta-row">
        {repo.language && (
          <span className="repo-lang">
            <span
              className="repo-lang-dot"
              style={{ backgroundColor: langColor }}
              aria-hidden="true"
            />
            {repo.language}
          </span>
        )}

        {repo.stargazers_count > 0 && (
          <a
            href={`${repo.html_url}/stargazers`}
            target="_blank"
            rel="noreferrer"
            className="repo-stat-item"
            title={`${repo.stargazers_count} stars`}
          >
            <Star size={14} />
            <span>{repo.stargazers_count}</span>
          </a>
        )}

        {repo.forks_count > 0 && (
          <a
            href={`${repo.html_url}/network/members`}
            target="_blank"
            rel="noreferrer"
            className="repo-stat-item"
            title={`${repo.forks_count} forks`}
          >
            <GitFork size={14} />
            <span>{repo.forks_count}</span>
          </a>
        )}
      </div>
    </div>
  );
}
