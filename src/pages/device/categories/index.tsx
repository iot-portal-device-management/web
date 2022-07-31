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
import { useDeviceCategoryCRUD } from '../../../hooks/deviceCategory/useDeviceCategoryCRUD';
import { useDeviceCategories } from '../../../hooks/deviceCategory/useDeviceCategories';
import DeviceCategoriesDataGrid from '../../../components/DeviceCategoriesDataGrid';
import DeleteDeviceCategoriesAlertDialog from '../../../components/DeleteDeviceCategoriesAlertDialog';

const DeviceCategoryIndexPage: NextPageWithLayout = () => {
  const router = useRouter();

  const [openDeleteDeviceCategoriesAlertDialog, setOpenDeleteDeviceCategoriesAlertDialog] = useState(false);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
  const [queryOptions, setQueryOptions] = useState<QueryOptions>({
    sortModel: undefined,
    filterModel: undefined,
    page: 0,
    pageSize: 25,
  });

  const {
    deviceCategories,
    deviceCategoriesMeta,
    isDeviceCategoriesLoading,
    mutateDeviceCategories
  } = useDeviceCategories({
    ...queryOptions,
    page: queryOptions.page + 1
  });
  const { deleteDeviceCategories } = useDeviceCategoryCRUD();

  const confirmDeleteSelectedDeviceCategories = useCallback(() => {
    setOpenDeleteDeviceCategoriesAlertDialog(true);
  }, []);

  const deleteSelectedDeviceCategories = useCallback(() => {
    deleteDeviceCategories(selectionModel as string[], false, mutateDeviceCategories);
    setOpenDeleteDeviceCategoriesAlertDialog(false);
    setSelectionModel([]);
  }, [selectionModel, mutateDeviceCategories]);

  return (
    <>
      <PageTitleWrapper>
        <PageTitle
          heading="Device categories"
          subHeading="These are your device categories"
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
                  onCreateClick={() => router.push('/device/categories/create')}
                  onDeleteClick={confirmDeleteSelectedDeviceCategories}
                />
                <Box sx={{ width: '100%' }}>
                  <DeviceCategoriesDataGrid
                    selectionModel={selectionModel}
                    setSelectionModel={setSelectionModel}
                    queryOptions={queryOptions}
                    setQueryOptions={setQueryOptions}
                    deviceCategories={deviceCategories}
                    deviceCategoriesMeta={deviceCategoriesMeta}
                    isDeviceCategoriesLoading={isDeviceCategoriesLoading}
                    mutateDeviceCategories={mutateDeviceCategories}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer/>
      <DeleteDeviceCategoriesAlertDialog
        open={openDeleteDeviceCategoriesAlertDialog}
        handleClose={() => setOpenDeleteDeviceCategoriesAlertDialog(false)}
        handleConfirm={deleteSelectedDeviceCategories}
      />
      <Toaster/>
    </>
  );
};

DeviceCategoryIndexPage.getLayout = function getLayout(page: ReactElement) {
  return getSidebarLayout('Device categories', page);
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(locale && await serverSideTranslations(locale, ['validation'])),
  }
});

export default DeviceCategoryIndexPage;
