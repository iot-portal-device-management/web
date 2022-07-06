import { MouseEventHandler } from 'react';
import { Box, Button } from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

interface DataGridCreateDeleteToolbarProps {
  disableCreate?: boolean;
  onCreateClick?: MouseEventHandler<HTMLButtonElement>;
  disableDelete?: boolean;
  onDeleteClick?: MouseEventHandler<HTMLButtonElement>;
}

const DataGridCreateDeleteToolbar = ({
                                       disableCreate,
                                       onCreateClick,
                                       disableDelete,
                                       onDeleteClick,
                                     }: DataGridCreateDeleteToolbarProps) => {
  return (
    <Box flex={1} p={2}>
      <Button
        variant="contained"
        color="success"
        startIcon={<AddTwoToneIcon/>}
        disabled={disableCreate}
        onClick={onCreateClick}
      >
        New
      </Button>
      <Button
        sx={{ ml: 1 }}
        variant="contained"
        color="error"
        startIcon={<DeleteTwoToneIcon/>}
        disabled={disableDelete}
        onClick={onDeleteClick}
      >
        Delete
      </Button>
    </Box>
  );
};

export default DataGridCreateDeleteToolbar;
