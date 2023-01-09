/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import PageTitle from '../../components/PageTitle';
import { ReactElement, useState } from 'react';
import PageTitleWrapper from '../../components/PageTitleWrapper';
import { Box, Card, CardActions, CardContent, CardHeader, Container, Divider, Grid } from '@mui/material';
import Footer from '../../components/Footer';
import { NextPageWithLayout } from '../_app';
import { getSidebarLayout } from '../../layouts';
import { useDeviceCategoryOptions } from '../../hooks/deviceCategory/useDeviceCategoryOptions';
import { Formik, FormikProps } from 'formik';
import FullWidthTextField from '../../components/FullWidthTextField';
import { DeviceData, useDeviceCRUD } from '../../hooks/device/useDeviceCRUD';
import { sanitizeOptions } from '../../utils/utils';
import { Toaster } from 'react-hot-toast';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import createDeviceValidationSchema from '../../validationSchemas/device/createDeviceValidationSchema';
import { CreateDeviceFormFormikValues } from '../../types/device';
import FullWidthAutoComplete from '../../components/FullWidthAutoComplete';
import CardActionsLoadingButton from '../../components/CardActionsLoadingButton';

const CreateDevicePage: NextPageWithLayout = () => {
  const [deviceCategoryInputValue, setDeviceCategoryInputValue] = useState('');

  const {
    deviceCategoryOptions,
    deviceCategoryOptionsError,
    isDeviceCategoryOptionsLoading
  } = useDeviceCategoryOptions(deviceCategoryInputValue);

  const { createDevice } = useDeviceCRUD();

  const validationSchema = createDeviceValidationSchema();

  return (
    <>
      <PageTitleWrapper>
        <PageTitle
          heading="Create device"
          subHeading="To create a new device, enter a device name and select a device category."
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
              <CardHeader title="Create new device"/>
              <Divider/>
              <Formik
                enableReinitialize={true}
                initialValues={{
                  name: '',
                  deviceCategoryId: null,
                } as CreateDeviceFormFormikValues
                }
                validationSchema={validationSchema}
                onSubmit={(values, { setErrors, setSubmitting }) => {
                  createDevice(sanitizeOptions(values) as DeviceData, { setErrors, setSubmitting });
                }}
              >
                {({ handleSubmit, isSubmitting }: FormikProps<CreateDeviceFormFormikValues>) => (
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
                        Create
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

CreateDevicePage.getLayout = function getLayout(page: ReactElement) {
  return getSidebarLayout('Create device', page);
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(locale && await serverSideTranslations(locale, ['validation'])),
  }
});

export default CreateDevicePage;
