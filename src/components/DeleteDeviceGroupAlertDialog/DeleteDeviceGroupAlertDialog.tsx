import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { GridRowModel } from '@mui/x-data-grid';

interface DeleteDeviceGroupAlertDialogProps {
  deviceGroup?: GridRowModel;
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

const DeleteDeviceGroupAlertDialog = ({
                                        deviceGroup = undefined,
                                        open = false,
                                        handleClose,
                                        handleConfirm
                                      }: DeleteDeviceGroupAlertDialogProps) => {
  const renderDialogMessage = () => (
    <>
      Device group ID: <b>{deviceGroup?.id}</b><br/>
      Device group name: <b>{deviceGroup?.name}</b>
    </>
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        Delete this device group permanently?
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

export default DeleteDeviceGroupAlertDialog;
