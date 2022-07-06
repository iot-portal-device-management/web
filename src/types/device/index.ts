import { DeviceCategoryOption } from '../deviceCategory';

export type DeviceStatus = 'registered' | 'online' | 'offline';

export interface DeviceFormikValues {
  name: string;
  deviceCategory: DeviceCategoryOption;
}
