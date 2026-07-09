import React from 'react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="loading-container" role="status" aria-live="polite">
      <div className="spinner"></div>
      <p
        style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-title)', fontWeight: 500 }}
      >
        Loading ArenaMind AI...
      </p>
    </div>
  );
};
export default LoadingScreen;
