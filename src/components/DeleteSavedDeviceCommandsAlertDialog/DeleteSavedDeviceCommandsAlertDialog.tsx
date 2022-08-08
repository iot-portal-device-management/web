import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface DeleteSavedDeviceCommandsAlertDialogProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

const DeleteSavedDeviceCommandsAlertDialog = ({
                                                open = false,
                                                handleClose,
                                                handleConfirm
                                              }: DeleteSavedDeviceCommandsAlertDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        Delete saved device commands permanently?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to permanently delete the selected saved device commands?
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

export default DeleteSavedDeviceCommandsAlertDialog;
