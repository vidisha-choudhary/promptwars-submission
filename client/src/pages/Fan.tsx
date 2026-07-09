import React from 'react';

export const Fan: React.FC = () => {
  return (
    <div className="glass-card fade-in">
      <h2
        style={{
          fontFamily: 'var(--font-title)',
          fontSize: '28px',
          marginBottom: 'var(--spacing-sm)',
        }}
      >
        Fan Experience Portal
      </h2>
      <p style={{ color: 'var(--text-secondary)' }}>
        Placeholder page for the fan portal. Future features will include seat mapping, concessions
        ordering, and the AI Companion.
      </p>
    </div>
  );
};
export default Fan;
