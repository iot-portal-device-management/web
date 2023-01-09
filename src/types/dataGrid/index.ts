/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { GridFilterModel, GridSortModel } from '@mui/x-data-grid';

export interface QueryOptions {
  sortModel?: GridSortModel;
  filterModel?: GridFilterModel;
  page: number;
  pageSize: number;
}
