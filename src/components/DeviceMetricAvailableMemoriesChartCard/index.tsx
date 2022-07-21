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
import LargeCardHeader from '../LargeCardHeader';
import { CHART_TIME_RANGE_FILTER_OPTIONS } from '../../data/chart/options';
import { useDeviceMetricAvailableMemories } from '../../hooks/deviceMetricAvailableMemory/useDeviceMetricAvailableMemories';

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

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
      <Card>
        <LargeCardHeader
          title="Available Memory"
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

export default DeviceMetricAvailableMemoriesChartCard;
