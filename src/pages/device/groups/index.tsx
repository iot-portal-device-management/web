import { ReactElement, useCallback, useState } from 'react';
import { GetStaticProps } from 'next';
import { NextPageWithLayout } from '../../_app';
import { getSidebarLayout } from '../../../layouts';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { GridSelectionModel } from '@mui/x-data-grid';
import { QueryOptions } from '../../../types/dataGrid';
import PageTitleWrapper from '../../../components/PageTitleWrapper';
import { Toaster } from 'react-hot-toast';
import { Box, Card, CardContent, Container, Grid } from '@mui/material';
import PageTitle from '../../../components/PageTitle';
import Footer from '../../../components/Footer';
import { useDeviceGroups } from '../../../hooks/deviceGroup/useDeviceGroups';
import DeviceGroupsDataGrid from '../../../components/DeviceGroupsDataGrid';
import { useDeviceGroupCRUD } from '../../../hooks/deviceGroup/useDeviceGroupCRUD';
import DataGridCreateDeleteToolbar from '../../../components/DataGridCreateDeleteToolbar';
import DeleteDeviceGroupsAlertDialog from '../../../components/DeleteDeviceGroupsAlertDialog';

const DeviceGroupIndexPage: NextPageWithLayout = () => {
  const router = useRouter();

  const [openDeleteDeviceGroupsAlertDialog, setOpenDeleteDeviceGroupsAlertDialog] = useState(false);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
  const [queryOptions, setQueryOptions] = useState<QueryOptions>({
    sortModel: undefined,
    filterModel: undefined,
    page: 0,
    pageSize: 25,
  });

  const { deviceGroups, deviceGroupsMeta, isDeviceGroupsLoading, mutateDeviceGroups } = useDeviceGroups({
    ...queryOptions,
    page: queryOptions.page + 1
  });
  const { deleteDeviceGroups } = useDeviceGroupCRUD();

  const confirmDeleteSelectedDeviceGroups = useCallback(() => {
    setOpenDeleteDeviceGroupsAlertDialog(true);
  }, []);

  const deleteSelectedDeviceGroups = useCallback(() => {
    deleteDeviceGroups(selectionModel as string[], false, mutateDeviceGroups);
    setOpenDeleteDeviceGroupsAlertDialog(false);
    setSelectionModel([]);
  }, [selectionModel, mutateDeviceGroups]);

  return (
    <>
      <PageTitleWrapper>
        <PageTitle
          heading="Device groups"
          subHeading="These are your device groups"
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
                  onCreateClick={() => router.push('/device/groups/create')}
                  onDeleteClick={confirmDeleteSelectedDeviceGroups}
                />
                <Box sx={{ width: '100%' }}>
                  <DeviceGroupsDataGrid
                    selectionModel={selectionModel}
                    setSelectionModel={setSelectionModel}
                    queryOptions={queryOptions}
                    setQueryOptions={setQueryOptions}
                    deviceGroups={deviceGroups}
                    deviceGroupsMeta={deviceGroupsMeta}
                    isDeviceGroupsLoading={isDeviceGroupsLoading}
                    mutateDeviceGroups={mutateDeviceGroups}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer/>
      <DeleteDeviceGroupsAlertDialog
        open={openDeleteDeviceGroupsAlertDialog}
        handleClose={() => setOpenDeleteDeviceGroupsAlertDialog(false)}
        handleConfirm={deleteSelectedDeviceGroups}
      />
      <Toaster/>
    </>
  );
};

DeviceGroupIndexPage.getLayout = function getLayout(page: ReactElement) {
  return getSidebarLayout('Device groups', page);
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(locale && await serverSideTranslations(locale, ['validation'])),
  }
});

export default DeviceGroupIndexPage;
