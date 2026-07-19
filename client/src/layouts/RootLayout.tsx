import React from 'react';
import { Outlet } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import SkipToContent from '../components/SkipToContent';

export const RootLayout: React.FC = () => {
  return (
    <div className="app-container">
      <SkipToContent />
      <header className="layout-header" role="banner">
        <div className="header-brand-group">
          <h1 className="header-title">
            ArenaMind <span className="logo-accent">AI</span>
          </h1>
          <span className="header-badge">
            AI Operations Command Center
          </span>
        </div>
        
        <div className="header-controls-group">
          <div className="header-sync-status">
            <span className="header-sync-dot"></span>
            <span className="header-sync-label">Live Operations Sync Active</span>
          </div>
          <ThemeToggle />
        </div>
      </header>
      <Outlet />
    </div>
  );
};
export default RootLayout;
