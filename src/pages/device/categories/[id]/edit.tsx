import PageTitle from '../../../../components/PageTitle';
import { ReactElement, useEffect, useRef, useState } from 'react';
import PageTitleWrapper from '../../../../components/PageTitleWrapper';
import { Box, Card, CardActions, CardContent, CardHeader, Container, Divider, Grid } from '@mui/material';
import Footer from '../../../../components/Footer';
import { NextPageWithLayout } from '../../../_app';
import { getSidebarLayout } from '../../../../layouts';
import { Formik, FormikProps } from 'formik';
import FullWidthTextField from '../../../../components/FullWidthTextField';
import { Toaster } from 'react-hot-toast';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useDeviceCategory } from '../../../../hooks/deviceCategory/useDeviceCategory';
import { DeviceCategoryData, useDeviceCategoryCRUD } from '../../../../hooks/deviceCategory/useDeviceCategoryCRUD';
import { EditDeviceCategoryFormFormikValues } from '../../../../types/deviceCategory';
import DevicesDataGrid from '../../../../components/DevicesDataGrid';
import { GridSelectionModel } from '@mui/x-data-grid';
import { QueryOptions } from '../../../../types/dataGrid';
import { useDevices } from '../../../../hooks/device/useDevices';
import editDeviceCategoryValidationSchema
  from '../../../../validationSchemas/deviceCategory/editDeviceCategoryValidationSchema';
import CardActionsLoadingButton from '../../../../components/CardActionsLoadingButton';
import AssignDeviceToDeviceCategoryAlert from '../../../../components/AssignDeviceToDeviceCategoryAlert';
import { sanitizeFormValues } from '../../../../utils/utils';

const EditDeviceCategoryPage: NextPageWithLayout = () => {
  const router = useRouter();
  const deviceCategoryId = router.query.id as string;

  const formRef = useRef<FormikProps<EditDeviceCategoryFormFormikValues>>(null);

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

  const { deviceCategory, isDeviceCategoryLoading, isDeviceCategoryError } = useDeviceCategory(deviceCategoryId);

  const { devices, devicesMeta, isDevicesLoading, mutateDevices } = useDevices({
    ...queryOptions,
    page: queryOptions.page + 1
  });

  const { updateDeviceCategory } = useDeviceCategoryCRUD();

  const validationSchema = editDeviceCategoryValidationSchema();

  return (
    <>
      <PageTitleWrapper>
        <PageTitle
          heading="Edit device category"
          subHeading="You can change the device category name and change the device category of devices to this device category by checking the checkbox."
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
              <CardHeader title={`Device category ${deviceCategoryId}`}/>
              <Divider/>
              <Formik
                innerRef={formRef}
                enableReinitialize={true}
                initialValues={{
                  name: deviceCategory?.name ?? '',
                  deviceIds: undefined,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setErrors, setSubmitting }) => {
                  updateDeviceCategory(deviceCategoryId, sanitizeFormValues(values) as DeviceCategoryData, {
                    setErrors,
                    setSubmitting
                  });
                }}
              >
                {({ handleSubmit, isSubmitting }: FormikProps<EditDeviceCategoryFormFormikValues>) => (
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
                        Update
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

EditDeviceCategoryPage.getLayout = function getLayout(page: ReactElement) {
  return getSidebarLayout('Edit device category', page);
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(locale && await serverSideTranslations(locale, ['validation']))
  }
});

export default EditDeviceCategoryPage;
