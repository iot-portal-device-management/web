/*
 * Copyright (C) 2021-2022 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { Box, SvgIconProps, Typography, useTheme } from '@mui/material';
import Text from '../Text';
import Label from '..//Label';
import type { ApexOptions } from 'apexcharts';
import TrendingUpTwoToneIcon from '@mui/icons-material/TrendingUpTwoTone';
import TrendingDownTwoToneIcon from '@mui/icons-material/TrendingDownTwoTone';
import TrendingFlatTwoToneIcon from '@mui/icons-material/TrendingFlatTwoTone';
import { FunctionComponent } from 'react';
import { calculateTwentyFourHourChange, determineValueChangeColor, formatNumberValue } from '../../utils/apexCharts';
import AvatarWrapper from '../AvatarWrapper';
import OverviewListChart from '../OverviewListChart';

interface OverviewListRowContentProps {
  icon: FunctionComponent<SvgIconProps>;
  header: string;
  total: number;
  series: ApexOptions['series'];
}

const OverviewListRowContent = ({ icon: Icon, header, total, series }: OverviewListRowContentProps) => {
  const theme = useTheme();

  const renderTrendingIcon = (value: number) => {
    if (value > 0) return <TrendingUpTwoToneIcon sx={{ color: `${theme.colors.success.main}` }}/>;
    else if (value < 0) return <TrendingDownTwoToneIcon sx={{ color: `${theme.colors.error.main}` }}/>;

    return <TrendingFlatTwoToneIcon sx={{ color: `${theme.colors.warning.main}` }}/>;
  }

  const [, twentyFourHourPercentChange] = calculateTwentyFourHourChange(series);

  return (
    <Box
      sx={{
        width: '100%',
        p: 3
      }}
    >
      <Box
        display="flex"
        alignItems="flex-start"
        justifyContent="space-between"
      >
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
        <Label color="secondary">24h</Label>
      </Box>
      <Box
        mt={3}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start'
          }}
        >
          <Typography
            variant="h2"
            sx={{ pr: 1 }}
          >
            {total}
          </Typography>
          <Text color={determineValueChangeColor(twentyFourHourPercentChange)}>
            <b>
              {`${formatNumberValue(twentyFourHourPercentChange)}%`}
            </b>
          </Text>
        </Box>
        {renderTrendingIcon(twentyFourHourPercentChange)}
      </Box>
      <Box pt={2}>
        <OverviewListChart
          series={series}
          type="line"
          height={100}
        />
      </Box>
    </Box>
  );
};

export default OverviewListRowContent;
