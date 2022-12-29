/*
 * Copyright (C) 2021-2022 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import * as Yup from 'yup';

const createDeviceJobValidationSchema = () => {
  return Yup.object({
    name: Yup.string()
      .label('device job name')
      .required()
      .max(255),
    deviceGroupId: Yup.object().shape({
      value: Yup.string().required(),
      label: Yup.string()
        .label('device group')
        .required(),
    })
      .label('device group')
      .nullable()
      .required(),
    savedDeviceCommandId: Yup.object().shape({
      value: Yup.string().required(),
      label: Yup.string()
        .label('saved device command')
        .required(),
    })
      .label('saved device command')
      .nullable()
      .required()
  });
};

export default createDeviceJobValidationSchema;
