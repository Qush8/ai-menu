import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import type { CategoryFilterValue } from '../types/menu';

const CATEGORY_LABELS: Record<CategoryFilterValue, string> = {
  all: 'All',
  pizza: 'Pizza',
  drinks: 'Drinks',
  desserts: 'Desserts',
};

const TAB_ORDER: CategoryFilterValue[] = ['all', 'pizza', 'drinks', 'desserts'];

interface CategoryFilterProps {
  value: CategoryFilterValue;
  onChange: (value: CategoryFilterValue) => void;
}

export const CategoryFilter = ({ value, onChange }: CategoryFilterProps) => {
  const index = TAB_ORDER.indexOf(value);
  const tabValue = index >= 0 ? index : 0;

  const handleChange = (_: React.SyntheticEvent, newIndex: number) => {
    onChange(TAB_ORDER[newIndex] ?? 'all');
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
        {TAB_ORDER.map((cat) => (
          <Tab key={cat} label={CATEGORY_LABELS[cat]} id={`category-tab-${cat}`} />
        ))}
      </Tabs>
    </Box>
  );
};
