import PageTitle from '../../components/PageTitle';
import { ReactElement, useState } from 'react';
import PageTitleWrapper from '../../components/PageTitleWrapper';
import { Box, Card, CardActions, CardContent, CardHeader, Container, Divider, Grid } from '@mui/material';
import Footer from '../../components/Footer';
import { NextPageWithLayout } from '../_app';
import { getSidebarLayout } from '../../layouts';
import { useDeviceCategoryOptions } from '../../hooks/useDeviceCategoryOptions';
import { Formik, FormikProps } from 'formik';
import FullWidthTextField from '../../components/FullWidthTextField';
import { DeviceData, useDeviceCRUD } from '../../hooks/device/useDeviceCRUD';
import { sanitizeOptions } from '../../utils/utils';
import { LoadingButton } from '@mui/lab';
import { Toaster } from 'react-hot-toast';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import createDeviceValidationSchema from '../../validationSchemas/device/createDeviceValidationSchema';
import { DeviceFormFormikValues, NullableDeviceCategoryOption } from '../../types/device';
import FullWidthAutoComplete from '../../components/FullWidthAutoComplete';

const CreateDevicePage: NextPageWithLayout = () => {
  const [errors, setErrors] = useState<object | null>(null);
  const [deviceCategoryInputValue, setDeviceCategoryInputValue] = useState('');

  const {
    deviceCategoryOptions,
    isDeviceCategoryOptionsLoading,
    isDeviceCategoryOptionsError
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
                  deviceCategory: null as NullableDeviceCategoryOption,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                  createDevice(sanitizeOptions(values) as DeviceData, { setErrors, setSubmitting });
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
