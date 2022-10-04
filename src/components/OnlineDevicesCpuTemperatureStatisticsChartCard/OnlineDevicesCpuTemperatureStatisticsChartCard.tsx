import { useState } from 'react';
import type { SelectChangeEvent } from '@mui/material';
import type { ApexOptions } from 'apexcharts';
import TimeRangeFilterableChartCard from '../TimeRangeFilterableChartCard';
import { useOnlineDevicesCpuTemperatureStatistics } from '../../hooks/onlineDevicesCpuTemperatureStatistic/useOnlineDevicesCpuTemperatureStatistics';
import { chartSeriesTimestampTemperatureDataFormatter } from '../../utils/apexCharts';

const OnlineDevicesCpuTemperatureStatisticsChartCard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState(1);

  const {
    onlineDevicesCpuTemperatureStatistics,
    isOnlineDevicesCpuTemperatureStatisticsLoading,
    isOnlineDevicesCpuTemperatureStatisticsError
  } = useOnlineDevicesCpuTemperatureStatistics({ timeRange: selectedTimeRange });

  const cpuTemperatureTimeSeries = onlineDevicesCpuTemperatureStatistics?.map((cpuTemperatureStatistic: any) => {
    return {
      ...cpuTemperatureStatistic,
      data: cpuTemperatureStatistic.data?.map(chartSeriesTimestampTemperatureDataFormatter),
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
  };

  const handleTimeRangeFilterChange = (event: SelectChangeEvent<number>): void => {
    setSelectedTimeRange(Number(event.target.value));
  };

  return (
    <TimeRangeFilterableChartCard
      options={chartOptions}
      series={cpuTemperatureTimeSeries}
      type="line"
      height={500}
      title="CPU temperature"
      selectedTimeRange={selectedTimeRange}
      onTimeRangeFilterChange={handleTimeRangeFilterChange}
    />
  );
};

export default OnlineDevicesCpuTemperatureStatisticsChartCard;
