import { ChangeEvent, ReactElement, useState } from 'react';
import { getSidebarLayout } from '../layouts';
import PageTitleWrapper from '../components/PageTitleWrapper';
import PageTitle from '../components/PageTitle';
import { Container, Grid, Tab } from '@mui/material';
import Footer from '../components/Footer';
import { Toaster } from 'react-hot-toast';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import TabsWrapper from '../components/TabsWrapper';
import ApiTokensTab from '../components/ApiTokensTab';
import DashboardPageHeader from '../components/DashboardPageHeader';
import DashboardOverview from '../components/DashboardOverview';

const IndexPage = () => {
  return (
    <>
      <PageTitleWrapper>
        <DashboardPageHeader/>
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
            <DashboardOverview/>
          </Grid>
        </Grid>
      </Container>
      <Footer/>
      <Toaster/>
    </>
  );
};

IndexPage.getLayout = function getLayout(page: ReactElement) {
  return getSidebarLayout('Home', page);
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(locale && await serverSideTranslations(locale, ['validation'])),
  }
});

export default IndexPage;
