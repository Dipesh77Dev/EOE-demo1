import { AppProvider } from '@/providers/app';
import { AppRoutes } from '@/routes';

// import storage from '@/utils/storage';
// import * as themes from './theme/schema.json';

function App() {
  // storage.setToLS('all-themes', themes.default);
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;

/*
import { ThemeProvider } from 'styled-components';
import TogglerButton from './components/TogglerButton';
import GlobalStyle from './styles/global';
import ThemeContext from './contexts/ThemeContext';
import { lightTheme, darkTheme } from './styles/themes';
import useThemeMode from './hooks/useThemeMode';

function App() {
  const { theme, themeToggler } = useThemeMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext>
      <ThemeProvider theme={themeMode}>
        <GlobalStyle />
        <header>
          <TogglerButton themeToggler={themeToggler} />
        </header>
        <h1>{theme}</h1>
      </ThemeProvider>
    </ThemeContext>
  );
}

export default App;
*/
