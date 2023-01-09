/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import Link from 'next/link';
import { Button, Card, CardActions, Divider, Stack } from '@mui/material';
import DevicesTwoToneIcon from '@mui/icons-material/DevicesTwoTone';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import CategoryTwoToneIcon from '@mui/icons-material/CategoryTwoTone';
import WorkTwoToneIcon from '@mui/icons-material/WorkTwoTone';
import type { ApexOptions } from 'apexcharts';
import OverviewListRowContent from '../OverviewListRowContent';
import { useStatistics } from '../../hooks/statistic/useStatistics';
import { chartSeriesDateCountDataFormatter } from '../../utils/apexCharts';

const OverviewListRow = () => {
  const { statistics, isStatisticsLoading, statisticsError } = useStatistics();

  const lastSevenDayNewDeviceCountData = statistics?.lastSevenDayNewDeviceCount.map(chartSeriesDateCountDataFormatter) || [];
  const lastSevenDayNewDeviceGroupCountData = statistics?.lastSevenDayNewDeviceGroupCount.map(chartSeriesDateCountDataFormatter) || [];
  const lastSevenDayNewDeviceCategoryCountData = statistics?.lastSevenDayNewDeviceCategoryCount.map(chartSeriesDateCountDataFormatter) || [];
  const lastSevenDayNewDeviceJobCountData = statistics?.lastSevenDayNewDeviceJobCount.map(chartSeriesDateCountDataFormatter) || [];

  return (
    <Card>
      <Stack
        direction="row"
        justifyContent="space-evenly"
        alignItems="stretch"
        divider={<Divider orientation="vertical" flexItem/>}
        spacing={0}
      >
        <OverviewListRowContent
          icon={DevicesTwoToneIcon}
          header="Devices"
          total={statistics?.deviceTotal}
          series={[
            {
              name: 'Devices',
              data: lastSevenDayNewDeviceCountData,
            }
          ] as ApexOptions['series']}
        />
        <OverviewListRowContent
          icon={AccountTreeTwoToneIcon}
          header="Device groups"
          total={statistics?.deviceGroupTotal}
          series={[
            {
              name: 'Device groups',
              data: lastSevenDayNewDeviceGroupCountData,
            }
          ] as ApexOptions['series']}
        />
        <OverviewListRowContent
          icon={CategoryTwoToneIcon}
          header="Device categories"
          total={statistics?.deviceCategoryTotal}
          series={[
            {
              name: 'Device categories',
              data: lastSevenDayNewDeviceCategoryCountData,
            }
          ] as ApexOptions['series']}
        />
        <OverviewListRowContent
          icon={WorkTwoToneIcon}
          header="Device jobs"
          total={statistics?.deviceJobTotal}
          series={[
            {
              name: 'Device jobs',
              data: lastSevenDayNewDeviceJobCountData,
            }
          ] as ApexOptions['series']}
        />
      </Stack>
      <Divider/>
      <CardActions
        disableSpacing
        sx={{
          p: 3,
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Link href="/devices">
          <Button variant="outlined">View all devices</Button>
        </Link>
      </CardActions>
    </Card>
  );
}

export default OverviewListRow;
