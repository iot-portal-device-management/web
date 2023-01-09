/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { ChartTimeRangeFilterOption } from '../../types/chart';

export const CHART_TIME_RANGE_FILTER_OPTIONS: ChartTimeRangeFilterOption[] = [
  { label: 'Last 1 hour', value: 1 },
  { label: 'Last 7 hours', value: 7 },
  { label: 'Last 24 hours', value: 24 },
  { label: 'Last 7 days', value: 168 },
];
