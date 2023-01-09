/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import React from 'react';
import Head from "next/head";
import { SidebarProvider } from "../../contexts/SidebarContext";
import ThemeProvider from "../../theme/ThemeProvider";
import CssBaseline from "@mui/material/CssBaseline";
import SidebarLayout from "../SidebarLayout";

interface SidebarLayoutWrapperProps {
  title: string;
  page: React.ReactElement;
}

const SidebarLayoutWrapper = ({ title, page }: SidebarLayoutWrapperProps) => {
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

export default SidebarLayoutWrapper;
