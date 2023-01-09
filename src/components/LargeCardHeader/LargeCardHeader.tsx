/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface SubtitleCardHeaderProps {
  title: string;
  subheader?: string;
  action?: ReactNode
}

const LargeCardHeader = ({ title, subheader, action }: SubtitleCardHeaderProps) => {
  return (
    <Box
      p={3}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box>
        {title && (
          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>
        )}
        {subheader && (
          <Typography variant="subtitle2">
            {subheader}
          </Typography>
        )}
      </Box>
      {action && action}
    </Box>
  );
};

export default LargeCardHeader;
