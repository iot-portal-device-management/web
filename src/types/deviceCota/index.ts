/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { BaseOption } from '../option';
import { Nullable } from '../../libs/utilityTypes';
import DeviceCotaConfiguration from '../../models/DeviceCotaConfiguration';

export type DeviceCotaCommandOptionLabel =
  | 'get'
  | 'load'
  | 'set'
  | 'append'
  | 'remove';

export type DeviceCotaCommandOptionValue = DeviceCotaCommandOptionLabel;

export type DeviceCotaConfigurationPathOptionLabel =
  | 'dbs'
  | 'collectionIntervalSeconds'
  | 'publishIntervalSeconds'
  | 'maxCacheSize'
  | 'containerHealthIntervalSeconds'
  | 'minStorageMB'
  | 'minMemoryMB'
  | 'minPowerPercent'
  | 'sotaSW'
  | 'dockerBenchSecurityIntervalSeconds'
  | 'networkCheck'
  | 'dbsRemoveImageOnFailedContainer'
  | 'trustedRepositories'
  | 'orchestratorResponse'
  | 'ip'
  | 'token'
  | 'certFile'
  | 'ubuntuAptSource'
  | 'proceedWithoutRollback';

export type DeviceCotaConfigurationPathOptionValue = DeviceCotaConfigurationPathOptionLabel;

export interface DeviceCotaCommandOption extends BaseOption<DeviceCotaCommandOptionLabel, DeviceCotaCommandOptionValue> {
}

export interface DeviceCotaConfigurationPathOption extends BaseOption<DeviceCotaConfigurationPathOptionLabel, DeviceCotaConfigurationPathOptionValue> {
}

export type NullableDeviceCotaConfigurationPathOption = Nullable<DeviceCotaConfigurationPathOption>;

export interface DeviceCotaFormFormikValues {
  cmd: Nullable<DeviceCotaCommandOption>;
  fetch: string;
  configurations: DeviceCotaConfiguration[];
  signature: string;
}

export type DeviceCotaFormField = keyof DeviceCotaFormFormikValues;

export interface DeviceCotaFormFieldsHiddenState extends Record<DeviceCotaFormField, boolean> {
}

export interface DeviceCotaPayload extends Record<DeviceCotaFormField, string> {
}
