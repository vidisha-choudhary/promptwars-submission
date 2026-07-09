import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import Fan from './pages/Fan';
import Operator from './pages/Operator';
import Organizer from './pages/Organizer';
import Settings from './pages/Settings';

// Import modular design system styles
import './styles/variables.css';
import './styles/reset.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/animations.css';

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Home />} />
              <Route path="fan" element={<Fan />} />
              <Route path="operator" element={<Operator />} />
              <Route path="organizer" element={<Organizer />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
