/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { BaseOption } from '../option';
import { Nullable } from '../../libs/utilityTypes';

export type DeviceSotaOptionLabel =
  | 'Ubuntu update'
  | 'Mender update';

export type DeviceSotaOptionValue =
  | 'ubuntu_update'
  | 'mender_update';

export type DeviceSotaCommandOptionLabel =
  | 'update';

export type DeviceSotaCommandOptionValue =
  | 'update';

export type DeviceSotaLogToFileOptionLabel =
  | 'Yes'
  | 'No';

export type DeviceSotaLogToFileOptionValue =
  | 'Y'
  | 'N';

export interface DeviceSotaOption extends BaseOption<DeviceSotaOptionLabel, DeviceSotaOptionValue> {
}

export interface DeviceSotaCommandOption extends BaseOption<DeviceSotaCommandOptionLabel, DeviceSotaCommandOptionValue> {
}

export interface DeviceSotaLogToFileOption extends BaseOption<DeviceSotaLogToFileOptionLabel, DeviceSotaLogToFileOptionValue> {
}

export interface DeviceSotaFormFormikValues {
  sota_option: Nullable<DeviceSotaOption>;
  cmd: Nullable<DeviceSotaCommandOption>;
  fetch: string;
  log_to_file: Nullable<DeviceSotaLogToFileOption>;
  username: string;
  password: string;
}

export type DeviceSotaFormField = keyof DeviceSotaFormFormikValues;

export interface DeviceSotaFormFieldsHiddenState extends Record<DeviceSotaFormField, boolean> {
}

export interface DeviceSotaPayload extends Record<DeviceSotaFormField, string> {
}
