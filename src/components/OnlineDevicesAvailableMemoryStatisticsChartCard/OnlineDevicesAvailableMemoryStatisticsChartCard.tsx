import { useState } from 'react';
import type { SelectChangeEvent } from '@mui/material';
import type { ApexOptions } from 'apexcharts';
import TimeRangeFilterableChartCard from '../TimeRangeFilterableChartCard';
import { useOnlineDevicesAvailableMemoryStatistics } from '../../hooks/onlineDevicesAvailableMemoryStatistic/useOnlineDevicesAvailableMemoryStatistics';
import { chartSeriesTimestampAvailableMemoryInBytesDataFormatter } from '../../utils/apexCharts';

const OnlineDevicesAvailableMemoryStatisticsChartCard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState(1);

  const {
    onlineDevicesAvailableMemoryStatistics,
    onlineDevicesAvailableMemoryStatisticsError,
    isOnlineDevicesAvailableMemoryStatisticsLoading
  } = useOnlineDevicesAvailableMemoryStatistics({ timeRange: selectedTimeRange });

  const availableMemoryTimeSeries = onlineDevicesAvailableMemoryStatistics?.map((availableMemoryStatistic: any) => {
    return {
      ...availableMemoryStatistic,
      data: availableMemoryStatistic.data?.map(chartSeriesTimestampAvailableMemoryInBytesDataFormatter),
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
  };

  const handleTimeRangeFilterChange = (event: SelectChangeEvent<number>): void => {
    setSelectedTimeRange(Number(event.target.value));
  };

  return (
    <TimeRangeFilterableChartCard
      options={chartOptions}
      series={availableMemoryTimeSeries}
      type="line"
      height={500}
      title="Available memory"
      selectedTimeRange={selectedTimeRange}
      onTimeRangeFilterChange={handleTimeRangeFilterChange}
    />
  );
};

export default OnlineDevicesAvailableMemoryStatisticsChartCard;
