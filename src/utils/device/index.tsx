import Label from '../../components/Label';
import { DeviceStatus } from '../../types/device';

export const getDeviceStatusLabel = (deviceStatus: DeviceStatus): React.ReactNode => {
  if (!deviceStatus) {
    return null;
  }

  const deviceStatusMap = {
    registered: {
      text: 'Registered',
      color: 'info'
    },
    online: {
      text: 'Online',
      color: 'success'
    },
    offline: {
      text: 'Offline',
      color: 'warning'
    }
  };

  // @ts-ignore
  const { text, color }: any = deviceStatusMap[deviceStatus?.toLowerCase()];

  return (<Label color={color}>{text}</Label>);
};