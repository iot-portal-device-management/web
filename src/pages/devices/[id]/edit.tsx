import PageTitle from '../../../components/PageTitle';
import { ReactElement, useState } from 'react';
import PageTitleWrapper from '../../../components/PageTitleWrapper';
import { Card, CardActions, CardContent, CardHeader, Container, Divider, Grid } from '@mui/material';
import Footer from '../../../components/Footer';
import Box from '@mui/material/Box';
import { NextPageWithLayout } from '../../_app';
import { getSidebarLayout } from '../../../layouts';
import { useDeviceCategoryOptions } from '../../../hooks/useDeviceCategoryOptions';
import { Formik, FormikProps } from 'formik';
import FullWidthTextField from '../../../components/FullWidthTextField';
import FullWidthAutoComplete from '../../../components/FullWidthAutoComplete';
import { DeviceData, useDeviceCRUD } from '../../../hooks/device/useDeviceCRUD';
import { sanitizeOptions } from '../../../utils/utils';
import { LoadingButton } from '@mui/lab';
import { Toaster } from 'react-hot-toast';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useDevice } from '../../../hooks/device/useDevice';
import editDeviceValidationSchema from '../../../validationSchemas/device/editDeviceValidationSchema';
import { DeviceFormFormikValues } from '../../../types/device';

const EditDevicePage: NextPageWithLayout = () => {
  const router = useRouter();
  const deviceId = router.query.id as string;

  const [errors, setErrors] = useState<object | null>(null);
  const [deviceCategoryInputValue, setDeviceCategoryInputValue] = useState('');

  const { device, isDeviceLoading, isDeviceError } = useDevice(deviceId);
  const {
    deviceCategoryOptions,
    isDeviceCategoryOptionsLoading,
    isDeviceCategoryOptionsError
  } = useDeviceCategoryOptions(deviceCategoryInputValue)
  const { updateDevice } = useDeviceCRUD();

  const validationSchema = editDeviceValidationSchema();

  const transformedDevice = device ? {
    ...device,
    deviceCategory: { label: device.deviceCategory.name, value: device.deviceCategory.id }
  } : device;

  return (
    <>
      <PageTitleWrapper>
        <PageTitle
          heading="Edit device"
          subHeading="You can edit the device name and device category by entering the updated details below."
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
              <CardHeader title={`Device ${deviceId}`}/>
              <Divider/>
              <Formik
                enableReinitialize={true}
                initialValues={{
                  name: transformedDevice?.name ?? '',
                  deviceCategory: transformedDevice?.deviceCategory ?? null,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                  updateDevice(deviceId, sanitizeOptions(values) as DeviceData, { setErrors, setSubmitting });
                }}
              >
                {({ handleSubmit, isSubmitting }: FormikProps<DeviceFormFormikValues>) => (
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
                          id="name"
                          name="name"
                          label="Device name"
                          placeholder="Enter device name"
                          errors={errors}
                        />
                        <FullWidthAutoComplete
                          required
                          autoHighlight
                          id="deviceCategory"
                          name="deviceCategory"
                          label="Device category"
                          placeholder="Select a device category"
                          options={deviceCategoryOptions ?? []}
                          isLoading={isDeviceCategoryOptionsLoading}
                          errors={errors}
                          inputValue={deviceCategoryInputValue}
                          onInputChange={(event, value) => setDeviceCategoryInputValue(value)}
                          filterOptions={(x) => x}
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
                        Update
                      </LoadingButton>
                    </CardActions>
                  </>
                )}
              </Formik>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer/>
      <Toaster/>
    </>
  );
};

EditDevicePage.getLayout = function getLayout(page: ReactElement) {
  return getSidebarLayout('Edit deviceStatus', page);
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(locale && await serverSideTranslations(locale, ['validation']))
  }
});

export default EditDevicePage;
