/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { useEffect } from 'react';
import { useField } from 'formik';
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { WithRequired } from '../../libs/utilityTypes';
import { isValidObject } from '../../utils/utils';
import { useTranslation } from 'next-i18next';
import { FieldHelperProps, FieldInputProps } from 'formik/dist/types';
import { TranslationFieldMetaProps } from '../../types/formik';

type FullWidthTextFieldProps = WithRequired<TextFieldProps, 'name'> & { errors?: any, hidden?: boolean };

const FullWidthTextField = ({ name, errors, hidden = false, ...rest }: FullWidthTextFieldProps) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [fieldInputProps, fieldMetaProps, fieldHelperProps]: [FieldInputProps<any>, TranslationFieldMetaProps<any>,
    FieldHelperProps<any>] = useField(name);
  const { t } = useTranslation('validation');

  useEffect(() => {
    if (errors && errors.hasOwnProperty(name)) {
      fieldHelperProps.setError(errors[name]);
    }
  }, [errors])

  const renderErrorMessage = () => {
    if (isString(fieldMetaProps.error)) {
      return fieldMetaProps.error;
    } else if (isValidObject(fieldMetaProps.error)
      && fieldMetaProps.error?.hasOwnProperty('key')
      && fieldMetaProps.error?.hasOwnProperty('values')) {
      return t(fieldMetaProps.error?.key, fieldMetaProps.error?.values)
    } else if (isArray(fieldMetaProps.error)
      && isString(fieldMetaProps.error[0])) {
      return fieldMetaProps.error[0];
    }

    return;
  };

  return hidden ? null : (
    <TextField
      fullWidth
      margin="normal"
      {...(fieldMetaProps.touched && fieldMetaProps.error && { error: true, helperText: renderErrorMessage() })}
      {...fieldInputProps}
      {...rest}
    />
  );
};

export default FullWidthTextField;
