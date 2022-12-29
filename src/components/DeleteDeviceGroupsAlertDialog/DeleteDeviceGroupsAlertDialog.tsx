/*
 * Copyright (C) 2021-2022 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface DeleteDeviceGroupsAlertDialogProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

const DeleteDeviceGroupsAlertDialog = ({
                                         open = false,
                                         handleClose,
                                         handleConfirm
                                       }: DeleteDeviceGroupsAlertDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        Delete device groups permanently?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to permanently delete the selected device groups?
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

export default DeleteDeviceGroupsAlertDialog;
