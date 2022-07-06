import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { GridRowModel } from '@mui/x-data-grid';

interface DeleteDeviceAlertDialogProps {
  device?: GridRowModel;
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

const DeleteDeviceAlertDialog = ({
                                   device = undefined,
                                   open = false,
                                   handleClose,
                                   handleConfirm
                                 }: DeleteDeviceAlertDialogProps) => {
  const renderDialogMessage = () => (
    <>
      Device ID: <b>{device?.id}</b><br/>
      Device Name: <b>{device?.name}</b>
    </>
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        Delete this device permanently?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {renderDialogMessage()}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
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

export default DeleteDeviceAlertDialog;
