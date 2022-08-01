import { Alert } from '@mui/material';

const NoDeviceSelectedDeviceGroupEditAlert = () => {
  return (
    <Alert
      sx={{ mb: 1 }}
      severity="error"
    >
      Please select at least one device below by checking the checkbox to update the device group.
    </Alert>
  );
};

export default NoDeviceSelectedDeviceGroupEditAlert;
