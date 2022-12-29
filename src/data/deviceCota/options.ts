/*
 * Copyright (C) 2021-2022 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

export const DEVICE_COTA_COMMAND_OPTIONS = [
  { label: 'get', value: 'get' },
  { label: 'load', value: 'load' },
  { label: 'set', value: 'set' },
  { label: 'append', value: 'append' },
  { label: 'remove', value: 'remove' },
];

export const DEVICE_COTA_CONFIGURATION_PATH_OPTIONS = [
  { label: 'dbs', value: 'dbs' },
  { label: 'collectionIntervalSeconds', value: 'collectionIntervalSeconds' },
  { label: 'publishIntervalSeconds', value: 'publishIntervalSeconds' },
  { label: 'maxCacheSize', value: 'maxCacheSize' },
  { label: 'containerHealthIntervalSeconds', value: 'containerHealthIntervalSeconds' },
  { label: 'minStorageMB', value: 'minStorageMB' },
  { label: 'minMemoryMB', value: 'minMemoryMB' },
  { label: 'minPowerPercent', value: 'minPowerPercent' },
  { label: 'sotaSW', value: 'sotaSW' },
  { label: 'dockerBenchSecurityIntervalSeconds', value: 'dockerBenchSecurityIntervalSeconds' },
  { label: 'networkCheck', value: 'networkCheck' },
  { label: 'dbsRemoveImageOnFailedContainer', value: 'dbsRemoveImageOnFailedContainer' },
  { label: 'trustedRepositories', value: 'trustedRepositories' },
  { label: 'orchestratorResponse', value: 'orchestratorResponse' },
  { label: 'ip', value: 'ip' },
  { label: 'token', value: 'token' },
  { label: 'certFile', value: 'certFile' },
  { label: 'ubuntuAptSource', value: 'ubuntuAptSource' },
  { label: 'proceedWithoutRollback', value: 'proceedWithoutRollback' },
];

export const DEVICE_COTA_INITIAL_FIELDS_HIDDEN_STATE = {
  cmd: false,
  fetch: true,
  configurations: true,
  configuration_values: true,
  signature: true,
};

export const DEVICE_COTA_FIELDS_HIDDEN_STATES = {
  get: {
    cmd: false,
    fetch: true,
    configurations: false,
    configuration_values: true,
    signature: true,
  },
  load: {
    cmd: false,
    fetch: false,
    configurations: true,
    configuration_values: true,
    signature: false,
  },
  set: {
    cmd: false,
    fetch: true,
    configurations: false,
    configuration_values: false,
    signature: true,
  },
  append: {
    cmd: false,
    fetch: true,
    configurations: false,
    configuration_values: false,
    signature: true,
  },
  remove: {
    cmd: false,
    fetch: true,
    configurations: false,
    configuration_values: false,
    signature: true,
  },
};
