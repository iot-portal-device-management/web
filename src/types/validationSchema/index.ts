/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { PartialRecord } from '../../libs/utilityTypes';

export type ValidationObject<T extends string> = PartialRecord<T, any>;
