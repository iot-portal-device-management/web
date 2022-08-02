import { Grid } from '@mui/material';
import { CotaFormFormikValues, CotaPayload } from '../../types/cota';
import { useCota } from '../../hooks/cota/useCota';
import DeviceCotaFormCard from '../DeviceCotaFormCard';
import { FormFormikActions } from '../../types/formik';

interface DeviceCotaTabProps {
  deviceId: string;
}

const DeviceCotaTab = ({ deviceId }: DeviceCotaTabProps) => {
  const { submitCota } = useCota();

  const onSubmit = (data: CotaPayload, formFormikActions: FormFormikActions<CotaFormFormikValues>) => {
    submitCota(deviceId, data, formFormikActions);
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
