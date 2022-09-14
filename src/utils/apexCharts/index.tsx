import { ApexOptions } from 'apexcharts';
import { roundToTwoDecimalPlaces } from '../utils';

interface ChartSeriesDateCountData {
  date: string;
  count: number;
}

export const chartSeriesDateCountDataFormatter = (item: ChartSeriesDateCountData) => {
  return {
    x: item.date,
    y: item.count,
  };
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

export const determineValueChangeSign = (value: number) => {
  if (value > 0) return '+';
  else if (value < 0) return '-'

  return '';
};

export const determineValueChangeColor = (value: number) => {
  if (value > 0) return 'success';
  else if (value < 0) return 'error'

  return 'warning';
};
