import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useMemo, useRef, useState } from 'react';
import { themeSettings } from './theme';
import { useAppSelector } from './app/hooks';
import { Routes, Route } from 'react-router-dom';
import MainPage from './scenes/mainPage';
import ProductsPage from './scenes/productsPage';
import ProductDetailsPage from './scenes/productDetailsPage';
import Header from './components/Header';
import { useMotionValueEvent, useScroll } from 'framer-motion';

function App() {
  const mode = useAppSelector((state) => state.theme.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const [scrollValue, setScrollValue] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll({
    container: containerRef,
  });
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrollValue(latest);
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div ref={containerRef} className="app">
        <Header scrollValue={scrollValue} />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:productId" element={<ProductDetailsPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  )
};

export default App;
