import React from 'react';
import { ThemeProvider } from 'styled-components';

import { darkTheme, lightTheme } from '@/theme/themes';
import useThemeMode from '@/theme/useThemeMode';

const ThemeContext: React.FC = ({ children }) => {
  const { theme } = useThemeMode();

  const themeMode = theme === 'dark' ? darkTheme : lightTheme;

  return <ThemeProvider theme={themeMode}>{children}</ThemeProvider>;
};

export default ThemeContext;
