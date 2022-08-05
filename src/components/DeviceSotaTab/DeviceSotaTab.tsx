import { Grid } from '@mui/material';
import { DeviceSotaFormFormikValues, DeviceSotaPayload } from '../../types/deviceSota';
import { useDeviceSota } from '../../hooks/deviceSota/useDeviceSota';
import DeviceSotaFormCard from '../DeviceSotaFormCard';
import { FormFormikActions } from '../../types/formik';

interface DeviceSotaTabProps {
  deviceId: string;
}

const DeviceSotaTab = ({ deviceId }: DeviceSotaTabProps) => {
  const { submitDeviceSota } = useDeviceSota();

  const onSubmit = (data: DeviceSotaPayload, formFormikActions: FormFormikActions<DeviceSotaFormFormikValues>) => {
    submitDeviceSota(deviceId, data, formFormikActions);
  };

  return (
    <Grid item xs={12}>
      <DeviceSotaFormCard
        onSubmit={onSubmit}
      />
    </Grid>
  );
};

export default DeviceSotaTab;
