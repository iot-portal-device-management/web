import PageTitle from '../../../../components/PageTitle';
import { ChangeEvent, ReactElement, useRef, useState } from 'react';
import PageTitleWrapper from '../../../../components/PageTitleWrapper';
import { Box, Card, CardActions, CardContent, CardHeader, Container, Divider, Grid, Tab } from '@mui/material';
import Footer from '../../../../components/Footer';
import { NextPageWithLayout } from '../../../_app';
import { getSidebarLayout } from '../../../../layouts';
import { Formik, FormikProps } from 'formik';
import FullWidthTextField from '../../../../components/FullWidthTextField';
import { Toaster } from 'react-hot-toast';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import CardActionsLoadingButton from '../../../../components/CardActionsLoadingButton';
import { useSavedDeviceCommandCRUD } from '../../../../hooks/savedDeviceCommand/useSavedDeviceCommandCRUD';
import { CreateSavedDeviceCommandFormFormikValues } from '../../../../types/savedDeviceCommand';
import createSavedDeviceCommandValidationSchema
  from '../../../../validationSchemas/savedDeviceCommand/createSavedDeviceCommandValidationSchema';
import TabsWrapper from '../../../../components/TabsWrapper';
import DeviceAotaFormCard from '../../../../components/DeviceAotaFormCard';
import { FormFormikActions } from '../../../../types/formik';
import { AotaFormFormikValues, AotaPayload } from '../../../../types/aota';
import DeviceFotaTab from '../../../../components/DeviceFotaTab';

const CreateSavedDeviceCommandPage: NextPageWithLayout = () => {
  const formRef = useRef<FormikProps<CreateSavedDeviceCommandFormFormikValues>>(null);

  const [currentTab, setCurrentTab] = useState('aota');
  const [savedCommandPayload, setSavedCommandPayload] = useState<any>(null);
  const { createSavedDeviceCommand } = useSavedDeviceCommandCRUD();

  const validationSchema = createSavedDeviceCommandValidationSchema();

  const tabs = [
    { label: 'Application OTA update', value: 'aota' },
    { label: 'Firmware OTA update', value: 'fota' },
    { label: 'Software OTA update', value: 'sota' },
    { label: 'Configuration OTA update', value: 'cota' },
  ];

  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  const handleCommandPayloadSubmit = (commandType: string, data: AotaPayload, { setSubmitting }: FormFormikActions<AotaFormFormikValues>) => {
    setSavedCommandPayload({ command: commandType, payload: data });
    setSubmitting(false);
  };

  const handleFormSubmit = (values: CreateSavedDeviceCommandFormFormikValues, actionProps: FormFormikActions<CreateSavedDeviceCommandFormFormikValues>) => {
    if (savedCommandPayload) {
      const data = { ...values, ...savedCommandPayload };
      createSavedDeviceCommand(data, actionProps);
    } else {
      alert('The command payload is required. Please click on the Validate button to validate first.')
    }
  };

  return (
    <>
      <PageTitleWrapper>
        <PageTitle
          heading="Create saved device command"
          subHeading="To create a new saved command, enter a command name and the payload."
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
              <CardHeader title="Create new saved device command"/>
              <Divider/>
              <Formik
                innerRef={formRef}
                enableReinitialize={true}
                initialValues={{
                  name: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setErrors, setSubmitting }) => {
                  handleFormSubmit(values, { setErrors, setSubmitting });
                }}
              >
                {({ handleSubmit, isSubmitting }: FormikProps<CreateSavedDeviceCommandFormFormikValues>) => (
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
                            label="Saved device command name"
                            placeholder="Enter saved device command name"
                          />
                        </Box>
                        <Grid
                          container
                          direction="row"
                          justifyContent="center"
                          alignItems="stretch"
                          spacing={3}
                        >
                          <Grid item xs={12}>
                            <TabsWrapper
                              onChange={handleTabsChange}
                              value={currentTab}
                              variant="scrollable"
                              scrollButtons="auto"
                              textColor="primary"
                              indicatorColor="primary"
                            >
                              {tabs.map((tab) => (
                                <Tab key={tab.value} label={tab.label} value={tab.value}/>
                              ))}
                            </TabsWrapper>
                          </Grid>
                          <Grid item xs={12}>
                            {currentTab === 'aota' && (
                              <DeviceAotaFormCard
                                submitButtonChildren="Validate"
                                onSubmit={(data, formFormikActions) => {
                                  handleCommandPayloadSubmit('AOTA', data, formFormikActions);
                                }}
                              />
                            )}
                            {currentTab === 'fota' && <DeviceFotaTab deviceId={deviceId}/>}
                            {/*{currentTab === 'sota' && <DeviceSotaTab deviceId={deviceId}/>}*/}
                            {/*{currentTab === 'cota' && <DeviceCotaTab deviceId={deviceId}/>}*/}
                          </Grid>
                        </Grid>
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

CreateSavedDeviceCommandPage.getLayout = function getLayout(page: ReactElement) {
  return getSidebarLayout('Create device group', page);
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(locale && await serverSideTranslations(locale, ['validation'])),
  }
});

export default CreateSavedDeviceCommandPage;
