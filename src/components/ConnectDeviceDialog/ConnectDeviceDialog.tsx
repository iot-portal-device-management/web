import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { GridRowModel } from '@mui/x-data-grid';
import HiddenCredentialField from '../HiddenCredentialField';

interface ConnectDeviceDialogProps {
  device?: GridRowModel;
  open: boolean;
  handleClose: () => void;
}

const ConnectDeviceDialog = ({ device = undefined, open = false, handleClose }: ConnectDeviceDialogProps) => {
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
          credential={device?.id}
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
