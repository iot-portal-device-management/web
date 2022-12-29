/*
 * Copyright (C) 2021-2022 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import React from 'react';
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import { SidebarProvider } from "../contexts/SidebarContext";
import ThemeProvider from "../theme/ThemeProvider";
import SidebarLayout from './SidebarLayout';
import BaseLayout from "./BaseLayout";
import NProgress from '../components/NProgress';

export const getSidebarLayout = (title: string, page: React.ReactElement) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <SidebarProvider>
        <ThemeProvider>
          <NProgress/>
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
          <NProgress/>
          <CssBaseline/>
          <BaseLayout>
            {page}
          </BaseLayout>
        </ThemeProvider>
      </SidebarProvider>
    </>
  );
};

