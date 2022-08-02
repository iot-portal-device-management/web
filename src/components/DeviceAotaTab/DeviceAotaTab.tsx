import { Grid } from '@mui/material';
import { useAota } from '../../hooks/aota/useAota';
import { AotaFormFormikValues, AotaPayload } from '../../types/aota';
import DeviceAotaFormCard from '../DeviceAotaFormCard/DeviceAotaFormCard';
import { FormFormikActions } from '../../types/formik';

interface DeviceAotaTabProps {
  deviceId: string;
}

const DeviceAotaTab = ({ deviceId }: DeviceAotaTabProps) => {
  const { submitAota } = useAota();

  const onSubmit = (data: AotaPayload, formFormikActions: FormFormikActions<AotaFormFormikValues>) => {
    submitAota(deviceId, data, formFormikActions);
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
