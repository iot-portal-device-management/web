/*
 * Copyright (C) 2021-2022 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { ReactElement, useCallback, useState } from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { Box, Card, CardContent, Container, Grid } from '@mui/material';
import { GridSelectionModel } from '@mui/x-data-grid';
import { Toaster } from 'react-hot-toast';
import PageTitle from '../../components/PageTitle';
import PageTitleWrapper from '../../components/PageTitleWrapper';
import Footer from '../../components/Footer';
import { NextPageWithLayout } from '../_app';
import { getSidebarLayout } from '../../layouts';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useDeviceCRUD } from '../../hooks/device/useDeviceCRUD';
import DeleteDevicesAlertDialog from '../../components/DeleteDevicesAlertDialog';
import DevicesDataGrid from '../../components/DevicesDataGrid';
import { useDevices } from '../../hooks/device/useDevices';
import { QueryOptions } from '../../types/dataGrid';
import DataGridCreateDeleteToolbar from '../../components/DataGridCreateDeleteToolbar';
import CustomizedError from '../../components/CustomizedError';

const DeviceIndexPage: NextPageWithLayout = () => {
  const router = useRouter();

  const [openDeleteDevicesAlertDialog, setOpenDeleteDevicesAlertDialog] = useState(false);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
  const [queryOptions, setQueryOptions] = useState<QueryOptions>({
    sortModel: undefined,
    filterModel: undefined,
    page: 0,
    pageSize: 25,
  });

  const { devices, devicesMeta, devicesError, isDevicesLoading, mutateDevices } = useDevices({
    ...queryOptions,
    page: queryOptions.page + 1
  });
  const { deleteDevices } = useDeviceCRUD();

  const confirmDeleteSelectedDevices = useCallback(() => {
    setOpenDeleteDevicesAlertDialog(true);
  }, []);

  const deleteSelectedDevices = useCallback(() => {
    deleteDevices(selectionModel as string[], false, mutateDevices);
    setOpenDeleteDevicesAlertDialog(false);
    setSelectionModel([]);
  }, [selectionModel, mutateDevices]);

  if (devicesError) return <CustomizedError statusCode={devicesError?.response?.status}/>;

  return (
    <>
      <PageTitleWrapper>
        <PageTitle
          heading="Devices"
          subHeading="These are your devices"
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
              <CardContent>
                <DataGridCreateDeleteToolbar
                  disableDelete={!selectionModel || !selectionModel.length}
                  onCreateClick={() => router.push('/devices/create')}
                  onDeleteClick={confirmDeleteSelectedDevices}
                />
                <Box sx={{ width: '100%' }}>
                  <DevicesDataGrid
                    selectionModel={selectionModel}
                    setSelectionModel={setSelectionModel}
                    queryOptions={queryOptions}
                    setQueryOptions={setQueryOptions}
                    devices={devices}
                    devicesMeta={devicesMeta}
                    isDevicesLoading={isDevicesLoading}
                    mutateDevices={mutateDevices}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer/>
      <DeleteDevicesAlertDialog
        open={openDeleteDevicesAlertDialog}
        handleClose={() => setOpenDeleteDevicesAlertDialog(false)}
        handleConfirm={deleteSelectedDevices}
      />
      <Toaster/>
    </>
  );
};

DeviceIndexPage.getLayout = function getLayout(page: ReactElement) {
  return getSidebarLayout('Devices', page);
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(locale && await serverSideTranslations(locale, ['validation'])),
  }
});

export default DeviceIndexPage;
