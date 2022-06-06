export type DeviceCategoryOption = {
  label: string;
  value: string;
} | null;

export interface DeviceFormikValues {
  name: string;
  deviceCategory: DeviceCategoryOption;
}