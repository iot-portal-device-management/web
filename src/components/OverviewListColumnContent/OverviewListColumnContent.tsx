import type { FunctionComponent } from 'react';
import { Box, Card, SvgIconProps, Typography } from '@mui/material';
import Label from '../Label';
import Text from '../Text';
import type { ApexOptions } from 'apexcharts';
import {
  calculateTwentyFourHourChange,
  determineValueChangeColor,
  determineValueChangeSign
} from '../../utils/apexCharts';
import AvatarWrapper from '../AvatarWrapper';
import OverviewListChart from '../OverviewListChart';

interface OverviewListColumnContentProps {
  icon: FunctionComponent<SvgIconProps>;
  header: string;
  total: number;
  series: ApexOptions['series'];
}

const OverviewListColumnContent = ({ icon: Icon, header, total, series }: OverviewListColumnContentProps) => {
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
          <Text color={determineValueChangeColor(twentyFourHourPercentChange)}>
            <b>
              {`${determineValueChangeSign(twentyFourHourPercentChange)}${twentyFourHourPercentChange}%`}
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
          <Label color={determineValueChangeColor(twentyFourHourCountChange)}>
            {`${determineValueChangeSign(twentyFourHourCountChange)}${twentyFourHourCountChange}`}
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
      <OverviewListChart
        series={series}
        type="area"
        height={200}
      />
    </Card>
  );
};

export default OverviewListColumnContent;
