import PageTitle from '../../../components/PageTitle';
import { ReactElement, useEffect, useRef, useState } from 'react';
import PageTitleWrapper from '../../../components/PageTitleWrapper';
import { Box, Card, CardActions, CardContent, CardHeader, Container, Divider, Grid } from '@mui/material';
import Footer from '../../../components/Footer';
import { NextPageWithLayout } from '../../_app';
import { getSidebarLayout } from '../../../layouts';
import { Formik, FormikProps } from 'formik';
import FullWidthTextField from '../../../components/FullWidthTextField';
import { Toaster } from 'react-hot-toast';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import { CreateDeviceGroupFormFormikValues } from '../../../types/deviceGroup';
import { GridSelectionModel } from '@mui/x-data-grid';
import { QueryOptions } from '../../../types/dataGrid';
import { useDevices } from '../../../hooks/device/useDevices';
import DevicesDataGrid from '../../../components/DevicesDataGrid';
import createDeviceGroupValidationSchema
  from '../../../validationSchemas/deviceGroup/createDeviceGroupValidationSchema';
import { useDeviceGroupCRUD } from '../../../hooks/deviceGroup/useDeviceGroupCRUD';
import NoDeviceSelectedDeviceGroupCreateAlert from '../../../components/NoDeviceSelectedDeviceGroupCreateAlert';
import CardActionsLoadingButton from '../../../components/CardActionsLoadingButton';

const CreateDeviceGroupPage: NextPageWithLayout = () => {
  const formRef = useRef<FormikProps<CreateDeviceGroupFormFormikValues>>(null);

  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
  const [queryOptions, setQueryOptions] = useState<QueryOptions>({
    sortModel: undefined,
    filterModel: undefined,
    page: 0,
    pageSize: 25,
  });

  useEffect(() => {
    formRef.current?.setFieldValue('deviceIds', selectionModel);
  }, [selectionModel]);

  const { devices, devicesMeta, isDevicesLoading, mutateDevices } = useDevices({
    ...queryOptions,
    page: queryOptions.page + 1
  });

  const { createDeviceGroup } = useDeviceGroupCRUD();

  const validationSchema = createDeviceGroupValidationSchema();

  return (
    <>
      <PageTitleWrapper>
        <PageTitle
          heading="Create device group"
          subHeading="To create a new device group, enter a device group name and select the devices below by checking the checkbox."
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
              <CardHeader title="Create new device group"/>
              <Divider/>
              <Formik
                innerRef={formRef}
                enableReinitialize={true}
                initialValues={{
                  name: '',
                  deviceIds: [] as string[],
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setErrors, setSubmitting }) => {
                  createDeviceGroup(values, { setErrors, setSubmitting });
                }}
              >
                {({ handleSubmit, isSubmitting }: FormikProps<CreateDeviceGroupFormFormikValues>) => (
                  <>
                    <CardContent>
                      <Box
                        component="form"
                        sx={{ p: 1 }}
                        noValidate
                        autoComplete="off"
                      >
                        <FullWidthTextField
                          required
                          id="name"
                          name="name"
                          label="Device group name"
                          placeholder="Enter device group name"
                        />
                        {(formRef.current?.touched.deviceIds && formRef.current?.errors.deviceIds) && (
                          <NoDeviceSelectedDeviceGroupCreateAlert/>
                        )}
                        <DevicesDataGrid
                          selectionModel={selectionModel}
                          setSelectionModel={setSelectionModel}
                          queryOptions={queryOptions}
                          setQueryOptions={setQueryOptions}
                          devices={devices}
                          devicesMeta={devicesMeta}
                          isDevicesLoading={isDevicesLoading}
                          mutateDevices={mutateDevices}
                          hideActionsColumn
                        />
                      </Box>
                    </CardContent>
                    <Divider/>
                    <CardActions>
                      <CardActionsLoadingButton
                        loading={isSubmitting}
                        onClick={() => handleSubmit()}
                      >
                        Create
                      </CardActionsLoadingButton>
                    </CardActions>
                  </>
                )}
              </Formik>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer/>
      <Toaster/>
    </>
  );
};

CreateDeviceGroupPage.getLayout = function getLayout(page: ReactElement) {
  return getSidebarLayout('Create device group', page);
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(locale && await serverSideTranslations(locale, ['validation'])),
  }
});

export default CreateDeviceGroupPage;
