import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export const AdminDashboardPage = () => (
  <Box sx={{ py: { xs: 3, md: 4 } }}>
    <Container maxWidth="lg">
      <Typography variant="h5" component="h1" gutterBottom fontWeight={700}>
        Dashboard
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Welcome to the admin dashboard. Use the sidebar to manage products, categories, and orders.
      </Typography>
    </Container>
  </Box>
);
