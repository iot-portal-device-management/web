import CssBaseline from '@mui/material/CssBaseline';
import Head from 'next/head'
import type { ReactElement } from "react";

import SidebarLayout from "../layouts/SidebarLayout";
import ThemeProvider from "../theme/ThemeProvider";
import { SidebarProvider } from "../contexts/SidebarContext";
import type { NextPageWithLayout } from './_app'

const Index: NextPageWithLayout = () => {
  return (
    <div>Test page</div>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Head>
        <title>IoT Portal Device Management</title>
      </Head>
      <SidebarProvider>
        <ThemeProvider>
          <CssBaseline/>
          <SidebarLayout>
            {page}
          </SidebarLayout>
        </ThemeProvider>
      </SidebarProvider>
    </>
  );
};

export default Index;