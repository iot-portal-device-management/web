/*
 * Copyright (C) 2021-2022 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { useState } from 'react';
import type { SelectChangeEvent } from '@mui/material';
import type { ApexOptions } from 'apexcharts';
import TimeRangeFilterableChartCard from '../TimeRangeFilterableChartCard';
import { chartSeriesTimestampCpuUsagePercentageDataFormatter } from '../../utils/apexCharts';
import { useOnlineDevicesCpuUsageStatistics } from '../../hooks/onlineDevicesCpuUsageStatistic/useOnlineDevicesCpuUsageStatistics';

const OnlineDevicesCpuUsageStatisticsChartCard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState(1);

  const {
    onlineDevicesCpuUsageStatistics,
    onlineDevicesCpuUsageStatisticsError,
    isOnlineDevicesCpuUsageStatisticsLoading
  } = useOnlineDevicesCpuUsageStatistics({ timeRange: selectedTimeRange });

  const cpuUsageTimeSeries = onlineDevicesCpuUsageStatistics?.map((cpuUsageStatistic: any) => {
    return {
      ...cpuUsageStatistic,
      data: cpuUsageStatistic.data?.map(chartSeriesTimestampCpuUsagePercentageDataFormatter),
    };
  });

  const chartOptions: ApexOptions = {
    chart: {
      type: 'line',
      stacked: false,
      height: 500,
      zoom: {
        autoScaleYaxis: true
      },
    },
    dataLabels: {
      enabled: false
    },
    yaxis: {
      title: {
        text: 'CPU Usage %'
      },
      labels: {
        formatter: function (value) {
          return `${Math.round(value)}%`;
        },
      },
    },
    xaxis: {
      type: 'datetime',
      labels: {
        datetimeUTC: false,
      }
    },
    tooltip: {
      y: {
        formatter: function (value) {
          return `${value}%`;
        },
      },
      x: {
        format: 'dd MMM yyyy HH:mm:ss',
      },
    },
  };

  const handleTimeRangeFilterChange = (event: SelectChangeEvent<number>): void => {
    setSelectedTimeRange(Number(event.target.value));
  };

  return (
    <TimeRangeFilterableChartCard
      options={chartOptions}
      series={cpuUsageTimeSeries}
      type="line"
      height={500}
      title="CPU usage"
      selectedTimeRange={selectedTimeRange}
      onTimeRangeFilterChange={handleTimeRangeFilterChange}
    />
  );
};

export default OnlineDevicesCpuUsageStatisticsChartCard;
