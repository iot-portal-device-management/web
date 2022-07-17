import { DeviceCategoryOption } from '../deviceCategory';
import { Nullable } from '../../libs/utilityTypes';

export type DeviceStatus = 'registered' | 'online' | 'offline';

export type NullableDeviceCategoryOption = Nullable<DeviceCategoryOption>;

export interface DeviceFormFormikValues {
  name: string;
  deviceCategory: NullableDeviceCategoryOption;
}
