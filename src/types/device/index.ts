/*
 * Copyright (C) 2021-2022 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { NullableDeviceCategoryOption } from '../deviceCategory';

export interface CreateDeviceFormFormikValues {
  name: string;
  deviceCategoryId: NullableDeviceCategoryOption;
}

export interface EditDeviceFormFormikValues extends CreateDeviceFormFormikValues {
}
