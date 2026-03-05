import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import type { CategoryRecord } from '../../types/menu';

interface CategoryFormDialogProps {
  open: boolean;
  onClose: () => void;
  mode: 'add' | 'edit';
  initialCategory: CategoryRecord | null;
  onSubmitAdd: (name: string) => void;
  onSubmitEdit: (id: string, name: string) => void;
}

export const CategoryFormDialog = ({
  open,
  onClose,
  mode,
  initialCategory,
  onSubmitAdd,
  onSubmitEdit,
}: CategoryFormDialogProps) => {
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setName(mode === 'edit' && initialCategory ? initialCategory.name : '');
      setError(null);
    }
  }, [open, mode, initialCategory]);

  const handleSubmit = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Name is required');
      return;
    }
    setError(null);
    if (mode === 'edit' && initialCategory) {
      onSubmitEdit(initialCategory.id, trimmed);
    } else {
      onSubmitAdd(trimmed);
    }
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{mode === 'add' ? 'Add Category' : 'Edit Category'}</DialogTitle>
      <DialogContent sx={{ pt: 1 }}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          error={Boolean(error)}
          helperText={error}
          fullWidth
          autoFocus
          required
        />
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
