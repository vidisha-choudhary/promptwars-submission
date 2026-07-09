import React from 'react';

export const Home: React.FC = () => {
  return (
    <div className="glass-card fade-in">
      <h2
        style={{
          fontFamily: 'var(--font-title)',
          fontSize: '28px',
          marginBottom: 'var(--spacing-sm)',
        }}
      >
        Welcome to ArenaMind AI
      </h2>
      <p style={{ color: 'var(--text-secondary)' }}>
        This is the foundation home page. Use the navigation links above to toggle between the Fan,
        Operator, and Organizer portals.
      </p>
    </div>
  );
};
export default Home;
