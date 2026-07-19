import React from 'react';
import { Outlet } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import SkipToContent from '../components/SkipToContent';

export const RootLayout: React.FC = () => {
  return (
    <div className="app-container">
      <SkipToContent />
      <header className="layout-header" role="banner">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', flexWrap: 'wrap' }}>
          <h1 style={{ fontFamily: 'var(--font-title)', fontSize: '20px', fontWeight: 700, margin: 0 }}>
            ArenaMind <span style={{ color: 'var(--primary-accent)' }}>AI</span>
          </h1>
          <span 
            style={{ 
              backgroundColor: 'rgba(99, 102, 241, 0.15)', 
              color: 'var(--primary-accent)', 
              fontSize: '11px', 
              fontWeight: 600, 
              padding: '4px 10px', 
              borderRadius: '4px', 
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            AI Operations Command Center
          </span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)', fontSize: '12px', color: 'var(--text-secondary)' }}>
            <span 
              className="sync-dot" 
              style={{ 
                width: '8px', 
                height: '8px', 
                backgroundColor: 'var(--success)', 
                borderRadius: '50%', 
                boxShadow: '0 0 6px var(--success)', 
                display: 'inline-block',
                animation: 'pulse-glow 2s infinite ease-in-out'
              }}
            ></span>
            <span style={{ fontWeight: 500 }}>Live Operations Sync Active</span>
          </div>
          <ThemeToggle />
        </div>
      </header>
      <Outlet />
    </div>
  );
};
export default RootLayout;
