import { useRef } from 'react';
import { Box, Card, CardActions, CardContent, Divider } from '@mui/material';
import SubtitleCardHeader from '../SubtitleCardHeader';
import { Formik, FormikProps } from 'formik';
import { LoadingButton } from '@mui/lab';
import FullWidthTextField from '../FullWidthTextField';
import { sanitizeFormValues } from '../../utils/utils';
import { FotaFormFormikValues } from '../../types/fota';
import fotaValidationSchema from '../../validationSchemas/fota/fotaValidationSchema';
import { useFota } from '../../hooks/fota/useFota';

interface DeviceFotaTabProps {
  deviceId: string;
}

const DeviceFotaTab = ({ deviceId }: DeviceFotaTabProps) => {
  const formRef = useRef<FormikProps<FotaFormFormikValues>>(null);

  const { submitFota } = useFota();

  const validationSchema = fotaValidationSchema();

  return (
    <Card>
      <SubtitleCardHeader title="Firmware OTA update" subheader="Trigger firmware OTA update for device"/>
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
          submitFota(deviceId, sanitizeFormValues(values), { setSubmitting });
        }}
      >
        {({ handleSubmit, isSubmitting }: FormikProps<FotaFormFormikValues>) => (
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

export default DeviceFotaTab;
