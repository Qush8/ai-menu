import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useAuth } from '../context/AuthContext';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading, user } = useAuth();

  useEffect(() => {
    if (user) navigate('/', { replace: true });
  }, [user, navigate]);

  const handleGoogleSignIn = () => {
    login('google');
    navigate('/', { replace: true });
  };

  const handleAppleSignIn = () => {
    login('apple');
    navigate('/', { replace: true });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(160deg, #0d7377 0%, #14a3a8 40%, #0a4d50 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.08) 0%, transparent 50%)',
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
            boxShadow: '0 24px 48px rgba(0,0,0,0.12), 0 0 0 1px rgba(255,255,255,0.5)',
            backdropFilter: 'blur(12px)',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 2,
              bgcolor: 'primary.main',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 2,
            }}
            aria-hidden
          >
            <RestaurantIcon sx={{ fontSize: 32 }} />
          </Box>
          <Typography variant="h4" component="h1" gutterBottom fontWeight={700} color="text.primary">
            AI Menu
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Sign in to explore our menu
          </Typography>
          <Divider sx={{ mb: 3 }}>or</Divider>
          <Box display="flex" flexDirection="column" gap={2}>
            <Button
              variant="contained"
              size="large"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleSignIn}
              disabled={loading}
              aria-label="Sign in with Google"
              fullWidth
              sx={{
                py: 1.5,
                bgcolor: '#fff',
                color: '#1a1a1a',
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': {
                  bgcolor: 'grey.50',
                  borderColor: 'grey.300',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
                },
              }}
            >
              Sign in with Google
            </Button>
            <Button
              variant="contained"
              size="large"
              startIcon={<AppleIcon />}
              onClick={handleAppleSignIn}
              disabled={loading}
              aria-label="Sign in with Apple"
              fullWidth
              sx={{
                py: 1.5,
                bgcolor: '#000',
                '&:hover': { bgcolor: '#1a1a1a', boxShadow: '0 4px 14px rgba(0,0,0,0.25)' },
              }}
            >
              Sign in with Apple
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
