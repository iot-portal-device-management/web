import React from 'react';
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import { SidebarProvider } from "../contexts/SidebarContext";
import ThemeProvider from "../theme/ThemeProvider";
import SidebarLayout from './SidebarLayout';
import BaseLayout from "./BaseLayout";

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

export const getBaseLayout = (title: string, page: React.ReactElement) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <SidebarProvider>
        <ThemeProvider>
          <CssBaseline/>
          <BaseLayout>
            {page}
          </BaseLayout>
        </ThemeProvider>
      </SidebarProvider>
    </>
  );
};

