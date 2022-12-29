/*
 * Copyright (C) 2021-2022 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import * as Yup from 'yup';

const createDeviceGroupValidationSchema = () => {
  return Yup.object({
    name: Yup.string()
      .label('device group name')
      .required()
      .max(255),
    deviceIds: Yup.array()
      .label('devices')
      .optional(),
  });
};

export default createDeviceGroupValidationSchema;
