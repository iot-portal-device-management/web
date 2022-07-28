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
import { useDeviceGroup } from '../../../../hooks/deviceGroup/useDeviceGroup';
import { useDeviceGroupCRUD } from '../../../../hooks/deviceGroup/useDeviceGroupCRUD';
import { EditDeviceGroupFormFormikValues } from '../../../../types/deviceGroup';
import DevicesDataGrid from '../../../../components/DevicesDataGrid';
import { GridRowModel, GridSelectionModel } from '@mui/x-data-grid';
import { QueryOptions } from '../../../../types/dataGrid';
import { useDevices } from '../../../../hooks/device/useDevices';
import { useDeviceGroupDevices } from '../../../../hooks/deviceGroup/useDeviceGroupDevices';
import NoDeviceSelectedDeviceGroupEditAlert from '../../../../components/NoDeviceSelectedDeviceGroupEditAlert';
import editDeviceGroupValidationSchema from '../../../../validationSchemas/deviceGroup/editDeviceGroupValidationSchema';
import CardActionsLoadingButton from '../../../../components/CardActionsLoadingButton';

const EditDeviceGroupPage: NextPageWithLayout = () => {
  const router = useRouter();
  const deviceGroupId = router.query.id as string;

  const formRef = useRef<FormikProps<EditDeviceGroupFormFormikValues>>(null);

  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
  const [queryOptions, setQueryOptions] = useState<QueryOptions>({
    sortModel: undefined,
    filterModel: undefined,
    page: 0,
    pageSize: 25,
  });

  const { devices, devicesMeta, isDevicesLoading, mutateDevices } = useDevices({
    ...queryOptions,
    page: queryOptions.page + 1
  });

  const { deviceGroup, isDeviceGroupLoading, isDeviceGroupError } = useDeviceGroup(deviceGroupId);

  const {
    deviceGroupDevices,
    deviceGroupDevicesMeta,
    isDeviceGroupDevicesLoading,
    isDeviceGroupDevicesError
  } = useDeviceGroupDevices(deviceGroupId, { fetchAll: true });

  useEffect(() => {
    if (deviceGroupDevices) {
      setSelectionModel(deviceGroupDevices?.map(({ id }: GridRowModel) => (id)));
    }
  }, [deviceGroupDevices]);

  useEffect(() => {
    formRef.current?.setFieldValue('deviceIds', selectionModel);
  }, [selectionModel]);

  const { updateDeviceGroup } = useDeviceGroupCRUD();

  const validationSchema = editDeviceGroupValidationSchema();

  return (
    <>
      <PageTitleWrapper>
        <PageTitle
          heading="Edit device group"
          subHeading="You can change a device group name, add or remove devices from the device group."
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
              <CardHeader title={`Device group ${deviceGroupId}`}/>
              <Divider/>
              <Formik
                enableReinitialize={true}
                initialValues={{
                  name: deviceGroup?.name ?? '',
                  deviceIds: selectionModel as string[],
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setErrors, setSubmitting }) => {
                  updateDeviceGroup(deviceGroupId, values, { setErrors, setSubmitting });
                }}
              >
                {({ handleSubmit, isSubmitting }: FormikProps<EditDeviceGroupFormFormikValues>) => (
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
                          <NoDeviceSelectedDeviceGroupEditAlert/>
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

EditDeviceGroupPage.getLayout = function getLayout(page: ReactElement) {
  return getSidebarLayout('Edit device group', page);
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(locale && await serverSideTranslations(locale, ['validation']))
  }
});

export default EditDeviceGroupPage;
