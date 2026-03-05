import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export const AdminCategoriesPage = () => (
  <Box sx={{ py: { xs: 3, md: 4 } }}>
    <Container maxWidth="lg">
      <Typography variant="h5" component="h1" gutterBottom fontWeight={700}>
        Categories
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Coming soon. Category management will be available here.
      </Typography>
    </Container>
  </Box>
);
