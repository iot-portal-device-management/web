/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { MouseEventHandler } from 'react';
import { Box, Button, Stack } from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

interface DataGridCreateDeleteToolbarProps {
  hideCreate?: boolean;
  disableCreate?: boolean;
  onCreateClick?: MouseEventHandler<HTMLButtonElement>;
  hideDelete?: boolean;
  disableDelete?: boolean;
  onDeleteClick?: MouseEventHandler<HTMLButtonElement>;
}

const DataGridCreateDeleteToolbar = ({
                                       hideCreate,
                                       disableCreate,
                                       onCreateClick,
                                       hideDelete,
                                       disableDelete,
                                       onDeleteClick,
                                     }: DataGridCreateDeleteToolbarProps) => {
  return (
    <Box mb={2}>
      <Stack direction="row" spacing={1}>
        {!hideCreate && (
          <Button
            variant="contained"
            color="success"
            startIcon={<AddTwoToneIcon/>}
            disabled={disableCreate}
            onClick={onCreateClick}
          >
            New
          </Button>
        )}
        {!hideDelete && (
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteTwoToneIcon/>}
            disabled={disableDelete}
            onClick={onDeleteClick}
          >
            Delete
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default DataGridCreateDeleteToolbar;
