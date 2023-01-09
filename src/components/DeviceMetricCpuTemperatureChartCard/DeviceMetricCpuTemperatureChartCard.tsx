/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { useState } from 'react';
import type { SelectChangeEvent } from '@mui/material';
import type { ApexOptions } from 'apexcharts';
import { useDeviceMetricCpuTemperatures } from '../../hooks/deviceMetricCpuTemperature/useDeviceMetricCpuTemperatures';
import TimeRangeFilterableChartCard from '../TimeRangeFilterableChartCard';

interface DeviceMetricCpuTemperatureChartCardProps {
  deviceId: string;
}

const DeviceMetricCpuTemperatureChartCard = ({ deviceId }: DeviceMetricCpuTemperatureChartCardProps) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState(1);
  const {
    cpuTemperatures,
    cpuTemperaturesError,
    isCpuTemperaturesLoading
  } = useDeviceMetricCpuTemperatures(deviceId, { timeRange: selectedTimeRange });

  const chartOptions: ApexOptions = {
    chart: {
      type: 'area',
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
        text: 'CPU Temperature - Celsius(°C)'
      },
      labels: {
        formatter: function (value) {
          return `${Math.round(value)}°C`;
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
          return `${value}°C`;
        },
      },
      x: {
        format: 'dd MMM yyyy HH:mm:ss',
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100]
      },
    },
  };

  const chartSeries = [{
    name: 'CPU Temperature',
    data: cpuTemperatures,
  }];

  const handleTimeRangeFilterChange = (event: SelectChangeEvent<number>): void => {
    setSelectedTimeRange(Number(event.target.value));
  };

  return (
    <TimeRangeFilterableChartCard
      options={chartOptions}
      series={chartSeries}
      type="area"
      height={500}
      title="CPU temperature"
      selectedTimeRange={selectedTimeRange}
      onTimeRangeFilterChange={handleTimeRangeFilterChange}
    />
  );
};

export default DeviceMetricCpuTemperatureChartCard;
