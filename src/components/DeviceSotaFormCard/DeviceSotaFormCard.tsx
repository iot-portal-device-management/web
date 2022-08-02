import { forwardRef, ReactNode, useImperativeHandle, useRef, useState } from 'react';
import { Box, Card, CardActions, CardContent, Divider } from '@mui/material';
import LargeCardHeader from '../LargeCardHeader';
import { Formik, FormikProps } from 'formik';
import FullWidthAutoComplete from '../FullWidthAutoComplete';
import {
  SOTA_COMMAND_OPTIONS,
  SOTA_FIELDS_HIDDEN_STATES,
  SOTA_INITIAL_FIELDS_HIDDEN_STATE,
  SOTA_LOG_TO_FILE_OPTIONS,
  SOTA_OPTIONS
} from '../../data/sota/options';
import FullWidthTextField from '../FullWidthTextField';
import { BaseOption } from '../../types/option';
import { sanitizeFormValues } from '../../utils/utils';
import { SotaFormFormikValues, SotaOptionValue, SotaPayload } from '../../types/sota';
import sotaValidationSchema from '../../validationSchemas/sota/sotaValidationSchema';
import CardActionsLoadingButton from '../CardActionsLoadingButton';
import { AotaFormFormikValues } from '../../types/aota';
import { FormFormikActions } from '../../types/formik';
import isFunction from 'lodash/isFunction';

interface DeviceSotaFormCardProps {
  submitButtonChildren?: ReactNode;
  onSubmit: (data: SotaPayload, formFormikActions: FormFormikActions<AotaFormFormikValues>) => void;
}

const DeviceSotaFormCard = forwardRef(({ submitButtonChildren, onSubmit }: DeviceSotaFormCardProps, ref) => {
  const formRef = useRef<FormikProps<SotaFormFormikValues>>(null);

  useImperativeHandle(ref, () => formRef.current);

  const [fieldsHidden, setFieldsHidden] = useState(SOTA_INITIAL_FIELDS_HIDDEN_STATE);

  const resetForm = () => {
    setFieldsHidden(SOTA_INITIAL_FIELDS_HIDDEN_STATE);

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
      setFieldsHidden(SOTA_FIELDS_HIDDEN_STATES[selectedOption.value as SotaOptionValue]);
    } else if (name === 'sota_option' && !selectedOption) {
      resetForm();
    }
  };

  const validationSchema = sotaValidationSchema(fieldsHidden);

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
          cmd: SOTA_COMMAND_OPTIONS[0],
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
        {({ handleSubmit, isSubmitting }: FormikProps<SotaFormFormikValues>) => (
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
                  options={SOTA_OPTIONS}
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
                  options={SOTA_COMMAND_OPTIONS}
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
                  options={SOTA_LOG_TO_FILE_OPTIONS}
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
