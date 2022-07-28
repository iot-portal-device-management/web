import { NullableDeviceCategoryOption } from '../deviceCategory';

export interface CreateDeviceFormFormikValues {
  name: string;
  deviceCategory: NullableDeviceCategoryOption;
}

export interface EditDeviceFormFormikValues extends CreateDeviceFormFormikValues {
}
