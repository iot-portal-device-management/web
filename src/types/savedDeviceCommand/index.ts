import { BaseOption } from '../option';
import { Nullable } from '../../libs/utilityTypes';

export interface SavedDeviceCommandOption extends BaseOption {
}

export type NullableSavedDeviceCommandOption = Nullable<SavedDeviceCommandOption>;

export interface CreateSavedDeviceCommandFormFormikValues {
  name: string;
}
