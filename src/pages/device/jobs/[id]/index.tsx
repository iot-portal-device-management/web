/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { ReactElement } from 'react';
import { getSidebarLayout } from '../../../../layouts';
import PageTitleWrapper from '../../../../components/PageTitleWrapper';
import PageTitle from '../../../../components/PageTitle';
import { Container, Grid } from '@mui/material';
import Footer from '../../../../components/Footer';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useDeviceJob } from '../../../../hooks/deviceJob/useDeviceJob';
import DeviceJobDetailsCard from '../../../../components/DeviceJobDetailsCard';
import DeviceJobProgressStatusCard from '../../../../components/DeviceJobProgressStatusCard';
import DeviceJobDeviceCommandsCard from '../../../../components/DeviceJobDeviceCommandsCard';
import CustomizedError from '../../../../components/CustomizedError';

const ViewDeviceJobPage = () => {
  const router = useRouter();
  const deviceJobId = router.query.id as string;

  const { deviceJob, deviceJobError, isDeviceJobLoading } = useDeviceJob(deviceJobId);

  if (deviceJobError) return <CustomizedError statusCode={deviceJobError?.response?.status}/>;

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
            <DeviceJobDetailsCard
              deviceGroupId={deviceJob?.deviceGroupId}
              savedDeviceCommandId={deviceJob?.savedDeviceCommandId}
            />
          </Grid>
          <Grid item xs={12}>
            <DeviceJobProgressStatusCard
              deviceJobId={deviceJobId}
            />
          </Grid>
          <Grid item xs={12}>
            <DeviceJobDeviceCommandsCard
              deviceJobId={deviceJobId}
            />
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
