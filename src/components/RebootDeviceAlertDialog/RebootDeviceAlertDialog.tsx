/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface RebootDeviceAlertDialogProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

const RebootDeviceAlertDialog = ({ open = false, handleClose, handleConfirm }: RebootDeviceAlertDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        Reboot this device?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to reboot this device?
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
          Reboot
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RebootDeviceAlertDialog;
