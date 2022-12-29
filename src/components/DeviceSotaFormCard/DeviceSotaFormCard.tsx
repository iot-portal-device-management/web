/*
 * Copyright (C) 2021-2022 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { forwardRef, ReactNode, useImperativeHandle, useRef, useState } from 'react';
import { Box, Card, CardActions, CardContent, Divider } from '@mui/material';
import LargeCardHeader from '../LargeCardHeader';
import { Formik, FormikProps } from 'formik';
import FullWidthAutoComplete from '../FullWidthAutoComplete';
import {
  DEVICE_SOTA_COMMAND_OPTIONS,
  DEVICE_SOTA_FIELDS_HIDDEN_STATES,
  DEVICE_SOTA_INITIAL_FIELDS_HIDDEN_STATE,
  DEVICE_SOTA_LOG_TO_FILE_OPTIONS,
  DEVICE_SOTA_OPTIONS
} from '../../data/deviceSota/options';
import FullWidthTextField from '../FullWidthTextField';
import { BaseOption } from '../../types/option';
import { sanitizeFormValues } from '../../utils/utils';
import { DeviceSotaFormFormikValues, DeviceSotaOptionValue, DeviceSotaPayload } from '../../types/deviceSota';
import deviceSotaValidationSchema from '../../validationSchemas/deviceSota/deviceSotaValidationSchema';
import CardActionsLoadingButton from '../CardActionsLoadingButton';
import { DeviceAotaFormFormikValues } from '../../types/deviceAota';
import { FormFormikActions } from '../../types/formik';
import isFunction from 'lodash/isFunction';

interface DeviceSotaFormCardProps {
  submitButtonChildren?: ReactNode;
  onSubmit: (data: DeviceSotaPayload, formFormikActions: FormFormikActions<DeviceAotaFormFormikValues>) => void;
}

const DeviceSotaFormCard = forwardRef(({ submitButtonChildren, onSubmit }: DeviceSotaFormCardProps, ref) => {
  const formRef = useRef<FormikProps<DeviceSotaFormFormikValues>>(null);

  useImperativeHandle(ref, () => formRef.current);

  const [fieldsHidden, setFieldsHidden] = useState(DEVICE_SOTA_INITIAL_FIELDS_HIDDEN_STATE);

  const resetForm = () => {
    setFieldsHidden(DEVICE_SOTA_INITIAL_FIELDS_HIDDEN_STATE);

    if (formRef.current) {
      formRef.current.resetForm();
    }
  };

  const updateFormFields = (name: string, selectedOption: BaseOption) => {
    if (name === 'sota_option' && selectedOption) {
      // We reset the form so that all form fields will be cleared and set the 'sota_option' input field to the
      // selected option after the reset so that the value is not lost.
      resetForm();
      formRef?.current?.setFieldValue('sota_option', selectedOption);
      setFieldsHidden(DEVICE_SOTA_FIELDS_HIDDEN_STATES[selectedOption.value as DeviceSotaOptionValue]);
    } else if (name === 'sota_option' && !selectedOption) {
      resetForm();
    }
  };

  const validationSchema = deviceSotaValidationSchema(fieldsHidden);

  return (
    <Card>
      <LargeCardHeader
        title="Software OTA update"
        subheader="Trigger software OTA update for device"
      />
      <Divider/>
      <Formik
        innerRef={formRef}
        enableReinitialize={true}
        initialValues={{
          sota_option: null,
          cmd: DEVICE_SOTA_COMMAND_OPTIONS[0],
          fetch: '',
          log_to_file: null,
          username: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (isFunction(onSubmit)) {
            onSubmit(sanitizeFormValues(values), { setSubmitting });
          }
        }}
      >
        {({ handleSubmit, isSubmitting }: FormikProps<DeviceSotaFormFormikValues>) => (
          <>
            <CardContent>
              <Box
                component="form"
                sx={{ p: 1 }}
                noValidate
                autoComplete="off"
              >
                <FullWidthAutoComplete
                  required
                  id="sota_option"
                  name="sota_option"
                  label="SOTA option"
                  placeholder="Enter your SOTA option"
                  options={DEVICE_SOTA_OPTIONS}
                  optionChangeCallback={updateFormFields}
                  hidden={fieldsHidden.sota_option}
                />
                <FullWidthAutoComplete
                  required
                  disableClearable
                  id="cmd"
                  name="cmd"
                  label="Command"
                  placeholder="Enter your command"
                  options={DEVICE_SOTA_COMMAND_OPTIONS}
                  optionChangeCallback={updateFormFields}
                  hidden={fieldsHidden.cmd}
                />
                <FullWidthTextField
                  required
                  id="fetch"
                  name="fetch"
                  label="Fetch link"
                  placeholder="Enter fetch link"
                  hidden={fieldsHidden.fetch}
                />
                <FullWidthAutoComplete
                  required
                  id="log_to_file"
                  name="log_to_file"
                  label="Log to file (No, Yes)"
                  placeholder="Log to file (No, Yes)"
                  options={DEVICE_SOTA_LOG_TO_FILE_OPTIONS}
                  hidden={fieldsHidden.log_to_file}
                />
                <FullWidthTextField
                  id="username"
                  name="username"
                  label="Username"
                  placeholder="Enter username"
                  hidden={fieldsHidden.username}
                />
                <FullWidthTextField
                  id="password"
                  name="password"
                  label="Password"
                  placeholder="Enter password"
                  hidden={fieldsHidden.password}
                />
              </Box>
            </CardContent>
            <Divider/>
            <CardActions>
              <CardActionsLoadingButton
                loading={isSubmitting}
                onClick={() => handleSubmit()}
              >
                {submitButtonChildren ?? 'Submit'}
              </CardActionsLoadingButton>
            </CardActions>
          </>
        )}
      </Formik>
    </Card>
  );
});

export default DeviceSotaFormCard;
