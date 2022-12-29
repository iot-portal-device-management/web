/*
 * Copyright (C) 2021-2022 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { GridRowModel } from '@mui/x-data-grid';

interface DeleteDeviceCategoryAlertDialogProps {
  deviceCategory?: GridRowModel;
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

const DeleteDeviceCategoryAlertDialog = ({
                                           deviceCategory = undefined,
                                           open = false,
                                           handleClose,
                                           handleConfirm
                                         }: DeleteDeviceCategoryAlertDialogProps) => {
  const renderDialogMessage = () => (
    <>
      Device category ID: <b>{deviceCategory?.id}</b><br/>
      Device category name: <b>{deviceCategory?.name}</b>
    </>
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        Delete this device category permanently?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {renderDialogMessage()}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleConfirm}
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDeviceCategoryAlertDialog;
