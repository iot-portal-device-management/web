import { Alert } from '@mui/material';

const AddDeviceToDeviceGroupAlert = () => {
  return (
    <Alert
      sx={{ mb: 1 }}
      severity="error"
      color="primary"
    >
      Add devices to this device group by selecting them below.
    </Alert>
  );
};

export default AddDeviceToDeviceGroupAlert;
