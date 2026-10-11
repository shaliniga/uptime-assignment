import React, { useState } from 'react';
import { GitCommit, GitPullRequest, GitFork, PlusCircle } from 'lucide-react';
import { initialTimelineData, additionalTimelineData } from '../data/mockActivity';

export default function ContributionTimeline() {
  const [timeline, setTimeline] = useState(initialTimelineData);
  const [hasExpanded, setHasExpanded] = useState(false);

  const handleViewMore = () => {
    if (!hasExpanded) {
      setTimeline((prev) => [...prev, ...additionalTimelineData]);
      setHasExpanded(true);
    }
  };

  const renderIcon = (type) => {
    switch (type) {
      case 'commit':
        return <GitCommit size={14} color="#0969da" />;
      case 'pull_request':
        return <GitPullRequest size={14} color="#8957e5" />;
      case 'repo_create':
        return <PlusCircle size={14} color="#1f883d" />;
      default:
        return <GitFork size={14} color="var(--color-fg-muted)" />;
    }
  };

  return (
    <section className="timeline-section" aria-labelledby="timeline-heading">
      <div className="section-header">
        <h3 id="timeline-heading" className="section-title">
          Contribution activity
        </h3>
      </div>

      {timeline.map((block) => (
        <div key={block.period} className="timeline-month-block">
          <div className="timeline-month-header">
            <span>{block.period}</span>
          </div>

          <div className="timeline-items-list">
            {block.activities.map((act) => (
              <div key={act.id} className="timeline-item">
                <div className="timeline-item-icon-bubble">
                  {renderIcon(act.type)}
                </div>

                <div className="timeline-item-title">
                  {act.title}
                </div>

                {act.description && (
                  <p style={{ fontSize: '13px', color: 'var(--color-fg-muted)' }}>
                    {act.description}
                  </p>
                )}

                {act.repositories && (
                  <ul className="timeline-repo-sublist">
                    {act.repositories.map((repo) => (
                      <li key={repo.name} className="timeline-repo-subitem">
                        <a href={repo.url} target="_blank" rel="noreferrer">
                          {repo.name}
                        </a>
                        <span className="timeline-count-badge">
                          {repo.commits ? `${repo.commits} commit${repo.commits > 1 ? 's' : ''}` : ''}
                          {repo.prs ? `${repo.prs} pull request${repo.prs > 1 ? 's' : ''}` : ''}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <button
        className="btn-view-more-activity"
        type="button"
        onClick={handleViewMore}
        disabled={hasExpanded}
      >
        {hasExpanded ? 'All recent activity loaded' : 'Show more activity'}
      </button>
    </section>
  );
}
