import { BaseOption } from '../option';
import { Nullable } from '../../libs/utilityTypes';

export interface DeviceGroupOption extends BaseOption {
}

export type NullableDeviceGroupOption = Nullable<DeviceGroupOption>;

export interface CreateDeviceGroupFormFormikValues {
  name: string;
  deviceIds?: string[];
}

export interface EditDeviceGroupFormFormikValues extends CreateDeviceGroupFormFormikValues {
}
