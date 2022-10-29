import { ReactElement, useCallback, useState } from 'react';
import { GetStaticProps } from 'next';
import { NextPageWithLayout } from '../../../_app';
import { getSidebarLayout } from '../../../../layouts';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { GridSelectionModel } from '@mui/x-data-grid';
import { QueryOptions } from '../../../../types/dataGrid';
import PageTitleWrapper from '../../../../components/PageTitleWrapper';
import { Toaster } from 'react-hot-toast';
import { Box, Card, CardContent, Container, Grid } from '@mui/material';
import PageTitle from '../../../../components/PageTitle';
import Footer from '../../../../components/Footer';
import DataGridCreateDeleteToolbar from '../../../../components/DataGridCreateDeleteToolbar';
import SavedDeviceCommandsDataGrid from '../../../../components/SavedDeviceCommandsDataGrid';
import DeleteSavedDeviceCommandsAlertDialog from '../../../../components/DeleteSavedDeviceCommandsAlertDialog';
import { useSavedDeviceCommandCRUD } from '../../../../hooks/savedDeviceCommand/useSavedDeviceCommandCRUD';
import { useSavedDeviceCommands } from '../../../../hooks/savedDeviceCommand/useSavedDeviceCommands';

const SavedDeviceCommandIndexPage: NextPageWithLayout = () => {
  const router = useRouter();

  const [openDeleteSavedDeviceCommandsAlertDialog, setOpenDeleteSavedDeviceCommandsAlertDialog] = useState(false);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
  const [queryOptions, setQueryOptions] = useState<QueryOptions>({
    sortModel: undefined,
    filterModel: undefined,
    page: 0,
    pageSize: 25,
  });

  const {
    savedDeviceCommands,
    savedDeviceCommandsMeta,
    isSavedDeviceCommandsLoading,
    mutateSavedDeviceCommands
  } = useSavedDeviceCommands({
    ...queryOptions,
    page: queryOptions.page + 1
  });
  const { deleteSavedDeviceCommands } = useSavedDeviceCommandCRUD();

  const confirmDeleteSelectedSavedDeviceCommands = useCallback(() => {
    setOpenDeleteSavedDeviceCommandsAlertDialog(true);
  }, []);

  const deleteSelectedSavedDeviceCommands = useCallback(() => {
    deleteSavedDeviceCommands(selectionModel as string[], false, mutateSavedDeviceCommands);
    setOpenDeleteSavedDeviceCommandsAlertDialog(false);
    setSelectionModel([]);
  }, [selectionModel, mutateSavedDeviceCommands]);

  return (
    <>
      <PageTitleWrapper>
        <PageTitle
          heading="Saved device commands"
          subHeading="These are your saved device commands"
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
                  onCreateClick={() => router.push('/device/commands/saved/create')}
                  onDeleteClick={confirmDeleteSelectedSavedDeviceCommands}
                />
                <Box sx={{ width: '100%' }}>
                  <SavedDeviceCommandsDataGrid
                    selectionModel={selectionModel}
                    setSelectionModel={setSelectionModel}
                    queryOptions={queryOptions}
                    setQueryOptions={setQueryOptions}
                    savedDeviceCommands={savedDeviceCommands}
                    savedDeviceCommandsMeta={savedDeviceCommandsMeta}
                    isSavedDeviceCommandsLoading={isSavedDeviceCommandsLoading}
                    mutateSavedDeviceCommands={mutateSavedDeviceCommands}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer/>
      <DeleteSavedDeviceCommandsAlertDialog
        open={openDeleteSavedDeviceCommandsAlertDialog}
        handleClose={() => setOpenDeleteSavedDeviceCommandsAlertDialog(false)}
        handleConfirm={deleteSelectedSavedDeviceCommands}
      />
      <Toaster/>
    </>
  );
};

SavedDeviceCommandIndexPage.getLayout = function getLayout(page: ReactElement) {
  return getSidebarLayout('Saved device commands', page);
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(locale && await serverSideTranslations(locale, ['validation'])),
  }
});

export default SavedDeviceCommandIndexPage;
