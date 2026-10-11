import React, { useState } from 'react';
import { Users, Building2, MapPin, Mail, Link2, AtSign, Award, ShieldCheck, Smile } from 'lucide-react';

export default function ProfileSidebar({ profile, isEditing, onToggleEdit }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [customStatus, setCustomStatus] = useState(profile?.status?.message || "Focusing on AI-driven plant diagnostics");
  const [showStatusModal, setShowStatusModal] = useState(false);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    if (profile?.email) {
      navigator.clipboard.writeText(profile.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  return (
    <aside className="profile-sidebar" aria-label="User Profile Details">
      {/* Avatar Container with status badge */}
      <div className="avatar-wrapper">
        <img
          src={profile?.avatar_url || 'https://avatars.githubusercontent.com/u/5489153?v=4'}
          alt={profile?.name || 'GitHub avatar'}
          className="profile-avatar-large"
        />
        <button
          className="avatar-status-badge"
          title={`Status: ${customStatus}`}
          onClick={() => setShowStatusModal(!showStatusModal)}
          aria-label="Set or view status"
        >
          <span>{profile?.status?.emoji || '🎯'}</span>
        </button>
      </div>

      {/* Names */}
      <div className="names-section">
        <h1 className="profile-full-name">{profile?.name || 'Shreeram Kushwaha'}</h1>
        <div className="profile-login-name">{profile?.login || 'shreeramk'}</div>
        {profile?.pronouns && (
          <span className="profile-pronouns">{profile.pronouns}</span>
        )}
      </div>

      {/* Bio */}
      {profile?.bio && (
        <div className="profile-bio">
          {profile.bio}
        </div>
      )}

      {/* Edit Profile Button */}
      <button
        className="btn-edit-profile"
        type="button"
        onClick={onToggleEdit}
      >
        {isEditing ? 'Cancel editing' : 'Edit profile'}
      </button>

      {/* Followers & Following */}
      <div className="follow-stats">
        <Users size={16} color="var(--color-fg-muted)" />
        <a href={`https://github.com/${profile?.login}?tab=followers`} className="follow-link">
          <strong>{profile?.followers ?? 13}</strong> followers
        </a>
        <span>·</span>
        <a href={`https://github.com/${profile?.login}?tab=following`} className="follow-link">
          <strong>{profile?.following ?? 3}</strong> following
        </a>
      </div>

      {/* Meta items list */}
      <ul className="meta-details-list">
        {profile?.company && (
          <li className="meta-item">
            <Building2 size={16} />
            <span>{profile.company}</span>
          </li>
        )}

        {profile?.location && (
          <li className="meta-item">
            <MapPin size={16} />
            <span>{profile.location}</span>
          </li>
        )}

        {profile?.email && (
          <li className="meta-item">
            <Mail size={16} />
            <a href={`mailto:${profile.email}`} onClick={handleCopyEmail} title="Click to copy email">
              {profile.email} {copiedEmail && '(Copied!)'}
            </a>
          </li>
        )}

        {profile?.blog && (
          <li className="meta-item">
            <Link2 size={16} />
            <a href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`} target="_blank" rel="noreferrer">
              {profile.blog.replace(/^https?:\/\//, '')}
            </a>
          </li>
        )}

        {profile?.twitter_username && (
          <li className="meta-item">
            <AtSign size={16} />
            <a href={`https://twitter.com/${profile.twitter_username}`} target="_blank" rel="noreferrer">
              @{profile.twitter_username}
            </a>
          </li>
        )}
      </ul>

      <hr className="sidebar-divider" />

      {/* Achievements Section */}
      <div className="achievements-section">
        <div className="sidebar-section-title">
          <span>Achievements</span>
          <span className="badge-beta">Beta</span>
        </div>
        <div className="achievements-grid">
          {profile?.achievements?.map((ach) => (
            <div
              key={ach.id}
              className="achievement-badge-card"
              title={`${ach.title}: ${ach.description}`}
            >
              <div className="achievement-icon-wrapper" style={{ borderColor: ach.badgeColor }}>
                <Award size={26} color={ach.badgeColor} />
                {ach.tier && <span className="achievement-tier">{ach.tier}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="sidebar-divider" />

      {/* Organizations Section */}
      <div className="organizations-section">
        <div className="sidebar-section-title">
          <span>Organizations</span>
        </div>
        <div className="organizations-list">
          {profile?.organizations?.map((org) => (
            <a
              key={org.login}
              href={org.url}
              target="_blank"
              rel="noreferrer"
              className="org-avatar-link"
              title={org.name || org.login}
            >
              <img
                src={org.avatar_url}
                alt={org.name || org.login}
                className="org-avatar-img"
              />
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
