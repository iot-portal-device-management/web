/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import React, { createContext, useState } from 'react';

type SidebarContext = { sidebarToggle: any; toggleSidebar: () => void };

export const SidebarContext = createContext<SidebarContext>(
  {} as SidebarContext
);

export const SidebarProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  const toggleSidebar = () => {
    setSidebarToggle(!sidebarToggle);
  };

  return (
    <SidebarContext.Provider value={{ sidebarToggle, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
