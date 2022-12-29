/*
 * Copyright (C) 2021-2022 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { ReactElement, useState } from 'react';
import { getSidebarLayout } from '../../../../layouts';
import PageTitleWrapper from '../../../../components/PageTitleWrapper';
import PageTitle from '../../../../components/PageTitle';
import { Box, Card, CardContent, CardHeader, Container, Divider, Grid } from '@mui/material';
import Footer from '../../../../components/Footer';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useDeviceGroup } from '../../../../hooks/deviceGroup/useDeviceGroup';
import DevicesDataGrid from '../../../../components/DevicesDataGrid';
import { useDeviceGroupDevices } from '../../../../hooks/deviceGroup/useDeviceGroupDevices';
import { GridSelectionModel } from '@mui/x-data-grid';
import { QueryOptions } from '../../../../types/dataGrid';
import CustomizedError from '../../../../components/CustomizedError';

const ViewDeviceGroupPage = () => {
  const router = useRouter();
  const deviceGroupId = router.query.id as string;

  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
  const [queryOptions, setQueryOptions] = useState<QueryOptions>({
    sortModel: undefined,
    filterModel: undefined,
    page: 0,
    pageSize: 25,
  });

  const { deviceGroup, deviceGroupError, isDeviceGroupLoading } = useDeviceGroup(deviceGroupId);

  const {
    deviceGroupDevices,
    deviceGroupDevicesMeta,
    isDeviceGroupDevicesLoading,
    mutateDeviceGroupDevices
  } = useDeviceGroupDevices(deviceGroupId, { ...queryOptions, page: queryOptions.page + 1 });

  if (deviceGroupError) return <CustomizedError statusCode={deviceGroupError?.response?.status}/>;

  return (
    <>
      <PageTitleWrapper>
        <PageTitle
          heading={deviceGroup?.name}
          subHeading={deviceGroupId}
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
              <CardHeader title="Devices under this device group"/>
              <Divider/>
              <CardContent>
                <Box sx={{ width: '100%' }}>
                  <DevicesDataGrid
                    selectionModel={selectionModel}
                    setSelectionModel={setSelectionModel}
                    queryOptions={queryOptions}
                    setQueryOptions={setQueryOptions}
                    devices={deviceGroupDevices}
                    devicesMeta={deviceGroupDevicesMeta}
                    isDevicesLoading={isDeviceGroupDevicesLoading}
                    mutateDevices={mutateDeviceGroupDevices}
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

ViewDeviceGroupPage.getLayout = function getLayout(page: ReactElement) {
  return getSidebarLayout('View device group', page);
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(locale && await serverSideTranslations(locale, ['validation'])),
  }
});

export default ViewDeviceGroupPage;
