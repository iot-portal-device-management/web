import { useState } from 'react';
import type { SelectChangeEvent } from '@mui/material';
import type { ApexOptions } from 'apexcharts';
import { useDeviceMetricCpuUsages } from '../../hooks/deviceMetricCpuUsage/useDeviceMetricCpuUsages';
import TimeRangeFilterableChartCard from '../TimeRangeFilterableChartCard';

interface DeviceMetricCpuUsagesChartCardProps {
  deviceId: string;
}

const DeviceMetricCpuUsagesChartCard = ({ deviceId }: DeviceMetricCpuUsagesChartCardProps) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState(1);
  const {
    cpuUsages,
    isCpuUsagesLoading,
    isCpuUsagesError
  } = useDeviceMetricCpuUsages(deviceId, { timeRange: selectedTimeRange });

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
    name: "CPU Usage %",
    data: cpuUsages,
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
      title="CPU usage"
      selectedTimeRange={selectedTimeRange}
      onTimeRangeFilterChange={handleTimeRangeFilterChange}
    />
  );
};

export default DeviceMetricCpuUsagesChartCard;
