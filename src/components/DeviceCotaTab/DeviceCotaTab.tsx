import { Grid } from '@mui/material';
import { DeviceCotaFormFormikValues, DeviceCotaPayload } from '../../types/deviceCota';
import { useDeviceCota } from '../../hooks/deviceCota/useDeviceCota';
import DeviceCotaFormCard from '../DeviceCotaFormCard';
import { FormFormikActions } from '../../types/formik';

interface DeviceCotaTabProps {
  deviceId: string;
}

const DeviceCotaTab = ({ deviceId }: DeviceCotaTabProps) => {
  const { submitDeviceCota } = useDeviceCota();

  const onSubmit = (data: DeviceCotaPayload, formFormikActions: FormFormikActions<DeviceCotaFormFormikValues>) => {
    submitDeviceCota(deviceId, data, formFormikActions);
  };

  return (
    <Grid item xs={12}>
      <DeviceCotaFormCard
        onSubmit={onSubmit}
      />
    </Grid>
  );
};

export default DeviceCotaTab;
