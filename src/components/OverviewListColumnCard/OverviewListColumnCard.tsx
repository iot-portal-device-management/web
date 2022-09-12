import type { FunctionComponent } from 'react';
import { alpha, Avatar, Box, Card, styled, SvgIconProps, Typography, useTheme } from '@mui/material';
import Label from '../Label';
import Text from '../Text';
import Chart from '../Chart';
import type { ApexOptions } from 'apexcharts';
import { roundToTwoDecimalPlaces } from '../../utils/utils';

interface OverviewListColumnCardProps {
  icon: FunctionComponent<SvgIconProps>;
  header: string;
  total: number;
  series: ApexOptions['series'];
}

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    margin: ${theme.spacing(0, 0, 1, -0.5)};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${theme.spacing(1)};
    padding: ${theme.spacing(0.5)};
    border-radius: 60px;
    height: ${theme.spacing(5.5)};
    width: ${theme.spacing(5.5)};
    background: ${
    theme.palette.mode === 'dark'
      ? theme.colors.alpha.trueWhite[30]
      : alpha(theme.colors.alpha.black[100], 0.07)
  };
  
    svg {
      background: ${theme.colors.alpha.trueWhite[100]};
      padding: ${theme.spacing(0.5)};
      display: block;
      border-radius: inherit;
      height: ${theme.spacing(4.5)};
      width: ${theme.spacing(4.5)};
    }
`
);

const OverviewListColumnCard = ({ icon: Icon, header, total, series }: OverviewListColumnCardProps) => {
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
        formatter: function(val) {
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

  const calculateTwentyFourHourChange = (series: ApexOptions['series']) => {
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
  }

  const determineValueChangeSign = (value: number) => {
    if (value > 0) return '+';
    else if (value < 0) return '-'

    return '';
  }


  const determineValueChangeColor = (value: number) => {
    if (value > 0) return 'success';
    else if (value < 0) return 'error'

    return 'warning';
  }

  const [twentyFourHourCountChange, twentyFourHourPercentChange] = calculateTwentyFourHourChange(series);

  return (
    <Card sx={{ overflow: 'visible' }}>
      <Box sx={{ p: 3 }}>
        <Box display="flex" alignItems="center">
          <AvatarWrapper>
            <Icon color="primary"/>
          </AvatarWrapper>
          <Box>
            <Typography variant="h4" noWrap>
              {header}
            </Typography>
            <Typography variant="subtitle1" noWrap>
              View
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            pt: 3
          }}
        >
          <Typography
            variant="h2"
            sx={{
              pr: 1,
              mb: 1
            }}
          >
            {total}
          </Typography>
          <Text
            color={determineValueChangeColor(twentyFourHourPercentChange)}
          >
            <b>
              {`${determineValueChangeSign(twentyFourHourPercentChange)} ${twentyFourHourPercentChange}%`}
            </b>
          </Text>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start'
          }}
        >
          <Label
            color={determineValueChangeColor(twentyFourHourCountChange)}
          >
            {`${determineValueChangeSign(twentyFourHourCountChange)} ${twentyFourHourCountChange}`}
          </Label>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ pl: 1 }}
          >
            last 24h
          </Typography>
        </Box>
      </Box>
      <Chart
        options={chartOptions}
        series={series}
        type="area"
        height={200}
      />
    </Card>
  );
};

export default OverviewListColumnCard;
