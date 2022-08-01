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
import CardActionsLoadingButton from '../../../components/CardActionsLoadingButton';
import { CreateDeviceCategoryFormFormikValues } from '../../../types/deviceCategory';
import { DeviceCategoryData, useDeviceCategoryCRUD } from '../../../hooks/deviceCategory/useDeviceCategoryCRUD';
import createDeviceCategoryValidationSchema
  from '../../../validationSchemas/deviceCategory/createDeviceCategoryValidationSchema';
import AssignDeviceToDeviceCategoryAlert from '../../../components/AssignDeviceToDeviceCategoryAlert';
import DevicesDataGrid from '../../../components/DevicesDataGrid';
import { GridSelectionModel } from '@mui/x-data-grid';
import { QueryOptions } from '../../../types/dataGrid';
import { useDevices } from '../../../hooks/device/useDevices';
import { sanitizeFormValues } from '../../../utils/utils';

const CreateDeviceCategoryPage: NextPageWithLayout = () => {
  const formRef = useRef<FormikProps<CreateDeviceCategoryFormFormikValues>>(null);

  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
  const [queryOptions, setQueryOptions] = useState<QueryOptions>({
    sortModel: undefined,
    filterModel: undefined,
    page: 0,
    pageSize: 25,
  });

  useEffect(() => {
    if (selectionModel && selectionModel?.length) {
      formRef.current?.setFieldValue('deviceIds', selectionModel);
    } else {
      formRef.current?.setFieldValue('deviceIds', undefined);
    }
  }, [selectionModel]);

  const { devices, devicesMeta, isDevicesLoading, mutateDevices } = useDevices({
    ...queryOptions,
    page: queryOptions.page + 1
  });

  const { createDeviceCategory } = useDeviceCategoryCRUD();

  const validationSchema = createDeviceCategoryValidationSchema();

  return (
    <>
      <PageTitleWrapper>
        <PageTitle
          heading="Create device category"
          subHeading="To create a new device category, enter a device category name."
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
              <CardHeader title="Create new device category"/>
              <Divider/>
              <Formik
                innerRef={formRef}
                enableReinitialize={true}
                initialValues={{
                  name: '',
                  deviceIds: undefined,
                } as CreateDeviceCategoryFormFormikValues
                }
                validationSchema={validationSchema}
                onSubmit={(values, { setErrors, setSubmitting }) => {
                  createDeviceCategory(sanitizeFormValues(values) as DeviceCategoryData, {
                    setErrors,
                    setSubmitting
                  });
                }}
              >
                {({ handleSubmit, isSubmitting }: FormikProps<CreateDeviceCategoryFormFormikValues>) => (
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
                          label="Device category name"
                          placeholder="Enter device category name"
                        />
                        <AssignDeviceToDeviceCategoryAlert/>
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

CreateDeviceCategoryPage.getLayout = function getLayout(page: ReactElement) {
  return getSidebarLayout('Create device category', page);
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(locale && await serverSideTranslations(locale, ['validation'])),
  }
});

export default CreateDeviceCategoryPage;
