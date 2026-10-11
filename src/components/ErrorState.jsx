import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="empty-tab-state" style={{ margin: '48px auto', maxWidth: '600px' }}>
      <AlertCircle size={44} color="#cf222e" />
      <h2 className="empty-tab-title">Unable to load profile data</h2>
      <p className="empty-tab-description">
        {message || 'Something went wrong while communicating with the GitHub API. This may be due to rate limiting or connection issues.'}
      </p>
      {onRetry && (
        <button
          className="btn-edit-profile"
          style={{ width: 'auto', padding: '8px 20px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          onClick={onRetry}
          type="button"
        >
          <RefreshCw size={14} />
          <span>Try again</span>
        </button>
      )}
    </div>
  );
}
