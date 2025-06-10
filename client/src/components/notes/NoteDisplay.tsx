import { useState } from 'react';
import type { Note } from '@/types';
import { formatNoteDate } from '@/utils/formatDate';
import { IconButton, Typography, Box, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  note: Note;
  isBeingEditedBy?: string;
  currentUserName?: string;
  onEdit: () => void;
  onDelete: () => void;
}

export default function NoteDisplay({
  note,
  isBeingEditedBy,
  currentUserName,
  onEdit,
  onDelete,
}: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      {isBeingEditedBy && isBeingEditedBy !== currentUserName && (
        <Typography variant="caption" color="warning.main">
          {isBeingEditedBy} is editing this Note...
        </Typography>
      )}
      
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
          sx={{ cursor: isBeingEditedBy ? 'default' : 'pointer' }}
          title="Double-click to edit"
          onDoubleClick={isBeingEditedBy ? undefined : onEdit}
        >
          {note.title}
        </Typography>

        <IconButton onClick={handleMenuOpen} size="small">
          <MoreVertIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem
            onClick={() => {
              onEdit();
              handleMenuClose();
            }}
            aria-label="Edit"
            sx={{ 
              color: 'warning.main', 
              fontSize: '0.875rem',
              '&:hover': {
                backgroundColor: 'warning.light',
                color: 'white',
              },
            }}
          >
            <EditIcon fontSize="small" sx={{ marginRight: 1, fontSize: '1.1rem' }} />
            Edit
          </MenuItem>
          <MenuItem
            onClick={() => {
              onDelete();
              handleMenuClose();
            }}
            aria-label="Delete"
            sx={{ 
              color: 'error.main', 
              fontSize: '0.875rem',
              '&:hover': {
                backgroundColor: 'error.light',
                color: 'white',
              },
             }}
          >
            <DeleteIcon fontSize="small" sx={{ marginRight: 1, fontSize: '1.1rem' }} />
            Delete
          </MenuItem>
        </Menu>
      </Box>

      
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ whiteSpace: 'pre-line' }}
      >
        {note.content}
      </Typography>
      <Typography
        variant="caption"
        display="block"
        align="right"
        mt={2}
        color="gray"
      >
        {formatNoteDate(note.createdAt, note.updatedAt, note.createdBy, note.updatedBy)}
      </Typography>
    </Box>
  );
}
