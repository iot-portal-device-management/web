import { ReactElement, useState } from 'react';
import { getSidebarLayout } from '../../../../layouts';
import PageTitleWrapper from '../../../../components/PageTitleWrapper';
import PageTitle from '../../../../components/PageTitle';
import { Box, Card, CardContent, CardHeader, Chip, Container, Divider, Grid, Typography } from '@mui/material';
import Footer from '../../../../components/Footer';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useDeviceJob } from '../../../../hooks/deviceJob/useDeviceJob';
import JSONView from '../../../../components/JSONView';
import Text from '../../../../components/Text';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import Duration from '../../../../components/Duration';
import StartTimeEndTime from '../../../../components/StartTimeEndTime/StartTimeEndTime';
import { useDeviceGroup } from '../../../../hooks/deviceGroup/useDeviceGroup';
import { useSavedDeviceCommand } from '../../../../hooks/savedDeviceCommand/useSavedDeviceCommand';
import { useDeviceJobDeviceCommands } from '../../../../hooks/deviceJob/useDeviceJobDeviceCommands';
import DeviceJobDeviceCommandsDataGrid from '../../../../components/DeviceJobDeviceCommandsDataGrid';
import { QueryOptions } from '../../../../types/dataGrid';

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const ViewDeviceJobPage = () => {
  const router = useRouter();
  const deviceJobId = router.query.id as string;

  const [queryOptions, setQueryOptions] = useState<QueryOptions>({
    sortModel: undefined,
    // sortModel: [{ field: 'createdAt', sort: 'desc' }],
    filterModel: undefined,
    page: 0,
    pageSize: 25,
  });

  const { deviceJob, isDeviceJobLoading, isDeviceJobError } = useDeviceJob(deviceJobId);
  const { deviceGroup, isDeviceGroupLoading, isDeviceGroupError } = useDeviceGroup(deviceJob?.deviceGroupId);
  const {
    savedDeviceCommand,
    isSavedDeviceCommandLoading,
    isSavedDeviceCommandError
  } = useSavedDeviceCommand(deviceJob?.savedDeviceCommandId);

  const {
    deviceJobDeviceCommands,
    deviceJobDeviceCommandsMeta,
    isDeviceJobDeviceCommandsLoading,
    mutateDeviceJobDeviceCommands
  } = useDeviceJobDeviceCommands(deviceJobId, { ...queryOptions, page: queryOptions.page + 1 });

  const deviceJobProgressPercentRadialBarOptions: ApexOptions = {
    chart: {
      type: 'radialBar',
      width: 200,
    },
    plotOptions: {
      radialBar: {
        startAngle: -130,
        endAngle: 130,
        hollow: {
          margin: 15,
          size: '70%'
        },
        dataLabels: {
          show: true,
          name: {
            show: true,
            fontSize: '13px',
            color: "#888",
            offsetY: -10,
          },
          value: {
            show: true,
            fontSize: '30px',
            color: "#111",
          }
        }
      }
    },
    stroke: {
      lineCap: 'round',
    },
    labels: ['Progress'],
  };

  const deviceJobProgressPercentRadialBarSeries = [66];

  const deviceJobStatsChartOptions: ApexOptions = {
    chart: {
      type: 'pie',
      width: 200,
    },
    labels: ['Success', 'Failure', 'Processing', 'Pending'],
    colors: ['#00e396', '#ff4560', '#bbc6c2', '#2196F3'],
    legend: {
      position: 'top'
    },
  };

  const deviceJobStatsChartSeries = [
    3,
    6,
    8,
    9
  ];

  // const chartSeries = [
  //   successfulDevicesCount,
  //   failedDevicesCount,
  //   processingDevicesCount,
  //   pendingDevicesCount
  // ];


  return (
    <>
      <PageTitleWrapper>
        <PageTitle
          heading={deviceJob?.name}
          subHeading={deviceJobId}
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
              <CardHeader title="Details"/>
              <Divider/>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="subtitle2">
                  <Grid container rowSpacing={2} columnSpacing={3}>
                    <Grid item xs={12}>
                      <Typography sx={{ color: 'common.black' }} variant="h5" gutterBottom>
                        Device group:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                      Device group name:
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                      <Text color="black">
                        <b>{deviceGroup?.name}</b>
                      </Text>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography sx={{ color: 'common.black' }} variant="h5" gutterBottom>
                        Saved device command:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                      Saved device command name:
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                      <Text color="black">
                        <b>{savedDeviceCommand?.name}</b>
                      </Text>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                      Device command type name:
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                      <Text color="black">
                        <b>{savedDeviceCommand?.deviceCommandTypeName}</b>
                      </Text>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                      Payload:
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                      <JSONView data={savedDeviceCommand?.payload}/>
                    </Grid>
                  </Grid>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Status"/>
              <Divider/>
              <CardContent>
                <Grid container>
                  {/*Results*/}
                  <Grid item xs={8}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography variant="h4" gutterBottom>
                          Results
                        </Typography>
                      </Grid>
                      <Grid sx={{ textAlign: 'center' }} item xs={12}>
                        <Chip label="success" color="success"/>
                      </Grid>
                      <Grid item xs={6}>
                        <Chart
                          options={deviceJobProgressPercentRadialBarOptions}
                          series={deviceJobProgressPercentRadialBarSeries}
                          type="radialBar"
                          height={200}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Chart
                          options={deviceJobStatsChartOptions}
                          series={deviceJobStatsChartSeries}
                          type="pie"
                          height={200}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  {/*Duration*/}
                  <Grid item xs={4}>
                    <Grid container rowSpacing={3}>
                      <Grid item xs={12}>
                        <Typography variant="h4" gutterBottom>
                          Duration
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Duration hours={1} minutes={12}/>
                      </Grid>
                      <Grid item xs={12}>
                        <StartTimeEndTime/>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Device commands"/>
              <Divider/>
              <CardContent>
                <Box sx={{ width: '100%' }}>
                  <DeviceJobDeviceCommandsDataGrid
                    queryOptions={queryOptions}
                    setQueryOptions={setQueryOptions}
                    deviceCommands={deviceJobDeviceCommands}
                    deviceCommandsMeta={deviceJobDeviceCommandsMeta}
                    isDeviceCommandsLoading={isDeviceJobDeviceCommandsLoading}
                    mutateDeviceCommands={mutateDeviceJobDeviceCommands}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer/>
      <Toaster/>
    </>
  );
};

ViewDeviceJobPage.getLayout = function getLayout(page: ReactElement) {
  return getSidebarLayout('View device job', page);
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(locale && await serverSideTranslations(locale, ['validation'])),
  }
});

export default ViewDeviceJobPage;
