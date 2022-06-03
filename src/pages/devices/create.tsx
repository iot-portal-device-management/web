import PageTitle from '../../components/PageTitle';
import * as React from 'react';
import { ReactElement, useState } from 'react';

import PageTitleWrapper from '../../components/PageTitleWrapper';
import { Card, CardActions, CardContent, CardHeader, Container, Divider, Grid } from '@mui/material';
import Footer from '../../components/Footer';

import Box from '@mui/material/Box';
import { NextPageWithLayout } from '../_app';
import { getSidebarLayout } from '../../layouts';
import { useDeviceCategoryOptions } from '../../hooks/useDeviceCategoryOptions';
import { Formik, FormikProps } from 'formik';
import FullWidthTextField from '../../components/FullWidthTextField';
import FullWidthAutoComplete from '../../components/FullWidthAutoComplete';
import { CreateDeviceProps, useDevice } from '../../hooks/useDevice';
import { sanitizeOptions } from '../../utils/utils';
import { LoadingButton } from '@mui/lab';
import { Toaster } from 'react-hot-toast';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import createDeviceValidationSchema from '../../validationSchemas/devices/createDeviceValidationSchema';

interface Values {
  name: string;
  deviceCategory: string;
}

export interface deviceCategoryOptions {
  label: string;
  value: string;
}

const CreateDevicePage: NextPageWithLayout = () => {
  const [errors, setErrors] = useState(null);
  const [deviceCategoryInputValue, setDeviceCategoryInputValue] = useState('');

  const { options: deviceCategoryOptions, isLoading, isError } = useDeviceCategoryOptions(deviceCategoryInputValue)
  const { createDevice } = useDevice();

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
                  deviceCategory: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                  createDevice({ setSubmitting, setErrors, ...sanitizeOptions(values) } as CreateDeviceProps);
                }}
              >
                {({ handleSubmit, isSubmitting }: FormikProps<Values>) => (
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
                          isLoading={isLoading}
                          errors={errors}
                          onInputChange={(event, value) => setDeviceCategoryInputValue(value)}
                          filterOptions={(x) => x}
                          isOptionEqualToValue={(option: deviceCategoryOptions, value: deviceCategoryOptions) =>
                            option.value === value.value
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
                        Create
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

CreateDevicePage.getLayout = function getLayout(page: ReactElement) {
  return getSidebarLayout('Create device', page);
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(locale && await serverSideTranslations(locale, ['validation'])),
  }
});

export default CreateDevicePage;
