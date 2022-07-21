import { ChangeEvent, ReactElement, useState } from 'react';
import { getSidebarLayout } from '../../../layouts';
import PageTitleWrapper from '../../../components/PageTitleWrapper';
import PageTitle from '../../../components/PageTitle';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Tab,
  Tabs,
  Typography
} from '@mui/material';
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
import { styled } from '@mui/material/styles';
import DeviceOverviewTab from '../../../components/DeviceOverviewTab';
import DeviceAotaTab from '../../../components/DeviceAotaTab';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import DeviceFotaTab from '../../../components/DeviceFotaTab';
import DeviceSotaTab from '../../../components/DeviceSotaTab';
import DeviceCotaTab from '../../../components/DeviceCotaTab';
import DeviceCommandHistoriesTab from '../../../components/DeviceCommandHistoriesTab';
import DeviceEventHistoriesTab from '../../../components/DeviceEventHistoriesTab';
import DeviceMetricsTab from '../../../components/DeviceMetricsTab';

const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }
`
);

const ViewDevicePage = () => {
  const router = useRouter();
  const deviceId = router.query.id as string;

  const [currentTab, setCurrentTab] = useState('overview');
  const { device, isDeviceLoading, isDeviceError } = useDevice(deviceId);

  const tabs = [
    { label: 'Overview', value: 'overview' },
    { label: 'Metrics', value: 'metrics' },
    { label: 'Application OTA update', value: 'aota' },
    { label: 'Firmware OTA update', value: 'fota' },
    { label: 'Software OTA update', value: 'sota' },
    { label: 'Configuration OTA update', value: 'cota' },
    { label: 'Command histories', value: 'command-histories' },
    { label: 'Event histories', value: 'event-histories' },
  ];

  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

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
              <Box
                p={3}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <Typography variant="h4" gutterBottom>
                    Power controls
                  </Typography>
                  <Typography variant="subtitle2">
                    Control the power state of your device
                  </Typography>
                </Box>
              </Box>
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
                      <Button startIcon={<VpnKeyTwoToneIcon/>}>Connect</Button>
                      <Button startIcon={<PowerSettingsNewTwoToneIcon/>}>Shutdown</Button>
                      <Button startIcon={<RestartAltTwoToneIcon/>}>Reboot</Button>
                      <Button startIcon={<DeleteForeverTwoToneIcon/>}>Decommission</Button>
                    </ButtonGroup>
                  </Grid>
                </Grid>
                <Divider/>
                <Grid container p={3} spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom>
                      OpenAMT power controls
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                      <Button startIcon={<VpnKeyTwoToneIcon/>}>Connect</Button>
                      <Button startIcon={<PowerSettingsNewTwoToneIcon/>}>Shutdown</Button>
                      <Button startIcon={<RestartAltTwoToneIcon/>}>Reboot</Button>
                      <Button startIcon={<DeleteForeverTwoToneIcon/>}>Decommission</Button>
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
          {currentTab === 'overview' && <DeviceOverviewTab device={device}/>}
          {currentTab === 'metrics' && <DeviceMetricsTab deviceId={deviceId}/>}
          {currentTab === 'aota' && <DeviceAotaTab deviceId={deviceId}/>}
          {currentTab === 'fota' && <DeviceFotaTab deviceId={deviceId}/>}
          {currentTab === 'sota' && <DeviceSotaTab deviceId={deviceId}/>}
          {currentTab === 'cota' && <DeviceCotaTab deviceId={deviceId}/>}
          {currentTab === 'command-histories' && <DeviceCommandHistoriesTab deviceId={deviceId}/>}
          {currentTab === 'event-histories' && <DeviceEventHistoriesTab deviceId={deviceId}/>}
        </Grid>
      </Container>
      <Footer/>
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
