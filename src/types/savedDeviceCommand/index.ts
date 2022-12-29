/*
 * Copyright (C) 2021-2022 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { BaseOption } from '../option';
import { Nullable } from '../../libs/utilityTypes';

export interface SavedDeviceCommandOption extends BaseOption {
}

export type NullableSavedDeviceCommandOption = Nullable<SavedDeviceCommandOption>;

export interface CreateSavedDeviceCommandFormFormikValues {
  name: string;
}
