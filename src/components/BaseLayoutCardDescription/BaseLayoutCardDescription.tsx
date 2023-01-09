/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const BaseLayoutCardDescription = styled(Typography)(
  ({ theme }) => `
    margin: 0 0 ${theme.spacing(3)};
    color: ${theme.colors.alpha.black[70]};
    font-weight: normal;
`
);

export default BaseLayoutCardDescription;
