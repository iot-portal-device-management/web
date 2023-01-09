/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import HiddenCredentialField from '../HiddenCredentialField';

interface ShowApiKeyDialogProps {
  label: string;
  apiKey: string;
  open: boolean;
  handleClose: () => void;
}

const ShowApiKeyDialog = ({ label, apiKey, open = false, handleClose }: ShowApiKeyDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        API key
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Protect this key like a password!
        </DialogContentText>
        <HiddenCredentialField
          label={label}
          credential={apiKey}
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

export default ShowApiKeyDialog;
