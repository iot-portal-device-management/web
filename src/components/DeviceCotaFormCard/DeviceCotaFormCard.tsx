import { forwardRef, ReactNode, useImperativeHandle, useRef, useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, Divider, Grid, IconButton } from '@mui/material';
import LargeCardHeader from '../LargeCardHeader';
import { FieldArray, Formik, FormikProps } from 'formik';
import FullWidthAutoComplete from '../FullWidthAutoComplete';
import FullWidthTextField from '../FullWidthTextField';
import { BaseOption } from '../../types/option';
import { sanitizeFormValues } from '../../utils/utils';
import DeviceCotaConfiguration from '../../models/DeviceCotaConfiguration';
import { DeviceCotaCommandOptionValue, DeviceCotaFormFormikValues, DeviceCotaPayload } from '../../types/deviceCota';
import {
  DEVICE_COTA_COMMAND_OPTIONS,
  DEVICE_COTA_CONFIGURATION_PATH_OPTIONS,
  DEVICE_COTA_FIELDS_HIDDEN_STATES,
  DEVICE_COTA_INITIAL_FIELDS_HIDDEN_STATE
} from '../../data/deviceCota/options';
import deviceCotaValidationSchema from '../../validationSchemas/deviceCota/deviceCotaValidationSchema';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import CardActionsLoadingButton from '../CardActionsLoadingButton';
import { FormFormikActions } from '../../types/formik';
import { DeviceAotaFormFormikValues } from '../../types/deviceAota';
import isFunction from 'lodash/isFunction';

interface DeviceCotaFormCardProps {
  submitButtonChildren?: ReactNode;
  onSubmit: (data: DeviceCotaPayload, formFormikActions: FormFormikActions<DeviceAotaFormFormikValues>) => void;
}

const DeviceCotaFormCard = forwardRef(({ submitButtonChildren, onSubmit }: DeviceCotaFormCardProps, ref) => {
  const formRef = useRef<FormikProps<DeviceCotaFormFormikValues>>(null);

  useImperativeHandle(ref, () => formRef.current);

  const [fieldsHidden, setFieldsHidden] = useState(DEVICE_COTA_INITIAL_FIELDS_HIDDEN_STATE);

  const resetForm = () => {
    setFieldsHidden(DEVICE_COTA_INITIAL_FIELDS_HIDDEN_STATE);

    if (formRef.current) {
      formRef.current.resetForm();
    }
  };

  const updateFormFields = (name: string, selectedOption: BaseOption) => {
    if (name === 'cmd' && selectedOption) {
      // We reset the form so that all form fields will be cleared and set the 'sota_option' input field to the
      // selected option after the reset so that the value is not lost.
      resetForm();
      formRef?.current?.setFieldValue('cmd', selectedOption);
      setFieldsHidden(DEVICE_COTA_FIELDS_HIDDEN_STATES[selectedOption.value as DeviceCotaCommandOptionValue]);
    } else if (name === 'cmd' && !selectedOption) {
      resetForm();
    }
  };

  const validationSchema = deviceCotaValidationSchema(fieldsHidden);

  return (
    <Card>
      <LargeCardHeader
        title="Configuration OTA update"
        subheader="Trigger configuration OTA update for device"
      />
      <Divider/>
      <Formik
        innerRef={formRef}
        enableReinitialize={true}
        initialValues={{
          cmd: null,
          fetch: '',
          configurations: [new DeviceCotaConfiguration()],
          signature: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (isFunction(onSubmit)) {
            onSubmit(sanitizeFormValues(values), { setSubmitting });
          }
        }}
      >
        {({ values, handleSubmit, isSubmitting }: FormikProps<DeviceCotaFormFormikValues>) => (
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
                  id="cmd"
                  name="cmd"
                  label="Command (get, load, set, append, remove)"
                  placeholder="Enter your command"
                  options={DEVICE_COTA_COMMAND_OPTIONS}
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
                {!fieldsHidden.configurations && (
                  <FieldArray
                    name="configurations"
                    render={arrayHelpers => (
                      values.configurations && values.configurations.length > 0 ? (
                        values.configurations.map((configuration, index) => (
                          <Grid key={index} container spacing={2}>
                            <Grid item xs={fieldsHidden.configuration_values ? 10 : 5}>
                              <FullWidthAutoComplete
                                required
                                id={`configurations.${index}.path`}
                                name={`configurations.${index}.path`}
                                placeholder={`Enter configuration path ${index + 1}`}
                                options={DEVICE_COTA_CONFIGURATION_PATH_OPTIONS}
                              />
                            </Grid>
                            {!fieldsHidden.configuration_values && (
                              <Grid item xs={5}>
                                <FullWidthTextField
                                  required
                                  id={`configurations.${index}.value`}
                                  name={`configurations.${index}.value`}
                                  placeholder={`Enter configuration value ${index + 1}`}
                                />
                              </Grid>
                            )}
                            <Grid item xs={2} display="flex" alignItems="center">
                              {values.configurations.length > 1 && (
                                <IconButton
                                  color="error"
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  <RemoveCircleTwoToneIcon/>
                                </IconButton>
                              )}
                              <IconButton
                                color="success"
                                onClick={() => arrayHelpers.insert(index + 1, new DeviceCotaConfiguration())}
                              >
                                <AddCircleTwoToneIcon/>
                              </IconButton>
                            </Grid>
                          </Grid>
                        ))
                      ) : (
                        <Button
                          variant="contained"
                          startIcon={<AddCircleTwoToneIcon/>}
                          onClick={() => arrayHelpers.push(new DeviceCotaConfiguration())}
                        >
                          Add configuration
                        </Button>
                      )
                    )}
                  />
                )}
                <FullWidthTextField
                  required
                  id="signature"
                  name="signature"
                  label="Signature"
                  placeholder="Enter signature"
                  hidden={fieldsHidden.signature}
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

export default DeviceCotaFormCard;
