import { DeviceFotaFormFormikValues, DeviceFotaPayload } from '../../types/deviceFota';
import { useDeviceFota } from '../../hooks/deviceFota/useDeviceFota';
import DeviceFotaFormCard from '../DeviceFotaFormCard';
import { FormFormikActions } from '../../types/formik';

interface DeviceFotaTabProps {
  deviceId: string;
}

const DeviceFotaTab = ({ deviceId }: DeviceFotaTabProps) => {
  const { submitDeviceFota } = useDeviceFota();

  const onSubmit = (data: DeviceFotaPayload, formFormikActions: FormFormikActions<DeviceFotaFormFormikValues>) => {
    submitDeviceFota(deviceId, data, formFormikActions);
  };

  return (
    <DeviceFotaFormCard
      onSubmit={onSubmit}
    />
  );
};

export default DeviceFotaTab;
