/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { Box, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import { VERSION } from '../../data/version';

const LogoWrapper = styled(Box)(
  ({ theme }) => `
    color: ${theme.palette.text.primary};
    text-decoration: none;
    font-weight: ${theme.typography.fontWeightBold};
    cursor: pointer;
    margin: auto;
    text-align: center;
`
);

const VersionBadge = styled(Box)(
  ({ theme }) => `
    background: ${theme.palette.success.main};
    color: ${theme.palette.success.contrastText};
    padding: ${theme.spacing(0.4, 1)};
    border-radius: ${theme.general.borderRadiusSm};
    text-align: center;
    display: inline-block;
    line-height: 1;
    font-size: ${theme.typography.pxToRem(11)};
    margin: auto;
`
);

const BaseLayoutLogo = () => {
  return (
    <Link href="/">
      <LogoWrapper>
        <Tooltip title={`Version ${VERSION}`} arrow placement="right">
          <VersionBadge>{VERSION}</VersionBadge>
        </Tooltip>
        <Typography variant="h2" sx={{ my: 2 }}>IoT Portal Device Management</Typography>
      </LogoWrapper>
    </Link>
  );
};

export default BaseLayoutLogo;
