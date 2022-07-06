import Label from '../../components/Label';
import { DeviceCategory } from '../../types/deviceCategory';

export const getDeviceCategoryLabel = (deviceCategory: DeviceCategory): JSX.Element => {
  return (
    <Label color="primary">{deviceCategory}</Label>
  );
};