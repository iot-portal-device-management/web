import { ReactElement } from 'react';
import { getSidebarLayout } from '../../../../../layouts';
import PageTitleWrapper from '../../../../../components/PageTitleWrapper';
import PageTitle from '../../../../../components/PageTitle';
import { Box, Card, CardContent, CardHeader, Container, Divider, Grid, Stack, Typography } from '@mui/material';
import Footer from '../../../../../components/Footer';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useSavedDeviceCommand } from '../../../../../hooks/savedDeviceCommand/useSavedDeviceCommand';
import JSONView from '../../../../../components/JSONView';
import Text from '../../../../../components/Text';

const ViewSavedDeviceCommandPage = () => {
  const router = useRouter();
  const savedDeviceCommandId = router.query.id as string;

  const {
    savedDeviceCommand,
    isSavedDeviceCommandLoading,
    isSavedDeviceCommandError
  } = useSavedDeviceCommand(savedDeviceCommandId);

  return (
    <>
      <PageTitleWrapper>
        <PageTitle
          heading={savedDeviceCommand?.name}
          subHeading={savedDeviceCommandId}
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
              <CardHeader title="Details"/>
              <Divider/>
              <CardContent>
                <Stack>
                  <Typography variant="subtitle2">
                    <Grid container spacing={0}>
                      <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                        <Box pr={3} pb={2}>
                          Device command type name:
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={8} md={9}>
                        <Text color="black">
                          <b>{savedDeviceCommand?.deviceCommandTypeName}</b>
                        </Text>
                      </Grid>
                    </Grid>
                  </Typography>
                  <Box>
                    <Typography variant="subtitle2">
                      Payload:
                    </Typography>
                    <JSONView data={savedDeviceCommand?.payload}/>
                  </Box>
                </Stack>
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

ViewSavedDeviceCommandPage.getLayout = function getLayout(page: ReactElement) {
  return getSidebarLayout('View saved device command', page);
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(locale && await serverSideTranslations(locale, ['validation'])),
  }
});

export default ViewSavedDeviceCommandPage;
