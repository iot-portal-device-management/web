import { useRef, useState } from 'react';
import { Box, Card, CardActions, CardContent, Divider } from '@mui/material';
import SubtitleCardHeader from '../SubtitleCardHeader';
import { Formik, FormikProps } from 'formik';
import FullWidthAutoComplete from '../FullWidthAutoComplete';
import { LoadingButton } from '@mui/lab';
import {
  AOTA_APP_OPTIONS,
  AOTA_COMMAND_OPTIONS,
  AOTA_FIELDS_HIDDEN_STATES,
  AOTA_INITIAL_FIELDS_HIDDEN_STATE,
  AOTA_REBOOT_OPTIONS
} from '../../data/aota/options';
import FullWidthTextField from '../FullWidthTextField';
import { AotaAppOptionValue, AotaCommandOptionValue, AotaFormFormikValues } from '../../types/aota';
import { BaseOption } from '../../types/option';
import aotaValidationSchema from '../../validationSchemas/aota/aotaValidationSchema';
import { useAota } from '../../hooks/aota/useAota';
import { sanitizeFormValues } from '../../utils/utils';

interface DeviceAotaTabProps {
  deviceId: string;
}

const DeviceAotaTab = ({ deviceId }: DeviceAotaTabProps) => {
  const formRef = useRef<FormikProps<AotaFormFormikValues>>(null);

  const [fieldsHidden, setFieldsHidden] = useState(AOTA_INITIAL_FIELDS_HIDDEN_STATE);

  const { submitAota } = useAota();

  const resetForm = () => {
    setFieldsHidden(AOTA_INITIAL_FIELDS_HIDDEN_STATE);

    if (formRef.current) {
      formRef.current.resetForm();
    }
  };

  const updateFormFields = (name: string, selectedOption: BaseOption) => {
    if (name === 'app' && selectedOption) {
      // We reset the form so that all form fields will be cleared and set the 'app' input field to the selected option
      // after the reset so that the value is not lost.
      resetForm();
      formRef?.current?.setFieldValue('app', selectedOption);
      setFieldsHidden({ ...AOTA_INITIAL_FIELDS_HIDDEN_STATE, command: false });
    } else if (name === 'app' && !selectedOption) {
      resetForm();
    } else if (name === 'command' && selectedOption) {
      // @ts-ignore
      setFieldsHidden(AOTA_FIELDS_HIDDEN_STATES[formRef.current.values.app.value as AotaAppOptionValue][selectedOption.value as AotaCommandOptionValue]);
    }
  };

  const validationSchema = aotaValidationSchema(AOTA_COMMAND_OPTIONS[formRef.current?.values.app?.value as AotaAppOptionValue ?? 'docker'], fieldsHidden);

  return (
    <Card>
      <SubtitleCardHeader title="Application OTA Update" subheader="Trigger Application OTA Update for device"/>
      <Divider/>
      <Formik
        innerRef={formRef}
        enableReinitialize={true}
        initialValues={{
          app: null,
          command: null,
          containerTag: '',
          deviceReboot: null,
          fetch: '',
          signature: '',
          version: '',
          username: '',
          password: '',
          dockerRegistry: '',
          dockerUsername: '',
          dockerPassword: '',
          file: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          submitAota(deviceId, sanitizeFormValues(values), { setSubmitting });
        }}
      >
        {({ handleSubmit, isSubmitting }: FormikProps<AotaFormFormikValues>) => (
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
                  id="app"
                  name="app"
                  label="Application"
                  placeholder="Choose your application"
                  options={AOTA_APP_OPTIONS}
                  optionChangeCallback={updateFormFields}
                  hidden={fieldsHidden.app}
                />
                <FullWidthAutoComplete
                  required
                  id="command"
                  name="command"
                  label="Command"
                  placeholder="Enter your command"
                  options={AOTA_COMMAND_OPTIONS[formRef.current?.values.app?.value as AotaAppOptionValue ?? 'docker']}
                  optionChangeCallback={updateFormFields}
                  hidden={fieldsHidden.command}
                />
                <FullWidthTextField
                  required
                  id="containerTag"
                  name="containerTag"
                  label="Container tag"
                  placeholder="Enter container tag"
                  hidden={fieldsHidden.containerTag}
                />
                <FullWidthAutoComplete
                  required
                  id="deviceReboot"
                  name="deviceReboot"
                  label="Device reboot"
                  placeholder="Choose device reboot"
                  options={AOTA_REBOOT_OPTIONS}
                  hidden={fieldsHidden.deviceReboot}
                />
                <FullWidthTextField
                  required
                  id="fetch"
                  name="fetch"
                  label="Fetch link"
                  placeholder="Enter fetch link"
                  hidden={fieldsHidden.fetch}
                />
                <FullWidthTextField
                  required
                  id="signature"
                  name="signature"
                  label="Signature"
                  placeholder="Enter signature"
                  hidden={fieldsHidden.signature}
                />
                <FullWidthTextField
                  {...((formRef.current?.values.app?.value === 'docker'
                    && formRef.current?.values.command?.value === 'remove')
                    && { required: true })}
                  id="version"
                  name="version"
                  label="Version"
                  placeholder="Enter version"
                  hidden={fieldsHidden.version}
                />
                <FullWidthTextField
                  id="username"
                  name="username"
                  label="Server username"
                  placeholder="Enter server username"
                  hidden={fieldsHidden.username}
                />
                <FullWidthTextField
                  id="password"
                  name="password"
                  label="Server password"
                  placeholder="Enter server password"
                  hidden={fieldsHidden.password}
                />
                <FullWidthTextField
                  id="dockerRegistry"
                  name="dockerRegistry"
                  label="Docker registry"
                  placeholder="Enter Docker registry"
                  hidden={fieldsHidden.dockerRegistry}
                />
                <FullWidthTextField
                  id="dockerUsername"
                  name="dockerUsername"
                  label="Docker username"
                  placeholder="Enter Docker username"
                  hidden={fieldsHidden.dockerUsername}
                />
                <FullWidthTextField
                  id="dockerPassword"
                  name="dockerPassword"
                  label="Docker password"
                  placeholder="Enter Docker password"
                  hidden={fieldsHidden.dockerPassword}
                />
                <FullWidthTextField
                  id="file"
                  name="file"
                  label="Docker compose file"
                  placeholder="Enter Docker Compose file"
                  hidden={fieldsHidden.file}
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
  );
};

export default DeviceAotaTab;
