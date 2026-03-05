import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { CategoryFilter } from '../components/CategoryFilter';
import { MenuCard } from '../components/MenuCard';
import { Navbar } from '../components/Navbar';
import { MOCK_MENU_ITEMS } from '../data/mockData';
import type { CategoryFilterValue } from '../types/menu';

export const MenuPage = () => {
  const [category, setCategory] = useState<CategoryFilterValue>('all');

  const filteredItems = useMemo(() => {
    if (category === 'all') return MOCK_MENU_ITEMS;
    return MOCK_MENU_ITEMS.filter((item) => item.category === category);
  }, [category]);

  return (
    <>
      <Navbar />
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
    </>
  );
};
