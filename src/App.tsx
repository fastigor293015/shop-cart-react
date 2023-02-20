import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useMemo } from 'react';
import { themeSettings } from './theme';
import { useAppSelector } from './app/hooks';
import { Routes, Route } from 'react-router-dom';
import ProductsPage from './scenes/productsPage';
import ProductDetailsPage from './scenes/productDetailsPage';
import Header from './components/Header';

function App() {
  const mode = useAppSelector((state) => state.theme.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:productId" element={<ProductDetailsPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  )
};

export default App;
