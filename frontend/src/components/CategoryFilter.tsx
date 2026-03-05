import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useCategories } from '../context/CategoriesContext';
import type { CategoryFilterValue } from '../types/menu';

interface CategoryFilterProps {
  value: CategoryFilterValue;
  onChange: (value: CategoryFilterValue) => void;
}

export const CategoryFilter = ({ value, onChange }: CategoryFilterProps) => {
  const { categories } = useCategories();
  const tabOrder: CategoryFilterValue[] = ['all', ...categories.map((c) => c.id)];
  const index = tabOrder.indexOf(value);
  const tabValue = index >= 0 ? index : 0;

  const handleChange = (_: React.SyntheticEvent, newIndex: number) => {
    onChange(tabOrder[newIndex] ?? 'all');
  };

  return (
    <Box
      sx={{
        mb: 3,
        '& .MuiTabs-indicator': { height: 3, borderRadius: '3px 3px 0 0' },
        '& .MuiTab-root': { minHeight: 48 },
      }}
    >
      <Tabs
        value={tabValue}
        onChange={handleChange}
        aria-label="Menu category filter"
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          '& .MuiTabs-flexContainer': { gap: 0.5 },
        }}
      >
        <Tab key="all" label="All" id="category-tab-all" />
        {categories.map((cat) => (
          <Tab key={cat.id} label={cat.name} id={`category-tab-${cat.id}`} />
        ))}
      </Tabs>
    </Box>
  );
};
