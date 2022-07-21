import { useRef, useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, Divider, Grid, IconButton } from '@mui/material';
import LargeCardHeader from '../LargeCardHeader';
import { FieldArray, Formik, FormikProps } from 'formik';
import FullWidthAutoComplete from '../FullWidthAutoComplete';
import { LoadingButton } from '@mui/lab';
import FullWidthTextField from '../FullWidthTextField';
import { BaseOption } from '../../types/option';
import { sanitizeFormValues } from '../../utils/utils';
import Configuration from '../../models/Configuration';
import { CotaCommandOptionValue, CotaFormFormikValues } from '../../types/cota';
import {
  COTA_COMMAND_OPTIONS,
  COTA_CONFIGURATION_PATH_OPTIONS,
  COTA_FIELDS_HIDDEN_STATES,
  COTA_INITIAL_FIELDS_HIDDEN_STATE
} from '../../data/cota/options';
import cotaValidationSchema from '../../validationSchemas/cota/cotaValidationSchema';
import { useCota } from '../../hooks/cota/useCota';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';

interface DeviceCotaTabProps {
  deviceId: string;
}

const DeviceCotaTab = ({ deviceId }: DeviceCotaTabProps) => {
  const formRef = useRef<FormikProps<CotaFormFormikValues>>(null);

  const [fieldsHidden, setFieldsHidden] = useState(COTA_INITIAL_FIELDS_HIDDEN_STATE);

  const { submitCota } = useCota();

  const resetForm = () => {
    setFieldsHidden(COTA_INITIAL_FIELDS_HIDDEN_STATE);

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
      setFieldsHidden(COTA_FIELDS_HIDDEN_STATES[selectedOption.value as CotaCommandOptionValue]);
    } else if (name === 'cmd' && !selectedOption) {
      resetForm();
    }
  };

  const validationSchema = cotaValidationSchema(fieldsHidden);

  return (
    <Grid item xs={12}>
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
            configurations: [new Configuration()],
            signature: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            submitCota(deviceId, sanitizeFormValues(values), { setSubmitting });
          }}
        >
          {({ values, handleSubmit, isSubmitting }: FormikProps<CotaFormFormikValues>) => (
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
                    options={COTA_COMMAND_OPTIONS}
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
                                  options={COTA_CONFIGURATION_PATH_OPTIONS}
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
                                  onClick={() => arrayHelpers.insert(index + 1, new Configuration())}
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
                            onClick={() => arrayHelpers.push(new Configuration())}
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
                <LoadingButton
                  sx={{ m: 1 }}
                  variant="contained"
                  loading={isSubmitting}
                  onClick={() => handleSubmit()}
                >
                  Submit
                </LoadingButton>
              </CardActions>
            </>
          )}
        </Formik>
      </Card>
    </Grid>
  );
};

export default DeviceCotaTab;
