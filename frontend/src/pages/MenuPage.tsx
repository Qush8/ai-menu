import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { CategoryFilter } from '../components/CategoryFilter';
import { MenuCard } from '../components/MenuCard';
import { useMenuItems } from '../context/MenuItemsContext';
import type { CategoryFilterValue } from '../types/menu';

export const MenuPage = () => {
  const [category, setCategory] = useState<CategoryFilterValue>('all');
  const { items } = useMenuItems();

  const filteredItems = useMemo(() => {
    if (category === 'all') return items;
    return items.filter((item) => item.categoryId === category);
  }, [category, items]);

  return (
    <Box
        component="main"
        sx={{
          minHeight: 'calc(100vh - 64px)',
          bgcolor: 'background.default',
          py: { xs: 3, md: 4 },
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h5" component="h1" gutterBottom fontWeight={700} sx={{ mb: 1 }}>
            Our Menu
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Choose a category or browse all items
          </Typography>
          <CategoryFilter value={category} onChange={setCategory} />
          <Grid container spacing={3}>
            {filteredItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <MenuCard item={item} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
  );
};
