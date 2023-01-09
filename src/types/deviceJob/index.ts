/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { NullableDeviceGroupOption } from '../deviceGroup';
import { NullableSavedDeviceCommandOption } from '../savedDeviceCommand';

export interface CreateDeviceJobFormFormikValues {
  name: string;
  deviceGroupId: NullableDeviceGroupOption;
  savedDeviceCommandId: NullableSavedDeviceCommandOption;
}
