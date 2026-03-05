import { useNavigate, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const isAdminPath = location.pathname.startsWith('/admin');
  const isAdmin = user?.role === 'admin';

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <AppBar position="sticky">
      <Toolbar disableGutters sx={{ px: { xs: 2, md: 3 }, py: 0.5 }}>
        <Box display="flex" alignItems="center" gap={1} sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 1.5,
              bgcolor: 'primary.main',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-hidden
          >
            <RestaurantIcon sx={{ fontSize: 20 }} />
          </Box>
          <Typography variant="h6" component="span" fontWeight={700} letterSpacing="-0.02em">
            AI Menu
          </Typography>
          <Button
            color="inherit"
            onClick={() => navigate('/')}
            sx={{ color: isAdminPath ? 'text.secondary' : 'text.primary', fontWeight: isAdminPath ? 500 : 600 }}
          >
            Menu
          </Button>
          {isAdmin && (
            <Button
              color="inherit"
              onClick={() => navigate('/admin/products')}
              sx={{ color: 'text.secondary', fontWeight: 500 }}
            >
              Admin
            </Button>
          )}
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          {user?.photoURL ? (
            <Avatar
              src={user.photoURL}
              alt={user.displayName}
              sx={{ width: 36, height: 36 }}
              aria-hidden
            />
          ) : (
            <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main' }} aria-hidden>
              <AccountCircleIcon />
            </Avatar>
          )}
          <Button
            variant="outlined"
            size="medium"
            startIcon={<LogoutIcon sx={{ fontSize: 18 }} />}
            onClick={handleLogout}
            aria-label="Logout"
            sx={{
              borderColor: 'divider',
              color: 'text.primary',
              '&:hover': { borderColor: 'primary.main', color: 'primary.main', bgcolor: 'action.hover' },
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
