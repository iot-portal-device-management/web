/*
 * Copyright (C) 2021-2022 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import HiddenCredentialField from '../HiddenCredentialField';

interface ConnectDeviceDialogProps {
  deviceId?: string;
  open: boolean;
  handleClose: () => void;
}

const ConnectDeviceDialog = ({ deviceId = undefined, open = false, handleClose }: ConnectDeviceDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        Connect this device
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          To connect this device, enter your <b>unique ID</b>, <b>device connection key</b> and <b>device ID</b> during
          your device set up.
        </DialogContentText>
        <HiddenCredentialField
          label="Device ID"
          credential={deviceId}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={handleClose}
          autoFocus
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConnectDeviceDialog;
