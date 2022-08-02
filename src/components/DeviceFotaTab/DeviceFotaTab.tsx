import { Grid } from '@mui/material';
import { FotaFormFormikValues, FotaPayload } from '../../types/fota';
import { useFota } from '../../hooks/fota/useFota';
import DeviceFotaFormCard from '../DeviceFotaFormCard';
import { FormFormikActions } from '../../types/formik';

interface DeviceFotaTabProps {
  deviceId: string;
}

const DeviceFotaTab = ({ deviceId }: DeviceFotaTabProps) => {
  const { submitFota } = useFota();

  const onSubmit = (data: FotaPayload, formFormikActions: FormFormikActions<FotaFormFormikValues>) => {
    submitFota(deviceId, data, formFormikActions);
  };

  return (
    <Grid item xs={12}>
      <DeviceFotaFormCard
        onSubmit={onSubmit}
      />
    </Grid>
  );
};

export default DeviceFotaTab;
