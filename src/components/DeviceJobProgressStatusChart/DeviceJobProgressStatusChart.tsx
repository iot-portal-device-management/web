/*
 * Copyright (C) 2021-2022 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import type { ApexOptions } from 'apexcharts';
import Chart from '../Chart';

interface DeviceJobProgressStatusChartProps {
  series: Array<number>;
}

const DeviceJobProgressStatusChart = ({ series, ...rest }: DeviceJobProgressStatusChartProps) => {
  const options: ApexOptions = {
    chart: {
      type: 'pie',
      width: 200,
    },
    labels: ['Pending', 'Processing', 'Successful', 'Failed'],
    colors: ['#33c2ff', '#bbc6c2', '#00e396', '#ff4560'],
    legend: {
      position: 'top'
    },
  };

  return (
    <Chart
      options={options}
      series={series}
      type="pie"
      height={200}
      {...rest}
    />
  );
};

export default DeviceJobProgressStatusChart;
