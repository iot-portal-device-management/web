import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { GridRowModel } from '@mui/x-data-grid';

interface DeleteDeviceJobAlertDialogProps {
  deviceJob?: GridRowModel;
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

const DeleteDeviceJobAlertDialog = ({
                                      deviceJob = undefined,
                                      open = false,
                                      handleClose,
                                      handleConfirm
                                    }: DeleteDeviceJobAlertDialogProps) => {
  const renderDialogMessage = () => (
    <>
      Device job ID: <b>{deviceJob?.id}</b><br/>
      Device job name: <b>{deviceJob?.name}</b>
    </>
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        Delete this device job permanently?
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

export default DeleteDeviceJobAlertDialog;
