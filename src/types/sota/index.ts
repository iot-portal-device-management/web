import { BaseOption } from '../option';
import { Nullable } from '../../libs/utilityTypes';

export type SotaOptionLabel =
  | 'Ubuntu update'
  | 'Mender update';

export type SotaOptionValue =
  | 'ubuntu_update'
  | 'mender_update';

export type SotaCommandOptionLabel =
  | 'update';

export type SotaCommandOptionValue =
  | 'update';

export type SotaLogToFileOptionLabel =
  | 'Yes'
  | 'No';

export type SotaLogToFileOptionValue =
  | 'Y'
  | 'N';

export interface SotaOption extends BaseOption<SotaOptionLabel, SotaOptionValue> {
}

export interface SotaCommandOption extends BaseOption<SotaCommandOptionLabel, SotaCommandOptionValue> {
}

export interface SotaLogToFileOption extends BaseOption<SotaLogToFileOptionLabel, SotaLogToFileOptionValue> {
}

export interface SotaFormFormikValues {
  sota_option: Nullable<SotaOption>;
  cmd: Nullable<SotaCommandOption>;
  fetch: string;
  log_to_file: Nullable<SotaLogToFileOption>;
  username: string;
  password: string;
}

export type SotaFormField = keyof SotaFormFormikValues;

export interface SotaFormFieldsHiddenState extends Record<SotaFormField, boolean> {
}

export interface SotaPayload extends Record<SotaFormField, string> {
}
