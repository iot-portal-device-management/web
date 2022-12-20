import Chart from '../Chart';
import { ApexOptions } from 'apexcharts';
import { useTheme } from '@mui/material';
import { Props as ChartProps } from 'react-apexcharts';

interface OverviewListChartProps extends ChartProps {
}

const OverviewListChart = (props: OverviewListChartProps) => {
  const theme = useTheme();

  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: true
      },
      zoom: {
        enabled: false
      }
    },
    fill: {
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.1,
        inverseColors: false,
        opacityFrom: 0.8,
        opacityTo: 0,
        stops: [0, 100]
      }
    },
    colors: [theme.colors.primary.main],
    dataLabels: {
      enabled: false
    },
    theme: {
      mode: theme.palette.mode
    },
    stroke: {
      show: true,
      colors: [theme.colors.primary.main],
      width: 3
    },
    legend: {
      show: false
    },
    xaxis: {
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      show: false,
      tickAmount: 5,
      labels: {
        formatter: function (val) {
          return Math.round(val).toString();
        }
      }
    },
    tooltip: {
      x: {
        show: true
      },
      y: {
        title: {
          formatter: function () {
            return 'Count: ';
          }
        }
      },
      marker: {
        show: false
      }
    }
  };

  return (
    <Chart
      options={chartOptions}
      {...props}
    />
  );
};

export default OverviewListChart;
