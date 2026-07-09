import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import SkipToContent from '../components/SkipToContent';

export const RootLayout: React.FC = () => {
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
        <ThemeToggle />
      </header>
      <Outlet />
    </div>
  );
};
export default RootLayout;
