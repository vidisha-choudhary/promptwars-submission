import React from 'react';
import { Outlet } from 'react-router-dom';

export const PageLayout: React.FC = () => {
  return (
    <main id="main-content" className="layout-main" role="main" tabIndex={-1}>
      <Outlet />
    </main>
  );
};
export default PageLayout;
