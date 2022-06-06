import PageTitle from '../../../components/PageTitle';
import * as React from 'react';
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
import { DeviceData, useDeviceCRUD } from '../../../hooks/devices/useDeviceCRUD';
import { sanitizeOptions } from '../../../utils/utils';
import { LoadingButton } from '@mui/lab';
import { Toaster } from 'react-hot-toast';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useDevice } from '../../../hooks/devices/useDevice';
import editDeviceValidationSchema from '../../../validationSchemas/devices/editDeviceValidationSchema';
import { DeviceCategoryOption, DeviceFormikValues } from '../../../types/deviceCategories';

const EditDevicePage: NextPageWithLayout = () => {
  const router = useRouter();
  const deviceId = router.query.id;

  const [errors, setErrors] = useState<object | null>(null);
  const [deviceCategoryInputValue, setDeviceCategoryInputValue] = useState('');

  const { device, isDeviceLoading, isDeviceError } = useDevice(deviceId as string);
  const {
    deviceCategoryOptions,
    isDeviceCategoryOptionsLoading,
    isDeviceCategoryOptionsError
  } = useDeviceCategoryOptions(deviceCategoryInputValue)
  const { updateDevice } = useDeviceCRUD();

  const validationSchema = editDeviceValidationSchema();

  const transformedDevice = device ? {
    ...device,
    category: { value: device.device_category.id, label: device.device_category.name }
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
                  deviceCategory: transformedDevice?.category ?? null,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                  updateDevice(deviceId as string, sanitizeOptions(values) as DeviceData, { setSubmitting, setErrors });
                }}
              >
                {({ handleSubmit, isSubmitting }: FormikProps<DeviceFormikValues>) => (
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
                          id="deviceCategory"
                          name="deviceCategory"
                          label="Device category"
                          placeholder="Select a device category"
                          options={deviceCategoryOptions ?? []}
                          isLoading={isDeviceCategoryOptionsLoading}
                          errors={errors}
                          onInputChange={(event, value) => setDeviceCategoryInputValue(value)}
                          filterOptions={(x) => x}
                          isOptionEqualToValue={(option: DeviceCategoryOption, value: DeviceCategoryOption) =>
                            option?.value === value?.value
                          }
                        />
                      </Box>
                    </CardContent>
                    <Divider/>
                    <CardActions>
                      <LoadingButton
                        sx={{ m: 1 }}
                        variant="contained"
                        loading={isSubmitting}
                        onClick={() => {
                          handleSubmit();
                        }}
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
  return getSidebarLayout('Edit device', page);
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(locale && await serverSideTranslations(locale, ['validation']))
  }
});

export default EditDevicePage;
