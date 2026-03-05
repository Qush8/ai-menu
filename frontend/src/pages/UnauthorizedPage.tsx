import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

export const UnauthorizedPage = () => {
  const navigate = useNavigate();

  const handleGoToMenu = () => {
    navigate('/menu', { replace: true });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: 4,
            textAlign: 'center',
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="h3" component="h1" fontWeight={700} color="text.primary" gutterBottom>
            403
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            Unauthorized
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            You don&apos;t have access to this area.
          </Typography>
          <Button
            variant="contained"
            startIcon={<RestaurantMenuIcon />}
            onClick={handleGoToMenu}
            aria-label="Go to Menu"
          >
            Go to Menu
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};
