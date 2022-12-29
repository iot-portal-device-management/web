/*
 * Copyright (C) 2021-2022 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { useTheme } from '@mui/material/styles';
import NextNProgress from "nextjs-progressbar";

const NProgress = () => {
  const theme = useTheme();

  return (
    <NextNProgress color={theme.colors.primary.main}/>
  );
};

export default NProgress;
