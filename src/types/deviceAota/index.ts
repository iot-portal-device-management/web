import { BaseOption } from '../option';
import { Nullable } from '../../libs/utilityTypes';

export type DeviceAotaAppOptionValue =
  | 'docker'
  | 'compose'
  | 'application';

export type DeviceAotaCommandOptionValue =
  | 'import'
  | 'load'
  | 'pull'
  | 'remove'
  | 'stats'
  | 'up'
  | 'down'
  | 'list'
  | 'update';

export type DeviceRebootOptionLabel =
  | 'Yes'
  | 'No';

export type DeviceRebootOptionValue =
  | 'yes'
  | 'no';

export interface DeviceAotaAppOption extends BaseOption<DeviceAotaAppOptionValue, DeviceAotaAppOptionValue> {
}

export interface DeviceAotaCommandOption extends BaseOption<DeviceAotaCommandOptionValue, DeviceAotaCommandOptionValue> {
}

export interface DeviceRebootOption extends BaseOption<DeviceRebootOptionLabel, DeviceRebootOptionValue> {
}

export interface DeviceAotaFormFormikValues {
  app: Nullable<DeviceAotaAppOption>;
  cmd: Nullable<DeviceAotaCommandOption>;
  containerTag: string;
  deviceReboot: Nullable<DeviceRebootOption>;
  fetch: string;
  signature: string;
  version: string;
  username: string;
  password: string;
  dockerRegistry: string;
  dockerUsername: string;
  dockerPassword: string;
  file: string;
}

export type DeviceAotaFormField = keyof DeviceAotaFormFormikValues;

export interface DeviceAotaFormFieldsHiddenState extends Record<DeviceAotaFormField, boolean> {
}

export interface DeviceAotaPayload extends Record<DeviceAotaFormField, string> {
}
