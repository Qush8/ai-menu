import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import { ProductFormDialog } from '../../components/admin/ProductFormDialog';
import { ProductTable } from '../../components/admin/ProductTable';
import { useMenuItems } from '../../context/MenuItemsContext';
import type { MenuItem } from '../../types/menu';

type TabValue = 0 | 1;

export const AdminProductsPage = () => {
  const { items, addItem, updateItem, deleteItem } = useMenuItems();
  const [tab, setTab] = useState<TabValue>(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const handleAddClick = () => {
    setDialogMode('add');
    setEditingItem(null);
    setDialogOpen(true);
  };

  const handleEdit = (item: MenuItem) => {
    setDialogMode('edit');
    setEditingItem(item);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditingItem(null);
  };

  const handleSubmit = (item: MenuItem) => {
    if (dialogMode === 'add') {
      addItem({
        name: item.name,
        description: item.description,
        price: item.price,
        image: item.image,
        categoryId: item.categoryId,
      });
    } else {
      updateItem(item.id, {
        name: item.name,
        description: item.description,
        price: item.price,
        image: item.image,
        categoryId: item.categoryId,
      });
    }
    handleDialogClose();
  };

  return (
    <>
      <Box sx={{ py: { xs: 3, md: 4 } }}>
        <Container maxWidth="lg">
          <Typography variant="h5" component="h1" gutterBottom fontWeight={700} sx={{ mb: 1 }}>
            Products
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Manage products and add new items to the menu
          </Typography>

          <Tabs value={tab} onChange={(_, v: TabValue) => setTab(v)} sx={{ mb: 3 }}>
            <Tab label="Product List" id="admin-tab-0" />
            <Tab label="Add New Product" id="admin-tab-1" />
          </Tabs>

          {tab === 0 && (
            <Box>
              <Box display="flex" justifyContent="flex-end" sx={{ mb: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleAddClick}
                  aria-label="Add product"
                >
                  Add Product
                </Button>
              </Box>
              <ProductTable items={items} onEdit={handleEdit} onDelete={deleteItem} />
            </Box>
          )}

          {tab === 1 && (
            <Box>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                Use the button below to add a new product to the menu.
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddClick}
                aria-label="Add product"
              >
                Add Product
              </Button>
            </Box>
          )}
        </Container>
      </Box>

      <ProductFormDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        mode={dialogMode}
        initialItem={editingItem}
        onSubmit={handleSubmit}
      />
    </>
  );
};
