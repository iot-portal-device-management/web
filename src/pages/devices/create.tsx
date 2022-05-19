import PageTitle from '../../components/PageTitle';
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
import { useDevice } from '../../hooks/useDevice';
import { camelizeObjectPropertyAndSanitizeOptions } from '../../utils/utils';
import { LoadingButton } from '@mui/lab';

interface Values {
  name: string;
  device_category: string;
}

export interface deviceCategoryOptions {
  label: string;
  value: string;
}

const CreateDevicePage: NextPageWithLayout = () => {
  const [deviceCategoryInputValue, setDeviceCategoryInputValue] = useState('');
  const { options, isLoading, isError } = useDeviceCategoryOptions(deviceCategoryInputValue)
  const { createDevice } = useDevice();

  // const formRef = useRef<FormikProps<FormModel>>(null);

  // const handleSubmit = () => {
  //   if (formRef.current) {
  //     formRef.current.handleSubmit();
  //   }
  // };

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
              <Formik
                enableReinitialize={true}
                initialValues={{
                  name: '',
                  device_category: '',
                }}
                // validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                  createDevice(camelizeObjectPropertyAndSanitizeOptions(values));
                }}
              >
                {({ handleSubmit, isSubmitting }: FormikProps<Values>) => (
                  <>
                    <CardHeader title="Create new device"/>
                    <Divider/>
                    <CardContent>
                      <Box
                        component="form"
                        sx={{ p: 1 }}
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubmit}
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
                          id="device_category"
                          name="device_category"
                          label="Device category"
                          placeholder="Select a device category"
                          options={options ?? []}
                          isLoading={isLoading}
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
                      <LoadingButton sx={{ margin: 1 }} variant="contained" type="submit" loading={isSubmitting}>
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
    </>
  );
};

CreateDevicePage.getLayout = function getLayout(page: ReactElement) {
  return getSidebarLayout('Create device', page);
};

export default CreateDevicePage;
