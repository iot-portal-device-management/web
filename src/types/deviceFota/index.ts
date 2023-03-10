/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

export interface DeviceFotaFormFormikValues {
  biosversion: string;
  fetch: string;
  manufacturer: string;
  path: string;
  product: string;
  releasedate: string;
  signature: string;
  tooloptions: string;
  vendor: string;
  username: string;
  password: string;
}

export type DeviceFotaFormField = keyof DeviceFotaFormFormikValues;

export interface DeviceFotaPayload extends Record<DeviceFotaFormField, string> {
}
