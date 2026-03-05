import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useCategories } from '../../context/CategoriesContext';
import type { MenuItem as MenuItemType } from '../../types/menu';

interface ProductFormDialogProps {
  open: boolean;
  onClose: () => void;
  mode: 'add' | 'edit';
  initialItem: MenuItemType | null;
  onSubmit: (item: MenuItemType) => void;
}

const emptyForm = {
  name: '',
  description: '',
  price: '',
  image: '',
  categoryId: '',
};

export const ProductFormDialog = ({
  open,
  onClose,
  mode,
  initialItem,
  onSubmit,
}: ProductFormDialogProps) => {
  const { categories } = useCategories();
  const [name, setName] = useState(emptyForm.name);
  const [description, setDescription] = useState(emptyForm.description);
  const [price, setPrice] = useState(emptyForm.price);
  const [image, setImage] = useState(emptyForm.image);
  const [categoryId, setCategoryId] = useState(emptyForm.categoryId);
  const [errors, setErrors] = useState<{ name?: string; price?: string; category?: string }>({});

  const defaultCategoryId = categories.length > 0 ? categories[0].id : '';

  useEffect(() => {
    if (open) {
      if (mode === 'edit' && initialItem) {
        setName(initialItem.name);
        setDescription(initialItem.description);
        setPrice(String(initialItem.price));
        setImage(initialItem.image);
        setCategoryId(initialItem.categoryId);
      } else {
        setName(emptyForm.name);
        setDescription(emptyForm.description);
        setPrice(emptyForm.price);
        setImage(emptyForm.image);
        setCategoryId(defaultCategoryId);
      }
      setErrors({});
    }
  }, [open, mode, initialItem, defaultCategoryId]);

  const validate = (): boolean => {
    const next: { name?: string; price?: string; category?: string } = {};
    if (!name.trim()) next.name = 'Name is required';
    const priceNum = Number(price);
    if (price === '' || Number.isNaN(priceNum) || priceNum <= 0) {
      next.price = 'Price must be a number greater than 0';
    }
    if (categories.length > 0 && !categoryId.trim()) {
      next.category = 'Category is required';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const priceNum = Number(price);
    const resolvedCategoryId = categoryId.trim() || defaultCategoryId;
    if (mode === 'edit' && initialItem) {
      onSubmit({
        ...initialItem,
        name: name.trim(),
        description: description.trim(),
        price: priceNum,
        image: image.trim(),
        categoryId: resolvedCategoryId,
      });
    } else {
      onSubmit({
        id: crypto.randomUUID?.() ?? String(Date.now()),
        name: name.trim(),
        description: description.trim(),
        price: priceNum,
        image: image.trim(),
        categoryId: resolvedCategoryId,
      });
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{mode === 'add' ? 'Add Product' : 'Edit Product'}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} sx={{ pt: 1 }}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            error={Boolean(errors.name)}
            helperText={errors.name}
            fullWidth
            autoFocus
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={2}
            fullWidth
          />
          <TextField
            label="Price (GEL)"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            error={Boolean(errors.price)}
            helperText={errors.price}
            fullWidth
            inputProps={{ min: 0, step: 0.01 }}
          />
          <TextField
            label="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            fullWidth
          />
          <FormControl fullWidth error={Boolean(errors.category)}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              value={categoryId}
              label="Category"
              onChange={(e) => setCategoryId(e.target.value)}
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
            {errors.category && (
              <Box component="span" sx={{ fontSize: '0.75rem', color: 'error.main', mt: 0.5, display: 'block' }}>
                {errors.category}
              </Box>
            )}
          </FormControl>
          {categories.length === 0 && (
            <Box sx={{ color: 'text.secondary', typography: 'body2' }}>
              No categories yet. Add categories in Admin → Categories first.
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={categories.length === 0}>
          {mode === 'add' ? 'Add' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
