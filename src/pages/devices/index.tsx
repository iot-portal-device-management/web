import { NextPageWithLayout } from '../_app';
import * as React from 'react';
import { ReactElement } from 'react';
import { getSidebarLayout } from '../../layouts';

const DeviceIndexPage: NextPageWithLayout = () => {
  return (
    <div></div>

  );
};

DeviceIndexPage.getLayout = function getLayout(page: ReactElement) {
  return getSidebarLayout('Devices', page);
};

export default DeviceIndexPage;
