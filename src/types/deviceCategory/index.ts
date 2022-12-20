import { BaseOption } from '../option';
import { Nullable } from '../../libs/utilityTypes';

export type DeviceCategory = string;

export interface DeviceCategoryOption extends BaseOption {
}

export type NullableDeviceCategoryOption = Nullable<DeviceCategoryOption>;

export interface CreateDeviceCategoryFormFormikValues {
  name: string;
  deviceIds?: string[];
}

export interface EditDeviceCategoryFormFormikValues extends CreateDeviceCategoryFormFormikValues {
}
