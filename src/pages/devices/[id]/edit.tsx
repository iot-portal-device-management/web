/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import PageTitle from '../../../components/PageTitle';
import { ReactElement, useState } from 'react';
import PageTitleWrapper from '../../../components/PageTitleWrapper';
import { Box, Card, CardActions, CardContent, CardHeader, Container, Divider, Grid } from '@mui/material';
import Footer from '../../../components/Footer';
import { NextPageWithLayout } from '../../_app';
import { getSidebarLayout } from '../../../layouts';
import { useDeviceCategoryOptions } from '../../../hooks/deviceCategory/useDeviceCategoryOptions';
import { Formik, FormikProps } from 'formik';
import FullWidthTextField from '../../../components/FullWidthTextField';
import FullWidthAutoComplete from '../../../components/FullWidthAutoComplete';
import { DeviceData, useDeviceCRUD } from '../../../hooks/device/useDeviceCRUD';
import { sanitizeOptions } from '../../../utils/utils';
import { Toaster } from 'react-hot-toast';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useDevice } from '../../../hooks/device/useDevice';
import editDeviceValidationSchema from '../../../validationSchemas/device/editDeviceValidationSchema';
import { EditDeviceFormFormikValues } from '../../../types/device';
import CardActionsLoadingButton from '../../../components/CardActionsLoadingButton';
import CustomizedError from '../../../components/CustomizedError';

const EditDevicePage: NextPageWithLayout = () => {
  const router = useRouter();
  const deviceId = router.query.id as string;

  const [deviceCategoryInputValue, setDeviceCategoryInputValue] = useState('');

  const { device, deviceError, isDeviceLoading } = useDevice(deviceId);
  const {
    deviceCategoryOptions,
    deviceCategoryOptionsError,
    isDeviceCategoryOptionsLoading
  } = useDeviceCategoryOptions(deviceCategoryInputValue)
  const { updateDevice } = useDeviceCRUD();

  const validationSchema = editDeviceValidationSchema();

  const transformedDevice = device ? {
    ...device,
    deviceCategoryId: { label: device.deviceCategory.name, value: device.deviceCategory.id }
  } : device;

  if (deviceError) return <CustomizedError statusCode={deviceError?.response?.status}/>;

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
                  deviceCategoryId: transformedDevice?.deviceCategoryId ?? null,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setErrors, setSubmitting }) => {
                  updateDevice(deviceId, sanitizeOptions(values) as DeviceData, { setErrors, setSubmitting });
                }}
              >
                {({ handleSubmit, isSubmitting }: FormikProps<EditDeviceFormFormikValues>) => (
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
                        />
                        <FullWidthAutoComplete
                          required
                          autoHighlight
                          id="deviceCategoryId"
                          name="deviceCategoryId"
                          label="Device category"
                          placeholder="Select a device category"
                          options={deviceCategoryOptions ?? []}
                          isLoading={isDeviceCategoryOptionsLoading}
                          inputValue={deviceCategoryInputValue}
                          onInputChange={(event, value) => setDeviceCategoryInputValue(value)}
                          filterOptions={(x) => x}
                        />
                      </Box>
                    </CardContent>
                    <Divider/>
                    <CardActions>
                      <CardActionsLoadingButton
                        loading={isSubmitting}
                        onClick={() => handleSubmit()}
                      >
                        Update
                      </CardActionsLoadingButton>
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
