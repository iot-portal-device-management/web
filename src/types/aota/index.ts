import { BaseOption } from '../option';
import { Nullable } from '../../libs/utilityTypes';

export type AotaAppOptionValue =
  | 'docker'
  | 'compose'
  | 'application';

export type AotaCommandOptionValue =
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

export interface AotaAppOption extends BaseOption<AotaAppOptionValue, AotaAppOptionValue> {
}

export interface AotaCommandOption extends BaseOption<AotaCommandOptionValue, AotaCommandOptionValue> {
}

export interface DeviceRebootOption extends BaseOption<DeviceRebootOptionLabel, DeviceRebootOptionValue> {
}

export interface AotaFormFormikValues {
  app: Nullable<AotaAppOption>;
  cmd: Nullable<AotaCommandOption>;
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

export type AotaFormField = keyof AotaFormFormikValues;

export interface AotaFormFieldsHiddenState extends Record<AotaFormField, boolean> {
}

export interface AotaPayload extends Record<AotaFormField, string> {
}
