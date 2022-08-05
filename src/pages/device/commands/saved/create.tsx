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
import { DeviceAotaFormFormikValues, DeviceAotaPayload } from '../../../../types/deviceAota';
import DeviceFotaFormCard from '../../../../components/DeviceFotaFormCard';
import { DeviceFotaPayload } from '../../../../types/deviceFota';
import { DeviceSotaPayload } from '../../../../types/deviceSota';
import { DeviceCotaPayload } from '../../../../types/deviceCota';
import DeviceSotaFormCard from '../../../../components/DeviceSotaFormCard';
import DeviceCotaFormCard from '../../../../components/DeviceCotaFormCard';

export type OTAPayload =
  | DeviceAotaPayload
  | DeviceFotaPayload
  | DeviceSotaPayload
  | DeviceCotaPayload;

const CreateSavedDeviceCommandPage: NextPageWithLayout = () => {
  const formRef = useRef<FormikProps<CreateSavedDeviceCommandFormFormikValues>>(null);

  const [currentTab, setCurrentTab] = useState('deviceAota');
  const [savedCommandPayload, setSavedCommandPayload] = useState<any>(null);
  const { createSavedDeviceCommand } = useSavedDeviceCommandCRUD();

  const validationSchema = createSavedDeviceCommandValidationSchema();

  const tabs = [
    { label: 'Application OTA update', value: 'deviceAota' },
    { label: 'Firmware OTA update', value: 'deviceFota' },
    { label: 'Software OTA update', value: 'deviceSota' },
    { label: 'DeviceCotaConfiguration OTA update', value: 'deviceCota' },
  ];

  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  const handleCommandPayloadSubmit = (commandType: string, data: OTAPayload, { setSubmitting }: FormFormikActions<DeviceAotaFormFormikValues>) => {
    setSavedCommandPayload({ command: commandType, payload: data });
    setSubmitting(false);
  };

  const handleFormSubmit = (values: CreateSavedDeviceCommandFormFormikValues, formFormikActions: FormFormikActions<CreateSavedDeviceCommandFormFormikValues>) => {
    if (savedCommandPayload) {
      const data = { ...values, ...savedCommandPayload };
      createSavedDeviceCommand(data, formFormikActions);
    } else {
      const { setSubmitting } = formFormikActions;

      alert('The command payload is required. Please click on the Validate button to validate first.')
      setSubmitting(false);
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
                            {currentTab === 'deviceAota' && (
                              <DeviceAotaFormCard
                                submitButtonChildren="Validate"
                                onSubmit={(data, formFormikActions) => {
                                  handleCommandPayloadSubmit('AOTA', data, formFormikActions);
                                }}
                              />
                            )}
                            {currentTab === 'deviceFota' && (
                              <DeviceFotaFormCard
                                submitButtonChildren="Validate"
                                onSubmit={(data, formFormikActions) => {
                                  handleCommandPayloadSubmit('FOTA', data, formFormikActions);
                                }}
                              />
                            )}
                            {currentTab === 'deviceSota' && (
                              <DeviceSotaFormCard
                                submitButtonChildren="Validate"
                                onSubmit={(data, formFormikActions) => {
                                  handleCommandPayloadSubmit('SOTA', data, formFormikActions);
                                }}
                              />
                            )}
                            {currentTab === 'deviceCota' && (
                              <DeviceCotaFormCard
                                submitButtonChildren="Validate"
                                onSubmit={(data, formFormikActions) => {
                                  handleCommandPayloadSubmit('COTA', data, formFormikActions);
                                }}
                              />
                            )}
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
  return getSidebarLayout('Create saved device command', page);
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(locale && await serverSideTranslations(locale, ['validation'])),
  }
});

export default CreateSavedDeviceCommandPage;
