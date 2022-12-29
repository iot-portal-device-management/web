/*
 * Copyright (C) 2021-2022 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { GridRowModel } from '@mui/x-data-grid';

interface DeleteSavedDeviceCommandAlertDialogProps {
  savedDeviceCommand?: GridRowModel;
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

const DeleteSavedDeviceCommandAlertDialog = ({
                                               savedDeviceCommand = undefined,
                                               open = false,
                                               handleClose,
                                               handleConfirm
                                             }: DeleteSavedDeviceCommandAlertDialogProps) => {
  const renderDialogMessage = () => (
    <>
      Saved device command ID: <b>{savedDeviceCommand?.id}</b><br/>
      Saved device command name: <b>{savedDeviceCommand?.name}</b>
    </>
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        Delete this saved device command permanently?
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

export default DeleteSavedDeviceCommandAlertDialog;
