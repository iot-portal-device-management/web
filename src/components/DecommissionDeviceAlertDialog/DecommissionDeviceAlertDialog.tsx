/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface DecommissionDeviceAlertDialogProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

const DecommissionDeviceAlertDialog = ({
                                         open = false,
                                         handleClose,
                                         handleConfirm
                                       }: DecommissionDeviceAlertDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        Decommission this device?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to decommission this device?
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
          Decommission
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DecommissionDeviceAlertDialog;
