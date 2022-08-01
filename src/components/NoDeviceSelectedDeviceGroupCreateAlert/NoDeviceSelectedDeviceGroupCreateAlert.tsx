import { Alert } from '@mui/material';

const NoDeviceSelectedDeviceGroupCreateAlert = () => {
  return (
    <Alert
      sx={{ mb: 1 }}
      severity="error"
    >
      Please select at least one device below by checking the checkbox to create a device group.
    </Alert>
  );
};

export default NoDeviceSelectedDeviceGroupCreateAlert;
