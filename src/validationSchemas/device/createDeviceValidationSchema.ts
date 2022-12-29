/*
 * Copyright (C) 2021-2022 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import * as Yup from 'yup';

const createDeviceValidationSchema = () => {
  return Yup.object({
    name: Yup.string()
      .label('device name')
      .required()
      .max(255),
    deviceCategoryId: Yup.object().shape({
      value: Yup.string().required(),
      label: Yup.string()
        .label('device category')
        .required()
    })
      .label('device category')
      .nullable()
      .required()
  });
};

export default createDeviceValidationSchema;
