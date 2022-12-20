import { forwardRef, ReactNode, useImperativeHandle, useRef } from 'react';
import { Box, Card, CardActions, CardContent, Divider } from '@mui/material';
import LargeCardHeader from '../LargeCardHeader';
import { Formik, FormikProps } from 'formik';
import FullWidthTextField from '../FullWidthTextField';
import { sanitizeFormValues } from '../../utils/utils';
import { DeviceFotaFormFormikValues, DeviceFotaPayload } from '../../types/deviceFota';
import deviceFotaValidationSchema from '../../validationSchemas/deviceFota/deviceFotaValidationSchema';
import CardActionsLoadingButton from '../CardActionsLoadingButton';
import isFunction from 'lodash/isFunction';
import { DeviceAotaFormFormikValues } from '../../types/deviceAota';
import { FormFormikActions } from '../../types/formik';

interface DeviceFotaFormCardProps {
  submitButtonChildren?: ReactNode;
  onSubmit: (data: DeviceFotaPayload, formFormikActions: FormFormikActions<DeviceAotaFormFormikValues>) => void;
}

const DeviceFotaFormCard = forwardRef(({ submitButtonChildren, onSubmit }: DeviceFotaFormCardProps, ref) => {
  const formRef = useRef<FormikProps<DeviceFotaFormFormikValues>>(null);

  useImperativeHandle(ref, () => formRef.current);

  const validationSchema = deviceFotaValidationSchema();

  return (
    <Card>
      <LargeCardHeader
        title="Firmware OTA update"
        subheader="Trigger firmware OTA update for device"
      />
      <Divider/>
      <Formik
        innerRef={formRef}
        enableReinitialize={true}
        initialValues={{
          biosversion: '',
          fetch: '',
          manufacturer: '',
          path: '',
          product: '',
          releasedate: '',
          signature: '',
          tooloptions: '',
          vendor: '',
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
        {({ handleSubmit, isSubmitting }: FormikProps<DeviceFotaFormFormikValues>) => (
          <>
            <CardContent>
              <Box
                component="form"
                sx={{ p: 1 }}
                noValidate
                autoComplete="off"
              >
                <FullWidthTextField
                  required
                  id="biosversion"
                  name="biosversion"
                  label="BIOS version"
                  placeholder="Enter BIOS version"
                />
                <FullWidthTextField
                  required
                  id="fetch"
                  name="fetch"
                  label="Fetch link"
                  placeholder="Enter fetch link"
                />
                <FullWidthTextField
                  required
                  id="manufacturer"
                  name="manufacturer"
                  label="Manufacturer"
                  placeholder="Enter manufacturer"
                />
                <FullWidthTextField
                  id="path"
                  name="path"
                  label="Path"
                  placeholder="Enter path"
                />
                <FullWidthTextField
                  required
                  id="product"
                  name="product"
                  label="Product"
                  placeholder="Enter product"
                />
                <FullWidthTextField
                  required
                  id="releasedate"
                  name="releasedate"
                  label="Release date"
                  placeholder="Enter release date"
                />
                <FullWidthTextField
                  id="signature"
                  name="signature"
                  label="Signature"
                  placeholder="Enter signature"
                />
                <FullWidthTextField
                  id="tooloptions"
                  name="tooloptions"
                  label="Tool options"
                  placeholder="Enter tool options"
                />
                <FullWidthTextField
                  required
                  id="vendor"
                  name="vendor"
                  label="Vendor"
                  placeholder="Enter vendor"
                />
                <FullWidthTextField
                  id="username"
                  name="username"
                  label="Server username"
                  placeholder="Enter server username"
                />
                <FullWidthTextField
                  id="password"
                  name="password"
                  label="Server password"
                  placeholder="Enter server password"
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

export default DeviceFotaFormCard;
