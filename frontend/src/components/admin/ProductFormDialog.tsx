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
import type { Category } from '../../types/menu';
import type { MenuItem as MenuItemType } from '../../types/menu';

const CATEGORIES: Category[] = ['pizza', 'drinks', 'desserts'];

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
  category: 'pizza' as Category,
};

export const ProductFormDialog = ({
  open,
  onClose,
  mode,
  initialItem,
  onSubmit,
}: ProductFormDialogProps) => {
  const [name, setName] = useState(emptyForm.name);
  const [description, setDescription] = useState(emptyForm.description);
  const [price, setPrice] = useState(emptyForm.price);
  const [image, setImage] = useState(emptyForm.image);
  const [category, setCategory] = useState<Category>(emptyForm.category);
  const [errors, setErrors] = useState<{ name?: string; price?: string }>({});

  useEffect(() => {
    if (open) {
      if (mode === 'edit' && initialItem) {
        setName(initialItem.name);
        setDescription(initialItem.description);
        setPrice(String(initialItem.price));
        setImage(initialItem.image);
        setCategory(initialItem.category);
      } else {
        setName(emptyForm.name);
        setDescription(emptyForm.description);
        setPrice(emptyForm.price);
        setImage(emptyForm.image);
        setCategory(emptyForm.category);
      }
      setErrors({});
    }
  }, [open, mode, initialItem]);

  const validate = (): boolean => {
    const next: { name?: string; price?: string } = {};
    if (!name.trim()) next.name = 'Name is required';
    const priceNum = Number(price);
    if (price === '' || Number.isNaN(priceNum) || priceNum <= 0) {
      next.price = 'Price must be a number greater than 0';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const priceNum = Number(price);
    if (mode === 'edit' && initialItem) {
      onSubmit({
        ...initialItem,
        name: name.trim(),
        description: description.trim(),
        price: priceNum,
        image: image.trim(),
        category,
      });
    } else {
      onSubmit({
        id: crypto.randomUUID?.() ?? String(Date.now()),
        name: name.trim(),
        description: description.trim(),
        price: priceNum,
        image: image.trim(),
        category,
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
          <FormControl fullWidth>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value as Category)}
            >
              {CATEGORIES.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {mode === 'add' ? 'Add' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
