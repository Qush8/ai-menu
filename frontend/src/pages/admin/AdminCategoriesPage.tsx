import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { CategoryFormDialog } from '../../components/admin/CategoryFormDialog';
import { useCategories } from '../../context/CategoriesContext';
import { useMenuItems } from '../../context/MenuItemsContext';

export const AdminCategoriesPage = () => {
  const { categories, addCategory, updateCategory, deleteCategory } = useCategories();
  const { items } = useMenuItems();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');
  const [editingCategory, setEditingCategory] = useState<{ id: string; name: string } | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleAddClick = () => {
    setDialogMode('add');
    setEditingCategory(null);
    setDialogOpen(true);
  };

  const handleEdit = (cat: { id: string; name: string }) => {
    setDialogMode('edit');
    setEditingCategory(cat);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditingCategory(null);
  };

  const handleSubmitAdd = (name: string) => {
    addCategory(name);
    handleDialogClose();
  };

  const handleSubmitEdit = (id: string, name: string) => {
    updateCategory(id, name);
    handleDialogClose();
  };

  const handleDeleteClick = (id: string) => setDeleteId(id);
  const handleDeleteClose = () => setDeleteId(null);

  const productCountForCategory = (categoryId: string) =>
    items.filter((it) => it.categoryId === categoryId).length;

  const handleDeleteConfirm = () => {
    if (!deleteId) return;
    const count = productCountForCategory(deleteId);
    if (count > 0) {
      handleDeleteClose();
      return;
    }
    deleteCategory(deleteId);
    setDeleteId(null);
  };

  const deleteBlocked = deleteId !== null && productCountForCategory(deleteId) > 0;
  const deleteCount = deleteId !== null ? productCountForCategory(deleteId) : 0;

  return (
    <>
      <Box sx={{ py: { xs: 3, md: 4 } }}>
        <Container maxWidth="lg">
          <Typography variant="h5" component="h1" gutterBottom fontWeight={700} sx={{ mb: 1 }}>
            Categories
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Manage menu categories. Products reference these by id; you cannot delete a category that is in use.
          </Typography>

          <Box display="flex" justifyContent="flex-end" sx={{ mb: 2 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddClick}
              aria-label="Add category"
            >
              Add Category
            </Button>
          </Box>

          <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <Table aria-label="Categories list">
              <TableHead>
                <TableRow sx={{ bgcolor: 'action.hover' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 600 }} align="right">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3}>
                      <Typography color="text.secondary" sx={{ py: 3 }}>
                        No categories yet. Add one to get started.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  categories.map((cat) => (
                    <TableRow key={cat.id} hover>
                      <TableCell>{cat.name}</TableCell>
                      <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                        {cat.id}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          onClick={() => handleEdit(cat)}
                          aria-label={`Edit ${cat.name}`}
                          size="small"
                          color="primary"
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteClick(cat.id)}
                          aria-label={`Delete ${cat.name}`}
                          size="small"
                          color="error"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>

      <CategoryFormDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        mode={dialogMode}
        initialCategory={editingCategory}
        onSubmitAdd={handleSubmitAdd}
        onSubmitEdit={handleSubmitEdit}
      />

      <Dialog
        open={deleteId !== null}
        onClose={handleDeleteClose}
        aria-labelledby="delete-category-dialog-title"
      >
        <DialogTitle id="delete-category-dialog-title">Delete category?</DialogTitle>
        <DialogContent>
          {deleteBlocked ? (
            <DialogContentText>
              Cannot delete: {deleteCount} product(s) use this category. Reassign or remove those products first.
            </DialogContentText>
          ) : (
            <DialogContentText>
              This will remove the category. Products must not reference it. This action cannot be undone.
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Cancel</Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            disabled={deleteBlocked}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
