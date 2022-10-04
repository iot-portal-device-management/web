import { ApexOptions } from 'apexcharts';
import { roundToTwoDecimalPlaces } from '../utils';

interface ChartSeriesDateCountData {
  date: string;
  count: number;
}

interface ChartSeriesTimestampTemperatureData {
  timestamp: number;
  temperature: number;
}

interface ChartSeriesTimestampCpuUsagePercentageData {
  timestamp: number;
  cpuUsagePercentage: number;
}

interface ChartSeriesTimestampDiskUsagePercentageData {
  timestamp: number;
  diskUsagePercentage: number;
}

interface ChartSeriesTimestampAvailableMemoryInBytesData {
  timestamp: number;
  availableMemoryInBytes: number;
}


export const chartSeriesDateCountDataFormatter = (data: ChartSeriesDateCountData) => {
  return {
    x: data.date,
    y: data.count,
  };
};

export const chartSeriesTimestampTemperatureDataFormatter = (data: ChartSeriesTimestampTemperatureData) => {
  return [data.timestamp, data.temperature];
};

export const chartSeriesTimestampCpuUsagePercentageDataFormatter = (data: ChartSeriesTimestampCpuUsagePercentageData) => {
  return [data.timestamp, data.cpuUsagePercentage];
};

export const chartSeriesTimestampDiskUsagePercentageDataFormatter = (data: ChartSeriesTimestampDiskUsagePercentageData) => {
  return [data.timestamp, data.diskUsagePercentage];
};

export const chartSeriesTimestampAvailableMemoryInBytesDataFormatter = (data: ChartSeriesTimestampAvailableMemoryInBytesData) => {
  return [data.timestamp, data.availableMemoryInBytes];
};

export const calculateTwentyFourHourChange = (series: ApexOptions['series']) => {
  // @ts-ignore
  if (series && series[0]['data']?.length) {
    // @ts-ignore
    const dataLength = series[0]['data']?.length;
    // @ts-ignore
    const secondLastDayCount = series[0]['data'][dataLength - 2].y;

    // @ts-ignore
    const twentyFourHourCountChange = Math.round(series[0]['data'][dataLength - 1].y - secondLastDayCount);
    let twentyFourHourPercentChange = roundToTwoDecimalPlaces(((twentyFourHourCountChange / secondLastDayCount) || 0) * 100);

    if (twentyFourHourPercentChange == Number.POSITIVE_INFINITY || twentyFourHourPercentChange == Number.NEGATIVE_INFINITY) {
      twentyFourHourPercentChange = 100
    }

    return [twentyFourHourCountChange, twentyFourHourPercentChange];
  }

  return [0, 0];
};

export const formatNumberValue = (value: number) => {
  return (value > 0 ? '+' : '') + value;
};

export const determineValueChangeColor = (value: number) => {
  if (value > 0) return 'success';
  else if (value < 0) return 'error'

  return 'warning';
};
