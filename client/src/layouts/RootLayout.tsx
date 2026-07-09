import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import useTheme from '../hooks/useTheme';
import SkipToContent from '../components/SkipToContent';

export const RootLayout: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="app-container">
      <SkipToContent />
      <header className="layout-header" role="banner">
        <h1 style={{ fontFamily: 'var(--font-title)', fontSize: '20px', fontWeight: 700 }}>
          ArenaMind <span style={{ color: 'var(--primary-accent)' }}>AI</span>
        </h1>
        <nav className="nav-links" role="navigation" aria-label="Main Navigation">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Home
          </NavLink>
          <NavLink to="/fan" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Fan Portal
          </NavLink>
          <NavLink
            to="/operator"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Operator Portal
          </NavLink>
          <NavLink
            to="/organizer"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Organizer Portal
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Settings
          </NavLink>
        </nav>
        <button
          onClick={toggleTheme}
          aria-label={`Toggle theme (currently ${theme})`}
          className="btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px' }}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </header>
      <main id="main-content" className="layout-main" role="main" tabIndex={-1}>
        <Outlet />
      </main>
    </div>
  );
};
export default RootLayout;
