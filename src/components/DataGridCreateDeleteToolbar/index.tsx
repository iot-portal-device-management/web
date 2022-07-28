import { MouseEventHandler } from 'react';
import { Box, Button, Stack } from '@mui/material';
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
    <Box mb={2}>
      <Stack direction="row" spacing={1}>
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
          variant="contained"
          color="error"
          startIcon={<DeleteTwoToneIcon/>}
          disabled={disableDelete}
          onClick={onDeleteClick}
        >
          Delete
        </Button>
      </Stack>
    </Box>
  );
};

export default DataGridCreateDeleteToolbar;
