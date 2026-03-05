import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export const AdminRegisterPage = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<{
    companyName?: string;
    email?: string;
    password?: string;
    repeatPassword?: string;
    phone?: string;
  }>({});

  const validate = (): boolean => {
    const next: typeof errors = {};
    if (!companyName.trim()) next.companyName = 'Company name is required';
    if (!email.trim()) next.email = 'Email is required';
    if (!password) next.password = 'Password is required';
    if (password !== repeatPassword) next.repeatPassword = 'Passwords do not match';
    if (!phone.trim()) next.phone = 'Phone number is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    navigate('/admin/auth', { replace: true });
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
          component="form"
          onSubmit={handleRegister}
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
            Admin Registration
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Create an admin account
          </Typography>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="კომპანიის სახელი"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              error={Boolean(errors.companyName)}
              helperText={errors.companyName}
              fullWidth
              required
              autoComplete="organization"
            />
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
              autoComplete="new-password"
            />
            <TextField
              label="გაიმეორე პაროლი"
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              error={Boolean(errors.repeatPassword)}
              helperText={errors.repeatPassword}
              fullWidth
              required
              autoComplete="new-password"
            />
            <TextField
              label="ტელეფონის ნომერი"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={Boolean(errors.phone)}
              helperText={errors.phone}
              fullWidth
              required
              autoComplete="tel"
            />
            <Button type="submit" variant="contained" size="large" fullWidth sx={{ py: 1.5, mt: 1 }}>
              Register
            </Button>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
            Already have an account?{' '}
            <Link component={RouterLink} to="/admin/auth" sx={{ fontWeight: 600 }}>
              Log in
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
