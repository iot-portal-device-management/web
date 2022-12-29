/*
 * Copyright (C) 2021-2022 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { ReactElement } from 'react';
import { getSidebarLayout } from '../layouts';
import PageTitleWrapper from '../components/PageTitleWrapper';
import { Box, Container, Grid, Typography } from '@mui/material';
import Footer from '../components/Footer';
import { Toaster } from 'react-hot-toast';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import DashboardPageHeader from '../components/DashboardPageHeader';
import DashboardOverview from '../components/DashboardOverview';
import OnlineDevicesCpuTemperatureStatisticsChartCard
  from '../components/OnlineDevicesCpuTemperatureStatisticsChartCard';
import OnlineDevicesCpuUsageStatisticsChartCard from '../components/OnlineDevicesCpuUsageStatisticsChartCard';
import OnlineDevicesDiskUsageStatisticsChartCard from '../components/OnlineDevicesDiskUsageStatisticsChartCard';
import OnlineDevicesAvailableMemoryStatisticsChartCard
  from '../components/OnlineDevicesAvailableMemoryStatisticsChartCard';

const IndexPage = () => {
  return (
    <>
      <PageTitleWrapper>
        <DashboardPageHeader/>
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
            <DashboardOverview/>
          </Grid>
          <Grid item xs={12}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              sx={{ pb: 3 }}
            >
              <Typography variant="h3">Overall statistics</Typography>
            </Box>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="stretch"
              spacing={3}
            >
              <Grid item xs={12}>
                <OnlineDevicesCpuTemperatureStatisticsChartCard/>
              </Grid>
              <Grid item xs={12}>
                <OnlineDevicesCpuUsageStatisticsChartCard/>
              </Grid>
              <Grid item xs={12}>
                <OnlineDevicesDiskUsageStatisticsChartCard/>
              </Grid>
              <Grid item xs={12}>
                <OnlineDevicesAvailableMemoryStatisticsChartCard/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Footer/>
      <Toaster/>
    </>
  );
};

IndexPage.getLayout = function getLayout(page: ReactElement) {
  return getSidebarLayout('Home', page);
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(locale && await serverSideTranslations(locale, ['validation'])),
  }
});

export default IndexPage;
