import { DeviceCategoryOption } from '../deviceCategory';

export type DeviceStatus = 'registered' | 'online' | 'offline';

export interface DeviceFormFormikValues {
  name: string;
  deviceCategory: DeviceCategoryOption;
}
