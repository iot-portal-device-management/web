import { NullableDeviceGroupOption } from '../deviceGroup';
import { NullableSavedDeviceCommandOption } from '../savedDeviceCommand';

export interface CreateDeviceJobFormFormikValues {
  name: string;
  deviceGroupId: NullableDeviceGroupOption;
  savedDeviceCommandId: NullableSavedDeviceCommandOption;
}
