import { useState } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import { useDeviceMetricAvailableMemories } from '../../hooks/deviceMetricAvailableMemory/useDeviceMetricAvailableMemories';
import TimeRangeFilterableChartCard from '../TimeRangeFilterableChartCard';

interface DeviceMetricAvailableMemoriesChartCardProps {
  deviceId: string;
}

const DeviceMetricAvailableMemoriesChartCard = ({ deviceId }: DeviceMetricAvailableMemoriesChartCardProps) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState(1);
  const {
    availableMemories,
    isAvailableMemoriesLoading,
    isAvailableMemoriesError
  } = useDeviceMetricAvailableMemories(deviceId, { timeRange: selectedTimeRange });

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
        text: 'Available Memory - Megabytes(MB)'
      },
      labels: {
        formatter: function (value) {
          return `${(value / 1024 / 1024).toFixed(2)} MB`;
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
          return `${(value / 1024 / 1024).toFixed(2)} MB`;
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
    name: "Available Memory",
    data: availableMemories,
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
      title="Available memory"
      selectedTimeRange={selectedTimeRange}
      onTimeRangeFilterChange={handleTimeRangeFilterChange}
    />
  );
};

export default DeviceMetricAvailableMemoriesChartCard;
