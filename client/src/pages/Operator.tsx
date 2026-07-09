import React from 'react';

export const Operator: React.FC = () => {
  return (
    <div className="glass-card fade-in">
      <h2
        style={{
          fontFamily: 'var(--font-title)',
          fontSize: '28px',
          marginBottom: 'var(--spacing-sm)',
        }}
      >
        Stadium Operations Portal
      </h2>
      <p style={{ color: 'var(--text-secondary)' }}>
        Placeholder page for the stadium operations portal. Future features will include crowd
        analytics, staff allocations, and real-time alerts.
      </p>
    </div>
  );
};
export default Operator;
