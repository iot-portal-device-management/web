/*
 * Copyright (C) 2021-2022 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { Card } from '@mui/material';
import { styled } from '@mui/material/styles';

const BaseLayoutCard = styled(Card)(
  ({ theme }) => `
    margin-top: ${theme.spacing(3)};
    padding: ${theme.spacing(5)} ${theme.spacing(4)} ${theme.spacing(3)};
`
);

export default BaseLayoutCard;
