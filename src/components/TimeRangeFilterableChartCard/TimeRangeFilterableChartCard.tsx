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
import { Props as ChartProps } from 'react-apexcharts';
import LargeCardHeader from '../LargeCardHeader';
import { CHART_TIME_RANGE_FILTER_OPTIONS } from '../../data/chart/options';
import { ChartTimeRangeFilterOption } from '../../types/chart';
import Chart from '../Chart';

interface TimeRangeFilterableChartCardProps extends ChartProps {
  title: string;
  timeRangeFilterOptions?: ChartTimeRangeFilterOption[];
  selectedTimeRange: number;
  onTimeRangeFilterChange: (event: SelectChangeEvent<number>) => void
}

const TimeRangeFilterableChartCard = ({
                                        options,
                                        series,
                                        type,
                                        width,
                                        height,
                                        title,
                                        timeRangeFilterOptions,
                                        selectedTimeRange,
                                        onTimeRangeFilterChange
                                      }: TimeRangeFilterableChartCardProps) => {
  return (
    <Card>
      <LargeCardHeader
        title={title}
        action={
          <Box width={150}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Time range</InputLabel>
              <Select
                autoWidth
                label="Time range"
                value={selectedTimeRange || 1}
                onChange={onTimeRangeFilterChange}
              >
                {(timeRangeFilterOptions ?? CHART_TIME_RANGE_FILTER_OPTIONS).map((timeRangeFilterOption: ChartTimeRangeFilterOption) => (
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
          options={options}
          series={series}
          type={type}
          width={width}
          height={height}
        />
      </CardContent>
    </Card>
  );
};

export default TimeRangeFilterableChartCard;
