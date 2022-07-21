import { useState } from 'react';
import dynamic from 'next/dynamic';
import {
  Box,
  Card,
  CardContent,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material';
import { ApexOptions } from 'apexcharts';
import { useDeviceMetricCpuTemperatures } from '../../hooks/deviceMetricCpuTemperature/useDeviceMetricCpuTemperatures';
import LargeCardHeader from '../LargeCardHeader';
import { CHART_TIME_RANGE_FILTER_OPTIONS } from '../../data/chart/options';

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface DeviceMetricCpuTemperaturesChartCardProps {
  deviceId: string;
}

const DeviceMetricCpuTemperaturesChartCard = ({ deviceId }: DeviceMetricCpuTemperaturesChartCardProps) => {
    const [selectedTimeRange, setSelectedTimeRange] = useState(1);
    const {
      cpuTemperatures,
      isCpuTemperaturesLoading,
      isCpuTemperaturesError
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
          text: 'Temperature - Celsius(°C)'
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
      name: "Temperature",
      data: cpuTemperatures,
    }];

    const handleTimeRangeFilterChange = (event: SelectChangeEvent<number>): void => {
      setSelectedTimeRange(Number(event.target.value));
    };

    return (
      <Card>
        <LargeCardHeader
          title="CPU Temperature"
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Time range</InputLabel>
                <Select
                  autoWidth
                  label="Time range"
                  value={selectedTimeRange || 1}
                  onChange={handleTimeRangeFilterChange}
                >
                  {CHART_TIME_RANGE_FILTER_OPTIONS.map((timeRangeFilterOption) => (
                    <MenuItem key={timeRangeFilterOption.value} value={timeRangeFilterOption.value}>
                      {timeRangeFilterOption.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
        />
        <Divider/>
        <CardContent>
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="area"
            height={500}
          />
        </CardContent>
      </Card>
    );
  }
;

export default DeviceMetricCpuTemperaturesChartCard;
