import React from 'react';

export const Organizer: React.FC = () => {
  return (
    <div className="glass-card fade-in">
      <h2
        style={{
          fontFamily: 'var(--font-title)',
          fontSize: '28px',
          marginBottom: 'var(--spacing-sm)',
        }}
      >
        Organizer Insights Portal
      </h2>
      <p style={{ color: 'var(--text-secondary)' }}>
        Placeholder page for the organizer insights portal. Future features will include event
        marketing generation and predictive analysis dashboards.
      </p>
    </div>
  );
};
export default Organizer;
