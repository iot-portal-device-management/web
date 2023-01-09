/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { Grid } from '@mui/material';
import DeviceMetricCpuTemperatureChartCard from '../DeviceMetricCpuTemperatureChartCard';
import DeviceMetricCpuUsageChartCard from '../DeviceMetricCpuUsageChartCard';
import DeviceMetricDiskUsageChartCard from '../DeviceMetricDiskUsageChartCard';
import DeviceMetricAvailableMemoryChartCard from '../DeviceMetricAvailableMemoryChartCard';

interface DeviceMetricsTabProps {
  deviceId: string;
}

const DeviceMetricsTab = ({ deviceId }: DeviceMetricsTabProps) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <DeviceMetricCpuTemperatureChartCard deviceId={deviceId}/>
      </Grid>
      <Grid item xs={12}>
        <DeviceMetricCpuUsageChartCard deviceId={deviceId}/>
      </Grid>
      <Grid item xs={12}>
        <DeviceMetricDiskUsageChartCard deviceId={deviceId}/>
      </Grid>
      <Grid item xs={12}>
        <DeviceMetricAvailableMemoryChartCard deviceId={deviceId}/>
      </Grid>
    </Grid>
  );
};

export default DeviceMetricsTab;
