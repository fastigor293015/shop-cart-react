import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useMemo } from 'react';
import { themeSettings } from './theme';
import { useAppSelector } from './app/hooks';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useTransition, animated } from '@react-spring/web';
import ProductsPage from './scenes/productsPage';
import ProductDetailsPage from './scenes/productDetailsPage';
import Header from './components/Header';

function App() {
  const mode = useAppSelector((state) => state.theme.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  const location = useLocation();
  const transitions = useTransition(location, {
    from: {
      opacity: 0,
      transform: location.pathname.includes("/products") || location.pathname === "/" ? "translateX(-100%)" : "translateX(100%)",
      // transitionDuration: ".3s",
    },
    enter: {
      opacity: 1,
      transform:  "translateX(0%)",
      // transitionDuration: ".3s",
    },
    leave: {
      opacity: 0,
      transform: location.pathname.includes("/products") || location.pathname === "/" ? "translateX(100%)" : "translateX(-100%)",
      overflow: "hidden",
      // transitionDuration: ".3s",
    }
  })
  console.log(location)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <Header />
        {transitions((props, item ) => (
          <animated.div style={props}>
            <div style={{ position: "absolute", width: "100%" }}>
              <Routes location={item}>
                <Route path="/" element={<ProductsPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/product/:productId" element={<ProductDetailsPage />} />
              </Routes>
            </div>
          </animated.div>
        ))}
      </div>
    </ThemeProvider>
  )
};

export default App;
