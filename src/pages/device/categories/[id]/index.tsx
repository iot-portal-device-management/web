/*
 * Copyright (C) 2021-2023 Intel Corporation
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
import { useDeviceCategory } from '../../../../hooks/deviceCategory/useDeviceCategory';
import { GridSelectionModel } from '@mui/x-data-grid';
import { QueryOptions } from '../../../../types/dataGrid';
import { useDeviceCategoryDevices } from '../../../../hooks/deviceCategory/useDeviceCategoryDevices';
import DevicesDataGrid from '../../../../components/DevicesDataGrid';
import CustomizedError from '../../../../components/CustomizedError';

const ViewDeviceCategoryPage = () => {
  const router = useRouter();
  const deviceCategoryId = router.query.id as string;

  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
  const [queryOptions, setQueryOptions] = useState<QueryOptions>({
    sortModel: undefined,
    filterModel: undefined,
    page: 0,
    pageSize: 25,
  });

  const { deviceCategory, deviceCategoryError, isDeviceCategoryLoading } = useDeviceCategory(deviceCategoryId);

  const {
    deviceCategoryDevices,
    deviceCategoryDevicesMeta,
    deviceCategoryDevicesError,
    isDeviceCategoryDevicesLoading,
    mutateDeviceCategoryDevices
  } = useDeviceCategoryDevices(deviceCategoryId, { ...queryOptions, page: queryOptions.page + 1 });

  if (deviceCategoryError) return <CustomizedError statusCode={deviceCategoryError?.response?.status}/>;

  return (
    <>
      <PageTitleWrapper>
        <PageTitle
          heading={deviceCategory?.name}
          subHeading={deviceCategoryId}
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
              <CardHeader title="Devices under this device category"/>
              <Divider/>
              <CardContent>
                <Box sx={{ width: '100%' }}>
                  <DevicesDataGrid
                    selectionModel={selectionModel}
                    setSelectionModel={setSelectionModel}
                    queryOptions={queryOptions}
                    setQueryOptions={setQueryOptions}
                    devices={deviceCategoryDevices}
                    devicesMeta={deviceCategoryDevicesMeta}
                    isDevicesLoading={isDeviceCategoryDevicesLoading}
                    mutateDevices={mutateDeviceCategoryDevices}
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

ViewDeviceCategoryPage.getLayout = function getLayout(page: ReactElement) {
  return getSidebarLayout('View device category', page);
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(locale && await serverSideTranslations(locale, ['validation'])),
  }
});

export default ViewDeviceCategoryPage;
