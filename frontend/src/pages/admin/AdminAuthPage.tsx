import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useAuth } from '../../context/AuthContext';

export const AdminAuthPage = () => {
  const navigate = useNavigate();
  const { loginWithEmailPassword, loading, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  useEffect(() => {
    if (user) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    const next: { email?: string; password?: string } = {};
    if (!email.trim()) next.email = 'Email is required';
    if (!password) next.password = 'Password is required';
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    await loginWithEmailPassword(email.trim(), password);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleLogin();
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(160deg, #2c3e50 0%, #34495e 40%, #1a252f 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.06) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            textAlign: 'center',
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
            bgcolor: 'rgba(255,255,255,0.97)',
            boxShadow: '0 24px 48px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.5)',
            backdropFilter: 'blur(12px)',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 2,
              bgcolor: 'grey.800',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 2,
            }}
            aria-hidden
          >
            <AdminPanelSettingsIcon sx={{ fontSize: 32 }} />
          </Box>
          <Typography variant="h4" component="h1" gutterBottom fontWeight={700} color="text.primary">
            Admin Portal
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Sign in to manage the restaurant
          </Typography>
          <Box display="flex" flexDirection="column" gap={2} component="form" onKeyDown={handleKeyDown}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={Boolean(errors.email)}
              helperText={errors.email}
              fullWidth
              required
              autoComplete="email"
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={Boolean(errors.password)}
              helperText={errors.password}
              fullWidth
              required
              autoComplete="current-password"
            />
            <Button
              variant="contained"
              size="large"
              onClick={handleLogin}
              disabled={loading}
              aria-label="Login"
              fullWidth
              sx={{ py: 1.5, mt: 1 }}
            >
              Login
            </Button>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
            Don&apos;t have an account?{' '}
            <Link component={RouterLink} to="/admin/register" sx={{ fontWeight: 600 }}>
              Registration
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
