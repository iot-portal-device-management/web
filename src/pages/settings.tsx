import { ChangeEvent, ReactElement, useState } from 'react';
import { getSidebarLayout } from '../layouts';
import PageTitleWrapper from '../components/PageTitleWrapper';
import PageTitle from '../components/PageTitle';
import { Container, Grid, Tab } from '@mui/material';
import Footer from '../components/Footer';
import { Toaster } from 'react-hot-toast';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import TabsWrapper from '../components/TabsWrapper';
import ApiTokensTab from '../components/ApiTokensTab';

const SettingsPage = () => {
  const [currentTab, setCurrentTab] = useState('apiTokens');

  const tabs = [
    { label: 'API Tokens', value: 'apiTokens' },
  ];

  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  return (
    <>
      <PageTitleWrapper>
        <PageTitle
          heading="Settings"
          subHeading="Manage your account settings"
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
            <TabsWrapper
              onChange={handleTabsChange}
              value={currentTab}
              variant="scrollable"
              scrollButtons="auto"
              textColor="primary"
              indicatorColor="primary"
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value}/>
              ))}
            </TabsWrapper>
          </Grid>
          <Grid item xs={12}>
            {currentTab === 'apiTokens' && <ApiTokensTab/>}
          </Grid>
        </Grid>
      </Container>
      <Footer/>
      <Toaster/>
    </>
  );
};

SettingsPage.getLayout = function getLayout(page: ReactElement) {
  return getSidebarLayout('Settings', page);
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(locale && await serverSideTranslations(locale, ['validation'])),
  }
});

export default SettingsPage;
