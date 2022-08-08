import PageTitle from '../../../components/PageTitle';
import { ReactElement, useState } from 'react';
import PageTitleWrapper from '../../../components/PageTitleWrapper';
import { Box, Card, CardActions, CardContent, CardHeader, Container, Divider, Grid } from '@mui/material';
import Footer from '../../../components/Footer';
import { NextPageWithLayout } from '../../_app';
import { getSidebarLayout } from '../../../layouts';
import { Formik, FormikProps } from 'formik';
import FullWidthTextField from '../../../components/FullWidthTextField';
import { Toaster } from 'react-hot-toast';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import CardActionsLoadingButton from '../../../components/CardActionsLoadingButton';
import FullWidthAutoComplete from '../../../components/FullWidthAutoComplete';
import { useDeviceGroupOptions } from '../../../hooks/deviceGroup/useDeviceGroupOptions';
import { useSavedDeviceCommandOptions } from '../../../hooks/savedDeviceCommand/useSavedDeviceCommandOptions';
import { CreateDeviceJobFormFormikValues } from '../../../types/deviceJob';

const CreateDeviceJobPage: NextPageWithLayout = () => {
  const [deviceGroupInputValue, setDeviceGroupInputValue] = useState('');
  const [savedDeviceCommandInputValue, setSavedDeviceCommandInputValue] = useState('');

  const {
    deviceGroupOptions,
    isDeviceGroupOptionsLoading,
    isDeviceGroupOptionsError
  } = useDeviceGroupOptions(deviceGroupInputValue);

  const {
    savedDeviceCommandOptions,
    isSavedDeviceCommandOptionsLoading,
    isSavedDeviceCommandOptionsError
  } = useSavedDeviceCommandOptions(savedDeviceCommandInputValue);

  return (
    <>
      <PageTitleWrapper>
        <PageTitle
          heading="Create device job"
          subHeading="To create a new device job, enter a job name, select a device group and saved device command to proceed."
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
              <CardHeader title="Create new device job"/>
              <Divider/>
              <Formik
                enableReinitialize={true}
                initialValues={{
                  name: '',
                  deviceGroupId: null,
                  savedDeviceCommandId: null,
                } as CreateDeviceJobFormFormikValues
                }
                // validationSchema={validationSchema}
                onSubmit={(values, { setErrors, setSubmitting }) => {
                  // handleFormSubmit(values, { setErrors, setSubmitting });
                }}
              >
                {({ handleSubmit, isSubmitting }: FormikProps<CreateDeviceJobFormFormikValues>) => (
                  <>
                    <CardContent>
                      <Box sx={{ p: 1 }}>
                        <Box
                          component="form"
                          noValidate
                          autoComplete="off"
                        >
                          <FullWidthTextField
                            required
                            id="name"
                            name="name"
                            label="Device job name"
                            placeholder="Enter device job name"
                          />
                          <FullWidthAutoComplete
                            required
                            autoHighlight
                            id="deviceGroupId"
                            name="deviceGroupId"
                            label="Device group"
                            placeholder="Select a device group"
                            options={deviceGroupOptions ?? []}
                            isLoading={isDeviceGroupOptionsLoading}
                            inputValue={deviceGroupInputValue}
                            onInputChange={(event, value) => setDeviceGroupInputValue(value)}
                            filterOptions={(x) => x}
                          />
                          <FullWidthAutoComplete
                            required
                            autoHighlight
                            id="savedDeviceCommandId"
                            name="savedDeviceCommandId"
                            label="Saved device command"
                            placeholder="Select a saved device command"
                            options={savedDeviceCommandOptions ?? []}
                            isLoading={isSavedDeviceCommandOptionsLoading}
                            inputValue={savedDeviceCommandInputValue}
                            onInputChange={(event, value) => setSavedDeviceCommandInputValue(value)}
                            filterOptions={(x) => x}
                          />
                        </Box>
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

CreateDeviceJobPage.getLayout = function getLayout(page: ReactElement) {
  return getSidebarLayout('Create device job', page);
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(locale && await serverSideTranslations(locale, ['validation'])),
  }
});

export default CreateDeviceJobPage;
