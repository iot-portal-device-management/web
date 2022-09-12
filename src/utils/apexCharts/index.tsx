interface ApexChartsDateCountSeries {
  date: string;
  count: number;
}

export const chartSeriesDataFormatter = (item: ApexChartsDateCountSeries) => {
  return {
    x: item.date,
    y: item.count,
  };
};