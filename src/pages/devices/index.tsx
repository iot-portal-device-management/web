import { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';
import { getSidebarLayout } from '../../layouts';
import SuspenseLoader from '../../components/SuspenseLoader';

const DeviceIndexPage: NextPageWithLayout = () => {
  return (
    <SuspenseLoader/>
  );
};

DeviceIndexPage.getLayout = function getLayout(page: ReactElement) {
  return getSidebarLayout('Create device', page);
};

export default DeviceIndexPage;
