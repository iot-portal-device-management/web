/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { NullableDeviceCotaConfigurationPathOption } from '../types/deviceCota';

class DeviceCotaConfiguration {
  public path: NullableDeviceCotaConfigurationPathOption;
  public value: string;

  constructor(path: NullableDeviceCotaConfigurationPathOption = null, value: string = '') {
    this.path = path;
    this.value = value;
  }
}

export default DeviceCotaConfiguration;