/*
 * Copyright (C) 2021-2022 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { ChangeEvent, ReactElement, useState } from 'react';
import { getSidebarLayout } from '../../../layouts';
import PageTitleWrapper from '../../../components/PageTitleWrapper';
import PageTitle from '../../../components/PageTitle';
import { Button, ButtonGroup, Card, CardContent, Container, Divider, Grid, Tab, Typography } from '@mui/material';
import Footer from '../../../components/Footer';
import { Toaster } from 'react-hot-toast';
import { useDevice } from '../../../hooks/device/useDevice';
import { useRouter } from 'next/router';
import { getDeviceCategoryLabel } from '../../../utils/deviceCategory';
import { getDeviceStatusLabel } from '../../../utils/deviceStatus';
import VpnKeyTwoToneIcon from '@mui/icons-material/VpnKeyTwoTone';
import PowerSettingsNewTwoToneIcon from '@mui/icons-material/PowerSettingsNewTwoTone';
import RestartAltTwoToneIcon from '@mui/icons-material/RestartAltTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import DeviceOverviewTab from '../../../components/DeviceOverviewTab';
import DeviceAotaTab from '../../../components/DeviceAotaTab';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import DeviceFotaTab from '../../../components/DeviceFotaTab';
import DeviceSotaTab from '../../../components/DeviceSotaTab';
import DeviceCotaTab from '../../../components/DeviceCotaTab';
import DeviceCommandsTab from '../../../components/DeviceCommandsTab';
import DeviceEventsTab from '../../../components/DeviceEventsTab';
import DeviceMetricsTab from '../../../components/DeviceMetricsTab';
import LargeCardHeader from '../../../components/LargeCardHeader';
import TabsWrapper from '../../../components/TabsWrapper';
import { useDeviceShutdown } from '../../../hooks/deviceShutdown/useDeviceShutdown';
import ShutDownDeviceAlertDialog from '../../../components/ShutDownDeviceAlertDialog';
import RebootDeviceAlertDialog from '../../../components/RebootDeviceAlertDialog';
import DecommissionDeviceAlertDialog from '../../../components/DecommissionDeviceAlertDialog';
import { useDeviceReboot } from '../../../hooks/deviceReboot/useDeviceReboot';
import { useDeviceDecommission } from '../../../hooks/deviceDecommission/useDeviceDecommission';
import ConnectDeviceDialog from '../../../components/ConnectDeviceDialog';
import { LoadingButton } from '@mui/lab';
import CustomizedError from '../../../components/CustomizedError';

const ViewDevicePage = () => {
  const router = useRouter();
  const deviceId = router.query.id as string;

  const [currentTab, setCurrentTab] = useState('overview');
  const [openConnectDeviceAlertDialog, setOpenConnectDeviceAlertDialog] = useState(false);
  const [openShutDownDeviceAlertDialog, setOpenShutDownDeviceAlertDialog] = useState(false);
  const [openRebootDeviceAlertDialog, setOpenRebootDeviceAlertDialog] = useState(false);
  const [openDecommissionDeviceAlertDialog, setOpenDecommissionDeviceAlertDialog] = useState(false);
  const [isSubmittingShutdown, setIsSubmittingShutdown] = useState(false);
  const [isSubmittingReboot, setIsSubmittingReboot] = useState(false);
  const [isSubmittingDecommission, setIsSubmittingDecommission] = useState(false);

  const { device, deviceError, isDeviceLoading } = useDevice(deviceId);

  const { submitDeviceShutdown } = useDeviceShutdown();
  const { submitDeviceReboot } = useDeviceReboot();
  const { submitDeviceDecommission } = useDeviceDecommission();

  const tabs = [
    { label: 'Overview', value: 'overview' },
    { label: 'Metrics', value: 'metrics' },
    { label: 'Application OTA update', value: 'aota' },
    { label: 'Firmware OTA update', value: 'fota' },
    { label: 'Software OTA update', value: 'sota' },
    { label: 'Configuration OTA update', value: 'cota' },
    { label: 'Commands', value: 'commands' },
    { label: 'Events', value: 'events' },
  ];

  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  const shutDownDevice = () => {
    setIsSubmittingShutdown(true);
    submitDeviceShutdown(deviceId, setIsSubmittingShutdown);
    setOpenShutDownDeviceAlertDialog(false);
  };

  const rebootDevice = () => {
    setIsSubmittingReboot(true);
    submitDeviceReboot(deviceId, setIsSubmittingReboot);
    setOpenRebootDeviceAlertDialog(false);
  };

  const decommissionDevice = () => {
    setIsSubmittingDecommission(true);
    submitDeviceDecommission(deviceId, setIsSubmittingDecommission);
    setOpenDecommissionDeviceAlertDialog(false);
  };

  if (deviceError) return <CustomizedError statusCode={deviceError?.response?.status}/>;

  return (
    <>
      <PageTitleWrapper>
        <PageTitle
          heading={device?.name}
          subHeading={deviceId}
          labels={
            <>
              {getDeviceCategoryLabel(device?.deviceCategory?.name)}
              {getDeviceStatusLabel(device?.deviceStatus?.name)}
            </>
          }
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
              <LargeCardHeader
                title="Power controls"
                subheader="Control the power state of your device"
              />
              <Divider/>
              <CardContent>
                <Grid container p={3} spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom>
                      In-Band Manageability power controls
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                      <Button
                        startIcon={<VpnKeyTwoToneIcon/>}
                        onClick={() => setOpenConnectDeviceAlertDialog(true)}
                      >
                        Connect
                      </Button>
                      <LoadingButton
                        variant="contained"
                        startIcon={<PowerSettingsNewTwoToneIcon/>}
                        loading={isSubmittingShutdown}
                        loadingPosition="start"
                        onClick={() => setOpenShutDownDeviceAlertDialog(true)}
                      >
                        Shut down
                      </LoadingButton>
                      <LoadingButton
                        variant="contained"
                        startIcon={<RestartAltTwoToneIcon/>}
                        loading={isSubmittingReboot}
                        loadingPosition="start"
                        onClick={() => setOpenRebootDeviceAlertDialog(true)}
                      >
                        Reboot
                      </LoadingButton>
                      <LoadingButton
                        variant="contained"
                        startIcon={<DeleteForeverTwoToneIcon/>}
                        loading={isSubmittingDecommission}
                        loadingPosition="start"
                        onClick={() => setOpenDecommissionDeviceAlertDialog(true)}
                      >
                        Decommission
                      </LoadingButton>
                    </ButtonGroup>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
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
            {currentTab === 'overview' && <DeviceOverviewTab device={device}/>}
            {currentTab === 'metrics' && <DeviceMetricsTab deviceId={deviceId}/>}
            {currentTab === 'aota' && <DeviceAotaTab deviceId={deviceId}/>}
            {currentTab === 'fota' && <DeviceFotaTab deviceId={deviceId}/>}
            {currentTab === 'sota' && <DeviceSotaTab deviceId={deviceId}/>}
            {currentTab === 'cota' && <DeviceCotaTab deviceId={deviceId}/>}
            {currentTab === 'commands' && <DeviceCommandsTab deviceId={deviceId}/>}
            {currentTab === 'events' && <DeviceEventsTab deviceId={deviceId}/>}
          </Grid>
        </Grid>
      </Container>
      <Footer/>
      <ConnectDeviceDialog
        deviceId={device?.id}
        open={openConnectDeviceAlertDialog}
        handleClose={() => setOpenConnectDeviceAlertDialog(false)}
      />
      <ShutDownDeviceAlertDialog
        open={openShutDownDeviceAlertDialog}
        handleClose={() => setOpenShutDownDeviceAlertDialog(false)}
        handleConfirm={shutDownDevice}
      />
      <RebootDeviceAlertDialog
        open={openRebootDeviceAlertDialog}
        handleClose={() => setOpenRebootDeviceAlertDialog(false)}
        handleConfirm={rebootDevice}
      />
      <DecommissionDeviceAlertDialog
        open={openDecommissionDeviceAlertDialog}
        handleClose={() => setOpenDecommissionDeviceAlertDialog(false)}
        handleConfirm={decommissionDevice}
      />
      <Toaster/>
    </>
  );
};

ViewDevicePage.getLayout = function getLayout(page: ReactElement) {
  return getSidebarLayout('View device', page);
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(locale && await serverSideTranslations(locale, ['validation'])),
  }
});

export default ViewDevicePage;
