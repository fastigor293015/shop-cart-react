import ProductsList from './components/ProductsList';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useMemo } from 'react';
import { themeSettings } from './theme';
import Header from './components/Header';
import { useAppSelector } from './app/hooks';

function App() {
  const mode = useAppSelector((state) => state.theme.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <Header />
        <ProductsList />
      </div>
    </ThemeProvider>
  )
};

export default App;
