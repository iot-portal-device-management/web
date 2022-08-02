import { Grid } from '@mui/material';
import { SotaFormFormikValues, SotaPayload } from '../../types/sota';
import { useSota } from '../../hooks/sota/useSota';
import DeviceSotaFormCard from '../DeviceSotaFormCard';
import { FormFormikActions } from '../../types/formik';

interface DeviceSotaTabProps {
  deviceId: string;
}

const DeviceSotaTab = ({ deviceId }: DeviceSotaTabProps) => {
  const { submitSota } = useSota();

  const onSubmit = (data: SotaPayload, formFormikActions: FormFormikActions<SotaFormFormikValues>) => {
    submitSota(deviceId, data, formFormikActions);
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
