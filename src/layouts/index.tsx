import React from 'react';
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import { SidebarProvider } from "../contexts/SidebarContext";
import ThemeProvider from "../theme/ThemeProvider";
import SidebarLayout from './SidebarLayout';

export const getSidebarLayout = (title: string, page: React.ReactElement) => {
  return (
    <>
      <Head>
        <title>{title}</title>
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

