import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { MenuPage } from './pages/MenuPage';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#0d7377' },
    secondary: { main: '#c56c39' },
    background: {
      default: '#f8f7f4',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#5c5c5c',
    },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 700, letterSpacing: '-0.02em' },
    h5: { fontWeight: 600, letterSpacing: '-0.01em' },
    h6: { fontWeight: 600 },
    button: { fontWeight: 600, textTransform: 'none' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 10, paddingLeft: 20, paddingRight: 20 },
        contained: { boxShadow: 'none', '&:hover': { boxShadow: '0 4px 14px rgba(0,0,0,0.12)' } },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          overflow: 'hidden',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 0 rgba(0,0,0,0.06)',
          backgroundColor: '#fff',
          color: '#1a1a1a',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: { fontWeight: 600, textTransform: 'none', fontSize: '0.95rem' },
      },
    },
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MenuPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
