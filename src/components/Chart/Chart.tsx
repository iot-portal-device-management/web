/*
 * Copyright (C) 2021-2022 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import dynamic from 'next/dynamic'

const Chart = dynamic(
  () => import('react-apexcharts'),
  { ssr: false }
);

export default Chart;
