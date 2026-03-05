import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import type { MenuItem } from '../types/menu';

interface MenuCardProps {
  item: MenuItem;
}

export const MenuCard = ({ item }: MenuCardProps) => (
  <Card
    sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 12px 28px rgba(0,0,0,0.12)',
      },
    }}
  >
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
      <CardMedia
        component="img"
        height="200"
        image={item.image}
        alt={item.name}
        loading="lazy"
        sx={{
          transition: 'transform 0.4s ease',
          '&:hover': { transform: 'scale(1.03)' },
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)',
          pointerEvents: 'none',
        }}
      />
    </Box>
    <CardContent sx={{ flexGrow: 1, py: 2.5, px: 2.5 }}>
      <Typography gutterBottom variant="h6" component="h2" fontWeight={600}>
        {item.name}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, lineHeight: 1.5 }}>
        {item.description}
      </Typography>
      <Typography variant="body1" fontWeight={700} color="primary.main">
        {item.price} GEL
      </Typography>
    </CardContent>
  </Card>
);
