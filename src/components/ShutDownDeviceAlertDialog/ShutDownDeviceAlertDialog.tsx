/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface ShutDownDeviceAlertDialogProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

const ShutDownDeviceAlertDialog = ({ open = false, handleClose, handleConfirm }: ShutDownDeviceAlertDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        Shut down this device?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to shut down this device?
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
          Shut down
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShutDownDeviceAlertDialog;
