import React from 'react';

export const NotFound: React.FC = () => {
  return (
    <div className="glass-card fade-in">
      <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '28px', color: 'var(--error)' }}>
        404 - Page Not Found
      </h2>
    </div>
  );
};
export default NotFound;
