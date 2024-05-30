import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import { DataProvider } from './contexts/PurchaseDataContext';
import { AuthProvider } from './contexts/AuthContext';
import './global.css';
import ThemeProvider from './theme/ThemeProvider';
import { SettingsProvider } from './components/settings/context/settings-provider';
import SettingsDrawer from './components/settings/drawer/settings-drawer';
import { MotionLazy } from './components/animate/motion-lazy';

import ProgressBar from './components/progress-bar/progress-bar';

const App = () => (
  <AuthProvider>
    <DataProvider>
      <SettingsProvider
        defaultSettings={{
          themeMode: 'light', // 'light' | 'dark'
          themeDirection: 'ltr', //  'rtl' | 'ltr'
          themeContrast: 'default', // 'default' | 'bold'
          themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
          themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
          themeStretch: false,
        }}
      >
        <ThemeProvider>
          <MotionLazy>
            <Router>
              <SettingsDrawer />
              <ProgressBar />
              <AppRoutes />
            </Router>
          </MotionLazy>
        </ThemeProvider>
      </SettingsProvider>
    </DataProvider>
  </AuthProvider>
);

export default App;
