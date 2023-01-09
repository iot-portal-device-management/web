/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const BaseLayoutMainContentWrapper = styled(Box)(
  ({ theme }) => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

export default BaseLayoutMainContentWrapper;
