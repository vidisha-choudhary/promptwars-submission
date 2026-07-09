import React from 'react';

export const Settings: React.FC = () => {
  return (
    <div className="glass-card fade-in">
      <h2
        style={{
          fontFamily: 'var(--font-title)',
          fontSize: '28px',
          marginBottom: 'var(--spacing-sm)',
        }}
      >
        Settings
      </h2>
      <p style={{ color: 'var(--text-secondary)' }}>
        Placeholder page for portal configurations and settings.
      </p>
    </div>
  );
};
export default Settings;
