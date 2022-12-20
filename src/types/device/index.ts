import { NullableDeviceCategoryOption } from '../deviceCategory';

export interface CreateDeviceFormFormikValues {
  name: string;
  deviceCategoryId: NullableDeviceCategoryOption;
}

export interface EditDeviceFormFormikValues extends CreateDeviceFormFormikValues {
}
