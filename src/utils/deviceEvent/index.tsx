import Label from '../../components/Label';
import { ReactNode } from 'react';
import { DeviceEvent } from '../../types/deviceEvent';

export const getDeviceEventLabel = (deviceEvent: DeviceEvent): ReactNode => {
  if (!deviceEvent) {
    return null;
  }

  const deviceEventMap = {
    property: {
      text: 'Property',
      color: 'info'
    },
    telemetry: {
      text: 'Telemetry',
      color: 'success'
    },
  };

  // @ts-ignore
  const { text, color }: any = deviceEventMap[deviceEvent?.toLowerCase()];

  return (<Label color={color}>{text}</Label>);
};