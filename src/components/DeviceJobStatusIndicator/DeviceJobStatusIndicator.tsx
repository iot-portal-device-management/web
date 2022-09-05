import { Chip } from '@mui/material';

type DeviceJobStatus =
  | 'pending'
  | 'processing'
  | 'success'
  | 'failed';

interface DeviceJobStatusIndicatorProps {
  status: DeviceJobStatus;
}

const DeviceJobStatusIndicator = ({ status }: DeviceJobStatusIndicatorProps) => {
  if (status?.toLowerCase() === 'pending') return <Chip label="Pending" color="info"/>;
  if (status?.toLowerCase() === 'processing') return <Chip label="Processing" color="primary"/>;
  if (status?.toLowerCase() === 'success') return <Chip label="Success" color="success"/>;
  if (status?.toLowerCase() === 'failed') return <Chip label="Failed" color="error"/>;

  return null;
};

export default DeviceJobStatusIndicator;
