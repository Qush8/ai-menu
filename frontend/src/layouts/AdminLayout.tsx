import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import CategoryIcon from '@mui/icons-material/Category';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const DRAWER_WIDTH = 240;

const NAV_ITEMS = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
  { path: '/admin/products', label: 'Products', icon: <InventoryIcon /> },
  { path: '/admin/categories', label: 'Categories', icon: <CategoryIcon /> },
  { path: '/admin/orders', label: 'Orders', icon: <ShoppingCartIcon /> },
] as const;

export const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            mt: 0,
            borderRight: '1px solid',
            borderColor: 'divider',
          },
        }}
      >
        <Box sx={{ py: 2, px: 2 }}>
          <Typography variant="h6" fontWeight={700}>
            Admin
          </Typography>
        </Box>
        <List component="nav" sx={{ px: 1 }}>
          {NAV_ITEMS.map(({ path, label, icon }) => {
            const selected = location.pathname === path;
            return (
              <ListItemButton
                key={path}
                selected={selected}
                onClick={() => navigate(path)}
                sx={{ borderRadius: 1 }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>{icon}</ListItemIcon>
                <ListItemText primary={label} />
              </ListItemButton>
            );
          })}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          minHeight: '100vh',
          ml: 0,
          width: `calc(100% - ${DRAWER_WIDTH}px)`,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
