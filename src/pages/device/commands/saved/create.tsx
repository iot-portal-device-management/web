/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

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
import { GetStaticProps } from 'next';
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

export type DeviceOTAPayload =
  | DeviceAotaPayload
  | DeviceFotaPayload
  | DeviceSotaPayload
  | DeviceCotaPayload;

const CreateSavedDeviceCommandPage: NextPageWithLayout = () => {
  const formRef = useRef<FormikProps<CreateSavedDeviceCommandFormFormikValues>>(null);

  const [currentTab, setCurrentTab] = useState('aota');
  const [savedDeviceCommandPayload, setSavedDeviceCommandPayload] = useState<any>(null);
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

  const handleSavedDeviceCommandPayloadSubmit = (deviceCommandTypeName: string, payload: DeviceOTAPayload, { setSubmitting }: FormFormikActions<DeviceAotaFormFormikValues>) => {
    setSavedDeviceCommandPayload({ deviceCommandTypeName: deviceCommandTypeName, payload: payload });
    setSubmitting(false);
  };

  const handleFormSubmit = (values: CreateSavedDeviceCommandFormFormikValues, formFormikActions: FormFormikActions<CreateSavedDeviceCommandFormFormikValues>) => {
    if (savedDeviceCommandPayload) {
      const data = { ...values, ...savedDeviceCommandPayload };
      createSavedDeviceCommand(data, formFormikActions);
    } else {
      const { setSubmitting } = formFormikActions;

      alert('The saved device command payload is required. Please click on the Validate button to validate first.')
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
                            {currentTab === 'aota' && (
                              <DeviceAotaFormCard
                                submitButtonChildren="Validate"
                                onSubmit={(payload, formFormikActions) => {
                                  handleSavedDeviceCommandPayloadSubmit('AOTA', payload, formFormikActions);
                                }}
                              />
                            )}
                            {currentTab === 'fota' && (
                              <DeviceFotaFormCard
                                submitButtonChildren="Validate"
                                onSubmit={(payload, formFormikActions) => {
                                  handleSavedDeviceCommandPayloadSubmit('FOTA', payload, formFormikActions);
                                }}
                              />
                            )}
                            {currentTab === 'sota' && (
                              <DeviceSotaFormCard
                                submitButtonChildren="Validate"
                                onSubmit={(payload, formFormikActions) => {
                                  handleSavedDeviceCommandPayloadSubmit('SOTA', payload, formFormikActions);
                                }}
                              />
                            )}
                            {currentTab === 'cota' && (
                              <DeviceCotaFormCard
                                submitButtonChildren="Validate"
                                onSubmit={(payload, formFormikActions) => {
                                  handleSavedDeviceCommandPayloadSubmit('COTA', payload, formFormikActions);
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

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(locale && await serverSideTranslations(locale, ['validation'])),
  }
});

export default CreateSavedDeviceCommandPage;
