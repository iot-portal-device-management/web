import { ReactElement, useState } from 'react';
import { GetStaticProps } from 'next';
import { NextPageWithLayout } from '../../_app';
import { getSidebarLayout } from '../../../layouts';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { QueryOptions } from '../../../types/dataGrid';
import PageTitleWrapper from '../../../components/PageTitleWrapper';
import { Toaster } from 'react-hot-toast';
import { Box, Card, CardContent, Container, Grid } from '@mui/material';
import PageTitle from '../../../components/PageTitle';
import Footer from '../../../components/Footer';
import DataGridCreateDeleteToolbar from '../../../components/DataGridCreateDeleteToolbar';
import DeviceJobsDataGrid from '../../../components/DeviceJobsDataGrid';
import { useDeviceJobs } from '../../../hooks/deviceJob/useDeviceJobs';
import CustomizedError from '../../../components/CustomizedError';

const DeviceJobIndexPage: NextPageWithLayout = () => {
  const router = useRouter();

  const [queryOptions, setQueryOptions] = useState<QueryOptions>({
    sortModel: undefined,
    filterModel: undefined,
    page: 0,
    pageSize: 25,
  });

  const { deviceJobs, deviceJobsMeta, deviceJobsError, isDeviceJobsLoading, mutateDeviceJobs } = useDeviceJobs({
    ...queryOptions,
    page: queryOptions.page + 1
  });

  if (deviceJobsError) return <CustomizedError statusCode={deviceJobsError?.response?.status}/>;

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
                  onCreateClick={() => router.push('/device/jobs/create')}
                  hideDelete
                />
                <Box sx={{ width: '100%' }}>
                  <DeviceJobsDataGrid
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
      <Toaster/>
    </>
  );
};

DeviceJobIndexPage.getLayout = function getLayout(page: ReactElement) {
  return getSidebarLayout('Device jobs', page);
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(locale && await serverSideTranslations(locale, ['validation'])),
  }
});

export default DeviceJobIndexPage;
