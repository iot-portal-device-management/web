export interface CreateDeviceGroupFormFormikValues {
  name: string;
  deviceIds?: string[];
}

export interface EditDeviceGroupFormFormikValues extends CreateDeviceGroupFormFormikValues {
}
