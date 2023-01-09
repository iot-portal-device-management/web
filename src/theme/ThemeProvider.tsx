/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { themeCreator } from './base';
// import { StylesProvider } from '@mui/styles';

export const ThemeContext = React.createContext(
  (themeName: string): void => {
  }
);

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProviderWrapper = (props: ThemeProviderProps) => {
  // const curThemeName = localStorage.getItem('appTheme') || 'PureLightTheme';
  const curThemeName = 'PureLightTheme';
  const [themeName, _setThemeName] = useState(curThemeName);
  const theme = themeCreator(themeName);
  const setThemeName = (themeName: string): void => {
    // localStorage.setItem('appTheme', themeName);
    _setThemeName(themeName);
  };

  return (
    // <StylesProvider injectFirst>
    <ThemeContext.Provider value={setThemeName}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </ThemeContext.Provider>
    // </StylesProvider>
  );
};

export default ThemeProviderWrapper;
