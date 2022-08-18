import { ReactElement, useCallback, useState } from 'react';
import { GetServerSideProps } from 'next';
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
import DataGridCreateDeleteToolbar from '../../../components/DataGridCreateDeleteToolbar';
import DeviceJobsDataGrid from '../../../components/DeviceJobsDataGrid';
import DeleteDeviceJobsAlertDialog from '../../../components/DeleteDeviceJobsAlertDialog';
import { useDeviceJobCRUD } from '../../../hooks/deviceJob/useDeviceJobCRUD';
import { useDeviceJobs } from '../../../hooks/deviceJob/useDeviceJobs';

const DeviceJobIndexPage: NextPageWithLayout = () => {
  const router = useRouter();

  const [openDeleteDeviceJobsAlertDialog, setOpenDeleteDeviceJobsAlertDialog] = useState(false);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
  const [queryOptions, setQueryOptions] = useState<QueryOptions>({
    sortModel: undefined,
    filterModel: undefined,
    page: 0,
    pageSize: 25,
  });

  const { deviceJobs, deviceJobsMeta, isDeviceJobsLoading, mutateDeviceJobs } = useDeviceJobs({
    ...queryOptions,
    page: queryOptions.page + 1
  });

  const { deleteDeviceJobs } = useDeviceJobCRUD();

  const confirmDeleteSelectedDeviceJobs = useCallback(() => {
    setOpenDeleteDeviceJobsAlertDialog(true);
  }, []);

  const deleteSelectedDeviceJobs = useCallback(() => {
    deleteDeviceJobs(selectionModel as string[], false, mutateDeviceJobs);
    setOpenDeleteDeviceJobsAlertDialog(false);
    setSelectionModel([]);
  }, [selectionModel, mutateDeviceJobs]);

  return (
    <>
      <PageTitleWrapper>
        <PageTitle
          heading="Device jobs"
          subHeading="These are your device jobs"
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
                  onCreateClick={() => router.push('/device/jobs/create')}
                  onDeleteClick={confirmDeleteSelectedDeviceJobs}
                />
                <Box sx={{ width: '100%' }}>
                  <DeviceJobsDataGrid
                    selectionModel={selectionModel}
                    setSelectionModel={setSelectionModel}
                    queryOptions={queryOptions}
                    setQueryOptions={setQueryOptions}
                    deviceJobs={deviceJobs}
                    deviceJobsMeta={deviceJobsMeta}
                    isDeviceJobsLoading={isDeviceJobsLoading}
                    mutateDeviceJobs={mutateDeviceJobs}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer/>
      <DeleteDeviceJobsAlertDialog
        open={openDeleteDeviceJobsAlertDialog}
        handleClose={() => setOpenDeleteDeviceJobsAlertDialog(false)}
        handleConfirm={deleteSelectedDeviceJobs}
      />
      <Toaster/>
    </>
  );
};

DeviceJobIndexPage.getLayout = function getLayout(page: ReactElement) {
  return getSidebarLayout('Device jobs', page);
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(locale && await serverSideTranslations(locale, ['validation'])),
  }
});

export default DeviceJobIndexPage;
