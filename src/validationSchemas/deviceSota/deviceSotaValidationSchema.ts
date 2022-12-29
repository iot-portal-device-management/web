/*
 * Copyright (C) 2021-2022 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import * as Yup from 'yup';

import { DEVICE_SOTA_COMMAND_OPTIONS, DEVICE_SOTA_LOG_TO_FILE_OPTIONS, DEVICE_SOTA_OPTIONS } from '../../data/deviceSota/options';
import { DeviceSotaFormField, DeviceSotaFormFieldsHiddenState } from '../../types/deviceSota';
import { ValidationObject } from '../../types/validationSchema';

const deviceSotaValidationSchema = (fieldsHidden: DeviceSotaFormFieldsHiddenState) => {
  const validationObject: ValidationObject<DeviceSotaFormField> = {
    sota_option: Yup.object().shape({
      value: Yup.string().required(),
      label: Yup.string()
        .label('SOTA option')
        .required()
        .oneOf(DEVICE_SOTA_OPTIONS.map(({ label }) => label))
    })
      .label('SOTA option')
      .nullable()
      .required(),
    cmd: Yup.object().shape({
      value: Yup.string().required(),
      label: Yup.string()
        .label('command')
        .required()
        .oneOf(DEVICE_SOTA_COMMAND_OPTIONS.map(({ label }) => label))
    })
      .label('command')
      .nullable()
      .required(),
  };

  if (!fieldsHidden.fetch) validationObject.fetch = Yup.string().label('fetch link').required();

  if (!fieldsHidden.log_to_file) {
    validationObject.log_to_file = Yup.object().shape({
      value: Yup.string(),
      label: Yup.string()
        .label('log to file')
        .required()
        .oneOf(DEVICE_SOTA_LOG_TO_FILE_OPTIONS.map(({ label }) => label))
    })
      .label('log to file')
      .nullable()
      .required();
  }

  if (!fieldsHidden.username) validationObject.username = Yup.string().label('username');
  if (!fieldsHidden.password) validationObject.password = Yup.string().label('password');

  return Yup.object(validationObject);
};

export default deviceSotaValidationSchema;
