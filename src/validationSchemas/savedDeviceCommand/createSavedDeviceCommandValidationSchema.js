/*
 * Copyright (C) 2021-2022 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import * as Yup from 'yup';

const createSavedDeviceCommandValidationSchema = () => {
  return Yup.object({
    name: Yup.string()
      .label('saved device command name')
      .required()
      .max(255),
  });
};

export default createSavedDeviceCommandValidationSchema;
