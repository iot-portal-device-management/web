import { useState } from 'react';
import type { SelectChangeEvent } from '@mui/material';
import type { ApexOptions } from 'apexcharts';
import TimeRangeFilterableChartCard from '../TimeRangeFilterableChartCard';
import { useOnlineDevicesDiskUsageStatistics } from '../../hooks/onlineDevicesDiskUsageStatistic/useOnlineDevicesDiskUsageStatistics';
import { chartSeriesTimestampDiskUsagePercentageDataFormatter } from '../../utils/apexCharts';

const OnlineDevicesDiskUsageStatisticsChartCard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState(1);

  const {
    onlineDevicesDiskUsageStatistics,
    isOnlineDevicesDiskUsageStatisticsLoading,
    isOnlineDevicesDiskUsageStatisticsError
  } = useOnlineDevicesDiskUsageStatistics({ timeRange: selectedTimeRange });

  const diskUsageTimeSeries = onlineDevicesDiskUsageStatistics?.map((diskUsageStatistic: any) => {
    return {
      ...diskUsageStatistic,
      data: diskUsageStatistic.data?.map(chartSeriesTimestampDiskUsagePercentageDataFormatter),
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
        text: 'Disk Usage %'
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
      series={diskUsageTimeSeries}
      type="line"
      height={500}
      title="Disk usage"
      selectedTimeRange={selectedTimeRange}
      onTimeRangeFilterChange={handleTimeRangeFilterChange}
    />
  );
};

export default OnlineDevicesDiskUsageStatisticsChartCard;
