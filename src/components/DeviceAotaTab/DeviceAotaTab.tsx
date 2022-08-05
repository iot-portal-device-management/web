import { Grid } from '@mui/material';
import { useDeviceAota } from '../../hooks/deviceAota/useDeviceAota';
import { DeviceAotaFormFormikValues, DeviceAotaPayload } from '../../types/deviceAota';
import DeviceAotaFormCard from '../DeviceAotaFormCard/DeviceAotaFormCard';
import { FormFormikActions } from '../../types/formik';

interface DeviceAotaTabProps {
  deviceId: string;
}

const DeviceAotaTab = ({ deviceId }: DeviceAotaTabProps) => {
  const { submitDeviceAota } = useDeviceAota();

  const onSubmit = (data: DeviceAotaPayload, formFormikActions: FormFormikActions<DeviceAotaFormFormikValues>) => {
    submitDeviceAota(deviceId, data, formFormikActions);
  };

  return (
    <Grid item xs={12}>
      <DeviceAotaFormCard
        onSubmit={onSubmit}
      />
    </Grid>
  );
};

export default DeviceAotaTab;
